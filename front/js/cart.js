import {
  emptyCart,
  getCart,
  quantityChangeFromCart,
  removeFromCart,
} from "./cartManager.js";

/*fonction principale affiche tous les produits le prix total la quantité totale 
puis au clic du bouton commander vérifie les paramètres de contact et envoie 
la page de confirmation avec l'orderId

*/

let products;

async function getvals() {
  const response = await fetch("http://localhost:3000/api/products", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const responseData = await response.json();
  console.log(responseData);
  return responseData;
}

async function main() {
  products = await getvals();
  printAll();

  document.getElementById("order").addEventListener("click", function () {
    submitOrder();
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

//affiche le produit
function printcartitem(product, price) {
  const { name, imageUrl, altTxt, _id, quantity, color } = product;
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
  input.addEventListener("change", function () {
    quantityChange(_id, color, input.value);
  });

  let divsettingsdelete = document.createElement("div");
  divsettingsdelete.setAttribute(
    "class",
    "cart__item__content__settings__delete"
  );

  let p4 = document.createElement("p");
  p4.setAttribute("class", "deleteItem");
  p4.textContent = "Supprimer";
  p4.addEventListener("click", function () {
    deleteItemrefresh(_id, color);
  });

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
}

//affiche le prix total et la quantité totale
function printTotal(totalQuantity, totalPrice) {
  document.getElementById("totalQuantity").textContent = totalQuantity;
  document.getElementById("totalPrice").textContent = totalPrice;
}

//retire l'affichage des produits,mise a zero de la quantité et le prix
function reset() {
  let items = document.getElementById("cart__items");
  items.textContent = "";
  document.getElementById("totalQuantity").textContent = 0;
  document.getElementById("totalPrice").textContent = 0;
}

function getPriceFromId(id) {
  for (const product of products) {
    if (product._id == id) {
      return product.price;
    }
  }
}
/**affiche tous les produits et ajuste le prix total et la quantité totale*/
async function printAll() {
  const data = getCart();
  let totalquantity = 0;
  let totalPrice = 0;

  for (let i of data) {
    let price = getPriceFromId(i._id);
    printcartitem(i, price);

    totalPrice += price * i.quantity;
    totalquantity += i.quantity;
  }
  printTotal(totalquantity, totalPrice);

  let delItem = document.getElementsByClassName("deleteItem");
  let quantityItem = document.getElementsByClassName("itemQuantity");
  /*for (let i = 0; i < delItem.length; i++) {
    delItem[i].addEventListener("click", function () {
      deleteItemrefresh(i);
    });
    quantityItem[i].addEventListener("change", function () {
      quantityChange(i, quantityItem[i].value);
    });
  }*/
}
//actualise l'affichage
function refresh() {
  reset();
  printAll();
}

//retire du panier le produit a l'indice i et actualise l'affichage
function deleteItemrefresh(id, color) {
  removeFromCart(id, color);
  refresh();
}

//change la quantité du produit a l'indice i et actualise l'affichage
function quantityChange(id, color, quantity) {
  quantityChangeFromCart(id, color, quantity);
  refresh();
}

//vérifie les champs de contact revoie true si correct sinon false
function valueChecker() {
  let firstname = document.getElementById("firstName").value;
  let lastname = document.getElementById("lastName").value;
  let address = document.getElementById("address").value;
  let city = document.getElementById("city").value;
  let email = document.getElementById("email").value;

  let emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  let namePattern =
    /^[ a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'`'\-]+$/;

  let addressPattern =
    /^[a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ0-9\s,.'-]{3,}$/;

  if (!namePattern.test(firstname)) {
    console.log(firstname);
    clearErrors();
    document.getElementById("firstNameErrorMsg").textContent =
      "champ incorrect";
    return false;
  }
  if (!namePattern.test(lastname)) {
    clearErrors();
    document.getElementById("lastNameErrorMsg").textContent = "champ incorrect";
    return false;
  }
  if (!addressPattern.test(address)) {
    clearErrors();
    document.getElementById("addressErrorMsg").textContent = "champ incorrect";
    return false;
  }
  if (!namePattern.test(city)) {
    clearErrors();
    document.getElementById("cityErrorMsg").textContent = "champ incorrect";
    return false;
  }

  if (!emailPattern.test(email)) {
    clearErrors();
    document.getElementById("emailErrorMsg").value = "erreur email non valide";
    return false;
  }
  return true;
}
//vérifie les champs de contacts puis envoie la commande l'api ( seulement l'id) obtient le l'orderid et le passe en paramètre pour l'ouverture de la page de confirmation
async function submitOrder() {
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

  //console.log(valueChecker());
  if (!valueChecker()) return;

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

  let result = await getOrderID(params);

  console.log(result);
  emptyCart();

  window.location.href = `./confirmation.html?orderid=${result.orderId}`;
}
//requete l'API pour obtenir l'orderId
async function getOrderID(params) {
  let response = await fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(params),
  });

  let result = await response.json();
  return result;
}

//retire l'affichage des erreurs
function clearErrors() {
  document.getElementById("firstNameErrorMsg").textContent = "";

  document.getElementById("lastNameErrorMsg").textContent = "";

  document.getElementById("addressErrorMsg").textContent = "";

  document.getElementById("cityErrorMsg").textContent = "";

  document.getElementById("emailErrorMsg").textContent = "";
}

main();
