function PopUp (arrayDeTextos, x, y, interlineado, margen, color, estiloTextoNormal, estiloTextoTitulo) {
	this.arrayDeTextos = arrayDeTextos;
	this.x = x;
	this.y = y;
	this.interlineado = interlineado;
	this.margen = margen;
	this.color = color;
	this.estiloTextoNormal = estiloTextoNormal;
	this.estiloTextoTitulo = estiloTextoTitulo || "";
	//this.anchoMaximo = anchoMaximo || -1; Por ahora no
	//this.anchoMaximo = altoMaximo || -1; Por ahora no

	this.anchoMayor = 0;
	this.altoTotal = 0;
}

PopUp.prototype.verificarTamanio = function () {
	if (this.estiloTextoTitulo != "") {
		var i = 0;
		canvaPrincipal.contexto.font = this.estiloTextoTitulo;
		this.anchoMayor = canvaPrincipal.contexto.measureText(this.arrayDeTextos[0]).width;
		this.altoTotal = 12 + this.interlineado;
		canvaPrincipal.contexto.font = this.estiloTextoNormal;
		i++;
	}
	for (i; i < this.arrayDeTextos.length; i++) {
		var aux = canvaPrincipal.contexto.measureText(this.arrayDeTextos[i]).width;
		if (aux > this.anchoMayor) {
			this.anchoMayor = aux;
		}
		this.altoTotal += (12 + this.interlineado);
	}
	this.altoTotal -= this.interlineado;
	this.altoTotal += (2 * this.margen) ;
	this.anchoMayor += (2 * this.margen);
	this.anchoMayor = Math.trunc(this.anchoMayor);
}

PopUp.prototype.dibujar = function () {
	var altoAux = this.margen;
	var i = 0;
	canvaPrincipal.contexto.fillStyle ="rgba(100,30,100,0.8)";
	//console.log( (this.x - Math.trunc(this.anchoMayor/2)) + ", " + (this.y - Math.trunc(this.altoTotal/2)) + ", " + this.anchoMayor + ", " + this.altoTotal);
	canvaPrincipal.contexto.fillRect( (this.x - Math.trunc(this.anchoMayor/2)), (this.y - Math.trunc(this.altoTotal/2)), this.anchoMayor, this.altoTotal);
	
	canvaPrincipal.contexto.fillStyle = this.color;
	canvaPrincipal.contexto.textAlign = "center";
	if (this.estiloTextoTitulo != ""){
		canvaPrincipal.contexto.font = this.estiloTextoTitulo;
		canvaPrincipal.contexto.fillText(this.arrayDeTextos[0], this.x, this.y - Math.trunc(this.altoTotal/2) + altoAux + 12);
		altoAux += (12 + this.interlineado);
		i++;
	}
	canvaPrincipal.contexto.font = this.estiloTextoNormal;
	for (i; i < this.arrayDeTextos.length; i++) {
		//console.log( (this.y - Math.trunc(this.altoTotal/2) + altoAux + 12) );
		canvaPrincipal.contexto.fillText(this.arrayDeTextos[i], this.x, this.y - Math.trunc(this.altoTotal/2) + altoAux + 12);
		altoAux += (canvaPrincipal.contexto.measureText(this.arrayDeTextos[0]).height + this.interlineado);
	}
}