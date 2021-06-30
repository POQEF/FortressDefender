function Enemigo (sprite, posicionX, posicionY, direccionActual, velocidadX, velocidadY) {
	this.sprite = sprite;
	this.posicionX= posicionX; //sobre la esquina superior izquierda del sprite
	this.posicionY = posicionY; //sobre la esquina superior izquierda del sprite

	this.velocidadX = velocidadX;
	this.velocidadY = velocidadY;

	this.direccionActual = direccionActual;
	this.spriteActual = 0; // 0 = paso izquierda, 1 = parado, 2 = paso derecha

	this.contadorFrames = 0;

	this.siLlego = false;

	this.rectanguloColision = new Rectangulos (this.sprite.anchoSprite, this.sprite.altoSprite, this.posicionX, this.posicionY);
	this.rectanguloClick = new Rectangulos (this.sprite.anchoSprite+20, this.sprite.altoSprite+20, this.posicionX-10, this.posicionY-10);
}
Enemigo.prototype.actualizar = function (torre) {
	if(this.posicionX + this.sprite.anchoSprite < torre.x || this.posicionX > torre.x + torre.ancho){
		this.soporteMover(this.velocidadX, 0);
	}
	if(this.posicionY + this.sprite.altoSprite < torre.y || this.posicionY > torre.y + torre.alto){
		this.soporteMover(0, this.velocidadY);
	}
	//this.soporteMover(this.velocidadX, this.velocidadY);

    this.contadorFrames++;
    if (this.contadorFrames >= this.sprite.framesPorSprite) {
      this.contadorFrames = 0;
      this.spriteActual++;
      if (this.spriteActual >= this.sprite.cicloPasos.length) {
        this.spriteActual = 0;
      }
    }
	if (this.rectanguloColision.siCruza(torre)) this.siLlego = true;
}
Enemigo.prototype.soporteMover = function (deltaX, deltaY) {
  //if (this.posicionX + deltaX > 0 && this.posicionX + this.sprite.anchoSprite + deltaX < canvaPrincipal.canva.width) {
    this.posicionX += deltaX;
	this.rectanguloColision.x += deltaX;
	this.rectanguloClick.x += deltaX;
  //}
  //if (this.posicionY + deltaY > 0 && this.posicionY + this.sprite.altoSprite + deltaY -10 < canvaPrincipal.canva.height) {
    this.posicionY += deltaY;
	this.rectanguloColision.y += deltaY;
	this.rectanguloClick.y += deltaY;
  //}
  //this.direccionActual = direction;

}
Enemigo.prototype.dibujar = function () {
	//canvaPrincipal.dibujarRectangulo(this.rectanguloClick.x, this.rectanguloClick.y, this.rectanguloClick.ancho, this.rectanguloClick.alto, "rgba(10, 10, 10, 0.4)");
	canvaPrincipal.dibujarImagenDinamica(this.sprite.imagen,
		this.sprite.cicloPasos[this.spriteActual] * this.sprite.anchoSprite,
		this.direccionActual * this.sprite.altoSprite, //10 significa el espacio en blanco sobre el sprite
		this.sprite.anchoSprite,
		this.sprite.altoSprite,

		this.posicionX,
		this.posicionY,
		this.sprite.anchoSprite /* * 0.7 */,
		this.sprite.altoSprite /* * 0.7 */);
	
}