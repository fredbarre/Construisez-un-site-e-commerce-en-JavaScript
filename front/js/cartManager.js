export function setCart(json) {
  localStorage.setItem("cart", JSON.stringify(json || []));
}
export function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}
export function addToCart(data) {
  const cart = getCart();

  if (data.quantity === 0) return;
  let item = cart.find(
    (item) => item.id === data.id && item.color === data.color
  );
  if (!item) {
    item = data;
    cart.push(item);
  } else item.quantity += data.quantity;
  setCart(cart);
}

export function removeFromCart(i) {
  const cart = getCart();

  cart.splice(i, 1);
  setCart(cart);
}

export function quantityChangeFromCart(i, quantity) {
  const cart = getCart();

  cart[i].quantity = +quantity;
  setCart(cart);
}
