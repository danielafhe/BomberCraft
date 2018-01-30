let inicializado = false;
let estaCerca = false;
let cogido = false;
let bombaPrincipal;
let posicionPersonaje;
let cntAndroides = 5;
let cntArboles = 50;
let pstAndroides = [];
let pstArboles = [];

let userName;
let userSkin;
let userPoints;

cargarUsuario();

require([
        'bowerComponents/threex.minecraft/package.require.js',
        'bowerComponents/threex.daynight/package.require.js',
        'bowerComponents/threex.windowresize/package.require.js'
    ],
    function () {
        let activo = false;

        var renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        var onRenderFcts = []
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.01, 30000);
        camera.position.z = 2;

        //////////////////////////////////////////////////////////////////////////////////
        //Redimensionar ventana

        THREEx.WindowResize(renderer, camera)
        window.addEventListener('resize', function (event) {
            mixerContext.rendererCSS.setSize(window.innerWidth, window.innerHeight)
        }, false)

        //////////////////////////////////////////////////////////////////////////////////
        //Asignar los 3 puntos de luz

        ;
        (function () {
            //Luz ambiente
            var light = new THREE.AmbientLight(0x020202)
            scene.add(light)
            //Luz frontal
            var light = new THREE.DirectionalLight('white', 1)
            light.position.set(0.5, 0.5, 2)
            scene.add(light)
            //Luz trasera
            var light = new THREE.DirectionalLight('white', 0.75)
            light.position.set(-0.5, -0.5, -2)
            scene.add(light)
        })()

        //////////////////////////////////////////////////////////////////////////////////
        //Ciclo del dia
        //Angulo de salida del sol
        //var sunAngle = Math.PI + Math.PI / 2;
        var sunAngle = 2.4;
        onRenderFcts.push(function (delta, now) {
            var dayDuration = 24
            //Paso del tiempo
            //sunAngle -= delta / dayDuration * Math.PI * 2
        })

        //////////////////////////////////////////////////////////////////////////////////
        //Estrellas nocturnas
        var starField = new THREEx.DayNight.StarField()
        scene.add(starField.object3d)
        onRenderFcts.push(function (delta, now) {
            starField.update(sunAngle)
        })

        //////////////////////////////////////////////////////////////////////////////////
        //Sol
        var sunSphere = new THREEx.DayNight.SunSphere()
        scene.add(sunSphere.object3d)
        onRenderFcts.push(function (delta, now) {
            sunSphere.update(sunAngle)
        })

        //////////////////////////////////////////////////////////////////////////////////
        //Luz direccional del sol
        var sunLight = new THREEx.DayNight.SunLight()
        scene.add(sunLight.object3d)
        onRenderFcts.push(function (delta, now) {
            sunLight.update(sunAngle)
        })

        //////////////////////////////////////////////////////////////////////////////////
        //Cielo estrella
        var skydom = new THREEx.DayNight.Skydom()
        scene.add(skydom.object3d)
        onRenderFcts.push(function (delta, now) {
            skydom.update(sunAngle)
        })

        //////////////////////////////////////////////////////////////////////////////////
        //Texturas del suelo
        var textureUrl = 'recursos/suelo/grasslight-small.jpg';
        var texture = THREE.ImageUtils.loadTexture(textureUrl);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.x = 10
        texture.repeat.y = 10
        texture.anisotropy = 16;

        var geometry = new THREE.CircleGeometry(30, 32)
        var material = new THREE.MeshPhongMaterial({
            map: texture,
        })

        var mesh = new THREE.Mesh(geometry, material)
        mesh.lookAt(new THREE.Vector3(0, 1, 0))
        scene.add(mesh)

        //////////////////////////////////////////////////////////////////////////////////
        //Se controla la posicion del personaje
        THREEx.MinecraftChar.defaultMaterial = THREE.MeshPhongMaterial

        var player = new THREEx.MinecraftPlayer()
        player.character.root.rotation.y = Math.PI
        player.character.root.position.x = 0
        player.character.root.position.z = 9
        scene.add(player.character.root)
        onRenderFcts.push(function (delta, now) {
            player.update(delta, now);
            if (cogido) {
                posicionPersonaje = [player.character.root.position.x, player.character.root.position.y, player.character.root.position.z];

                bombaPrincipal.position.set(posicionPersonaje[0], posicionPersonaje[1], posicionPersonaje[2]);
                bombaPrincipal.position.y = 0.5;
                bombaPrincipal.rotation.x = player.character.root.rotation.x;
                bombaPrincipal.rotation.y = player.character.root.rotation.y + 3.1;

            }

        })

        //////////////////////////////////////////////////////////////////////////////////
        //Se controla la posicion de las bombas
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
                let pos = [clone.position.x, clone.position.z]
                if (!checkDistJusta(pos,10)) {
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

            for (let indi = 0; indi < cntArboles; indi++) {
                let clone = arbol.clone(true);
                clone.position.set(positionRandom(), 0, positionRandom());
                let pos = [clone.position.x, clone.position.z]
                if (!checkAll(pos, 3)) {
                    scene.add(clone);
                    pstArboles.push(clone);
                } else {
                    indi--;
                }
            }
        });

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
        let posicionBomba = [1, 0, 1];
        loader.load('recursos/collada/bombaVerde.dae', function colladaReady(collada) {

            bombaPrincipal = collada.scene;
            bombaPrincipal.scale.set(0.01, 0.01, 0.01);
            bombaPrincipal.position.set(posicionBomba[0], posicionBomba[1], posicionBomba[2]);
            scene.add(bombaPrincipal);
            inicializado = true;
        });



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
        //////////////////////////////////////////////////////////////////////////////////
        //Bucle para las colisiones

        onRenderFcts.push(function () {

            if (inicializado) {
                let collision = false;

                var piernaDe = player.character.root.children[4];
                var piernaIz = player.character.root.children[5];
                var bombaPr = bombaPrincipal;

                let piernaIzBox = new THREE.Box3().setFromObject(piernaIz);
                let piernaDeBox = new THREE.Box3().setFromObject(piernaDe);
                let bombaPrBox = new THREE.Box3().setFromObject(bombaPr);

                //console.log(bombaPrincipal.getWorldPosition());
                //console.log(player.character.root.getWorldPosition());
                //console.log(posicionesAdroides[0].getWorldPosition());

                if (piernaIzBox.intersectsBox(bombaPrBox))
                    collision = true;
                else if (piernaDeBox.intersectsBox(bombaPrBox))
                    collision = true;

                if (collision) {
                    //console.log("Colision True!!!!!!!!!!!!!!!!");
                    estaCerca = true;
                    //posicionesAdroides[0].visible =false;
                } else {
                    //console.log("Colision False!!!!!!!!!!!!!!!!");
                    estaCerca = false;
                    //posicionesAdroides[0].visible = true;
                }
            }
        })

        //////////////////////////////////////////////////////////////////////////////////
        //Controles de la camara
        var cameraControlsDisabled = false
        //Mantener la camara detras del jugador
        // - complex but html.mixer needs the camera to be at the world level
        onRenderFcts.push(function (delta) {
            if (cameraControlsDisabled) return

            var object3d = player.character.root

            // set camera position
            var vector = new THREE.Vector3(0, 1.2, -2);
            var matrix = new THREE.Matrix4().makeRotationY(object3d.rotation.y);
            vector.applyMatrix4(matrix);
            var position = object3d.position.clone().add(vector);
            camera.position.copy(position)

            // set camera lookAt
            var vector = new THREE.Vector3(0, 1.2, 3);
            var matrix = new THREE.Matrix4().makeRotationY(object3d.rotation.y);
            vector.applyMatrix4(matrix);
            var target = object3d.position.clone().add(vector);
            camera.lookAt(target)
        })

        //////////////////////////////////////////////////////////////////////////////////
        //Controles por teclado
        document.body.addEventListener('keydown', function (event) {
            var input = player.controls.input
            if (event.keyCode === 'W'.charCodeAt(0)) input.up = true
            if (event.keyCode === 'S'.charCodeAt(0)) input.down = true
            if (event.keyCode === 'A'.charCodeAt(0)) input.left = true
            if (event.keyCode === 'D'.charCodeAt(0)) input.right = true
            if (event.keyCode === 'Q'.charCodeAt(0)) input.strafeLeft = true
            if (event.keyCode === 'E'.charCodeAt(0)) input.strafeRight = true
            if (event.keyCode === 'C'.charCodeAt(0)) input.circularPunch = true
            if (event.keyCode === 'F'.charCodeAt(0)) input.coger = true
            if (event.keyCode === 'R'.charCodeAt(0)) input.soltar = true
        })
        document.body.addEventListener('keyup', function (event) {
            var input = player.controls.input
            if (event.keyCode === 'W'.charCodeAt(0)) input.up = false
            if (event.keyCode === 'S'.charCodeAt(0)) input.down = false
            if (event.keyCode === 'A'.charCodeAt(0)) input.left = false
            if (event.keyCode === 'D'.charCodeAt(0)) input.right = false
            if (event.keyCode === 'Q'.charCodeAt(0)) input.strafeLeft = false
            if (event.keyCode === 'E'.charCodeAt(0)) input.strafeRight = false
            if (event.keyCode === 'C'.charCodeAt(0)) input.circularPunch = false
            if (event.keyCode === 'F'.charCodeAt(0)) input.coger = false
            if (event.keyCode === 'R'.charCodeAt(0)) input.soltar = false
        })

        //////////////////////////////////////////////////////////////////////////////////
        //Renderizar la escena completa con todo lo añadido
        onRenderFcts.push(function () {
            renderer.render(scene, camera);
        })

        //////////////////////////////////////////////////////////////////////////////////
        //Bucle de movimiento
        var lastTimeMsec = null
        requestAnimationFrame(function animate(nowMsec) {
            // keep looping
            requestAnimationFrame(animate);
            // measure time
            lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60
            var deltaMsec = Math.min(200, nowMsec - lastTimeMsec)
            lastTimeMsec = nowMsec
            // call each update function
            onRenderFcts.forEach(function (onRenderFct) {
                onRenderFct(deltaMsec / 1000, nowMsec / 1000)
            })
        })

    })