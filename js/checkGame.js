/**
 * @description Comprueba que el objeto no se encuentra cerca de ninguno de los
 * objetos principales del juego.
 * @param {b} Posiciones del objeto.
 * @param {d} Distancia minima a la que estar.
 */
function checkAll(b, d) {
    let c = false;
    if (checkPstPlayer(b, 7)) {
        c = true;
    } else if (checkPstTree(b, d))
        c = true;
    else if (checkPstDroid(b, 6))
        c = true;
    return c;
}

/**
 * @description Comprueba que el objeto no se encuentra cerca del personaje
 * @param {b} Posiciones del objeto.
 * @param {d} Distancia minima a la que estar.
 */
function checkPstPlayer(b, d) {
    let c = false;
    let a = [posicionSalidaPersonaje[0], posicionSalidaPersonaje[2]];
    if (estanCerca(a, b, d))
        c = true;
    return c;
}

/**
 * @description Comprueba que el objeto no se encuentra cerca del personaje
 * @param {b} Posiciones del objeto.
 * @param {d} Distancia minima a la que estar.
 */
function checkPstPlayerDelete(b, d) {
    let c = false;
    let a = [posicionPersonaje[0], posicionPersonaje[2]];

    if (estanCerca(a, b, d))
        c = true;
    return c;
}

/**
 * @description Comprueba que existe una distancia minima entre los arboles.
 * @param {b} Posiciones del adnroide.
 * @param {d} Distancia.
 */
function checkPstTree(b, d) {
    let c = false;
    for (var i in pstArboles) {
        let a = [pstArboles[i].position.x, pstArboles[i].position.z];
        if (estanCerca(a, b, d))
            c = true;
    }
    return c;
}

/**
 * @description Comprueba que existe una distancia minima entre los androides.
 * @param {b} Posiciones del adnroide.
 * @param {d} Distancia.
 */
function checkPstDroid(b, d) {
    let c = false;
    for (var i in pstAndroides) {
        let a = [pstAndroides[i].position.x, pstAndroides[i].position.z];
        if (estanCerca(a, b, d))
            c = true;
    }
    return c;
}

/**
 * @description Comprueba que el androide está en el radio de explosion de la bomba.
 * @param {b} Posiciones del adnroide.
 * @param {d} Distancia.
 */
function checkPstDroidDelete(b, d) {
    let c = false;
    for (var i in pstAndroides) {
        let a = [pstAndroides[i].position.x, pstAndroides[i].position.z];
        if (estanCerca(a, b, d)) {
            c = true;
            pstAndroides[i].visible = false;
        }
    }
    return c;
}