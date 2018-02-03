/**
 * @description Genera una posicion random en el area de juego disponible.
 * @returns Posicion.
 */
function positionRandom() {
	return Math.random() * (areaJuego - (-areaJuego)) + -areaJuego;
}

/**
 * @description Genera un número random entre 0 y 15.
 * @returns Numero.
 */
function numRandom(){
	return Math.floor(Math.random() * 15) + 1;
}

/**
 * @description Comprueba que dos posiciones de x y z esten a una determinada distancia.
 * @param {*} a Coordenada X.
 * @param {*} b Coordenada Z.
 * @param {*} d Distancia a comprobar.
 * @returns Si está o no dentro de la distancia enviada.
 */
function estanCerca(a, b, d) {
	let c = false;

	r0 = a[0] - b[0];
	r1 = a[1] - b[1];
	if (Math.abs(r0) < d && Math.abs(r1) < d) {
		c = true;
	}
	//console.log("R0: " + r0 + " // R1: " + r1);
	return c;
}

/**
 * @description Borra todos los elementos del array en la scena de juego.
 * @param {*} arr Array que contiene los elementos a borrar.
 */
function borrarArrayScena(arr) {
	arr.forEach(element => {
		scene.remove(element);
	});
}