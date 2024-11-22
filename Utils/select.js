let products = [];
let cart = [];


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


    let button = document.createElement("button");
    button.id = "addButton";
    button.innerText = "Añadir producto";
    button.addEventListener("click", addToCart);
    divGeneralContainer.appendChild(button);


    divGeneralContainer.appendChild(productDisplayContainer);

    // Contenedor para el carrito
    let cartContainer = document.createElement("div");
    cartContainer.id = "cartContainer";

    let cartTitle = document.createElement("h2");
    cartTitle.textContent = "Carrito";
    cartTitle.classList.add("cart-title");
    cartContainer.appendChild(cartTitle);

    let cartList = document.createElement("ul");
    cartList.id = "cartList";
    cartContainer.appendChild(cartList);

    divGeneralContainer.appendChild(cartContainer);



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
    


function addToCart(){
    let select = document.getElementById("selectProduct");
    let selectedValue = select.value;

    if (selectedValue === "0") {
        alert("Por favor selecciona un producto válido.");
        return;
    }
    // Buscar el producto seleccionado
    let selectedProduct = products.find(product => product.id == selectedValue);

    if (selectedProduct) {
        cart.push(selectedProduct); // Agregar al carrito
        alert(`Producto añadido: ${selectedProduct.title}`);
        console.log(cart); // Ver el carrito en la consola
        updateCartDisplay(); // Actualizar el carrito en pantalla
    }
}

// Actualizar el carrito en pantalla
function updateCartDisplay() {
    let cartList = document.getElementById("cartList");

    // Limpiar el contenido previo
    cartList.innerHTML = "";

    cart.forEach((product, index) => {
        let listItem = document.createElement("li");
        let productName = document.createElement("span");
        productName.textContent = product.title;
        productName.classList.add("product-name");

        let productPrice = document.createElement("span");
        productPrice.textContent = ` - $${product.price}`;
        productPrice.classList.add("product-price");

        // Botón para eliminar un producto individual
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", () => {
            removeFromCart(index);
        });

        listItem.appendChild(productName);
        listItem.appendChild(productPrice);
        listItem.appendChild(deleteButton);
        cartList.appendChild(listItem);
    });

    // Mostrar el total
    let total = cart.reduce((sum, product) => sum + product.price, 0);
    let totalElement = document.createElement("p");
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
    totalElement.classList.add("cart-total");
    cartList.appendChild(totalElement);



    // Botón para limpiar todo el carrito
    if (cart.length > 0) {
        let clearButton = document.createElement("button");
        clearButton.textContent = "Vaciar carrito";
        clearButton.classList.add("clear-button");
        clearButton.addEventListener("click", clearCart);
        cartList.appendChild(clearButton);
    }
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
    cart.splice(index, 1); // Eliminar el producto del array
    updateCartDisplay(); // Actualizar la pantalla
}

// Función para vaciar todo el carrito
function clearCart() {
    cart = []; // Vaciar el array
    updateCartDisplay(); // Actualizar la pantalla
}


