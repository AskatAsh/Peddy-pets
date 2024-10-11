// 1. fetch pets category and display in ui
const categories_container = document.getElementById("categories");
const categories_url =
  "https://openapi.programming-hero.com/api/peddy/categories";

// display pets category
function displayCategories(categories) {
  categories.forEach((category) => {
    const li = document.createElement("li");
    li.setAttribute("id", `${category?.id}`);
    li.className =
      "flex items-center justify-center gap-3 p-5 border-2 border-light1 rounded-xl sm:w-full cursor-pointer hover:bg-light1";
    li.innerHTML = `
        <img class="w-8" src="${category?.category_icon}" alt="${category?.category} icon">
        <span class="text-xl sm:text-2xl text-dark1 font-black"><span id="category_name">${category?.category}</span>s</span>`;
    categories_container.appendChild(li);
    li.addEventListener("click", handleCategory);
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
const pets_url = "https://openapi.programming-hero.com/api/peddy/pets";

function displayPetsData(pets) {
  petsContainer.innerHTML = `<span class="loading loading-dots loading-lg mt-8 inline-block mx-auto"></span>`;
  setTimeout(() => {
    petsContainer.innerHTML = "";
    handleAvailability(pets);
  }, 2000);
}
// fetch pets data using api
async function getPetsData() {
  const petsResponse = await fetch(pets_url);
  const petsData = await petsResponse.json();
  const pets = petsData.pets;
  displayPetsData(pets);
}
getPetsData();

// 3. fetch pets data by category

// fetch pets data by category
async function getPetsByCategory(url) {
  const petsResponse = await fetch(url);
  const petsData = await petsResponse.json();
  const pets = petsData.data;
  console.log(petsData.data);
  displayPetsData(pets);
}
// handle each category click event
function handleCategory(e) {
  const pet_category = e.currentTarget
    .querySelector("#category_name")
    .innerText.toLowerCase();
  const url = `https://openapi.programming-hero.com/api/peddy/category/${pet_category}`;
  getPetsByCategory(url);
}

// 4. handle data availability
function handleAvailability(pets) {
  if (pets.length) {
    pets.forEach((pet) => {
      const div = document.createElement("div");
      div.className = "p-5 border-2 border-dark4 rounded-2xl";
      div.innerHTML = `
                    <div class="w-full h-auto overflow-hidden rounded-xl">
                      <img class="w-full h-full object-cover" src=${
                        pet?.image
                      } alt="image of a ${pet?.breed || pet?.category}">
                    </div>
                    <h3 class="text-xl text-dark1 font-bold my-3">${
                      pet?.name || pet?.pet_name || pet?.breed
                    }</h3>
                    <ul class="text-dark2 space-y-2">
                      <li class="flex gap-2"><img src="./assets/category.png" alt=""><span>Breed: ${
                        pet?.breed || "Not Available"
                      }</span></li>
                      <li class="flex gap-2"><img src="./assets/calender.png" alt=""><span>Birth: ${
                        pet?.date_of_birth || "Not Available"
                      }</span></li>
                      <li class="flex gap-2"><img src="./assets/gender.png" alt=""><span>Gender: ${
                        pet?.gender || "Not Available"
                      }</span></li>
                      <li class="flex gap-2"><img src="./assets/dollar.png" alt=""><span>Price : ${
                        pet?.price ? pet?.price + "$" : "Negotiable"
                      }</span></li>
                    </ul>
                    <hr class="border border-dark4 my-4">
                    <div class="flex gap-4">
                      <button id="like-btn" class="border-2 border-light1 p-2 w-16 rounded-xl"><img class="w-6 inline-block mx-auto"
                          src="./assets/like-icon.png" alt="like icon"></button>
                      <button id="adopt-btn" class="text-primary font-bold border-2 border-light1 p-2 rounded-xl flex-1">Adopt</button>
                      <button id="show-details" class="text-primary font-bold border-2 border-light1 p-2 rounded-xl flex-1">Details</button>
                    </div>`;
      petsContainer.appendChild(div);
      // show details handler
      const show_details_btn = div.querySelector("#show-details");
      show_details_btn.addEventListener("click", () => {
        showDetails(pet);
      });
      // like pets handler
      const like_pet_btn = div.querySelector("#like-btn");
      like_pet_btn.addEventListener("click", () => {
        handleLikedPets(pet);
        like_pet_btn.setAttribute("disabled", "");
        like_pet_btn.classList.add("liked");
      });
      // adopt pets handler
      const adopt_btn = div.querySelector("#adopt-btn");
      adopt_btn.addEventListener("click", () => {
        handleAdoptPets(pet);
        adopt_btn.classList.add("adopted");
        adopt_btn.setAttribute("disabled", "");
        adopt_btn.innerText = "Adopted";
      });
    });
  } else {
    petsContainer.innerHTML = `
        <div class="w-full bg-dark5 rounded-2xl py-20 px-5">
          <img class="w-20 sm:w-auto block mx-auto" src="./assets/error.webp" alt="no information available icon">
          <h4 class="text-3xl sm:text-4xl font-black text-dark1 text-center my-7">No Information Available</h4>
          <p class="text-center max-w-2xl mx-auto text-dark2">It is a long established fact that a reader will be
            distracted by the readable content of a page when looking at
            its layout. The point of using Lorem Ipsum is that it has a.</p>
        </div>`;
  }
}

// 5. handle details button
const showDetailsContainer = document.getElementById("show_details");
function showDetails(pet) {
  showDetailsContainer.innerHTML = `
    <div class="modal-box rounded-lg">
      <div class="w-full h-auto overflow-hidden rounded-lg">
        <img class="w-full h-full object-cover" src=${
          pet?.image
        } alt="image of a ${pet?.breed || pet?.category}">
      </div>
      <h3 class="text-2xl font-bold my-6">${
        pet?.name || pet?.pet_name || pet?.breed
      }</h3>
      <div class="flex gap-2 sm:gap-5 flex-wrap">
        <ul class="text-dark2 space-y-2">
          <li class="flex items-center gap-2"><img class="w-5" src="./assets/category.png" alt=""><span>Breed:  ${
            pet?.breed || "Not Available"
          }</span></li>
          <li class="flex items-center gap-2"><img class="w-5" src="./assets/gender.png" alt=""><span>Gender:
              ${pet?.gender || "Not Available"}</span></li>
          <li class="flex items-center gap-2"><img class="w-5" src="./assets/dollar.png" alt=""><span>Vaccinated status:
              ${pet?.vaccinated_status}</span></li>
        </ul>
        <ul class="text-dark2 space-y-2">
          <li class="flex items-center gap-2"><img class="w-5" src="./assets/calender.png" alt=""><span>Birth:
              ${pet?.date_of_birth || "Not Available"}</span></li>
          <li class="flex items-center gap-2"><img class="w-5" src="./assets/dollar.png" alt=""><span>Price :
              ${pet?.price ? pet?.price + "$" : "Negotiable"}</span></li>
        </ul>
      </div>
      <hr class="my-5">
      <h4 class="text-lg font-bold text-dark1">Details Information</h4>
      <p class="text-dark2 mt-3">
        ${pet?.pet_details || "Not Available"}
      </p>
      <div class="modal-action w-full">
        <form method="dialog" class="w-full">
          <button class="btn w-full border-2 border-light1 bg-light1 text-primary text-xl font-bold">Close</button>
        </form>
      </div>
    </div>`;
  show_details.showModal();
}

// 6. handle like button
const likedPetsContainer = document.getElementById("liked-pets");
let likedCount = 0;
function handleLikedPets(pet) {
  likedCount++;
  likedCount
    ? (document.getElementById("no-liked-pets").style.display = "none")
    : (document.getElementById("no-liked-pets").style.display = "flex");
  console.log(pet);
  const div = document.createElement("div");
  div.className = "w-full h-[124px] overflow-hidden rounded-xl";
  div.innerHTML = `<img class="w-full h-full object-cover" src=${
    pet?.image
  } alt="image of a ${pet?.breed || pet?.category}">`;
  likedPetsContainer.appendChild(div);
}

// 7. handle adopt button
const adoptMessageContainer = document.getElementById("adopt_message");
function handleAdoptPets(pet) {
  adoptMessageContainer.innerHTML = `
  <div class="modal-box rounded-lg">
  <img class="w-10 block mx-auto object-cover my-6" src="./assets/logo.webp" alt="logo of peddy">
  <h3 class="text-3xl font-black my-6 text-center">Congrats</h3>
  <p class="text-dark2 my-3 text-center">
  Your Pet Adoption Process is Starting...
  </p>
  <p id="adoption-countdown" class="text-4xl font-black text-center mt-3">3</p>
  </div>`;
  const adoption_countdown = document.getElementById("adoption-countdown");
  let countdown = +adoption_countdown.innerText;
  adoptMessageContainer.classList.add("modal-open");
  const countdownTimer = setInterval(() => {
    countdown--;
    adoption_countdown.innerText = countdown;
    if (countdown <= 0) {
      clearInterval(countdownTimer);
      adoptMessageContainer.classList.remove("modal-open");
    }
  }, 1000);
}
