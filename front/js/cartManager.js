//mise en place du panier
export function setCart(json) {
  localStorage.setItem("cart", JSON.stringify(json || []));
}
//récupére le panier
export function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

//ajout au panier du produit
export function addToCart(data) {
  const cart = getCart();
  if (data.color === "") return;
  if (data.quantity === 0) return;
  let item = cart.find(
    (item) => item.id === data.id && item.color === data.color
  );
  //console.log(item);
  if (!item) {
    item = data;
    let added = false;
    for (let i = 0; i < cart.length; i++) {
      //console.log(cart[i]._id);
      //console.log(data._id);
      if (cart[i]._id === data._id) {
        cart.splice(i, 0, item);
        added = true;
        break;
      }
    }
    item = data;
    if (added == false) cart.push(item);
  } else item.quantity += data.quantity;
  setCart(cart);
  alert("Produit ajouté");
}

//retire le produit dans le panier (stockage local) a l'indice i
export function removeFromCart(i) {
  const cart = getCart();

  cart.splice(i, 1);
  setCart(cart);
}
//change la quantité du produit dans le panier (stockage local) a l'indice i
export function quantityChangeFromCart(i, quantity) {
  const cart = getCart();

  cart[i].quantity = +quantity;
  setCart(cart);
}
