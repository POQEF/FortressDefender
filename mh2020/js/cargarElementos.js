var cargarElementos = {
	elementosCargados: 0,
	elementosACargar: [
		"mh2020/img/niveles/fortaleza.png",
		"mh2020/img/personas/monitoAzul.png"
	],
	iniciar: function(elementosACargar) {
		//var loadedCounter = 0;
		//var toBeLoadedNumber = elementosACargar.length;
		cargarElementos.elementosACargar.forEach(function(elemento){

			cargarElementos.precargarElemento(elemento, cargarElementos.elementoCargado);

		});
	},
	precargarElemento: function (elemento, elementoCargadoCallback){
		var img = new Image();
		img.onload = elementoCargadoCallback;
		img.src = elemento;
	},
	elementoCargado: function(){
		cargarElementos.elementosCargados++;
	    console.log('Number of loaded images: ' + cargarElementos.elementosCargados);
		if(cargarElementos.elementosCargados == cargarElementos.elementosACargar.length){
			inicio.iniciarJuego();
		}
	}

}