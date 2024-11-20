

  

   
  





async function fechtUsers(event) {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    console.log(username)
    event.preventDefault();
    try {
        let response = await fetch('https://fakestoreapi.com/auth/login', {
            method: 'POST',
            // determinar que tipos de datos envía 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        });

        let data = await response.json();
        console.log(data);

        let responseDiv = document.getElementById("response");
        responseDiv.textContent = data.token
    } catch (error) {
        console.error(error);
        document.getElementById("response").textContent = "Login failed.";

    }


}

fechtUsers();


/*
 username: "mor_2314",
                password: "83r5^_"

*/



