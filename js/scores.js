function mostrarPuntos() {
    cargarJson();
    usersJson.forEach(function (value, indice, array) {
        let div = "<div id='userID:'" + indice + "><div><p>Gamertag: </p><p>" + value.userName +
            "</p></div><div><p>Puntos: </p><p>" + value.points +
            "</p></div><div><p>Nombre: </p><p>" + value.lastName +
            "</p></div><div><p>Correo: </p><p>" + value.email +
            "</p></div></div>"
        $("#scores").append(div);
    })

}