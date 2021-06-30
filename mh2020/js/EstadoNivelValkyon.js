function EstadoNivelValkyon(idEstado, idMapa, fondo, objetosColisiones, objetosPersonalizadosNivel) {
	this.idEstado = idEstado;
	this.idMapa = idMapa;
	this.fondo = fondo; //objeto Fondo
	this.objetosColisiones = objetosColisiones;  //Se recibe un array de objetos Rectangulos
	this.objetosPersonalizadosNivel = objetosPersonalizadosNivel; //Objeto que contiene arrays de objetos variados para un nivel especifico

	this.siTransicionEntrada = false;
	this.contadorFrames = 0;

	canvaPrincipal.contexto.fillStyle ="rgba(100,30,100,0.8)";
	canvaPrincipal.contexto.fillRect(0, 0, canvaPrincipal.canva.width, canvaPrincipal.canva.height);
	canvaPrincipal.contexto.fillStyle = this.color;

	this.enemigos = [];
	this.contadorPrincipal = new Contador(180, 1);
	this.contadorEnemigos = new Contador(0.5, 0);


	this.puntos = 0;
	this.vidas = 3;
	this.siPerdio = false;
	this.gameOver = false;
}

EstadoNivelValkyon.prototype.actualizar = function(registroTemporal) {
	if (this.siTransicionEntrada){
		if(this.contadorPrincipal.estado != "terminado" && !this.gameOver){
			this.contadorPrincipal.actualizar();

			//comprobar si se mato a enemigo
			if (mouse.siClick) this.matarEnemigo();
			mouse.borrarClick();

			//se actualiza el array de los enemigos cada medio segundo
			if(this.contadorEnemigos.estado == "terminado"){
				this.actualizarEnemigos();
				this.contadorEnemigos.iniciar(0.5);
			}else{
				this.contadorEnemigos.actualizar();
			}

			//mover a los enemigos
			for (let i = 0; i < this.enemigos.length; i++) {
				if(!this.enemigos[i].siLlego){
					this.enemigos[i].actualizar(this.objetosColisiones[0]);
				}else{
					this.ataqueEnemigo(i);
					i--;
				}
			}
			
		}else{
			if(this.gameOver){
				maquinaEstados.cambiarEstado(listadoEstados.POST_JUEGO, 200, {"fondo": new Fondo("Fortaleza", "mh2020/img/niveles/fortaleza.png", 800, 450), "puntos": this.puntos});
			}else{
				this.gameOver = true;
			}
			
		}
		
	} else {
		this.contadorFrames++;
		if (this.contadorFrames >= 90) {
			this.siTransicionEntrada = true;
			this.contadorFrames = 0;
			this.contadorPrincipal.iniciar(180);
			this.contadorEnemigos.iniciar(0.5);
		}
	}
	
}

