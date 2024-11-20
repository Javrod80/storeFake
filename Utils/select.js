let products = [];


function makeVisual() {

    let title = document.createElement("h1");
    let text = document.createTextNode("Elige un producto");
    title.appendChild(text);

     let divSelect = document.createElement("div");
     divSelect.id = "selectContainer";

    // crear un select
    let = selectProduct = document.createElement("select");
    selectProduct.id = "selectProduct";

    // Agregar una opción inicial
    let defaultOption = document.createElement("option");
    defaultOption.value = "0";
    defaultOption.textContent = "Selecciona un producto";
    defaultOption.selected = true;
    defaultOption.disabled = true;
    selectProduct.appendChild(defaultOption);





    divSelect.appendChild(selectProduct);

   

    
    let divGeneralContainer = document.createElement("div");
    divGeneralContainer.id = "generalContainer";
    divGeneralContainer.appendChild(title);
    divGeneralContainer.appendChild(divSelect);

    let productDisplayContainer = document.createElement("div");
    productDisplayContainer.id = "productDisplayContainer";

    divGeneralContainer.appendChild(productDisplayContainer);

    document.body.appendChild(divGeneralContainer);


    


}
makeVisual();

// descargar todos los productos
async function allProdcuts() {
    try {
        let product = await fetch('https://fakestoreapi.com/products');
        let data = await product.json();
        products = data;
        console.log(products);
        localStorage.setItem("ProductList", JSON.stringify(products))

       
        showProducts();
    } catch (error) {
        console.log(error);
        alert(error);

    }

}
allProdcuts();

// seleccionar productos
async function showProducts() { 

    

    let productList = JSON.parse(localStorage.getItem("ProductList"));
    let select = document.getElementById("selectProduct");

    productList.forEach(product => {
        let optionProduct = document.createElement("option");
        optionProduct.value = product.id;
        optionProduct.textContent = product.id;
        select.appendChild(optionProduct);
       
        
    });
       
    // Agregar evento para seleccionar producto
    select.addEventListener("change", async () => {
        let selectedValue = select.value;
        try {
            let res = await fetch(`https://fakestoreapi.com/products/${selectedValue}`);
            let data = await res.json();

            // Mostrar el producto seleccionado
            displayProduct(data);
        } catch (error) {
            console.log(error);
            alert(error);
        }
    });
}
    
// mostrar producto
function displayProduct(product) {
    let productDisplayContainer = document.getElementById("productDisplayContainer");

    // Limpiar contenido previo
    productDisplayContainer.innerHTML = "";

    // Crear elementos para mostrar el producto
    let title = document.createElement("h2");
    title.textContent = product.title;

    let description = document.createElement("p");
    description.textContent = product.description;

    let price = document.createElement("p");
    price.textContent = `Precio: $${product.price}`;

    let image = document.createElement("img");
    image.src = product.image;
    image.alt = product.title;
    image.style.maxWidth = "100%";
    image.style.height = "auto";

   
    
    // Agregar elementos al contenedor
    productDisplayContainer.appendChild(title);
    productDisplayContainer.appendChild(description);
    productDisplayContainer.appendChild(price);
    productDisplayContainer.appendChild(image);
    
}
    



