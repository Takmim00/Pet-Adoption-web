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
      <button id="btn-${item.petId}" onclick= "loadCategoryPets('${item.category}')" class= "category-btn flex items-center   gap-2 font-bold text-2xl border-2 rounded-lg px-6 py-2"><img src=${item.category_icon}/>${item.category}</button>
      `;
    categoryContainer.append(buttonContainer);
  });
};
const loadDetail = async(petId) => {
  console.log(petId);
  const url = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDetail(data.petData);
};

const displayDetail = (petData) => {
  console.log(petData);
  const detailContainer = document.getElementById("modal-content");
  detailContainer.className="space-y-2"
  detailContainer.innerHTML = `
    <img class="w-full rounded-xl" src=${petData.image} alt="" />
    <h2 class="card-title">${petData.pet_name}</h2>
    <p>Birth: ${petData.date_of_birth}</p>
    <p>Gender: ${petData.gender}</p>
    <p>Price : ${petData.price}</p>
    <p>Breed: ${petData.breed}</p>
    <h1 class="card-title">Details Information</h1>
    <p>${petData.pet_details}</p>
  `;
  document.getElementById("customModal").showModal();
};

// display post

const loadPost = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayPost(data.pets));
};
const displayPost = (pets) => {
  const petsContainer = document.getElementById("pets-content");
  petsContainer.innerHTML = "";
  if (pets.length == 0) {
    petsContainer.classList.remove("grid", "grid-cols-12");
    petsContainer.innerHTML = `
    <div class= "flex flex-col gap-5 justify-center items-center">
      <img src="./images/error.webp" alt="" />
      <h1 class="text-center text4xl font-bold">NO Content here in this category</h1>
    </div>
    `;
    return;
  } else {
    petsContainer.classList.add("grid", "grid-cols-12");
  }
  pets.forEach((pet) => {
    const petCard = document.createElement("div");
    petCard.className = "lg:col-span-4 col-span-12 gap-4";
    petCard.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
                <figure class="px-6 pt-6 h-[200px] relative">
                    <img class="h-full w-full rounded-xl object-cover"
                        src=${pet.image}
                        />
                </figure>
                    <div class="card-body ">
                        <h2 class="card-title">${pet.pet_name}</h2>
                        <p>Breed: ${pet.breed}</p>
                        <p>Birth: ${pet.date_of_birth}</p>
                        <p>Gender: ${pet.gender}</p>
                        <p>Price : ${pet.price}</p>
                        <div class="card-actions justify-between">
                            <button class="btn" onclick="markAsImg('${pet.image}')"><i class="fa-regular fa-thumbs-up">
                            </i></button>
                            <button class="btn text-color font-extrabold
                            ">Adopt</button>
                            <button onclick="loadDetail(${pet.petId})" class="btn text-color font-extrabold
                            ">Details</button>
                        </div>
                    </div>
            </div>
        `;
    petsContainer.appendChild(petCard);
  });
};

const loadCategoryPets = (category) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then((res) => res.json())
    .then((data) => {
      displayPost(data.data);
    });
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

