let img = document.getElementById("image-product");
let imgDiv = document.getElementById("image-result");
let imgResult = document.getElementById("img-result-display")
let imgResultName = document.getElementById("img-result-name")
img.onchange = evt => {
    const [file] = img.files
        var reader = new FileReader();
        reader.onload = function(){
            imgResult.src = reader.result;
            imgResult.style.display = "block";
            imgResult.style.backgroundColor = "white";
            imgDiv.style.display = "block";
            imgResultName.innerHTML = file.name;
        };
        reader.readAsDataURL(evt.target.files[0]);
}

const http = new XMLHttpRequest();
http.open("GET", "http://localhost:3000/products");
http.send();
http.onload = () => {
    const data = JSON.parse(http.response);
     data.forEach(product => {
        idsBlock.push(product.id)
    });
    localStorage.setItem("idsUsed", idsBlock)
}

var url = "/product.html"
document.getElementById("btn-log-out").addEventListener("click", function(){
    localStorage.setItem("login", "false")
    window.location.assign("/index.html")
})

const criaProduto = (category, id, name, img, price, description) => {
    return fetch(`http://localhost:3000/products`, {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            category: category,
            id: id,
            name: name,
            img: img,
            price: price,
            description: description
        })
    })
    .then( resposta => {
        return resposta.body
    })
}

const productService = {
    criaProduto
}

const form = document.getElementById("btn-add-product-form")
form.addEventListener("click", (ex) => {
    ex.preventDefault()
    const img = document.getElementById("img-result-display")
    const name = document.getElementById("product-name")
    const category = document.getElementById("product-category")
    const price = document.getElementById("product-price")
    const id = document.getElementById("product-id")
    const description = document.getElementById("product-desc")
    var errorName,errorCategory,errorPrice,errorDesc = new Boolean();

    if(name.value == ""){
        alert("Por favor digite um nome de produto válido!");
        name.focus();
        errorName = true
    } else{
        errorName = false
    }
    if(category.value == "null"){
        alert("Por favor selecione uma categoria válida!");
        errorCategory = true
    } else{
        errorCategory = false
    }
    if(price.value == ""){
        alert("Por favor digite um preço válido para o produto!");
        price.focus();
        errorPrice = true
    } else{
        errorPrice = false
    }
        var error = new Boolean();
        var usedIds = localStorage.getItem("idsUsed")
    if(usedIds.includes(id.value)){
        alert("ID inválido! Por favor digite um ID diferente do que: " + usedIds);
        id.value = "";
        id.focus();
        error = true;
    } else{
        error = false;
    }
    if(description.value == ""){
        alert("Por favor digite uma descrição para o produto!");
        description.focus();
        errorDesc = true
    } else{
        errorDesc = false
    }
    if(error == false && errorName == false && errorCategory == false && errorPrice == false && errorDesc == false){
        productService.criaProduto(category.value, id.value, name.value, img.src, price.value, description.value)
        window.location.href = "/allProducts.html"
    }
})