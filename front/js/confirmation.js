function getUrlorderId() {
  let str = window.location.href;
  let url = new URL(str);
  let id = url.searchParams.get("orderid");
  return id;
}

function main() {
  document.getElementById("orderId").textContent = getUrlorderId();
}

main();
