function mostrarPuntos() {
    cargarJson();
    usersJson.forEach(function (value, indice, array) {
        let div = "<div id='userID:'" + indice + "><div><p>Gamertag: </p><p>" + value.userName +
            "</p></div><br><div><p>Puntos: </p><p>" + value.points +
            "</p></div><br><div><p>Nombre: </p><p>" + value.lastName +
            "</p></div><br><div><p>Correo: </p><p>" + value.email +
            "</p></div><br><div><p>Skin: </p><p></p>" + value.skin +"</div><br></div>"
        $("#scores").append(div);
    })

}