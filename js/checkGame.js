function checkDistJusta(b, d) {
    let c = false;
    if (checkPstDroid(b, d))
        c = true;
    return c;
}

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

function checkPstPlayer(b, d) {
    let c = false;
    let a = [posicionSalidaPersonaje[0], posicionSalidaPersonaje[2]];
    if (estanCerca(a, b, d))
        c = true;
    return c;
}

function checkPstPlayerDelete(b, d) {
    let c = false;
    let a = [posicionPersonaje[0], posicionPersonaje[2]];

    if (estanCerca(a, b, d))
        c = true;
    return c;
}

function checkPstTree(b, d) {
    let c = false;
    for (var i in pstArboles) {
        let a = [pstArboles[i].position.x, pstArboles[i].position.z];
        if (estanCerca(a, b, d))
            c = true;
    }
    return c;
}

function checkPstDroid(b, d) {
    let c = false;
    for (var i in pstAndroides) {
        let a = [pstAndroides[i].position.x, pstAndroides[i].position.z];
        if (estanCerca(a, b, d))
            c = true;
    }
    return c;
}

function checkPstDroidDelete(b, d) {
    console.log(cogido);
    let c = false;
    for (var i in pstAndroides) {
        let a = [pstAndroides[i].position.x, pstAndroides[i].position.z];
        if (estanCerca(a, b, d)) {
            c = true;
            pstAndroides[i].visible = false;
            //console.log(a);
            //console.log(b);
            //console.log(posicionPersonaje);
        }
    }
    return c;
}