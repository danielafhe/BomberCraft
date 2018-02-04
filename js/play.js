/**
 * Variables globales para el jugador y la escena.
 */
var scene, player;

/**
 * Variables globales para controlar si:
 * Está inicializado; Está cerca de la bomba; Ha cogido la bomba.
 */
let inicializado = false;
let estaCerca = false;
let cogido = false;
let batmanMuerto = false;

/**
 * Duracion del ciclo del día.
 */
var dayDuration = 240;

/**
 * Extensiones que requiere, si no las encuentra, no continúa con el código.
 */
require([
        'bowerComponents/threex.minecraft/package.require.js',
        'bowerComponents/threex.daynight/package.require.js',
        'bowerComponents/threex.windowresize/package.require.js'
    ],
    function () {
        let activo = false;
        //Renderizado de WebGL
        var renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        //Array en el que se añade todo lo que queremos renderizar
        var onRenderFcts = []
        //Se inicializa la cámara
        scene = new THREE.Scene();
        //Camara, se controla la distancia de esta y la distancia de dibujado
        var camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.01, 3000);
        camera.position.z = 2;

        //Al redimensionar la ventana, se ajusta a las nuevas proporciones
        THREEx.WindowResize(renderer, camera)
        window.addEventListener('resize', function (event) {
            mixerContext.rendererCSS.setSize(window.innerWidth, window.innerHeight)
        }, false);

        //Asignar los 3 puntos de luz        
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

        //Ciclo del dia
        //Angulo de salida del sol
        var sunAngle = Math.PI + Math.PI / 2;
        var sunAngle = 2.4;
        onRenderFcts.push(function (delta, now) {
            //Paso del tiempo
            sunAngle -= delta / dayDuration * Math.PI * 2
        });

        //Estrellas nocturnas
        var starField = new THREEx.DayNight.StarField()
        scene.add(starField.object3d)
        onRenderFcts.push(function (delta, now) {
            starField.update(sunAngle)
        });

        //Sol
        var sunSphere = new THREEx.DayNight.SunSphere()
        scene.add(sunSphere.object3d)
        onRenderFcts.push(function (delta, now) {
            sunSphere.update(sunAngle)
        });

        //Luz direccional del sol
        var sunLight = new THREEx.DayNight.SunLight()
        scene.add(sunLight.object3d)
        onRenderFcts.push(function (delta, now) {
            sunLight.update(sunAngle)
        });

        //Cielo estrella
        var skydom = new THREEx.DayNight.Skydom()
        scene.add(skydom.object3d)
        onRenderFcts.push(function (delta, now) {
            skydom.update(sunAngle)
        });

        //Texturas del suelo
        var textureUrl = 'recursos/suelo/grasslight-small.jpg';
        var texture = THREE.ImageUtils.loadTexture(textureUrl);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.x = 100;
        texture.repeat.y = 100;
        texture.anisotropy = 16;

        //Tamaño del suelo
        var geometry = new THREE.CircleGeometry(300, 320);
        var material = new THREE.MeshPhongMaterial({
            map: texture
        });

        //Se aplican las texturas del suelo y su geometria
        var mesh = new THREE.Mesh(geometry, material);
        mesh.lookAt(new THREE.Vector3(0, 1, 0));
        scene.add(mesh);

        //Se crea el personaje y se le asigna una posicion y se agrega a la escena
        THREEx.MinecraftChar.defaultMaterial = THREE.MeshPhongMaterial;
        player = new THREEx.MinecraftPlayer();
        player.character.root.rotation.y = Math.PI;
        player.character.root.position.x = posicionSalidaPersonaje[0];
        player.character.root.position.z = posicionSalidaPersonaje[2];
        scene.add(player.character.root);

        //Cada vez que se accione el personaje se actualiza con la nueva posicion
        onRenderFcts.push(function (delta, now) {
            player.update(delta, now);
            posicionPersonaje = [player.character.root.position.x, player.character.root.position.y, player.character.root.position.z];
            //Si la bomba está cogida, se mueve junto con el personaje
            if (cogido) {
                bombaPrincipal.position.set(posicionPersonaje[0], posicionPersonaje[1], posicionPersonaje[2]);
                bombaPrincipal.position.y = 0.5;
                bombaPrincipal.rotation.x = player.character.root.rotation.x;
                bombaPrincipal.rotation.y = player.character.root.rotation.y + 3.1;
            }
        });

        //Carga los datos del usuario, cargar el nivel y agregar los objetos
        cargarUsuario();
        cambiarNivel(userLevel);
        addBombaBat();

        //Bucle para las colisiones
        onRenderFcts.push(function () {
            if (inicializado) {
                let collision = false;

                let piernaDe = player.character.root.children[4];
                let piernaIz = player.character.root.children[5];
                let bombaPr = bombaPrincipal;

                let piernaDeBox = new THREE.Box3().setFromObject(piernaDe);
                let piernaIzBox = new THREE.Box3().setFromObject(piernaIz);
                let bombaPrBox = new THREE.Box3().setFromObject(bombaPr);

                let brazoDe = player.character.root.children[3];
                let brazoIz = player.character.root.children[2];
                let batPr = batman;

                let brazoDeBox = new THREE.Box3().setFromObject(brazoDe);
                let brazoIzBox = new THREE.Box3().setFromObject(brazoIz);
                let batPrBox = new THREE.Box3().setFromObject(batPr);

                if (piernaIzBox.intersectsBox(bombaPrBox) || piernaDeBox.intersectsBox(bombaPrBox))
                    collision = true;
                if (collision)
                    estaCerca = true;
                else
                    estaCerca = false;

                if (atacando) {
                    if (brazoDeBox.intersectsBox(batPrBox) || brazoIzBox.intersectsBox(batPrBox)) {
                        scene.remove(batman);
                        if (!batmanMuerto) {
                            elegirMensaje(5);
                            userPoints += 300;
                            updateScore();
                        }
                        batmanMuerto = true;
                    }
                }
            }
        });

        let sndAmbient = new Audio('recursos/sounds/forest.mp3');
        sndAmbient.addEventListener('ended', function () {
            this.currentTime = 0;
            this.play();
        }, false);
        sndAmbient.play();

        let sndWalking = new Audio('recursos/sounds/walking_forest.wav');
        sndWalking.addEventListener('ended', function () {
            this.currentTime = 0;
            this.play();
        }, false);


        //Controles de la camara
        var cameraControlsDisabled = false
        //Mantener la camara detras del jugador
        onRenderFcts.push(function (delta) {
            if (cameraControlsDisabled) return

            var object3d = player.character.root

            //Asignar la posicion de la cámara
            var vector = new THREE.Vector3(0, 1.2, -2);
            var matrix = new THREE.Matrix4().makeRotationY(object3d.rotation.y);
            vector.applyMatrix4(matrix);
            var position = object3d.position.clone().add(vector);
            camera.position.copy(position)

            //Asignar a donde mira la cámara
            var vector = new THREE.Vector3(0, 1.2, 3);
            var matrix = new THREE.Matrix4().makeRotationY(object3d.rotation.y);
            vector.applyMatrix4(matrix);
            var target = object3d.position.clone().add(vector);
            camera.lookAt(target)
        })

        //Controles al apretar las teclas
        document.body.addEventListener('keydown', function (event) {
            var input = player.controls.input
            if (event.keyCode === 'W'.charCodeAt(0)) {
                input.up = true;
                sndWalking.play();
            }
            if (event.keyCode === 'S'.charCodeAt(0)) {
                input.down = true;
                sndWalking.play();
            }
            if (event.keyCode === 'A'.charCodeAt(0)) {
                input.left = true;
            }
            if (event.keyCode === 'D'.charCodeAt(0)) {
                input.right = true;
            }
            if (event.keyCode === 'Q'.charCodeAt(0)) {
                input.strafeLeft = true;
                sndWalking.play();
            }
            if (event.keyCode === 'E'.charCodeAt(0)) {
                input.strafeRight = true;
                sndWalking.play();
            }

            if (event.keyCode === 'C'.charCodeAt(0)) {
                input.circularPunch = true;
                atacando = true;
            }
            if (event.keyCode === 'F'.charCodeAt(0)) input.coger = true
            if (event.keyCode === 'R'.charCodeAt(0)) input.soltar = true
            if (event.keyCode === 'P'.charCodeAt(0)) alert("Juego en pausa");
        });

        //Controles al soltar las teclas
        document.body.addEventListener('keyup', function (event) {
            var input = player.controls.input
            if (event.keyCode === 'W'.charCodeAt(0)) {
                input.up = false;
                sndWalking.pause();
            }
            if (event.keyCode === 'S'.charCodeAt(0)) {
                input.down = false;
                sndWalking.pause();
            }
            if (event.keyCode === 'A'.charCodeAt(0)) {
                input.left = false;
            }
            if (event.keyCode === 'D'.charCodeAt(0)) {
                input.right = false;
            }
            if (event.keyCode === 'Q'.charCodeAt(0)) {
                input.strafeLeft = false;
                sndWalking.pause();
            }
            if (event.keyCode === 'E'.charCodeAt(0)) {
                input.strafeRight = false;
                sndWalking.pause();
            }
            if (event.keyCode === 'C'.charCodeAt(0)) {
                input.circularPunch = false;
                atacando = false;
            }
            if (event.keyCode === 'F'.charCodeAt(0)) input.coger = false
            if (event.keyCode === 'R'.charCodeAt(0)) input.soltar = false
        });

        //Renderizar la escena completa con todo lo añadido
        onRenderFcts.push(function () {
            renderer.render(scene, camera);
        });

        //Bucle para renderizar toda la escena
        var lastTimeMsec = null;
        requestAnimationFrame(function animate(nowMsec) {
            //Mantener el bucle
            requestAnimationFrame(animate);
            //Renderizar cada cierto tiempo
            lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60;
            var deltaMsec = Math.min(200, nowMsec - lastTimeMsec);
            lastTimeMsec = nowMsec;
            //Ejecutar en cada iteraccion del bucle
            onRenderFcts.forEach(function (onRenderFct) {
                onRenderFct(deltaMsec / 1000, nowMsec / 1000);
            });
        });
    })