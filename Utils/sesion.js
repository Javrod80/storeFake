 /*
 function loginUsers() {

    
    fetch('https://fakestoreapi.com/auth/login',{
        method:'POST',
        body:JSON.stringify({
            username: "mor_2314",
            password: "83r5^_"
        })
    })
        .then(res=>res.json())
        .then(json=>console.log(json))

    
}
loginUsers();
*/



document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evitar que la página se recargue al enviar el formulario

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch('https://fakestoreapi.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const data = await response.json();
        console.log(data); // Mostrar la respuesta en la consola

        // Mostrar el token o mensaje en la página
        const responseDiv = document.getElementById("response");
        responseDiv.textContent = data.token
            ? `Token: ${data.token}`
            : `Error: ${data}`;
    } catch (error) {
        console.error(error);
        document.getElementById("response").textContent = "Login failed. Please try again.";
    }
});
