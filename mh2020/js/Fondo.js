function Fondo(nombre, rutaImagen, ancho, alto){
	this.nombre = nombre;
	this.rutaImagen = rutaImagen;
	this.imagenCargada = false;
	this.alto = alto;
	this.ancho = ancho;
	this.imagen = new Image();

	this.imagen.src = this.rutaImagen;
}

Fondo.prototype.verificarCargaFondo = function (){
	//sprite.imagen.src = sprite.rutaImagen;
	if(this.imagen.complete){
		this.imagenCargada = true;
	}else{
		alert("ha ocurrido un error " + this.imagen.complete);
	}
	
}

Fondo.prototype.establecerComoFondo = function () {
	
}
