/**
 * @description Json donde se guardan los datos recuperados de los usuarios.
 */
let usersJson;

/**
 * @description Entero que almacena el numero del usuario que está cargado en la cookie.
 */
let userId;

/**
 * Carga el Json de los usuarios registrados en el array @param userJson
 */
function cargarJson() {
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

/**
 * @description Comprueba si el email recibido por parametro se encuentra ya en el json.
 * @param {*} e Email introducido por el usuario.
 */
function buscarEmail(e) {
    let encontrado = false;
    usersJson.forEach(function (value, indice, array) {
        if (value.email == e)
            encontrado = true;
    })
    return encontrado;
}

/**
 * @description Comprueba que el usuario escrito en el formulario, corresponde con un usuario
 * en el json.
 * @param {*} e Email introducido.
 * @param {*} p Contraseña introducida.
 */
function buscarUsuario(e, p) {
    let encontrado = false;
    usersJson.forEach(function (value, indice, array) {
        if (value.email == e && value.pass == p) {
            encontrado = true;
            userId = indice;
        }
    })
    return encontrado;
}