/**
 * @description Muestra el mensaje que corresponda con la variable recibida por parámetro.
 * @param {*} o Número del mensaje a mostrar.
 */
function elegirMensaje(o) {
	let mensajes = [
		"La bomba no ha tocado a nadie.",
		"Has muerto, recuerda alejarte al soltar la bomba.",
		"Has eliminado a un objetivo, restantes: " + cntAndroides,
		"Has eliminado todos los objetivos, pasas al nivel " + userLevel,
		"Has matado a Batman, esperamos que te hayas quedado a gusto.",
		"Has golpeado a Batman, ganas 500 puntos."
	];
	mostrarMensaje(mensajes[o]);
}

/**
 * Muestra un mensaje recibido por parámetro en el div correspondiente.
 * @param {*} m Mensaje a mostrar.
 */
function mostrarMensaje(m) {
	var element = document.querySelector('#textDiv');
	element.textContent = "Información: " + m;
	element.style.display = 'block';

	setTimeout(function () {
		element.style.display = 'none';
	}, 5000);
}

/**
 * @description Cuando se pulse el botón mostrará o no el mensaje.
 */
document.querySelector('#infoButton').addEventListener('click', function (event) {
	var element = document.querySelector('#infoPopup');
	element.style.display = element.style.display === 'none' ? 'block' : 'none';
	$('#infoPopup *').remove();
	let contenido = "<p>Controles:</p> <br>" +
		"<p>Movimiento -> WASD QE</p>" +
		"<p>Coger -> F</p> <p>Soltar -> R</p>";
	$("#infoPopup").append(contenido);
});

/**
 * @description Cuando se pulse el botón mostrará o no el mensaje.
 */
document.querySelector('#optionButton').addEventListener('click', function (event) {
	var element = document.querySelector('#infoPopup');
	element.style.display = element.style.display === 'none' ? 'block' : 'none';
	$('#infoPopup *').remove();
	let contenido = "<p>Opciones:</p> <br>" +
		"<div id='opciones'>" +
		"<input id='salir' value='Salir' type='button' class='button'> <br>" +
		"<input id='reiniciar' value='Reiniciar' type='button' class='button'> <br>" +
		"</div>";
	$("#infoPopup").append(contenido);
	$("#salir").click(function () {
		document.location.href = "./index.html";
	});
	$("#reiniciar").click(function () {
		cambiarNivel(userLevel);
	});
});