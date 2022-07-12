/**récupère l'orderid dans l'URL*/
function getUrlorderId() {
  let str = window.location.href;
  let url = new URL(str);
  let id = url.searchParams.get("orderid");
  return id;
}
/**fonction principale récupère le l'orderid puis le passe dans le HTML*/
function main() {
  document.getElementById("orderId").textContent = getUrlorderId();
}

main();
