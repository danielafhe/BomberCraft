/**
 * @description Comprueba que el correo no existe previamente y si es correcto, guarda el usuario
 * en localstorage.
 */
function guardarUsuario() {
    let valido = false;
    let email = $("#inputEmail").val();

    if (!buscarEmail(email)) {
        let skinElegido = $("#seleccionarSkin").val();
        if (skinElegido == "random") {
            skinElegido = "random/" + numRandom();
        }
        usersJson.push({
            gamertag: $("#inputGamertag").val(),
            userName: $("#inputName").val(),
            lastName: $("#inputLastName").val(),
            email: $("#inputEmail").val(),
            pass: $("#inputPass").val(),
            skin: skinElegido,
            points: 0,
            level: 1
        })

        localStorage.setItem("usersJson", JSON.stringify(usersJson));
        valido = true;
        $("#errorFormReg").html('Te has registrado correctamente.');
        mostarAvisoReg();
    } else {
        console.log("Lo cambia");
        $("#errorFormReg").html('Ya hay un usuario registrado con ese correo.');
        mostarAvisoReg();
        valido = false;
    }
    return valido;
}

function mostarAvisoReg() {
    $("#errorFormReg").fadeIn(1600, "linear", complete);
}

function ocultarAvisoReg() {
    $("#errorFormReg").fadeOut(1600, "linear", complete);
}

function mostarAvisoLog() {
    $("#errorFormLog").fadeIn(1600, "linear", complete);
}

function ocultarAvisoLog() {
    $("#errorFormLog").fadeOut(1600, "linear", complete);
}

/**
 * @description Comprueba que el usuario y contraseña escrito por el usuario corresponde
 * a un usuario registrado previamente y crea una cookie con estos datos.
 */
function loguearse() {
    let valido = false;
    let email = $("#inputLogEmail").val();
    let pass = $("#inputLogPass").val();

    if (buscarUsuario(email, pass)) {
        valido = true;
        //document.cookie = "userId=" + encodeURIComponent(userId) + ";expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.daniafonso.github.io/BomberCraft";
        var expiresdate = new Date(2068, 1, 02, 11, 20);
        document.cookie = "userId=" + encodeURIComponent(userId) + "; expires=" + expiresdate.toUTCString() + "; domain=.daniafonso.github.io";
    } else {
        $("#errorFormLog").html('No coincide con ningún usuario.');
        mostarAvisoLog();
        valido = false;
    }
    return valido;
}

/**
 * @description Muestra una miniatura en la web del skin que el usuario a elegido.
 */
function elegirSkin() {
    let seleccion = $("#seleccionarSkin").val();
    $("#skinMin").attr("src", "recursos/skins/" + seleccion + "_min.png");
}