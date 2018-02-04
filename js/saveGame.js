/**
 * Variables globales con los atributos del usuario actual.
 */
let userIdRecuperado;
let gamertag;
let userSkin;
let userPoints;
let userLevel;

/**
 * @description Recupera una cookie que se le envíe como parámetro.
 * @param {*} name nombre de la cookie a recuperar.
 */
function readCookie(name) {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + name.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
}

/**
 * @description Carga el usuario que se haya logueado por ultima vez en el juego.
 */
function cargarUsuario() {
    var miCookie = readCookie("userId");
    //let id = miCookie.slice(6, 7);
    userIdRecuperado = miCookie;
    cargarJson();
    cargarUser();
    //If trampas o modo local
    if (userLevel == undefined)
        userLevel = 1;
    if (userPoints == undefined)
        userPoints = 0;
    if (userSkin == undefined)
        userSkin = "recursos/skins/papa_noel.png";
    updateScore();
}

/**
 * @description Carga los datos del usuario actual en las variables globales.
 */
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

/**
 * @description Actualiza el usuario con sus ultimas azañas en el juego.
 */
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

/**
 * @description Actualiza el div de puntuacion con los datos actualizados del usuario.
 */
function updateScore() {
    $("#userGamertag").html(gamertag);
    $("#userLevel").html("Nivel: " + userLevel);
    $("#userPoints").html('Puntos: ' + userPoints);
    $("#androids").html('Androides: ' + cntAndroides);
}