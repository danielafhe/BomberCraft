function positionRandom() {
    return Math.random() * (areaJuego - (-areaJuego)) + -areaJuego;
}

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

function borrarArrayScena(arr) {
    arr.forEach(element => {
        scene.remove(element);
    });
}

/*
function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration) 
{	
	// note: texture passed by reference, will be updated by the update function.
		
	this.tilesHorizontal = tilesHoriz;
	this.tilesVertical = tilesVert;
	// how many images does this spritesheet contain?
	//  usually equals tilesHoriz * tilesVert, but not necessarily,
	//  if there at blank tiles at the bottom of the spritesheet. 
	this.numberOfTiles = numTiles;
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
	texture.repeat.set( 1 / this.tilesHorizontal, 1 / this.tilesVertical );

	// how long should each image be displayed?
	this.tileDisplayDuration = tileDispDuration;

	// how long has the current image been displayed?
	this.currentDisplayTime = 0;

	// which image is currently being displayed?
	this.currentTile = 0;
		
	this.update = function( milliSec )
	{
		this.currentDisplayTime += milliSec;
		while (this.currentDisplayTime > this.tileDisplayDuration)
		{
			this.currentDisplayTime -= this.tileDisplayDuration;
			this.currentTile++;
			if (this.currentTile == this.numberOfTiles)
				this.currentTile = 0;
			var currentColumn = this.currentTile % this.tilesHorizontal;
			texture.offset.x = currentColumn / this.tilesHorizontal;
			var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
			texture.offset.y = currentRow / this.tilesVertical;
		}
	};
}
*/

/*
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
*/