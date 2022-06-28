import { addToCart } from "./cartManager.js";

function getUrlId() {
  let str = window.location.href;
  let url = new URL(str);
  let id = url.searchParams.get("id");
  return id;
}

//console.log(getUrlId());

//*  a import  **/

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
/*
function addtocart() {
  let id = getUrlId();
  let color = document.getElementById("colors").value;
  let number = document.getElementById("quantity").value;
  let value = [color, number];
  console.log(id);
  console.log(color);
  console.log(number);
  if (number == 0) {
    return;
  }

  if (localStorage.getItem(id)) {
    if (localStorage[id][0] === color) localStorage[id][1] += number;
  } else {
    localStorage.setItem(id, value);
  }
}*/

//function

async function main() {
  let urlid = getUrlId();
  const product = await getvals(urlid);

  printProduct(product);

  function addtocart() {
    let id = getUrlId();
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
