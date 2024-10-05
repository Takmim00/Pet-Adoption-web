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

// display post

const loadPost = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayPost(data.pets));
};
const displayPost = (pets) => {
  const petsContainer = document.getElementById("pets-content");
  petsContainer.innerHTML = "";
  pets.forEach((pet) => {
    const petCard = document.createElement("div");
    petCard.innerHTML = `
        <div class="card bg-base-100 w-96 shadow-xl">
                <figure class="px-10 pt-10 h-[200px] relative">
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
                            <button class="btn"><i class="fa-regular fa-thumbs-up">
                            </i></button>
                            <button class="btn text-color font-extrabold
                            ">Adopt</button>
                            <button class="btn text-color font-extrabold
                            ">Details</button>
                        </div>
                    </div>
            </div>
        `;
    petsContainer.appendChild(petCard);
  });
};

const loadCategoryPets = (category) => {
  fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${category}`
  )
    .then((res) => res.json())
    .then((data) => {
      displayPost(data.data);
    });
};

loadCategory();
loadPost();
