function EstadoPostNivel(datos) {
    this.fondo = datos.fondo;
	this.puntos = datos.puntos;
	this.botones = [
		{
			"id": "regresar",
			"x": 400,
			"y": 260,
			"rectangulo": {
				"x": 320,
				"y": 230,
				"alto": 35,
				"ancho": 160
			},
			"Hover": false,
			"texto": "Regresar",
			"color": "#D00",
			"colorNormal": "#D00",
			"colorHover": "#e4710d",
			"accion": function (){
				maquinaEstados.cambiarEstado(listadoEstados.MENU_INICIAL, 100);
			}
		}
	];
}

EstadoPostNivel.prototype.actualizar = function(registroTemporal) {
	this.hover(this.botones);
	this.click(this.botones);
}

EstadoPostNivel.prototype.dibujar = function() {
	canvaPrincipal.dibujarImagenEstatica(this.fondo.imagen, 0, 0);
	canvaPrincipal.dibujarRectangulo(200, 120, 400, 210, "#000C");
	canvaPrincipal.dibujarTexto("Haz obtenido " + this.puntos + " puntos", 400, 200, "20px pixel", "#fff", "center");
	
	//boton instrucciones
    canvaPrincipal.dibujarTexto(
        this.botones[0].texto,
        this.botones[0].x,
        this.botones[0].y,
        "18px pixel",
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
}

EstadoPostNivel.prototype.hover = function(botonesAComprobar) {
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

EstadoPostNivel.prototype.click = function(botonesAComprobar){
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