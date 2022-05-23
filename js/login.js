document.getElementById("btn-submit").addEventListener("click", function(e){
    e.preventDefault();
    let admin = {
        email: "alurageek@admin.com",
        password: "alura123"
    }
    let email = document.getElementById("email")
    let password = document.getElementById("password")

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
      }

    if(email.value == "" || validateEmail(email.value) == false){
        alert("Por favor digite um e-mail válido!");
        email.focus()
    }
    if(password.value == ""){
        alert("Por favor digite uma senha válida!");
        password.value = ""
        password.focus()
    }

    if(email.value == admin.email && password.value == admin.password){
        localStorage.setItem("login", "true");
        window.location.assign("../pages/allProducts.html")
    } else{
        localStorage.setItem("login", "false");
    }
})