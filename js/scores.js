/**
 * @description Muestra las puntuaciones de todos los usuarios registrados anteriormente en el dispositivo
 * ordenadas de mayor a menor puntuación.
 */
function mostrarPuntos() {
    cargarJson();
    if (usersJson.length != 0) {
        let delay = 1500;
        usersJson.sort(function (a, b) {
            return parseFloat(b.points) - parseFloat(a.points);
        });
        usersJson.forEach(function (value, indice, array) {
            delay += 2000;
            let div = "<div class='user' style='display:none' id='userID:'" + indice + "><div>" +
                "<p>Gamertag: </p><p>" + value.gamertag +
                "</p></div><div><p>Nivel: </p><p>" + value.level +
                "</p></div><div><p>Puntos: </p><p>" + value.points +
                "</p></div><div><p>Nombre: </p><p>" + value.userName +
                "</p></div><div><p>Apellidos: </p><p>" + value.lastName +
                "</p></div><div><p>Correo: </p><p>" + value.email +
                "</p></div></div>"
            $("#scores").append(div);
            $(".user:hidden:first").fadeIn(delay);
        });
    } else {
        let div = "<p>No hay puntuaciones registradas.</p>";
        $("#scores").append(div);
    }
}