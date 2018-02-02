function guardarUsuario() {
    let valido = false;
    let email = $("#inputEmail").val();

    if (!buscarEmail(email)) {
        usersJson.push({
            gamertag: $("#inputGamertag").val(),
            userName: $("#inputName").val(),
            lastName: $("#inputLastName").val(),
            email: $("#inputEmail").val(),
            pass: $("#inputPass").val(),
            skin: $("#seleccionarSkin").val(),
            points: 0,
            level: 0
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
        //document.cookie = "userId=" + encodeURIComponent(userId) + ";expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.daniafonso.github.io/BomberCraft";
        var expiresdate = new Date(2068, 1, 02, 11, 20);
        document.cookie = "userId=" + encodeURIComponent(userId) + "; expires=" + expiresdate.toUTCString() +"; domain=.daniafonso.github.io";
    } else {
        $("#errorFormLog").html('No coincide con ningún usuario.');
        valido = false;
    }
    return valido;
}

function elegirSkin() {
    let seleccion = $("#seleccionarSkin").val();
    $("#skinMin").attr("src", "recursos/skins/" + seleccion + "_min.png");
}