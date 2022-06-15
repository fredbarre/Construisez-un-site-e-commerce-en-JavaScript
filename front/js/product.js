function getUrlId() {
  let str = window.location.href;
  let url = new URL(str);
  let id = url.searchParams.get("id");
  return id;
}

//console.log(getUrlId());

//*  a import  **/

async function getvals() {
  const response = await fetch("http://localhost:3000/api/products", {
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
  collectionImg.innerHTML = `<img src="${imageUrl}" alt="${altTxt}"></img>`;

  document.getElementById("title").innerHTML = name;
  document.getElementById("price").innerHTML = price;
  document.getElementById("description").innerHTML = description;

  for (let i = 0; i < colors.length; i++) {
    document.getElementById(
      "colors"
    ).innerHTML += `<option value="${colors[i]}">${colors[i]}</option>`;
  }
}

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
}

//function

async function main() {
  const products = await getvals();
  let urlid = getUrlId();
  for (const product of products) {
    if (urlid == product._id) {
      printProduct(product);
    }
  }
  document.getElementById("addToCart").onclick = addtocart;
}

main();
//addtocart();
