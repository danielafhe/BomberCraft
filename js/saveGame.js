let userIdRecuperado;

let gamertag;
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
    //If trampas o modo local
    if (userLevel == undefined)
        userLevel = 0;
    if (userPoints == undefined)
        userPoints = 0;
    precargarDatosUser();
}

function cargarUser() {
    usersJson.forEach(function (value, indice, array) {
        if (indice == userIdRecuperado) {
            gamertag = value.gamertag;
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
    });
    localStorage.setItem("usersJson", JSON.stringify(usersJson));
}

function precargarDatosUser() {
    $("#userGamertag").html(gamertag);
    $("#userLevel").html("Nivel: " + (userLevel + 1));
    $("#userPoints").html('Puntos: ' + userPoints);
}

function sumarPuntos(p) {
    userPoints += p;
    $("#userPoints").html('Puntos: ' + userPoints);
}

function actualizarCantidadAndroides() {
    $("#androids").html('Androides: ' + cntAndroides);
}