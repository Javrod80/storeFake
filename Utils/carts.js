let response = [];
let users = [];


// descargar al localStorage todos los usuarios
async function allUsers() {
    try {
        let user = await fetch('https://fakestoreapi.com/users')
        let data = await user.json();
        users = data;
        console.log(users)
        localStorage.setItem("UserList", JSON.stringify(users))

        makeVisual();
        showUsers();


    } catch (error) {
        console.log(error);
        alert(error);

    }

}


// todos los carritos
async function fakeStore() {
    try {
        let res = await fetch('https://fakestoreapi.com/carts')
        let data = await res.json();
        response = data;
        console.log(response);
       
        showCarts();

    } catch (error) {
        console.log(error);
        alert(error);
    }

}

function makeVisual() {

    // Verificar si el contenedor general ya existe
    if (document.getElementById("generalContainer")) {
        return; // Si ya existe, no hacemos nada
    }

    let divGeneralContainer = document.createElement("div");
    divGeneralContainer.id = "generalContainer";

    let title = document.createElement("h1");
   title.textContent="Users and Carts";
    divGeneralContainer.appendChild(title);
    
    

    let usersTitle = document.createElement("h2");
    usersTitle.classList.add("carts");
    usersTitle.textContent = "Users";
    divGeneralContainer.appendChild(usersTitle);

    let divContainerUsers = document.createElement("div");
    divContainerUsers.id = "usersContainer";
    divGeneralContainer.appendChild(divContainerUsers);

    let cartsTitle = document.createElement("h2");
    cartsTitle.textContent = "Carts";
    divGeneralContainer.appendChild(cartsTitle);

    let divContainerCarts = document.createElement("div");
    divContainerCarts.id = "cartsContainer";
    divGeneralContainer.appendChild(divContainerCarts);

    
    document.body.appendChild(divGeneralContainer);



}

// mostrar usuarios
function showUsers() {
    let div = document.getElementById("usersContainer");
    let userList = JSON.parse(localStorage.getItem("UserList"));

    userList.forEach(user => {
        let userId = document.createElement("p");
        userId.textContent = `ID: ${user.id}`;

        let name = document.createElement("p");
        name.textContent = `Nombre: ${user.name.firstname} ${user.name.lastname} `;

        let username = document.createElement("p");
        username.textContent = `Username: ${user.username}`;

        let city = document.createElement("p");
        city.textContent = `City: ${user.address.city} `;

        let phone = document.createElement("p");
        phone.textContent = `Phone: ${user.phone}`


        div.appendChild(userId);
        div.appendChild(name);
        div.appendChild(username);
        div.appendChild(city);
        div.appendChild(phone);



    });

}


function showCarts() {
    let div = document.getElementById("cartsContainer");

    response.forEach(cart => {

        let userId = document.createElement("p");
        userId.textContent = `ID: ${cart.id}`;

        let date = document.createElement("p");
        date.textContent = `Date: ${new Date(cart.date).toLocaleDateString()}`;
        //`Date: ${new Date(cart.date).toDateString()}`;
        
        let productTitle = document.createElement("h3");
        productTitle.textContent = "Product";
       
        div.appendChild(userId);
        div.appendChild(date);
        div.appendChild(productTitle);
        
        // recorrer el array de productos
        cart.products.forEach(product => {
        let productInfo = document.createElement("p");
        productInfo.textContent = `Product ID: ${product.productId} , Quantity: ${product.quantity}`;



       
        div.appendChild(productInfo);

        });
        // separador lineal
        let separator = document.createElement("hr");
        div.appendChild(separator);
    });
}
makeVisual();
allUsers();
fakeStore();