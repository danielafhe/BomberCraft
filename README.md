#### BomberCraft
## by Daniel Afonso


### Enlace al juego:
## https://daniafonso.github.io/BomberCraft/

### DESCRIPCION:
La finalidad del juego es destruir todos los objetivos existentes en cada nivel, si se consigue antes de un tiempo predefinido, obtendremos una puntuación extra. Además existe una serie de bonus por el mapa que permiten sumar puntos adicionales.

![Bombercraft](https://user-images.githubusercontent.com/35113859/149131174-f57658a1-df2e-4ce1-8d73-1f67b1b9d4be.png)

### FORMA DE UTILIZARLO:
Para jugar primero debemos crearnos una cuenta, tendremos que registrarnos rellenando un formulario en el que se pide:
- Gamertag -> Nombre que aparece en el juego, es tu nombre dentro del mundo del juego.
- Nombre -> Nombre del usuario.
- Apellidos -> Apellidos del usuario.
- Correo -> Correo del usuario.
- Contraseña -> Contraseña segura para el juego.
- Skin -> Junto con el Gamertag, te representará en el juego, es la apariencia que vas a tener en el juego, se podría decir que es la ropa, pero va más allá.
Una vez tengas la cuenta creada, podrás loguearte, para ello, introduce tu usuario y contraseña y podrás entrar en el juego.
Las reglas del juego son simples, intenta destruir todos los objetivos en el menor tiempo posible para cambiar de nivel y obtener la mayor cantidad de puntos. Para esto, lo que debes hacer es destruir los objetivos en el menor tiempo posible, si consigues destruirlo antes del tiempo estimado, esos segundos que te sobran, los sumaras a tu cantidad de puntos, premiando así a los jugadores más rápidos.

Para destruir a estos objetivos lo que hay que hacer es coger la bomba que se encuentra en el claro del bosque, una vez la cojas el tiempo empieza a contar hasta que la sueltes, cuando lo hagas, esta explotará al cabo de 3 segundos, aléjate de ella si no quieres morir. Si el objetivo se encuentra dentro del radio de la bomba, este se destruye y reaparecerá otra bomba en el claro del bosque donde empezó el juego.
Cuando hayas destruido a todos los objetivos de un nivel, pasarás al siguiente, reaparecerás en el centro del claro como la primera vez, pero cada vez que subes de nivel aumenta la dificultad, esto quiere decir que aumenta el número de objetivos a destruir y la cantidad de árboles, esto último dificulta encontrar los objetivos, sobre todo en los niveles más avanzados.
Si logras acabar todos los niveles, habrás acabado el juego, podrás seguir jugando, empezarás en el nivel 1, pero manteniendo tus puntos totales y podrás aumentarlos.
PD: Hay un personaje, que si logras encontrarlo y golpearlo, ganarás 300 puntos de forma inmediata en cada nivel, aparece de forma aleatoria y en cualquier parte, podría aparecer dentro de un árbol o dentro de un androide, nunca lo sabrás hasta que lo encuentres.




### TECNOLOGÍAS UTILIZADAS:
Para la realización del juego se incluye una mezcla de tecnologías que son:
- HTML
- CSS
- JavaScript
- JQuery
- Three.js

# Breve descripción de cada una de las tecnologías:
- HTML:
Siglas en inglés de HyperText Markup Language (lenguaje de marcas de hipertexto), hace referencia al lenguaje de marcado para la elaboración de páginas web. Es un estándar que sirve de referencia del software que conecta con la elaboración de páginas web en sus diferentes versiones, define una estructura básica y un código (denominado código HTML) para la definición de contenido de una página web, como texto, imágenes, videos, juegos, entre otros. Es un estándar a cargo del World Wide Web Consortium (W3C) o Consorcio WWW, organización dedicada a la estandarización de casi todas las tecnologías ligadas a la web, sobre todo en lo referente a su escritura e interpretación. Se considera el lenguaje web más importante siendo su invención crucial en la aparición, desarrollo y expansión de la World Wide Web (WWW). Es el estándar que se ha impuesto en la visualización de páginas web y es el que todos los navegadores actuales han adoptado.
- CSS:
Hojas de estilo en cascada (o CSS, siglas en inglés de Cascading Stylesheets) es un lenguaje de diseño gráfico para definir y crear la presentación de un documento estructurado escrito en un lenguaje de marcado. Es muy usado para establecer el diseño visual de los documentos web, e interfaces de usuario escritas en HTML o XHTML; el lenguaje puede ser aplicado a cualquier documento XML, incluyendo XHTML, SVG, XUL, RSS, etcétera. También permite aplicar estilos no visuales, como las hojas de estilo auditivas.
- JavaScript: 
JavaScript (abreviado comúnmente JS) es un lenguaje de programación interpretado, dialecto del estándar ECMAScript. Se define como orientado a objetos, basado en prototipos, imperativo, débilmente tipado y dinámico.
Se utiliza principalmente en su forma del lado del cliente (client-side), implementado como parte de un navegador web permitiendo mejoras en la interfaz de usuario y páginas web dinámicas, aunque existe una forma de JavaScript del lado del servidor (Server-side JavaScript o SSJS). Su uso en aplicaciones externas a la web, por ejemplo, en documentos PDF, aplicaciones de escritorio (mayoritariamente widgets) es también significativo.

- JQuery:
jQuery es una biblioteca multiplataforma de JavaScript, creada inicialmente por John Resig, que permite simplificar la manera de interactuar con los documentos HTML, manipular el árbol DOM, manejar eventos, desarrollar animaciones y agregar interacción con la técnica AJAX a páginas web. Fue presentada el 14 de enero de 2006 en el BarCamp NYC. jQuery es la biblioteca de JavaScript más utilizada.1
jQuery es software libre y de código abierto, posee un doble licenciamiento bajo la Licencia MIT y la Licencia Pública General de GNU v2, permitiendo su uso en proyectos libres y privados.  jQuery, al igual que otras bibliotecas, ofrece una serie de funcionalidades basadas en JavaScript que de otra manera requerirían de mucho más código, es decir, con las funciones propias de esta biblioteca se logran grandes resultados en menos tiempo y espacio.

- Three.js
Threejs.org
Three.js es una librería bastante liviana y muy eficiente para generar y animar gráficos en 3D dentro del navegador, aprovechando las grandes novedades que nos ofrece HTML5 para la generación de contenidos multimedia. Aprovecha tanto las capacidades de HTML5 que es capaz de generar escenas 3D con WebGL, Canvas (2D) y SVG. 
EXTENSIONES DE THREE.JS:
Si vas a su página web y lo descargas, obtienes un archivo zip de más de 200MB con todo lo necesario, aquí encontramos muchísimos ejemplos y paquetes de extensiones para copiar a nuestros proyectos.
Yo he implementado tres extensiones de three.js:
Para implementarlas, se pueden descargar de su página web e importar al proyecto o mediante bower, aquí los comandos para hacerlo: 
npm install -g bower
bower install git://github.com/user/package.git
Por defecto se instalan en la carpeta bower_componentes de tu proyecto.
threex.minecraft: 
Esta extensión implementa un objeto jugador, que es el personaje del minecraft, este personaje tiene ya definidos los polígonos exactos para ser igual que un personaje del juego real, las dimensiones y los movimientos son iguales.
threex.daynight:
Extensión que después de implementarla satisfactoriamente permite generar la luz de forma dinámica por diferentes puntos del mapa, lo que nos permite después conseguir efectos de día y noche en el juego, añadiendo un sol cuando es de día o estrellas cuando sea de noche.
threex.windowresize
Permite poder redimensionar los objetos en 3d a tu gusto, y poder conseguir el efecto responsivo deseado en los objetos y personajes del juego.


### POSIBLES MEJORAS:
Cosas que quería implementar y no he podido por falta de conocimientos y sobre todo, tiempo:
-	Modo móvil, lo tengo medio implementado, le faltan algunos ajustes en los controles, pero si se conecta un teclado al móvil o Tablet, se puede jugar perfectamente en navegadores móviles modernos.

-	Agregar más elementos con los que interactuar, por ejemplo, enemigos en pantalla que te persigan y tengas que eliminar para que te dejen colocar la bomba, esto último he intentado implementarlo, pero no he podido avanzar y lo he dejado por falta de tiempo.

-	Añadir elementos de terreno como montañas o cuevas, y sobre todo un acantilado al final del mapa, en el que, si lo superas, caerás al vacío y mueres de una forma espectacular.

-	Modo online o cooperativo local, una modalidad en la que otro usuario te ayudaría a matar esos enemigos y colocar las bombas de forma cooperativa, podríamos incluso tener varias bombas y permitir así un ranking distinto para el juego en parejas y organizar equipos para enfrentarse en una liga.





### INCONVENIENTES:
He tenido algunos problemas para implementar ciertas cosas porque desconozco el diseño en 3D, entonces he tenido que tirar de internet para buscar los objetos para el juego, esto último, me ha supuesto un problema porque no había prácticamente nada como yo quería y he tenido que modificar algunas cosas manualmente. Los objetos por lo general no tienen el centro en el centro del objeto, lo suelen tener en un lateral (desconozco el motivo) entonces al colocar el objeto en una posición en el juego, este, se posiciona en otra distinta, entonces esto hace que aunque yo controle que dos objetos distintos no salgan en la misma posición, si estos objetos tienen centros distintos (si son dos objetos distintos, un árbol y un androide por ejemplo) no coincidiría en la posición de colocación, pero visualmente podrían aparece uno atravesando el otro por este desplazamiento comentado anteriormente.

Esto último, lo he corregido en algunos objetos moviendo el centro con el Blender (aplicación de diseño 3d) mediante tutoriales, pero cuando el objeto tiene las texturas en imágenes, no he podido arreglarlo y que luego cargue las texturas, no he conseguido aprender a hacerlo, entonces, la solución que he encontrado es calcular el margen de error manualmente, mirar cual es la distancia que se mueve desde donde yo lo pongo hasta la que aparece y he corregido gran parte del problema, pero no es la solución ideal porque depende de mis cálculos.

Otro de los problemas que tengo es que no consigo convertir los arboles en objetos dinámicos, que son objetos que no se pueden atraversar en la partida por el jugador, cuando lo hago y luego lo exporto de nuevo a un objeto tipo colllada (el tipo de objeto 3d que usa three.js) este implementa líneas de código nuevas en el xml del objeto que impiden el correcto funcionamiento de las texturas, tendría que conseguir el objeto ya creado de ese tipo u otro programa que permita trabajar con .dae (collada) de forma nativa o como hice, calcular a mano que el usuario en el siguiente paso que vaya a dar, coincida con la posición del árbol, esto es fácil una vez tienes todas las posiciones en 3d de los arboles en un array, el problema viene a que como suelen haber más de 300 árboles, en pantalla, ralentiza mucho el juego y se hace injugable, así que al final no lo he implementado. 
Pero desde un inicio había pensado en implementar un sistema de recompensar al jugador de forma aleatoria, por ello, durante la partida, puede aparecer Batman en cualquier lugar, sea dentro de un árbol o cerca o lejos del jugador, si consigues golpearlo, ganarás 300 puntos de forma inmediata. Pero no siempre podrás encontrarlo.
