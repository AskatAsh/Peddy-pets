// 1. fetch pets category and display in ui
const categories_container = document.getElementById("categories");
const categories_url =
  "https://openapi.programming-hero.com/api/peddy/categories";

// display pets category
function displayCategories(categories) {
  categories.forEach((category) => {
    const li = document.createElement("li");
    li.className =
      "flex items-center justify-center gap-3 p-5 border-2 border-light1 rounded-xl sm:w-full cursor-pointer hover:bg-light1";
    li.innerHTML = `
        <img class="w-8" src="${category?.category_icon}" alt="${category?.category} icon">
        <span class="text-xl sm:text-2xl text-dark1 font-black">${category?.category}s</span>`;
    categories_container.appendChild(li);
  });
}
// fetch pets categories using categories api
async function getCategoriesData() {
  const categoriesResponse = await fetch(categories_url);
  const categoriesData = await categoriesResponse.json();
  const categories = categoriesData?.categories;
  displayCategories(categories);
}
getCategoriesData();

// 2. fetch all pets data and display in cards ui
const petsContainer = document.getElementById("pets-cards");
const all_pets_url = "https://openapi.programming-hero.com/api/peddy/pets";

function displayPetsData(pets) {
    petsContainer.innerHTML = `<span class="loading loading-dots loading-lg mt-8 inline-block mx-auto"></span>`;
    setTimeout(() => {
        petsContainer.innerHTML = "";
        pets.forEach(pet => {
            // console.log(pet);
            const div = document.createElement("div");
            div.className = "p-5 border-2 border-dark4 rounded-2xl";
            div.innerHTML = `
            <div class="w-full h-auto overflow-hidden rounded-xl">
                <img class="w-full h-full object-cover" src=${pet?.image} alt="image of a ${pet?.breed || pet?.category}">
              </div>
              <h3 class="text-xl text-dark1 font-bold my-3">${pet?.name || pet?.breed}</h3>
              <ul class="text-dark2 space-y-2">
                <li class="flex gap-2"><img src="./assets/category.png" alt=""><span>Breed: ${pet?.breed || "Not Available"}</span></li>
                <li class="flex gap-2"><img src="./assets/calender.png" alt=""><span>Birth: ${pet?.date_of_birth || "Not Available"}</span></li>
                <li class="flex gap-2"><img src="./assets/gender.png" alt=""><span>Gender: ${pet?.gender || "Not Available"}</span></li>
                <li class="flex gap-2"><img src="./assets/dollar.png" alt=""><span>Price : ${pet?.price ? pet?.price+"$" : "Negotiable"}</span></li>
              </ul>
              <hr class="border border-dark4 my-4">
              <div class="flex gap-4">
                <button id="like-btn" class="border-2 border-light1 p-2 rounded-xl w-16"><img class="w-6 inline-block mx-auto"
                    src="./assets/like-icon.png" alt="like icon"></button>
                <button id="adopt-btn" class="text-primary font-bold border-2 border-light1 p-2 rounded-xl flex-1">Adopt</button>
                <button id="details-btn" class="text-primary font-bold border-2 border-light1 p-2 rounded-xl flex-1">Details</button>
              </div>`;
            petsContainer.appendChild(div);
        })
    }, 2000)
    
}
// fetch pets data using api
async function getPetsData() {
  const petsResponse = await fetch(all_pets_url);
  const petsData = await petsResponse.json();
  const pets = petsData.pets;
  displayPetsData(pets);
}
getPetsData();