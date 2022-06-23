import {
  getCart,
  quantityChangeFromCart,
  removeFromCart,
} from "./cartManager.js";
async function main() {
  printAll();

  function processForm(e) {
    if (e.preventDefault) e.preventDefault();

    /* do what you want with the form */
    command();

    // You must return false to prevent the default form behavior
    return false;
  }

  var form = document.getElementsByClassName("cart__order__form")[0];
  if (form.attachEvent) {
    form.attachEvent("submit", processForm);
  } else {
    form.addEventListener("submit", processForm);
  }

  // document.getElementById("order").addEventListener("click", command);

  /* console.log(i);
    console.log(quantityItem[i].value);*/
}

function printcartitem(product) {
  const { name, imageUrl, altTxt, price, _id, quantity, color } = product;
  console.log(product);
  document.getElementById(
    "cart__items"
  ).innerHTML += `<article class="cart__item" data-id="${_id}" data-color="${color}">
                <div class="cart__item__img">
                  <img src="${imageUrl}" alt="${altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${name}</h2>
                    <p>${color}</p>
                    <p>${price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
}

function printTotal(totalQuantity, totalPrice) {
  document.getElementById("totalQuantity").textContent = totalQuantity;
  document.getElementById("totalPrice").textContent = totalPrice;
}

function reset() {
  document.getElementById("cart__items").innerHTML = "";
  document.getElementById("totalQuantity").textContent = 0;
  document.getElementById("totalPrice").textContent = 0;
}

function printAll() {
  const data = getCart();
  let totalquantity = 0;
  let totalPrice = 0;
  for (let i of data) {
    printcartitem(i);
    totalPrice += i.price * i.quantity;
    totalquantity += i.quantity;
  }
  printTotal(totalquantity, totalPrice);

  let delItem = document.getElementsByClassName("deleteItem");
  let quantityItem = document.getElementsByClassName("itemQuantity");
  for (let i = 0; i < delItem.length; i++) {
    delItem[i].addEventListener("click", function () {
      deleteItemrefresh(i);
    });
    quantityItem[i].addEventListener("change", function () {
      quantityChange(i, quantityItem[i].value);
    });
  }
}

function refresh() {
  reset();
  printAll();
}

function deleteItemrefresh(i) {
  removeFromCart(i);
  refresh();
}

function quantityChange(i, quantity) {
  quantityChangeFromCart(i, quantity);
  refresh();
}

async function command() {
  console.log("command");
  let firstname = document.getElementById("firstName").value;
  let lastname = document.getElementById("lastName").value;
  let address = document.getElementById("address").value;
  let city = document.getElementById("city").value;
  let email = document.getElementById("email").value;

  let emailPattern = new RegExp(`\w+@\w+\.\w+`);
  //var emailReg = new RegExp(/^([w-.]+)@((?:[w]+.)+)([a-zA-Z]{2,4})/i);

  if (firstname == "") {
    document.getElementById("firstNameErrorMsg").value = "champ vide";
    return;
  }
  if (lastname == "") {
    document.getElementById("lastNameErrorMsg").value = "champ vide";
    return;
  }
  if (address == "") {
    document.getElementById("addressErrorMsg").value = "champ vide";
    return;
  }
  if (city == "") {
    document.getElementById("cityErrorMsg").value = "champ vide";
    return;
  }
  /*
  if (!emailPattern.test(email)) {
    document.getElementById("emailErrorMsg").value = "erreur email non valide";
    return;
  }*/

  console.log("pattern OK");
  const contact = {
    firstname: firstname,
    lastname: lastname,
    address: address,
    city: city,
    email: email,
  };

  const cart = getCart();
  let idarray = [];
  for (let i = 0; i < cart.length; i++) {
    idarray.push(cart[i]._id);
  }
  console.log(contact);
  console.log(idarray);
  let params = {
    contact: contact,
    idarray: idarray,
  };

  let response = await fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(params),
  });

  let result = await response.json();

  //window.location.href = `./confirmation.html?orderid=${result.orderid}`;
}

main();
