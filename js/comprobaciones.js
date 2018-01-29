let usersJson;
let userId;

let user = {
    name: "",
    lastName: "",
    email: "",
    pass: "",
    skin: "",
    puntos: ""
}

function guardarUsuario() {
    let valido = false;
    let email = $("#inputEmail").val();

    if (!buscarEmail(email)) {
        usersJson.push({
            nombre: $("#inputName").val(),
            lastName: $("#inputLastName").val(),
            email: $("#inputEmail").val(),
            pass: $("#inputPass").val(),
            skin: $("#seleccionarSkin").val()
        })

        localStorage.setItem("usersJson", JSON.stringify(usersJson));
        valido = true;
        $("#errorFormReg").html('');
    } else {
        console.log("Lo cambia");
        $("#errorFormReg").html('Ya hay un usuario registrado con ese correo.');
        valido = false;
    }
    return valido;
}

function loguearse() {
    let valido = false;
    let email = $("#inputLogEmail").val();
    let pass = $("#inputLogPass").val();

    if (buscarUsuario(email, pass)) {
        valido = true;
        //document.cookie = "email=" + encodeURIComponent(email);
        document.cookie = "userId=" + encodeURIComponent(userId)+"; domain=daniafonso.github.io/BomberCraft/play.html";
    } else {
        $("#errorFormLog").html('No coincide con ningún usuario.');
        valido = false;
    }
    return valido;
}

function cargar() {
    let local;

    local = localStorage.getItem("usersJson");
    if (local != null) {
        usersJson = JSON.parse(local);
        //console.log(local);
        usersJson.forEach(function (value, indice, array) {
            //console.log(value.email);
        })
    } else {
        usersJson = [];
    }
}

function buscarEmail(e) {
    let encontrado = false;
    usersJson.forEach(function (value, indice, array) {
        if (value.email == e)
            encontrado = true;
    })
    return encontrado;
}

function buscarUsuario(e, p) {
    let encontrado = false;
    usersJson.forEach(function (value, indice, array) {
        if (value.email == e && value.pass == p) {
            encontrado = true;
            userId = vale;
        }
    })
    return encontrado;
}

function elegirSkin() {
    let seleccion = $("#seleccionarSkin").val();
    $("#skinMin").attr("src", "recursos/skins/" + seleccion + "_min.png");
}