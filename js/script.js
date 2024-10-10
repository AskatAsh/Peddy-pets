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
const all_pets_url = 'https://openapi.programming-hero.com/api/peddy/pets';

function displayPetsData(pets){
    console.log(pets)
}
// fetch pets data using api
async function getPetsData(){
    const petsResponse = await fetch(all_pets_url);
    const petsData = await petsResponse.json();
    const pets = petsData.pets;
    displayPetsData(pets);
}
getPetsData();