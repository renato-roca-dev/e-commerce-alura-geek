var btnAddProduct = document.getElementById("btn-add-product");
if(localStorage.getItem("login", "true").includes("true")){  
    console.log(window.location.pathname )
    document.getElementById("btn-login").setAttribute("href", "../pages/addProduct.html")
    document.getElementById("btn-login").innerHTML = "Menu adm.";
    if(window.location.pathname == "../pages/allProducts.html"){
        btnAddProduct.style.display = "block"
    }
}

function searchKey(){
    var searchBar = document.getElementById("header-search-input").value;
    var searchValue = searchBar.toUpperCase();
    let productsNames = document.querySelectorAll(".box-product-name")
    let allProducts = document.querySelectorAll(".box")
    for(i = 0; i < productsNames.length; i++){
        var text = productsNames[i];
        var textValue = text.innerHTML;
        var textValueUpper = textValue.toUpperCase();
        if(textValueUpper.indexOf(searchValue) > -1){
            allProducts[i].style.opacity = "10";
        } else{
            allProducts[i].style.opacity = "0.3";
        }
    }
}


var idsBlock = new Array();

let btnMobile = document.getElementById("btn-search")
let searchBarInput = document.getElementById("header-search-input")
let headerFlex = document.getElementById("headerNav");
var mobileSearchToggleWidth = 768;

function toggleClassListMobile(){
    searchBarInput.classList.toggle("show_mobile");
    headerFlex.classList.toggle("flex_mobile");
}

function toggleMobile(){
    var windowWidth = window.innerWidth;
    if (windowWidth <= mobileSearchToggleWidth) {
        btnMobile.addEventListener("click", toggleClassListMobile)
    } else{
        btnMobile.removeEventListener("click", toggleClassListMobile)
        searchBarInput.classList.remove("show_mobile");
        headerFlex.classList.remove("flex_mobile");
    }
}
window.onresize = toggleMobile;