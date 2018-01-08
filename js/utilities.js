function ajusteBomba(posicionNueva) {
    let posicion = [-3.15, 0, 9.08];
    posicion[0] += posicionNueva[0];
    posicion[1] += posicionNueva[1];
    posicion[2] += posicionNueva[2];

    return posicion;
}

function ajusteCubo() {

}

function newCubeBomb(posicionNueva) {
    let posicion = [-0.02, 0, 8];
    posicion[0] += posicionNueva[0];
    posicion[1] += posicionNueva[1];
    posicion[2] += posicionNueva[2];

    // Creamos un poligono
    var geometriaCubo = new THREE.CubeGeometry(
        1, // Dimensiones en eje X
        1, // Dimensiones en eje Y
        1 // Dimensiones en eje Z
    );
    // Creamos una apariencia (de lila claro)
    var aparienciaLila = new THREE.MeshLambertMaterial({
        color: 0x999FF // Color hexadecimal
    });
    // Generamos el polígino y le aplicamos la apariencia
    var cubo = new THREE.Mesh(geometriaCubo, aparienciaLila);
    //cubo.scale.set(0.42, 0.25, 0.20)
    cubo.scale.set(0.46, 0.30, 0.30);
    cubo.position.set(posicion[0], posicion[1], posicion[2]);
    //cubo.material.visible = false;

    return cubo;
}