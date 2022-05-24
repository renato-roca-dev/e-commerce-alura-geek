var url = " ../pages/product.html";
const criaNovoProduto = (id, img, name, price, category) => {
    const novaDiv = document.createElement("div");
    novaDiv.className = "box"
    const divBox = `
            <div class="box-div-image">
                <a href="${url}#${id}"><img src="${img}" alt="Star-Wars Imagem de produto" class="box-image"></a>
                <div class="box-div-change-admin">
                    <button type="button" class="btn-product-change-infos" id="btn-change-product"><i id="${id}" class="fa-solid fa-pen"></i></button>
                    <button type="button" class="btn-product-delete" id="btn-product-delete"><i id="${id}" class="fa-solid fa-trash"></i></button>
                </div>
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

const boxContainerStarWars = document.getElementById("box-star-wars");
const boxContainerConsoles = document.getElementById("box-consoles");
const boxContainerVarious = document.getElementById("box-various");
const http = new XMLHttpRequest();
http.open("GET", "http://localhost:3000/products");
http.send();
http.onload = () => {
    const data = JSON.parse(http.response);
     data.forEach(product => {
        if(product.category == "Star Wars"){
            boxContainerStarWars.appendChild(criaNovoProduto(product.id, product.img, product.name, product.price, product.category));
        }
        if(product.category == "Consoles"){
            boxContainerConsoles.appendChild(criaNovoProduto(product.id, product.img, product.name, product.price, product.category));
        }
        if(product.category == "Diversos"){
            boxContainerVarious.appendChild(criaNovoProduto(product.id, product.img, product.name, product.price, product.category));
        }
    });
    if(http.status == 200 && localStorage.getItem("login", "true").includes("true")){
        var btnAdminChange = document.querySelectorAll(".box-div-change-admin")
        for(let i = 0; i < btnAdminChange.length; i++){
            btnAdminChange[i].style.display = "block"
            var btnDel = document.querySelectorAll(".btn-product-delete")
            btnDel[i].addEventListener("click", function(e){
                var delID = e.target.id
                let booleanConfirm = confirm("Tem certeza que quer deletar o produto de ID: " + delID + "?")
                if(booleanConfirm == true){
                    alert("Produto deletado!");
                    return fetch(`http://localhost:3000/products/${delID}`, {
                        method: "DELETE"
                    })
                } else{
                    alert("Você cancelou a opção de deletar o produto de ID: " + delID + "!");
                }
            })
            var btnEdit = document.querySelectorAll(".btn-product-change-infos")
            btnEdit[i].addEventListener("click", function(e){
                var editID = e.target.id
                let booleanConfirm = confirm("Tem certeza que quer editar o produto de ID: " + editID + "?")
                if(booleanConfirm == true){
                    location.assign(`/pages/editProduct.html#${editID}`)
                } else{
                    alert("Você cancelou a opção de editar o produto de ID: " + editID + "!");
                }
            })
        }
    }
}