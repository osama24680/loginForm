var emailInput = document.getElementById("emailInput")
var passwordInput = document.getElementById("passwordInput")
var loginBtn = document.getElementById("loginBtn")
var checkBtn = document.getElementById("checkBtn")
var wronginput = document.getElementById("wronginput")
var wrongLoginEmail = document.getElementById("wrongLoginEmail")
var wrongLoginPassword = document.getElementById("wrongLoginPassword")
var signupLink = document.getElementById("signupLink")
var welcomeName = document.getElementById("welcomeName")

var signName = document.getElementById("signName")
var signEmail = document.getElementById("signEmail")
var signPassword = document.getElementById("signPassword")
var wrongInput = document.getElementById("wrongInput")
var wrongEmail = document.getElementById("wrongEmail")
var wrongPassword = document.getElementById("wrongPassword")
var signinLink = document.getElementById("signinLink")

// ------------------------=====================signup page=====================---------------------------------
var allUsers;
if (localStorage.getItem("localUsers") == null) {
    allUsers = [];
} else {
    allUsers = JSON.parse(localStorage.getItem("localUsers"))
}

var signNameFound = 0;
var signEmailFound = 0;
var signPasswordFound = 0;

function addSignUp() {
    for (var i = 0; i < allUsers.length; i++) {
        if (signEmail.value == allUsers[i].signEmailData) {
            signEmailFound++;
        }
        if (signName.value == allUsers[i].signNameData) {
            signNameFound++;
        }
    }
    if (signName.value == "" || signEmail.value == "" || signPassword.value == "") {
        alert("please enter all fields")
    } else if (signEmailFound > 0 && signNameFound > 0) {
        wrongInput.innerHTML = "existed name and email"
    } else if (signEmailFound > 0) {
        wrongInput.innerHTML = "existed email"
    } else if (signNameFound > 0) {
        wrongInput.innerHTML = "this name has already taken"
    } else if (signEmail.value.includes("@") == false) {
        wrongEmail.innerHTML = "wrong email"
    } else if (validationPassword() == false) {
        wrongPassword.innerHTML = "password should be at least 7 letters or numbers"
    } else {
        wrongInput.innerHTML = ""
        wrongEmail.innerHTML = ""
        wrongPassword.innerHTML = ""
        var userSignData = {
            signNameData: signName.value,
            signEmailData: signEmail.value,
            signPasswordData: signPassword.value,
        }
        allUsers.push(userSignData)
        localStorage.setItem("localUsers", JSON.stringify(allUsers))
        clearSignupForm()
        signinLink.style.color = "#006BFF"
    }
    signEmailFound = 0;
    signNameFound = 0;
    signPasswordFound = 0;
}

function validationPassword() {
    var regex = /[a-z0-9]{7}/
    if (regex.test(signPassword.value)) {
        return true;
    } else {
        return false;
    }
}

// ------------------------=====================login page=====================---------------------------------

var loginEmailFound = 0;
var loginPasswordFound = 0;
var loginNameOfWelcome=JSON.parse(localStorage.getItem("welcomUser"))
function checkBtnLogin() {
    for (var i = 0; i < allUsers.length; i++) {
        if (emailInput.value == allUsers[i].signEmailData) {
            loginEmailFound++;
            localStorage.setItem("welcomUser",JSON.stringify(allUsers[i].signNameData))
            
        }
        if (passwordInput.value == allUsers[i].signPasswordData) {
            loginPasswordFound++;
        }

    }
    // 
    if (emailInput.value == "" && passwordInput.value == "") {
        alert("please enter email and password")
    } else if (emailInput.value == "") {
        alert("please enter email")
    } else if (passwordInput.value == "") {
        alert("please enter password")
    } else {
        if (loginEmailFound > 0 && loginPasswordFound > 0) { //email and password are found
            window.location.assign("welcome.html")
            
            
        } else if (loginPasswordFound == 0 && loginEmailFound > 0) { //only email is found
            wrongLoginPassword.innerHTML = "wrong password"
        } else if (loginPasswordFound > 0 && loginEmailFound == 0) { //only password is found
            wrongLoginEmail.innerHTML = "wrong Email"
        } else {
            wronginput.classList.replace("d-none", "d-flex")
            signupLink.style.color = "#006BFF"
        }
    }
    loginEmailFound = 0;
    loginPasswordFound = 0;
}
welcomeName.innerHTML=`welcome ${loginNameOfWelcome}`
console.log(loginNameOfWelcome)
function clearSignupForm() {
    signName.value = ""
    signEmail.value = ""
    signPassword.value = ""
}
