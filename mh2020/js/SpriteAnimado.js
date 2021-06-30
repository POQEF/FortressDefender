function SpriteAnimado(nombre, rutaImagen, anchoSprite, altoSprite, cicloPasos, posicionMirada, framesPorSprite){
	this.nombre = nombre;
	this.rutaImagen = rutaImagen;
	this.imagenCargada = false;
	this.altoSprite = altoSprite;
	this.anchoSprite = anchoSprite;
	this.cicloPasos = cicloPasos //Array con la secuencia que debe de segir para dar pasos
	this.posicionMirada = posicionMirada; //objeto con propiedades arriba, abajo, derecha, iquierda / nos dice a dode esta mirando
	this.framesPorSprite = framesPorSprite; //Frames que dura un sprite

	this.imagen = new Image();

	this.imagen.src = this.rutaImagen;
}

SpriteAnimado.prototype.verificarCargaSpriteAnimado = function (){
	//sprite.imagen.src = sprite.rutaImagen;
	if(this.imagen.complete){
		this.imagenCargada = true;
	}else{
		alert("ha ocurrido un error " + this.imagen.complete);
	}
	
}

