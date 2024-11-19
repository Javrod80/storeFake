
let response = [];


async function fakeStore() {
    try {
        let res = await fetch('https://fakestoreapi.com/products/category/electronics')
        let data = await res.json();
        response = data;
       // console.log(response);
        showProducts(response);
    } catch (error) {
        console.log(error);
        alert(error);
    }
    
}

fakeStore()

function makeVisual() {

    let title = document.createElement("h1");
    let text = document.createTextNode("Electronics");
    title.appendChild(text);

    let divGeneralContainer = document.createElement("div");
    divGeneralContainer.appendChild(title);
   
    let products = document.createElement("h2");
    products.classList.add("products");
    products.innerHTML = "Products";
    divGeneralContainer.appendChild(products);

    let divContainerProduct = document.createElement("div");
   

    document.body.appendChild(divGeneralContainer);
   
    createProductsElement(divContainerProduct)
    
    
}
makeVisual();


function showProducts(response){

response.forEach(element => {
    createProductsElement(element);
 console.log(element);

});
}



function createProductsElement(product) {
    let divProduct = document.createElement("div");
    let title = document.createElement("h3");
    title.innerHTML = product.title;
    let img = document.createElement("img");
    img.src = product.image;
    let description = document.createElement("p");
    description.innerHTML = product.description;
    let price = document.createElement("p");
    price.innerHTML = product.price;
    let rating = document.createElement("p");
  //  rating.innerHTML = product.rating.rate;
    divProduct.appendChild(img);
    divProduct.appendChild(title);
    divProduct.appendChild(description);
    divProduct.appendChild(price);
  //  divProduct.appendChild(rating);
    return divProduct;
}