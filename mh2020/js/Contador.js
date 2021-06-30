function Contador (tiempo, tipo) {
    this.tiempo = tiempo;
    this.tipo = tipo; //0 =hacia atrás o 1 =hacia adelante 
    this.tiempoActual = 0;
    if (this.tipo == 0) this.tiempoActual = tiempo;
	this.ultimaActualizacion = 0;
	this.estado = 'sin iniciar';
}

Contador.prototype.iniciar = function(tiempo) {
    this.tiempo = tiempo;
    this.tiempoActual = 0;
    this.ultimaActualizacion = 0;
    if (this.tipo == 0) this.tiempoActual = tiempo;
    this.estado = "conteo";
}
Contador.prototype.reiniciar = function(tiempo) {
    this.tiempo = tiempo;
    this.tiempoActual = 0;
    this.ultimaActualizacion = 0;
    if (this.tipo == 0) this.tiempoActual = tiempo;
    this.estado = "sin iniciar";
}
Contador.prototype.actualizar = function(){
    if (this.tipo == 0){
        if (this.tiempoActual > 0){
            let ahora = Date.now();
            let delta = (ahora - this.ultimaActualizacion)/1000;
            //if (delta > 1) delta = 0;
            if (this.ultimaActualizacion == 0) delta = 0;
            this.ultimaActualizacion = ahora;
            this.tiempoActual -= delta;
        }else{
            this.estado = "terminado";
        }
    }else{
        if (this.tiempoActual < this.tiempo){
            let ahora = Date.now();
            let delta = (ahora - this.ultimaActualizacion)/1000;
            if (delta > 1) delta = 0;
            this.ultimaActualizacion = ahora;
            this.tiempoActual += delta;
        }else{
            this.estado = "terminado";
        }
    }
}