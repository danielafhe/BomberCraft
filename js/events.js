let bombaPrincipal;
let posicionBombaInicial = [0, 0, 0];
let posicionSalidaPersonaje = [-1, 0, 3];
let posicionPersonaje;

let cntAndroides;
let cntArboles;

let pstAndroides = [];
let pstArboles = [];

let areaJuego = 50;

function soltarBomba() {
    bombaPrincipal.position.set(posicionPersonaje[0], 0, posicionPersonaje[2]);
    bombaPrincipal.rotation.set(0, 0, 0);
    bombaPrincipal.rotation.x = -1.6;
    cogido = false;

    setTimeout(function () {
        let ps = [bombaPrincipal.position.x, bombaPrincipal.position.z];
        if (checkPstDroidDelete(ps, 2)) {
            sumarPuntos(100);
            cntAndroides--;
            actualizarCantidadAndroides();
        }
        if (checkPstPlayerDelete(ps, 2)) {
            alert("Has muerto!!!");
        }
        if (cntAndroides <= 0) {
            alert("Has eliminado a todos los objetivos!!");
            userLevel++;
            actualizarUser();
            cambiarNivel(userLevel);
        }
        explotarBomba();
    }, 3000);
}

function explotarBomba() {
    bombaPrincipal.position.set(posicionBombaInicial[0], posicionBombaInicial[1], posicionBombaInicial[2]);
}

function cambiarNivel(n) {
    let niveles = [
        [1, 100],
        [2, 140],
        [3, 170],
        [5, 200],
        [7, 300],
        [10, 300]
    ];
    borrarArrayScena(pstAndroides);
    borrarArrayScena(pstArboles);
    pstAndroides = [];
    pstArboles = [];
    cntAndroides = niveles[n][0];
    cntArboles = niveles[n][1];

    player.character.root.position.x = posicionSalidaPersonaje[0];
    player.character.root.position.z = posicionSalidaPersonaje[2];

    actualizarCantidadAndroides();

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
            if (!checkPstPlayer(pos, 20) && !checkDistJusta(pos, 15)) {
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
            if (!checkAll(pos, 3)) {
                scene.add(clone);
                pstArboles.push(clone);
                //THREE.Collisions.colliders.push(THREE.CollisionUtils.MeshOBB(clone));
            } else {
                indi--;
            }
        }
    });
}

function addBombaBat() {
    loader.load('recursos/collada/batman.dae', function colladaReady(collada) {
        let arbol = collada.scene;
        arbol.scale.set(0.013, 0.013, 0.013);
        arbol.position.set(positionRandom(), -0.12, positionRandom());
        scene.add(arbol);
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