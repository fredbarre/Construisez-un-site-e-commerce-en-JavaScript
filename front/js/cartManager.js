export function setCart(json) {
  localStorage.setItem('cart', JSON.stringify(json || []));
}
export function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];

  const newLocal = JSON.parse(localStorage.getItem('cart'));
  if (newLocal === null) newLocal = [];
  return newLocal;
}
export function addToCart(data) {
  const cart = getCart();
  if (data.quantity === 0) return;
  let item = cart.find(item => item.id === data.id && item.color === data.color);
  if (!item) {
    item = data;
    cart.push(item);
  } else item.quantity += data.quantity;
  setCart(cart);
}
