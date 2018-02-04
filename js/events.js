var milisec = 0;
var seconds = 0;

let bombaPrincipal;
let batman;
let posicionBombaInicial = [0, 0, 0];
let posicionSalidaPersonaje = [-1, 0, 3];

let posicionPersonaje;
let cntAndroides;
let cntArboles;

let pstAndroides = [];
let pstArboles = [];

let areaJuego = 65;
let sePuedeCoger = true;
let atacando = false;

let sndExplosion;

/**
 * @description Suelta la bomba en el suelo e inicia el proceso de explotar.
 */
function soltarBomba() {
    sePuedeCoger = false;
    bombaPrincipal.position.set(posicionPersonaje[0], 0, posicionPersonaje[2]);
    bombaPrincipal.rotation.set(0, 0, 0);
    bombaPrincipal.rotation.x = -1.6;

    let ocurrido = 0;
    let puntosSumar = 25;
    let tiempoMuerteEstimado = 30;
    sndExplosion = new Audio("recursos/sounds/explosion_1.wav");

    setTimeout(function () {
        let ps = [bombaPrincipal.position.x, bombaPrincipal.position.z];
        if (checkPstPlayerDelete(ps, 2)) {
            sndExplosion = new Audio("recursos/sounds/explosion_0.wav");
            cambiarNivel(userLevel);
            ocurrido = 1;
        } else if (checkPstDroidDelete(ps, 2)) {
            if (seconds < tiempoMuerteEstimado)
                puntosSumar += (tiempoMuerteEstimado - seconds);
            userPoints += puntosSumar;
            cntAndroides--;
            ocurrido = 2;
            sndExplosion = new Audio("recursos/sounds/explosion_0.wav");
            if (cntAndroides <= 0) {
                userLevel++;
                actualizarUser();
                cambiarNivel(userLevel);
                ocurrido = 3;
            }
        }
        updateScore();
        explotarBomba();
        elegirMensaje(ocurrido);
    }, 3000);
}

/**
 * @description Permite reiniciar la bomba en el centro.
 */
function reiniciarbomba() {
    bombaPrincipal.position.set(posicionBombaInicial[0], posicionBombaInicial[1], posicionBombaInicial[2]);
    bombaPrincipal.rotation.set(0, 0, 0);
    bombaPrincipal.rotation.x = -1.6;
    cogido = false;
    sePuedeCoger = true;
    stopShowSec();
    seconds = 0;
}

/**
 * @description Explota la bomba y la posiciona en el centro.
 */
function explotarBomba() {
    bombaPrincipal.position.set(posicionBombaInicial[0], posicionBombaInicial[1], posicionBombaInicial[2]);
    seconds = 0;
    sePuedeCoger = true;
    $("#time").html("Segundos: " + seconds);
    sndExplosion.play();
}

/**
 * @description Cambia los objetos del juego por los del nivel seleccionado.
 * @param {*} n Nivel que se va a ejecutar.
 */
function cambiarNivel(n) {
    n -= 1;
    let niveles = [
        [2, 100],
        [3, 140],
        [4, 170],
        [5, 200],
        [7, 250]
    ];

    if (n > niveles.length) {
        mostrarMensaje("Enhorabuena, te has pasado el juego, vuelves al nivel 1.");
        userLevel = 1;
        n = 1;
    }

    borrarArrayScena(pstAndroides);
    borrarArrayScena(pstArboles);
    pstAndroides = [];
    pstArboles = [];
    cntAndroides = niveles[n][0];
    cntArboles = niveles[n][1];

    player.character.root.rotation.y = Math.PI;
    player.character.root.position.x = posicionSalidaPersonaje[0];
    player.character.root.position.z = posicionSalidaPersonaje[2];
    updateScore();

    //Se controla la posicion del los androides
    loader = new THREE.ColladaLoader();

    loader.load('recursos/collada/androide.dae', function colladaReady(collada) {
        let androide = collada.scene;
        androide.scale.set(0.2, 0.2, 0.2);
        //androide.position.set(0, 0.13, 0);
        //scene.add(androide);

        for (let indi = 0; indi < cntAndroides; indi++) {
            let clone = androide.clone(true);
            //clone.scale.set(0.2, 0.2, 0.2);
            clone.position.set(positionRandom(), 0.13, positionRandom());
            let pos = [clone.position.x, clone.position.z];
            if (!checkPstPlayer(pos, 20) && !checkPstDroid(pos, 15)) {
                scene.add(clone);
                pstAndroides.push(clone);
            } else {
                indi--;
            }
        }
    });

    loader.load('recursos/collada/tree.dae', function colladaReady(collada) {
        let arbol = collada.scene;
        arbol.scale.set(0.13, 0.13, 0.13);
        //arbol.position.set(-3, 0, 3);
        //scene.add(arbol);

        for (let indi = 0; indi < cntArboles; indi++) {
            let clone = arbol.clone(true);
            clone.position.set(positionRandom() - 3, 0, positionRandom() + 3);
            let pos = [clone.position.x, clone.position.z];
            if (!checkAll(pos, 6)) {
                scene.add(clone);
                pstArboles.push(clone);
                //THREE.Collisions.colliders.push(THREE.CollisionUtils.MeshOBB(clone));
            } else {
                indi--;
            }
        }
    });
}

/**
 * @description Agrega a batman y la bomba en el mapa.
 */
function addBombaBat() {
    loader.load('recursos/collada/batman.dae', function colladaReady(collada) {
        batman = collada.scene;
        batman.scale.set(0.013, 0.013, 0.013);
        batman.position.set(positionRandom(), -0.12, positionRandom());
        scene.add(batman);
    });
    /*
    loader.load('recursos/collada/bombaRoja.dae', function colladaReady(collada) {
        dae = collada.scene;
        dae.scale.set(0.02, 0.02, 0.02);
        scene.add(dae);
    });
    */
    loader.load('recursos/collada/bombaVerde.dae', function colladaReady(collada) {
        bombaPrincipal = collada.scene;
        bombaPrincipal.scale.set(0.01, 0.01, 0.01);
        bombaPrincipal.position.set(posicionBombaInicial[0], posicionBombaInicial[1], posicionBombaInicial[2]);
        scene.add(bombaPrincipal);
        inicializado = true;
    });
}

/**
 * Se asiga el Timeout del tiempo.
 */
let showSec;

/**
 * @description Comienza un timeout para contar los segundos
 */
function showSeconds() {
    if (milisec >= 9) {
        milisec = 0
        seconds += 1
    } else
        milisec += 1
    $("#time").html("Segundos: " + seconds);
    showSec = setTimeout("showSeconds()", 100)
}

/**
 * @description Detiene el timeout de sumar segundos.
 */
function stopShowSec() {
    if (showSec) {
        clearTimeout(showSec);
        $("#time").html("Segundos: " + seconds);
    }
}


/*
    var runnerTexture = new THREE.ImageUtils.loadTexture('recursos/explosion/explosion.png');
    annie = new TextureAnimator(runnerTexture, 10, 1, 10, 70); // texture, #horiz, #vert, #total, duration.
    var runnerMaterial = new THREE.MeshBasicMaterial({
        map: runnerTexture,
        side: THREE.DoubleSide
    });
    var runnerGeometry = new THREE.PlaneGeometry(50, 50, 1, 1);
    var runner = new THREE.Mesh(runnerGeometry, runnerMaterial);
    runner.scale.set(0.1, 0.1, 0.1);
    runner.position.set(0, 0, 0);
    scene.add(runner);
*/