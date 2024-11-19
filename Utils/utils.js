
let response = [];

// productos de electronica
async function fakeStore() {
    try {
        let res = await fetch('https://fakestoreapi.com/products/category/electronics')
        let data = await res.json();
        response = data;
        console.log(response);
        makeVisual()
        showProducts();
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
    divContainerProduct.id = "productContainer";
    divGeneralContainer.appendChild(divContainerProduct);


    document.body.appendChild(divGeneralContainer);



}

// visualizar productos

function showProducts() {
    let divContainerProduct = document.getElementById("productContainer")

    response.forEach(product  => {

        let divProduct = document.createElement("div");
        let title = document.createElement("h3");
        title.innerText = product.title;
        let img = document.createElement("img");
        img.src = product.image;
        img.height = 100;
        img.width = 100;
        let description = document.createElement("p");
        description.innerHTML = product.description;
        let price = document.createElement("p");
        price.innerText = `Price: ${product.price}`;
        let rating = document.createElement("p");
        rating.innerText = `Rating: ${product.rating.rate}`;
        divProduct.appendChild(img);
        divProduct.appendChild(title);
        divProduct.appendChild(description);
        divProduct.appendChild(price);
        divProduct.appendChild(rating);
        divContainerProduct.appendChild(divProduct)
        console.log(product);

    });
}



