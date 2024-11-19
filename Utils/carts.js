let response = [];
let users = [];

// descargar al localStorage todos los usuarios
async function allUsers() {
    try {
        let user = await fetch ('https://fakestoreapi.com/users')
        let data = await user.json();
        users = data;
        console.log(users)
        localStorage.setItem("UserList", JSON.stringify(users))
       
        showUsers();


   }catch(error) {
    console.log(error);
    alert(error);

   }
   
}
allUsers();

// todos los carritos
async function fakeStore() {
    try {
        let res = await fetch('https://fakestoreapi.com/carts')
        let data = await res.json();
        response = data;
        console.log(response);
        makeVisual()
      
    } catch (error) {
        console.log(error);
        alert(error);
    }

}
fakeStore();

function makeVisual() {

    let title = document.createElement("h1");
    let text = document.createTextNode("Carts");
    title.appendChild(text);

    let divGeneralContainer = document.createElement("div");
    divGeneralContainer.appendChild(title);

    let products = document.createElement("h2");
    products.classList.add("carts");
    products.innerHTML = "Users";
    divGeneralContainer.appendChild(products);

    let divContainerUsers = document.createElement("div");
    divContainerUsers.id = "usersContainer";

    divGeneralContainer.appendChild(divContainerUsers);


    document.body.appendChild(divGeneralContainer);



}


function showUsers(){
    let div = document.getElementById("usersContainer");
    let userList = JSON.parse(localStorage.getItem("UserList"));

    userList.forEach(user => {
        let userId = document.createElement("p");
        userId.textContent = `ID: ${user.id}`;
        
        let name = document.createElement("p");
        name.textContent = user.name[0];

        div.appendChild(userId);
        div.appendChildn(name);



    });

}
showUsers();