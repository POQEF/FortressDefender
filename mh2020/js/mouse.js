var mouse = {
	coordenadas: {x: -1, y: -1},
	siClick: false,
	iniciar: function() {
		canvaPrincipal.canva.addEventListener("mousemove", mouse.guardarCoordenadas);
		//se podría agregar "mouseout" para cuando se salga del canva
		//canvaPrincipal.canva.addEventListener("mousedown", mouse.guardarClick);
		//canvaPrincipal.canva.addEventListener("mouseup", mouse.borrarClick);
		canvaPrincipal.canva.addEventListener("click", mouse.guardarClick);
	},
	guardarCoordenadas: function(e) {
		/*if (mouse.teclas.indexOf(e.key) == -1) {
			mouse.teclas.push(e.key);
		}*/
        var ClientRect = canvaPrincipal.canva.getBoundingClientRect();
            mouse.coordenadas = {
                x: Math.round(e.clientX - ClientRect.left),
                y: Math.round(e.clientY - ClientRect.top)
            }
            //console.log("x: " + Math.round(e.clientX - ClientRect.left) + " y: " + Math.round(e.clientY - ClientRect.top));
	},
	guardarClick: function (e){
		mouse.siClick = true;
	},
	borrarClick: function(e) {
		mouse.siClick = false;
	}
};