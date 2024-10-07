let allPetsData = [];
let activeCategoryPets = [];

const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories));
};

const displayCategory = (categories) => {
  const categoryContainer = document.getElementById("category");
  categories.forEach((item) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
      <button id="btn-${item.category}" onclick= "loadCategoryPets('${item.category}')" class= " category-btn flex items-center gap-2 font-bold text-2xl border-2 rounded-lg px-6 py-2"><img src=${item.category_icon}/>${item.category}</button>
      `;
    categoryContainer.append(buttonContainer);
  });
};
const loadDetail = async (petId) => {
  console.log(petId);
  const url = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDetail(data.petData);
};

const displayDetail = (petData) => {
  console.log(petData);
  const detailContainer = document.getElementById("modal-content");
  detailContainer.classList = "space-y-2";
  detailContainer.innerHTML = `
    <img class="w-full rounded-xl" src=${petData.image} alt="" />
    <h2 class="card-title">${petData.pet_name}</h2>
    <p><i class="fa-solid fa-border-all"></i> Breed: ${petData.breed || "Normal Breed"}</p>
    <p><i class="fa-regular fa-calendar"></i> Birth: ${petData.date_of_birth||"Unknown date"}</p>
    <p><i class="fa-solid fa-mercury"></i>Gender: ${petData.gender || "Undefined"}</p>
    <p><i class="fa-solid fa-dollar-sign"></i>Price : ${petData.price || "No Price available"}<span>$</span></p>
    <h1 class="card-title">Details Information</h1>
    <p>${petData.pet_details}</p>
    
  `;
  document.getElementById("customModal").showModal();
};

// display post

const loadPost = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => {
      allPetsData = data.pets;
      displayPost(allPetsData);
    });
};

const displayPost = (pets) => {
  const petsContainer = document.getElementById("pets-content");
  petsContainer.innerHTML = "";
  if (pets.length == 0) {
    petsContainer.classList.remove("grid");
    petsContainer.innerHTML = `
    <div class= "flex flex-col gap-5 justify-center items-center bg-[#13131308] py-32 px-80 rounded-xl w-full">
      <img src="./images/error.webp" class="flex " alt="" />
      <h1 class="text-center text4xl font-bold">NO Content here in this category</h1>
    </div>
    `;
    return;
  } else {
    petsContainer.classList.add("grid");
  }
  pets.forEach((pet) => {
    const petCard = document.createElement("div");
    petCard.classList = "lg:col-span-4 col-span-12 gap-4";
    petCard.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
                <figure class="px-6 pt-6 h-[200px] relative">
                    <img class="h-full w-full rounded-xl object-cover"
                        src=${pet.image}
                        />
                </figure>
                    <div class="card-body ">
                        <h2 class="card-title">${pet.pet_name}</h2>
                        <p><i class="fa-solid fa-border-all"></i> Breed: ${pet.breed || "Normal Breed"}</p>
                        <p><i class="fa-regular fa-calendar"></i> Birth: ${pet.date_of_birth||"Unknown date"}</p>
                        <p><i class="fa-solid fa-mercury"></i>Gender: ${pet.gender || "Undefined"}</p>
                        <p><i class="fa-solid fa-dollar-sign"></i>Price : ${pet.price || "No Price available"}<span>$</span></p>
                        <div class="card-actions justify-between">
                            <button class="btn" onclick="markAsImg('${pet.image}') "><i class="
                            fa-regular fa-thumbs-up">
                            </i></button>
                            <button onclick="startAdoption(this)" class="btn text-color font-
                            extrabold bg-color text-white
                            ">Adopt</button>
                            <button onclick="loadDetail(${pet.petId})" class="btn  font-extrabold 
                            bg-color text-white
                            ">Details</button>
                        </div>
                    </div>
            </div>
        `;
    petsContainer.appendChild(petCard);
  });
};

const removeActiveClass = () => {
  const button = document.getElementsByClassName("category-btn");
  for (let btn of button) {
    btn.classList.remove("active");
  }
};



const loadCategoryPets = (id) => {
  removeActiveClass();

  const spinner = document.getElementById("spinner");
  const petsContainer = document.getElementById("pets-content");
  spinner.classList.remove("hidden");
  petsContainer.classList.add("hidden");

  const timeout = new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
  const fetches= fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");
      activeCategoryPets = data.data;
    });
  Promise.all([fetches, timeout]).then(() => {
    spinner.classList.add("hidden");
    petsContainer.classList.remove("hidden");
    displayPost(activeCategoryPets);
  });   
};


const sortByPrice = (pets) => {
  return pets.sort((a, b) => b.price - a.price);
};
document.getElementById("sort-btn").addEventListener("click", () => {
  let sortedPets;
  if (activeCategoryPets.length > 0) {
    sortedPets = sortByPrice(activeCategoryPets);
  } else {
    sortedPets = sortByPrice(allPetsData);
  }
  displayPost(sortedPets);
});

const startAdoption = (button) => {
  const modal = document.getElementById("my_modal");
  const countdownElement = document.getElementById("countdown");
  modal.showModal();
  let count = 3;
  countdownElement.textContent = count;
  const interval = setInterval(() => {
    count--;
    countdownElement.textContent = count;
    if (count === 0) {
      clearInterval(interval);
      modal.close();
      button.textContent = "Adopted";
      button.disabled = true;
      button.classList.add("adopted");
    }
  }, 1000);
};

const markAsImg = (image) => {
  const markAsImages = document.getElementById("markAsImg");
  const div = document.createElement("div");
  div.classList = "";
  div.innerHTML = `
    <div class="flex p-2 lg:p-3 bg-white rounded-2xl gap-3">
            <figure class="px-2 py-2 h-[100px] relative shadow justify-center items-center">
                    <img class="h-full w-full rounded-xl object-cover"
                        src=${image}
                        />
              </figure>
    </div>
    `;
  markAsImages.appendChild(div);
};

loadCategory();
loadPost();
