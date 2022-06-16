import { getCart } from './cartManager.js';
function main() {
  const data = getCart();
  for (let i of data) {
    printcartitem(i);
  }
}

function printcartitem(product) {
  const { name, imageUrl, altTxt, price, _id, color, quantity } = product;

  document.getElementById(
    'cart__items'
  ).innerHTML = `<article class="cart__item" data-id="${_id}" data-color="${color}">
                <div class="cart__item__img">
                  <img src="${imageUrl}" alt="${altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${name}</h2>
                    <p>${color}</p>
                    <p>${price}</p>
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
