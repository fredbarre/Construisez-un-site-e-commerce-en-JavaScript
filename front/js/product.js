import { addToCart } from "./cartManager.js";

//récupère la veleur de id dans le lien
function getUrlId() {
  let str = window.location.href;
  let url = new URL(str);
  let id = url.searchParams.get("id");
  return id;
}

//console.log(getUrlId());

//récupère le produit dans l'aoi
async function getvals(id) {
  const response = await fetch(`http://localhost:3000/api/products/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const responseData = await response.json();
  //console.log(responseData);
  return responseData;
}
//affiche le produit en le placant dans le HTML
function printProduct(product) {
  const { name, description, imageUrl, altTxt, colors, price } = product;
  let collectionImg = document.getElementsByClassName("item__img")[0];

  const img = document.createElement("img");
  img.src = imageUrl;
  img.alt = altTxt;
  collectionImg.appendChild(img);

  document.getElementById("title").textContent = name;
  document.getElementById("price").textContent = price;
  document.getElementById("description").textContent = description;

  const color = document.getElementById("colors");
  for (let i = 0; i < colors.length; i++) {
    const option = document.createElement("option");
    option.value = colors[i];
    option.textContent = colors[i];
    color.appendChild(option);
  }
}

//fonction principale récupère l'id dans L'url avec getUrlId(), le produit correspondant avec getvals() l'ajoute au panier avec addtocart() au clic

async function main() {
  let urlid = getUrlId();
  const product = await getvals(urlid);

  printProduct(product);

  function addtocart() {
    let color = document.getElementById("colors").value;
    let quantity = +document.getElementById("quantity").value;

    if (quantity == 0) {
      return;
    }
    addToCart({ ...product, color, quantity });
  }
  document.getElementById("addToCart").addEventListener("click", function () {
    addtocart();
  });
}

main();
