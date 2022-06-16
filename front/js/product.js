import { addToCart } from './cartManager.js';

function getUrlId() {
  let str = window.location.href;
  let url = new URL(str);
  let id = url.searchParams.get('id');
  return id;
}

//console.log(getUrlId());

//*  a import  **/

async function getvals(id) {
  const response = await fetch(`http://localhost:3000/api/products/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const responseData = await response.json();
  //console.log(responseData);
  return responseData;
}

function printProduct(product) {
  const { name, description, imageUrl, altTxt, colors, price } = product;

  document.getElementsByClassName('item__img')[0].innerHTML = `<img src="${imageUrl}" alt="${altTxt}"></img>`;
  document.getElementById('title').innerHTML = name;
  document.getElementById('price').innerHTML = price;
  document.getElementById('description').innerHTML = description;

  for (let i = 0; i < colors.length; i++) {
    document.getElementById('colors').innerHTML += `<option value="${colors[i]}">${colors[i]}</option>`;
  }
}

//function

async function main() {
  let urlid = getUrlId();
  const product = await getvals(urlid);

  printProduct(product);

  function addtocart() {
    let id = getUrlId();
    let color = document.getElementById('colors').value;
    let quantity = +document.getElementById('quantity').value;
    let value = [color, quantity];
    console.log(id);
    console.log(color);
    console.log(quantity);
    if (quantity == 0) {
      return;
    }
    addToCart({ ...product, color, quantity });
    if (localStorage.getItem(id)) {
      if (localStorage[id][0] === color) localStorage[id][1] += quantity;
    } else {
      localStorage.setItem(id, value);
    }
  }
  document.getElementById('addToCart').addEventListener('click', addtocart);
}

main();
//addtocart();
