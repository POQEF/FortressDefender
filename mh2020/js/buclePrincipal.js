var buclePrincipal = {
	idEjecucion: null,
	ultimoRegistro: 0,
	aps: 0,
	fps: 0,
	estado: true,
	iterar: function(registroTemporal) {
		buclePrincipal.idEjecucion = window.requestAnimationFrame(buclePrincipal.iterar);
		buclePrincipal.actualizar(registroTemporal);
		canvaPrincipal.borrarContenido();
		buclePrincipal.dibujar();	

		if(registroTemporal - buclePrincipal.ultimoRegistro > 999) {
			buclePrincipal.ultimoRegistro = registroTemporal;
			console.log("APS: " + buclePrincipal.aps + " | FPS: " + buclePrincipal.fps);
			console.log("id = " + buclePrincipal.idEjecucion);
			buclePrincipal.aps = 0;
			buclePrincipal.fps = 0;
		}
	},
	detener: function() {
		window.cancelAnimationFrame(buclePrincipal.idEjecucion);
	},
	actualizar: function(registroTemporal) {
		//mando.actualizar();
		maquinaEstados.actualizar(registroTemporal);
		buclePrincipal.aps++;
	},
	dibujar: function(registroTemporal) {
		maquinaEstados.dibujar();
		buclePrincipal.fps++;
	}
};