EstadoNivelValkyon.prototype.dibujar = function() {
	if (this.siTransicionEntrada == true) {

		//Dibujar fondo
		canvaPrincipal.dibujarImagenEstatica(this.fondo.imagen, 0, 0);

		//Dibujar textos
		canvaPrincipal.dibujarTexto("Puntos: " + this.puntos, 50, 30, "13px pixel", "#FFF", "left");
		canvaPrincipal.dibujarTexto("Vidas:", 400, 30, "19px pixel", "#FFF", "center");
		canvaPrincipal.dibujarTexto(this.vidas, 400, 60, "17px pixel", "#FFF", "center");
		canvaPrincipal.dibujarTexto("Tiempo: " + this.contadorPrincipal.tiempoActual.toFixed(1), 750, 30, "13px pixel", "#FFF", "right");

		//Dibujar enemigos
		for (let i = 0; i < this.enemigos.length; i++) {
			this.enemigos[i].dibujar();
		}
		
		
		if(this.gameOver){
			if(this.siPerdio){
				var popup = new PopUp (["Has perdido", "Puntos conseguidos: "+ this.puntos], (canvaPrincipal.canva.width/2), (canvaPrincipal.canva.height/2), 15, 15, "#FFF", "12px pixel", "20px pixel_bold");
				popup.verificarTamanio();
				popup.dibujar();
			}else{
				var popup = new PopUp (["Se ha agotado el tiempo", "Puntos conseguidos: "+ this.puntos], (canvaPrincipal.canva.width/2), (canvaPrincipal.canva.height/2), 15, 15, "#FFF", "12px pixel", "20px pixel_bold");
				popup.verificarTamanio();
				popup.dibujar();
			}
		}
	} else {
		canvaPrincipal.contexto.fillStyle ="rgba(0,0,0,1)";
		canvaPrincipal.contexto.fillRect(0, 0, canvaPrincipal.canva.width, canvaPrincipal.canva.height);
	}
	
	
}
EstadoNivelValkyon.prototype.actualizarEnemigos = function (){
	
	//decidir el maximo de enemigos a generar en base al tiempo de juego.
	let numeroMaxEnemigos = 2;
	if (this.contadorPrincipal.tiempoActual < 10){
		numeroMaxEnemigos = 2;
	}else if (this.contadorPrincipal.tiempoActual >= 10 && this.contadorPrincipal.tiempoActual <= 20){
		numeroMaxEnemigos= 3;
	}else if (this.contadorPrincipal.tiempoActual > 20 && this.contadorPrincipal.tiempoActual <= 30){
		numeroMaxEnemigos = 4;
	}else{
		numeroMaxEnemigos = 10;
	}
	
	//elegir al azar el num. de enemigos con el maximo decidido
	let numeroEnemigos = Math.floor(Math.random() * numeroMaxEnemigos);
	
	//se guarda el tiempo actual y el tiempo de dentro de 1 segundo que es el lapso en el que se generan los enemigos
	let minTiempo = this.contadorPrincipal.tiempoActual * 1000;
	let maxTiempo = minTiempo + 1001;
	
	let lugaresElegidos = {
		arriba: [],
		abajo: [],
		izquierda: [],
		derecha: []
	};
	
	//generar enemigos
	for (let i = 0; i < numeroEnemigos; i++) {
		
		//elegir al azar un momento dentro del min y max guardados anteriormente y un lado donde aparecerá.
		let tiempoElegido =  Math.floor(Math.random() * (maxTiempo - minTiempo)) + minTiempo;
		let ladoElegido = Math.floor(Math.random() * 4); //0 arriba, 1 abajo, 2 izquierda, 3 derecha
		
		//elegir un punto en el lado correspondiente.
		//let ban = false;
		let espacio;
		//ban = false;
		if(ladoElegido == 0 || ladoElegido == 1){
			espacio = Math.floor(Math.random() * 801);
		}else{
			espacio = Math.floor(Math.random() * 451);
		}

		//asignar demás propiedades: direccion, velocidad en x e y, etc. en base al lado elegido.
		let pos;
		let x, y;
		let direccion;
		let velX, velY;
		if(ladoElegido == 2){
			pos = [0, 1, 2, 3, 4, 5];
			x = -32;
			y = espacio;
			direccion = 1;
			velX = 1;
			if (espacio + 32 > 225){
				velY= -1;
			}else{
				velY = 1;
			}
		}else if (ladoElegido == 3){
			pos = [5, 4, 3, 2, 1, 0];
			x = 832;
			y = espacio;
			direccion = 0;
			velX = -1;
			if (espacio + 32 > 225){
				velY= -1;
			}else{
				velY = 1;
			}
		}else if(ladoElegido == 0){
			y = -32;
			x = espacio;
			velY = 1;
			if (espacio + 32 > 400){
				velX= -1;
				pos = [5, 4, 3, 2, 1, 0];
				direccion = 0;
			}else{
				velX = 1;
				pos = [0, 1, 2, 3, 4, 5];
				direccion = 1;
			}
		}else if (ladoElegido == 1){
			y = 832;
			x = espacio;
			direccion = 0; //cambiar esto xD
			velY = -1;
			if (espacio + 32 > 400){
				velX= -1;
				pos = [5, 4, 3, 2, 1, 0];
				direccion = 0;
			}else{
				velX = 1;
				pos = [0, 1, 2, 3, 4, 5];
				direccion = 1;
			}
		}else{
			console.error("auida");
		}
		
		//se agrega el enemigo al array de enemigos
		this.enemigos.push(
			new Enemigo (
				new SpriteAnimado("Fizz", "mh2020/img/personas/monitoAzul.png", 32, 32, pos, {izquierda: 0, derecha: 1}, 5),
				x, y, direccion, velX, velY
			)
		);
	}
}
EstadoNivelValkyon.prototype.ataqueEnemigo = function (index){
	if(this.vidas > 0) this.vidas--;
	this.enemigos.splice(index, 1);
	if (this.vidas == 0){
		this.gameOver = true;
		this.siPerdio = true;
	}
}
EstadoNivelValkyon.prototype.matarEnemigo = function (){
	let ban = false;
	let enemigoSeleccionado = -1;
	for (let i = 0; i < this.enemigos.length && !ban; i++) {
		if (
			mouse.coordenadas.x >= this.enemigos[i].rectanguloClick.x &&
			mouse.coordenadas.x <= this.enemigos[i].rectanguloClick.x + this.enemigos[i].rectanguloClick.ancho &&
			mouse.coordenadas.y >= this.enemigos[i].rectanguloClick.y &&
			mouse.coordenadas.y <= this.enemigos[i].rectanguloClick.y + this.enemigos[i].rectanguloClick.alto
		) {
			enemigoSeleccionado = i;
			ban = true;
		}
		
	}
	if(ban){
		this.puntos++;
		this.enemigos.splice(enemigoSeleccionado, 1);
	}
}