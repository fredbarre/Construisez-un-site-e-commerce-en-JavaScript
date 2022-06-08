let headersList = {
 "Accept": "*/*"
}

function fetchapi() {
    

    return fetch("http://localhost:3000/api/products", {
        method: "GET",
        headers: headersList
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
    })
   
}


  function getvals(){
    return fetch("http://localhost:3000/api/products",
    {
    	method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((responseData) => {
      //console.log(responseData);
      return responseData;
    })
    .catch(error => console.warn(error));
  }
// getvals().then(response => console.log(response));
function main() {
    getvals().then(response =>
        loopItems(response.length)
    );
}
function loopItems(length) {
    

for (let i = 0; i < length; i++){
     getvals().then(response => 
    print1Item(response[i]._id, response[i].name, response[i].description, response[i].imageUrl, response[i].altText)
);
}
}


function print1Item_(){
    let hello=document.getElementById("items");
    hello.innerHTML =  "<a href=\"./product.html?id=42\"> <article> <img src=\"../images/kanap01.jpeg\" alt=\"Lorem ipsum dolor sit amet, Kanap name1\"> <h3 class=\"productName\">Kanap name1</h3><p class=\"productDescription\">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p></article></a> ";
}
function print1Item(id,name,description,imgurl,alttext){
    let hello=document.getElementById("items");
    hello.innerHTML = hello.innerHTML+ "<a href=\"./product.html?id="+id+"\"> <article> <img src=\""+imgurl+"\" alt=\""+alttext+"\"> <h3 class=\"productName\">"+name+"</h3><p class=\"productDescription\">"+description+"</p></article></a> ";
}

main();