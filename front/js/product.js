function getUrlId() {
  let str = window.location.href;
  let url = new URL(str);
  let id = url.searchParams.get("id");
  return id;
}

//console.log(getUrlId());

function getProductNumber(id) {}

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

async function main() {
  const products = await getvals();
  let urlid = getUrlId();
  for (const product of products) {
    if (urlid == product._id) {
      printProduct(product);
    }
  }
}

main();
