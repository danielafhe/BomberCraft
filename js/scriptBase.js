require([
        'bowerComponents/threex.minecraft/package.require.js',
        'bowerComponents/threex.daynight/package.require.js',
        'bowerComponents/threex.windowresize/package.require.js',
        'bowerComponents/threex.domevents/threex.domevents.js',
        'bowerComponents/threex.domevents/threex.linkify.js'
    ],
    function () {
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
        var textureUrl = 'images/grasslight-small.jpg';
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
            player.update(delta, now)
        })

        //////////////////////////////////////////////////////////////////////////////////
        //Se controla la posicion de las bombas
        loader = new THREE.ColladaLoader();
        var dae;

        loader.load('collada/bomba3.dae', function colladaReady(collada) {
            dae = collada.scene;
            dae.scale.set(0.0002, 0.0002, 0.0002);
            scene.add(dae);
        });

        loader.load('collada/bomba2.dae', function colladaReady(collada) {
            dae = collada.scene;
            dae.scale.set(0.02, 0.02, 0.02);
            scene.add(dae);
        });
        let posi = [1, 0, 1];
        loader.load('collada/bomba2.dae', function colladaReady(collada) {
            
            let pB = ajusteBomba(posi);
            dae = collada.scene;
            dae.scale.set(0.02, 0.02, 0.02);
            dae.position.set(pB[0], pB[1], pB[2]);
            scene.add(dae);
        });


        //////////////////////////////////////////////////////////////////////////////////
        //Bucle para las colisiones
        var cuboAux = newCubeBomb(posi);
        scene.add(cuboAux);

        onRenderFcts.push(function () {
            //var firstObject = player.character.root.children[0].children[0];
            var piernaDe = player.character.root.children[4];
            var piernaIz = player.character.root.children[5];
            var secondObject = cuboAux;
            firstBB = new THREE.Box3().setFromObject(piernaIz);
            secondBB = new THREE.Box3().setFromObject(secondObject);
            var collision = firstBB.intersectsBox(secondBB);
            if (collision) {
                console.log("Colision True!!!!!!!!!!!!!!!!");
            } else {
                console.log("Colision False!!!!!!!!!!!!!!!!");
            }
        })


        /*
        onRenderFcts.push(function () {
            for (var vertexIndex = 0; vertexIndex < player.character.root.children[0].children[0].geometry.vertices.length; vertexIndex++) {
                var localVertex = player.character.root.children[0].children[0].geometry.vertices[vertexIndex].clone();
                var globalVertex = player.character.root.children[0].children[0].matrix.applyMatrix4(localVertex);
                var directionVector = globalVertex.sub(player.character.root.children[0].children[0].position);

                var ray = new THREE.Ray(player.character.root.children[0].children[0].position, directionVector.clone().normalize());
                var collisionResults = ray.intersectObjects(collidableMeshList);
                if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
                    // a collision occurred... do something...
                }
            }

        })
        */



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