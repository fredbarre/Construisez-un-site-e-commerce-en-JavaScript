for (let i = 0; i < localStorage.length; i++) {
  let id = localStorage.key(i);
  let color = localStorage[id][0];
  let number = localStorage[id][1];
}

function printcartitem(product, id, color, number) {
  const { name, imageUrl, altTxt, price } = product;

  document.getElementById("cart__items")=`<article class="cart__item" data-id="${id}" data-color="${color}">
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
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${number}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
}
