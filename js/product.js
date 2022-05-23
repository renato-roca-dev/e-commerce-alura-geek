const produtoSelecionado = (img, name, price, description, category) => {
    const novaDiv = document.createElement("div");
    novaDiv.id = "product-display"
    novaDiv.className = "flex";
    const divBox = `
        <img src="${img}" id="product-display-image">
        <div id="product-display-texts" class="flex">
            <h1 id="product-display-name">${name}</h1>
            <p id="product-display-price">R$${Number(price).toFixed(2)}</p>
            <p id="product-display-description">${description}</p>
            <!--<p>${category}</> -->
        </div>`
        novaDiv.innerHTML = divBox
        return novaDiv;
}

var url = "/pages/product.html"
const criaNovoProduto = (id, img, name, price, category) => {
    const novaDiv = document.createElement("div");
    novaDiv.className = "box"
    const divBox = `
            <div class="box-div-image">
                <a href="${url}#${id}"><img src="${img}" class="box-image"></a>
            </div>
            <div class="box-div-texts">
                <p class="box-product-name">${name}</p>
                <p class="box-price">R$${Number(price).toFixed(2)}</p>
                <a href="${url}#${id}" class="box-product-anchor">Ver produto</a>
                <!--${category}-->
            </div>`;
        novaDiv.innerHTML = divBox;
        return novaDiv;
}

const boxContainer = document.getElementById("container-products");
var urlCheck = window.location.hash
const productSelected = document.getElementById("main-product");

window.addEventListener("hashchange", function(){
    this.location.reload();
})

const listaProdutos = () => {
    const promise = new Promise((resolve, reject) => {
        const http = new XMLHttpRequest();
        http.open("GET", "http://localhost:3000/products");
        http.onload = () => {
            const data = JSON.parse(http.response)
            if(http.status >= 400){
                reject(JSON.parse(http.response))
            } else {
                resolve(JSON.parse(http.response))
            }
        }
            http.send();
    })
    return promise;
}
listaProdutos()
.then(data => {
    data.forEach(product => {
        var productId = "#" + product.id
        var checkProductIncludes = productId.includes(urlCheck)
        var checkProductReg = new RegExp('(?:^|\\s)'+ productId, 'i').test(urlCheck);
        if(checkProductIncludes == true && checkProductReg == true){
            productSelected.appendChild(produtoSelecionado(product.img, product.name, product.price, product.description, product.category)) 
        }
    });
    var checkDiv = productSelected.innerHTML
    data.forEach(mainProduct => {
        if(mainProduct.category == "Star Wars" && checkDiv.includes("Star Wars")){
            boxContainer.appendChild(criaNovoProduto(mainProduct.id, mainProduct.img, mainProduct.name, mainProduct.price, mainProduct.category));
        }
        if(mainProduct.category == "Consoles" && checkDiv.includes("Consoles")){
            boxContainer.appendChild(criaNovoProduto(mainProduct.id, mainProduct.img, mainProduct.name, mainProduct.price, mainProduct.category));
        }
        if(mainProduct.category == "Diversos" && checkDiv.includes("Diversos")){
            boxContainer.appendChild(criaNovoProduto(mainProduct.id, mainProduct.img, mainProduct.name, mainProduct.price, mainProduct.category));
        }
    })
});