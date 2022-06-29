//requete l'api pour obtenir tous les produits
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
//insertion du produit dans le HTML pour l'affichage
function print1Item(product) {
  const { _id, name, description, imageUrl, altTxt } = product;

  const a = document.createElement("a");
  a.href = `./product.html?id=${_id}`;
  const article = document.createElement("article");

  const img = document.createElement("img");
  img.src = imageUrl;
  img.alt = altTxt;

  const h3 = document.createElement("h3");
  h3.class = `"productName"`;
  h3.textContent = name;

  const p = document.createElement("p");
  p.class = `"productDescription"`;
  p.textContent = description;

  let itemsdoc = document.getElementById("items");

  article.appendChild(img);
  article.appendChild(h3);
  article.appendChild(p);

  a.appendChild(article);
  itemsdoc.appendChild(a);
}
//fonction pricipale récupére les produits avec getvals() et affiche chaque produit a l'aide d'une boucle avec print1Item()
async function main() {
  const products = await getvals();
  for (const product of products) {
    print1Item(product);
  }
}

main();
