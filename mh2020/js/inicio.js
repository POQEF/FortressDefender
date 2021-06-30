var inicio = {
	iniciadores: [
		/*dimensiones.iniciar(),
		mando.iniciar(),
		canvaPrincipal.iniciar(),
		teclado.iniciar(),
		mouse.iniciar(),
		maquinaEstados.iniciar(),
		buclePrincipal.iterar()*/
	],
	iniciarJuego: function() {
		canvaPrincipal.iniciar();
		mouse.iniciar();
		maquinaEstados.iniciar();
		buclePrincipal.iterar();
	}/*,
	encadenarInicios: function(iniciador) {
		if(iniciador) {
			iniciador(() => inicio.encadenarInicios(iniciadores.shift()));
		}
	}*/
	
};

function iniciarMinijuego (){
	cargarElementos.iniciar();
}

function continuarMinijuego (){//sin comprobar
	maquinaEstados.cambiarEstado(buclePrincipal.ultimoRegistro, listadoEstados.MENU_INICIAL, 0);
	buclePrincipal.iterar(buclePrincipal.ultimoRegistro);
}

function minijuegoTerminado(salida){
	//alert("Has terminado el minijuego de " + salida.minijuego + " con " + salida.puntos + " puntos.");
	//buclePrincipal.detener();
	console.log(salida);
	ranking(salida);
	
	//ranking(salida);
}

$(document).ready( function() {
	iniciarMinijuego();
});