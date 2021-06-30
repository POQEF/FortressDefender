function ObjetoAnimacion (sprite, vectores, x, y, siCiclico) {
	this.sprite = sprite;
	this.vectores = vectores; //array de vectores
	this.posicionX = x;
	this.posicionY = y;
	this.siCiclico = siCiclico; //boleano para saber si la animación se repite o no
	this.vectorActual = 0;
	this.contadorFrames = 0;
	this.siTermino = false;
}

ObjetoAnimacion.prototype.actualizar = function () {
	if (!this.siTermino) {
		if (this.contadorFrames <= this.vectores[this.vectorActual].tiempo) {

			switch (this.vectores[this.vectorActual].direccion) {
				case 1:
					this.posicionY -= this.vectores[this.vectorActual].velocidad;
				break;
				case 2:
					this.posicionY += this.vectores[this.vectorActual].velocidad;
				break;
				case 3:
					this.posicionX -= this.vectores[this.vectorActual].velocidad;
				break;
				case 4:
					this.posicionX += this.vectores[this.vectorActual].velocidad;
				break;
				case 5:
				break;
			}
			this.contadorFrames ++;

		}else{
			if (this.vectorActual == this.vectores.length - 1){
				if (this.siCiclico) {
					this.vectorActual = 0;
					this.contadorFrames = 0;
				}else{
					this.siTermino = true;
				}
			}else{
				this.vectorActual ++;
				this.contadorFrames = 0;
			}
		}
	} //Fin si se termino
	
}
ObjetoAnimacion.prototype.dibujar = function (){
	canvaPrincipal.dibujarImagenEstaticaEscalada(this.sprite.imagen, this.posicionX, this.posicionY, Math.round(this.sprite.anchoSprite/1.7), Math.round(this.sprite.altoSprite/1.7));
}