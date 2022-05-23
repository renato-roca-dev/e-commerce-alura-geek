const urlHash = window.location.hash
const url = urlHash.replace("#", "")

var nameInput = document.getElementById("product-name")
var categoryOption = document.getElementById("product-category")
var priceInput = document.getElementById("product-price")
var idInput = document.getElementById("product-id")
var descriptionInput = document.getElementById("product-desc")

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
http.open("GET", `http://localhost:3000/products/${url}`);
http.send()
http.onload = () => {
    const data = JSON.parse(http.response);
    imgResult.src = data.img
    imgResult.style.display = "block";
    imgResult.style.backgroundColor = "white";
    nameInput.value = data.name
    categoryOption.value = data.category
    priceInput.value = data.price
    idInput.value = data.id
    descriptionInput.value = data.description
}

const atualizaProduto = (img, name, category, price, id, description) => {
    return fetch(`http://localhost:3000/products/${url}`, {
        method: "PUT",
        headers: {
            "Content-type" : "application/json"
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
    .then(resposta => {
        return resposta.json()
    })
}

document.getElementById("btn-edit-product-form").addEventListener("click", function(e){
    e.preventDefault()
    var errorName,errorCategory,errorPrice,errorDesc = new Boolean();
    if(nameInput.value == ""){
        alert("Por favor digite um nome de produto válido!");
        nameInput.focus();
        errorName = true
    } else{
        errorName = false
    }
    if(categoryOption.value == "null"){
        alert("Por favor selecione uma categoria válida!");
        errorCategory = true
    } else{
        errorCategory = false
    }
    if(priceInput.value == ""){
        alert("Por favor digite um preço válido para o produto!");
        priceInput.focus();
        errorPrice = true
    } else{
        errorPrice = false
    }
    if(descriptionInput.value == ""){
        alert("Por favor digite uma descrição para o produto!");
        descriptionInput.focus();
        errorDesc = true
    } else{
        errorDesc = false
    }
    if(errorName == false && errorCategory == false && errorPrice == false && errorDesc == false){
        atualizaProduto(imgResult.src, nameInput.value, categoryOption.value, priceInput.value, idInput.value, descriptionInput.value)
        window.location.href = "/allProducts.html"
    }
})

document.getElementById("btn-cancel-edit-product").addEventListener("click", function(e){
    e.preventDefault();
    location.assign("/allProducts.html")
})