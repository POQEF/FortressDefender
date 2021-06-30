var canvaPrincipal = {
	idCanva: "myCanvas",
	canva: null,
	contexto: null,
	iniciar: function () {
		canvaPrincipal.canva = document.getElementById( canvaPrincipal.idCanva );
		canvaPrincipal.contexto = canvaPrincipal.canva.getContext("2d");
	},
	dibujarImagenEstatica: function (imagen, posicionX, posicionY) {
		canvaPrincipal.contexto.drawImage(imagen, posicionX, posicionY);

	},
	dibujarImagenEstaticaEscalada: function (imagen, posicionX, posicionY, escalaAncho, escalaAlto) {
		canvaPrincipal.contexto.drawImage(imagen, posicionX, posicionY, escalaAncho, escalaAlto);
	},
	dibujarImagenDinamica: function (imagen, xImagen, yImagen, anchoImagen, altoImagen, xCanva, yCanva, anchoImagenEnCanva, altoImagenEnCanva) {
		canvaPrincipal.contexto.drawImage(imagen, xImagen, yImagen, anchoImagen, altoImagen, xCanva, yCanva, anchoImagenEnCanva, altoImagenEnCanva);
	},
	dibujarRectangulo: function (x, y, ancho, alto, color) {
		canvaPrincipal.contexto.fillStyle = color;
		canvaPrincipal.contexto.fillRect(x, y, ancho, alto);
	},
	dibujarTexto: function (texto, x, y, estilo, color, alineacion){
		canvaPrincipal.contexto.textAlign = alineacion;
		canvaPrincipal.contexto.fillStyle = color;
		canvaPrincipal.contexto.font = estilo;
		canvaPrincipal.contexto.fillText(texto, x, y);
	},
	borrarContenido: function (){
		canvaPrincipal.contexto.clearRect(0, 0, canvaPrincipal.canva.width, canvaPrincipal.canva.height);
	}

}