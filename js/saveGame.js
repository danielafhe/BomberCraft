let userIdRecuperado;

let userName;
let userSkin;
let userPoints;
let userLevel;

function readCookie(name) {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + name.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
}

function cargarUsuario() {
    var miCookie = readCookie("userId");
    //let id = miCookie.slice(6, 7);
    userIdRecuperado = miCookie;
    cargarJson();
    cargarUser();
    precargarDatosUser();
}

function cargarUser() {
    usersJson.forEach(function (value, indice, array) {
        if (indice == userIdRecuperado) {
            userName = value.userName;
            userSkin = "recursos/skins/" + value.skin + ".png";
            userPoints = value.points;
            userLevel = value.level;
        }
    })
}

function actualizarUser() {
    usersJson.forEach(function (value, indice, array) {
        if (indice == userIdRecuperado) {
            //userSkin = "recursos/skins/" + value.skin + ".png";
            value.points = userPoints;
            value.level = userLevel;
        }
    })
}

function precargarDatosUser() {
    $("#userName").html(userName);
    $("#userLevel").html("Puntos: " + userLevel);
    $("#userPoints").html('Puntos: ' + userPoints);
}

function sumarPuntos(p) {
    userPoints += p;
    $("#userPoints").html('Puntos: ' + userPoints);
}

function actualizarCantidadAndroides(){
    $("#androids").html('Androides: ' + cntAndroides);
}