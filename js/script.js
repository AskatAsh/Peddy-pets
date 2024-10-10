const categories_container = document.getElementById("categories");
const categories_url =
  "https://openapi.programming-hero.com/api/peddy/categories";

// display pets category
function displayCategories(categories) {
  categories.forEach((category) => {
    // console.log(category);
    const li = document.createElement("li");
    li.className =
      "flex items-center justify-center gap-3 p-5 border-2 border-light1 rounded-xl sm:w-full cursor-pointer hover:bg-light1";
    li.innerHTML = `
        <img class="w-8" src="${category?.category_icon}" alt="${category?.category} icon">
        <span class="text-xl sm:text-2xl text-dark1 font-black">${category?.category}s</span>`;
    console.log(li);
    categories_container.appendChild(li);
  });
}
// fetch pets categories using categories api
async function getCategoriesData() {
  const categoriesResponse = await fetch(categories_url);
  const categoriesData = await categoriesResponse.json();
  const categories = categoriesData?.categories;
  console.log(categories);
  displayCategories(categories);
}
getCategoriesData();
