function makeVisual() {

    let title = document.createElement("input");
    title.setAttribute("type", "text");
    title.setAttribute("id", "title")
    let labelTitle = document.createElement("label");
    labelTitle.setAttribute("for", "title")
    labelTitle.textContent = "Título";
    labelTitle.appendChild(title);

    let price = document.createElement("input");
    price.setAttribute("type", "text");
    price.setAttribute("id", "price");
    let labelPrice = document.createElement("label");
    labelPrice.setAttribute("for", "price")
    labelPrice.textContent = "Precio";
    labelPrice.appendChild(price);




    let description = document.createElement("input");
    description.setAttribute("type", "text");
    description.setAttribute("id", "description")
    let labelDescription = document.createElement("label");
    labelDescription.setAttribute("for", "description");
    labelDescription.textContent = "Descripción";
    labelDescription.appendChild(description);


    let image = document.createElement("input");
    image.setAttribute("type", "text");
    image.setAttribute("id", "image")
    let imageLabel = document.createElement("label");
    imageLabel.setAttribute("for", "image");
    imageLabel.textContent = "Imagen";
    imageLabel.appendChild(image);




    let category = document.createElement("input");
    category.setAttribute("type", "text");
    category.setAttribute("id", "category");
    let categoryLabel = document.createElement("label");
    categoryLabel.setAttribute("for", "category");
    categoryLabel.textContent = "Categoría";
    categoryLabel.appendChild(category)

    let container = document.createElement("div");
    container.id = "container";


    let responseDiv = document.createElement("div");
    responseDiv.id = "response";


    let newButton = document.createElement("button");
    newButton.id = "button";
    newButton.textContent = "Crear Articulo";
    newButton.addEventListener ("click", newProduct);


    container.appendChild(labelTitle);
    container.appendChild(labelPrice);
    container.appendChild(labelDescription);
    container.appendChild(imageLabel);
    container.appendChild(categoryLabel);
    container.appendChild(newButton);
    container.appendChild(responseDiv);


    document.body.appendChild(container);



   


    
       

}
makeVisual();

async function newProduct() {
    let myTitle = document.getElementById("title").value;
    let myPrice = document.getElementById("price").value;
    let myDesscription = document.getElementById("description").value;
    let myImage = document.getElementById("image").value;
    let myCategory = document.getElementById("category").value;

    try {
             let response = await fetch('https://fakestoreapi.com/products',{
                method:"POST",
                body:JSON.stringify(
                    {
                        title: myTitle,
                        price: myPrice,
                        description: myDesscription,
                        image: myImage,
                        category: myCategory
                    }
                )
            });
        let data = await response.json();
        console.log(data);
        let result = document.getElementById("response");
        result.textContent = data;
        
    }catch(error) {
        console.log(error);
        result.textContent = "Fail";
    }



    
}

