var maquinaEstados = {
	estadoActual: null,
	iniciar: function() {
		maquinaEstados.cambiarEstado(listadoEstados.MENU_INICIAL, 100);
	},
	cambiarEstado: function(nuevoEstado, id, datos) {
		switch(nuevoEstado) {
			case listadoEstados.MENU_INICIAL:
				maquinaEstados.estadoActual = new EstadoMenuInicial(
				[
					new Sprite("mh2020/img/niveles/fortaleza.png", 800, 448)
				]
				);
			break;
			
			case listadoEstados.NIVEL:
				console.log("Cambio de estado: nivel Valkyon");
				maquinaEstados.estadoActual = new EstadoNivelValkyon( listadoEstados.NIVELValkyon, id,
					new Fondo("Fortaleza", "mh2020/img/niveles/fortaleza.png", 800, 450),
					//new SpriteAnimado("Fizz", "img/personas/monitoAzul.png", 32, 32, [0, 1, 2, 3, 4, 5], {izquierda: 0, derecha: 1}, 3)
					[
						{alto: 90, ancho: 170, x: 315, y: 172}
					],
					[]
				);
			break;
			
			case listadoEstados.POST_JUEGO:
				console.log("iniciando pantalla");
				maquinaEstados.estadoActual = new EstadoPostNivel(datos);
				break;
		}
	},
	actualizar: function(registroTemporal) {
		maquinaEstados.estadoActual.actualizar(registroTemporal);
	},
	dibujar: function() {
		maquinaEstados.estadoActual.dibujar();
	}
}