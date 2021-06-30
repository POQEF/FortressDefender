function EstadoMenuInicial(imgs) {
    this.instruccion = -1;
    this.imgs = imgs;
	this.ultimoRegistroTemporal = -1;
	this.objetosAnimaciones = []; //array de objetos "ObjetoAnimacion"
	this.botones = [
		{
			"id": "instrucciones",
			"x": 335,
			"y": 240,
			"rectangulo": {
				"x": 230,
				"y": 210,
				"alto": 35,
				"ancho": 209
			},
			"Hover": false,
			"texto": "Instrucciones",
			"color": "#D00",
			"colorNormal": "#D00",
			"colorHover": "#e4710d",
			"accion": function (){
				maquinaEstados.estadoActual.instruccion = 1;
			}
		},
		{
			"id": "iniciar",
			"x": 525,
			"y": 240,
			"rectangulo": {
				"x": 478,
				"y": 210,
				"alto": 35,
				"ancho": 93
			},
			"color": "#D00",
			"colorNormal": "#D00",
			"colorHover": "#e4710d",
			"Hover": false,
			"texto": "Iniciar",
			"accion": function (){
				maquinaEstados.cambiarEstado(listadoEstados.NIVEL, 3);
			}
		},
		{
			"id": "menu",
			"x": 400,
			"y": 380,
			"rectangulo": {
				"x": 353,
				"y": 353,
				"alto": 35,
				"ancho": 94
			},
			"color": "#D00",
			"colorNormal": "#D00",
			"colorHover": "#e4710d",
			"Hover": false,
			"texto": "Menú",
			"accion": function (){
				maquinaEstados.estadoActual.instruccion = -1;
			}
		}
		
	];
}

EstadoMenuInicial.prototype.actualizar = function(registroTemporal) {
	this.ultimoRegistroTemporal = registroTemporal;
    let botonesAComprobar = [];
    if(this.instruccion == -1){
        botonesAComprobar.push(this.botones[0]);
        botonesAComprobar.push(this.botones[1]);
    }else if (this.instruccion == 1){
        botonesAComprobar.push(this.botones[2]);
    }
    
	this.hover(botonesAComprobar);
	this.click(botonesAComprobar);
}

EstadoMenuInicial.prototype.dibujar = function() {
	
	if(this.instruccion == -1){
        this.dibujarMI();
    }else if (this.instruccion == 1){
        this.dibujarI1();
    }
}

EstadoMenuInicial.prototype.dibujarMI = function(){
	canvaPrincipal.dibujarRectangulo(0, 0, 800, 448, "#000");
	canvaPrincipal.dibujarTexto("Fortress Defender", 400, 170, "45px pixel", "#fff", "center");
	//canvaPrincipal.dibujarTexto("Instrucciones", 335, 230, "25px pixel", "#D00", "center");
	//canvaPrincipal.dibujarTexto("Iniciar", 525, 230, "25px pixel", "#D00", "center");
	
	//boton instrucciones
    canvaPrincipal.dibujarTexto(
        this.botones[0].texto,
        this.botones[0].x,
        this.botones[0].y,
        "25px pixel",
        this.botones[0].color,
        "center"
    );
    /*canvaPrincipal.dibujarRectangulo(
        this.botones[0].rectangulo.x,
        this.botones[0].rectangulo.y,
        this.botones[0].rectangulo.ancho,
        this.botones[0].rectangulo.alto,
        "#FFFFFF55"
    );*/
	
	//boton iniciar
    canvaPrincipal.dibujarTexto(
        this.botones[1].texto,
        this.botones[1].x,
        this.botones[1].y,
        "25px pixel",
        this.botones[1].color,
        "center"
    );
    /*canvaPrincipal.dibujarRectangulo(
        this.botones[1].rectangulo.x,
        this.botones[1].rectangulo.y,
        this.botones[1].rectangulo.ancho,
        this.botones[1].rectangulo.alto,
        "#FFFFFF55"
    );*/
}

EstadoMenuInicial.prototype.dibujarI1 = function(){
	canvaPrincipal.dibujarImagenEstatica(this.imgs[0].imagen, 0, 0);
	canvaPrincipal.dibujarRectangulo(60, 30, 680, 388, "#000B");
	
	canvaPrincipal.dibujarTexto("Debes proteger a la fortaleza de los  enemigos, para ello debes de", 80, 130, "14px pixel", "#fff", "left");
	canvaPrincipal.dibujarTexto("hacer click sobre ellos antes de que lleguen, de lo contrario se comeran", 80, 155, "14px pixel", "#fff", "left");
	canvaPrincipal.dibujarTexto("toda la comida.", 80, 180, "14px pixel", "#fff", "left");
	canvaPrincipal.dibujarTexto("Tienes tres vidas, así que no los dejes pasar.", 80, 230, "14px pixel", "#fff", "left");
	
	//boton menu
    canvaPrincipal.dibujarTexto(
        this.botones[2].texto,
        this.botones[2].x,
        this.botones[2].y,
        "25px pixel",
        this.botones[2].color,
        "center"
    );
    /*canvaPrincipal.dibujarRectangulo(
        this.botones[2].rectangulo.x,
        this.botones[2].rectangulo.y,
        this.botones[2].rectangulo.ancho,
        this.botones[2].rectangulo.alto,
        "#FFFFFF55"
    );*/
	
	
	//boton atras
    /*canvaPrincipal.dibujarTexto(
        this.botones[6].texto,
        this.botones[6].x,
        this.botones[6].y,
        "25px pixel",
        this.botones[6].color,
        "center"
    );*/
    /*canvaPrincipal.dibujarRectangulo(
        this.botones[4].rectangulo.x,
        this.botones[4].rectangulo.y,
        this.botones[4].rectangulo.ancho,
        this.botones[4].rectangulo.alto,
        "#FFFFFF55"
    );*/
}

EstadoMenuInicial.prototype.hover = function(botonesAComprobar) {
	botonesAComprobar.forEach(e => {
		if (
			mouse.coordenadas.x >= e.rectangulo.x &&
			mouse.coordenadas.x <= e.rectangulo.x + e.rectangulo.ancho &&
			mouse.coordenadas.y >= e.rectangulo.y &&
			mouse.coordenadas.y <= e.rectangulo.y + e.rectangulo.alto
		) {
			e.color = e.colorHover;
		}else{
            e.color = e.colorNormal;
        }
	});
}

EstadoMenuInicial.prototype.click = function(botonesAComprobar){
	if(mouse.siClick){
		let ban = false;
		for(let i = 0; i < botonesAComprobar.length && !ban; i++){
			const e = botonesAComprobar[i];
			if (
				mouse.coordenadas.x >= e.rectangulo.x &&
				mouse.coordenadas.x <= e.rectangulo.x + e.rectangulo.ancho &&
				mouse.coordenadas.y >= e.rectangulo.y &&
				mouse.coordenadas.y <= e.rectangulo.y + e.rectangulo.alto
			) {
				ban = true;
				if(e.accion == null) {
					alert("Botón sin acción");
					return;
				}
				e.accion();
				console.log(e);
			}
		}
		mouse.borrarClick();
	}
}