import {
  getCart,
  quantityChangeFromCart,
  removeFromCart,
} from "./cartManager.js";
async function main() {
  printAll();

  document.getElementById("order").addEventListener("click", function () {
    command();
    //alert("test");
  });

  function processForm(e) {
    if (e.preventDefault) e.preventDefault();

    /* do what you want with the form */
    //command();

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

  let article = document.createElement("article");
  article.setAttribute("class", "cart__item");
  article.setAttribute("data-id", _id);
  article.setAttribute("data-color", color);

  let divimg = document.createElement("div");
  divimg.setAttribute("class", "cart__item__img");

  let img = document.createElement("img");
  img.src = imageUrl;
  img.alt = altTxt;

  let divcontent = document.createElement("div");
  divcontent.setAttribute("class", "cart__item__content");

  let divdesc = document.createElement("div");
  divdesc.setAttribute("class", "cart__item__content__deescription");

  let h2 = document.createElement("h2");
  h2.textContent = name;

  let p1 = document.createElement("p");
  p1.textContent = color;

  let p2 = document.createElement("p");
  p2.textContent = price + " €";

  let divsettings = document.createElement("div");
  divsettings.setAttribute("class", "cart__item__content__settings");

  let divsettingsquantity = document.createElement("div");
  divsettingsquantity.setAttribute(
    "class",
    "cart__item__content__settings__quantity"
  );

  let p3 = document.createElement("p");
  p3.textContent = "Qté : ";

  let input = document.createElement("input");
  input.setAttribute("class", "itemQuantity");
  input.type = "number";
  input.name = "itemQuantity";
  input.min = "1";
  input.max = "100";
  input.value = quantity;

  let divsettingsdelete = document.createElement("div");
  divsettingsdelete.setAttribute(
    "class",
    "cart__item__content__settings__delete"
  );

  let p4 = document.createElement("p");
  p4.setAttribute("class", "deleteItem");
  p4.textContent = "Supprimer";

  let cartitems = document.getElementById("cart__items");

  divimg.appendChild(img);
  article.appendChild(divimg);

  divdesc.appendChild(h2);
  divdesc.appendChild(p1);
  divdesc.appendChild(p2);

  divsettingsquantity.appendChild(p3);
  divsettingsquantity.appendChild(input);

  divsettingsdelete.appendChild(p4);
  divsettings.appendChild(divsettingsquantity);
  divsettings.appendChild(divsettingsdelete);

  divcontent.appendChild(divdesc);
  divcontent.appendChild(divsettings);

  article.appendChild(divcontent);

  cartitems.appendChild(article);

  /*
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
              </article>`;*/
}

function printTotal(totalQuantity, totalPrice) {
  document.getElementById("totalQuantity").textContent = totalQuantity;
  document.getElementById("totalPrice").textContent = totalPrice;
}

function reset() {
  let items = document.getElementById("cart__items");
  let item = document.getElementById("cart__item");
  //items.removeChild(items.lastElementChild);
  items.textContent = "";
  //document.getElementById("cart__items").innerHTML = "";
  /*document
    .getElementById("cart__items")
    .removeChild(document.getElementById("cart__item"));*/
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
  if (document.getElementById("totalQuantity").textContent == 0) {
    alert("Panier vide");
    return;
  }
  let firstname = document.getElementById("firstName").value;
  let lastname = document.getElementById("lastName").value;
  let address = document.getElementById("address").value;
  let city = document.getElementById("city").value;
  let email = document.getElementById("email").value;

  /* let emailPattern = new RegExp(`\w+@\w+\.\w+`);
  emailPattern = /^[a-zA-Z0-9.-_]+@{1}[a-zA-Z0-9.-_]+\.{1}[a-z]{2,10}$/;*/
  let emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  //
  //abc@aae.com
  // aaa@aze.aze
  //var emailReg = new RegExp(/^([w-.]+)@((?:[w]+.)+)([a-zA-Z]{2,4})/i);
  let namePattern = /<+/g;
  namePattern =
    /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/g;
  //name = bob
  //name = aa-cc

  if (namePattern.test(firstname)) {
    console.log(firstname);
    clearErrors();
    document.getElementById("firstNameErrorMsg").textContent =
      "champ incorrect";
    alert("name");
    return;
  }
  if (namePattern.test(lastname)) {
    clearErrors();
    document.getElementById("lastNameErrorMsg").textContent = "champ incorrect";
    return;
  }
  if (namePattern.test(address)) {
    clearErrors();
    document.getElementById("addressErrorMsg").textContent = "champ incorrect";
    return;
  }
  if (namePattern.test(city)) {
    clearErrors();
    document.getElementById("cityErrorMsg").textContent = "champ incorrect";
    return;
  }

  if (!emailPattern.test(email)) {
    clearErrors();
    document.getElementById("emailErrorMsg").value = "erreur email non valide";
    return;
  }

  console.log("pattern OK");
  const contact = {
    firstName: firstname,
    lastName: lastname,
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
    products: idarray,
  };

  console.log(JSON.stringify(params));

  let response = await fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(params),
  });

  let result = await response.json();
  console.log(result);

  window.location.href = `./confirmation.html?orderid=${result.orderId}`;
}

function clearErrors() {
  document.getElementById("firstNameErrorMsg").textContent = "";

  document.getElementById("lastNameErrorMsg").textContent = "";

  document.getElementById("addressErrorMsg").textContent = "";

  document.getElementById("cityErrorMsg").textContent = "";
}

main();
