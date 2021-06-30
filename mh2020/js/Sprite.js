function Sprite(rutaImagen, anchoSprite, altoSprite){
	this.rutaImagen = rutaImagen;
	this.imagenCargada = false;
	this.altoSprite = altoSprite;
	this.anchoSprite = anchoSprite;
	this.imagen = new Image();

	this.imagen.src = this.rutaImagen;
}

Sprite.prototype.verificarCargaSprite = function (){
	//sprite.imagen.src = sprite.rutaImagen;
	if(this.imagen.complete){
		this.imagenCargada = true;
	}else{
		alert("ha ocurrido un error " + this.imagen.complete);
	}
	
}

