const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
//LOGAR NO SISTEMA
document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if(!account) {
        alert("Opss! Verifique o usuario ou a senha.");
        return;
    }

    saveSession(email, checkSession);

    window.location.href = "home.html";

});

//CRIAR CONTA
document.getElementById("create-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    if (email.length <5) {
        alert("Preencha o campo com uma email valido");
        return;
    }

    if (password.length <4) {
        alert("Preencha o campo com uma senha de no minimo 4 digitos");
        return;
    }

    saveAccount({
        Login: email,
        password: password,
        transactions: []
    })

    function checklogged() {
        if(session) {
            sessionStorage.setItem("logged", session);
            logged = session;
         }

         if(logged) {
            saveSession(logged, session)

            window.location.href = "home.html";
         }

    }
    
    myModal.hide();

    alert("Conta criada com sucesso");
});

function saveAccount (data) {
    localStorage.setItem(data.Login, JSON.stringify(data));
}

function saveSession(data, saveSession) {
    if(saveSession) {
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}

function getAccount(key) {
    const account = localStorage.getItem(key);

    if(account) {
        return JSON.parse(account);
    }

    return "";
}
    
