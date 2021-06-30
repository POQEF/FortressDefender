<?php

$fecha = new DateTime();
$pre = "mh2020/";

$fuentesJavascript = array(
	"js/canvaPrincipal.js",
	"js/PopUp.js",
	"js/Rectangulos.js",
	"js/Vector.js",
	"js/ObjetoAnimacion.js",
	"js/Contador.js",
	"js/Sprite.js",
	"js/mouse.js",
	"js/objetosEscalerasNevra.js",
	"js/arrayObjetosColisiones_NivelNightForest.js",
	"js/arrayObjetosColisiones_MapamundiPueblo.js",
	"js/arrayObjetosNiveles_MapamundiPueblo.js",
	"js/listadoEstados.js",
	"js/controlesTeclado.js",
	"js/teclado.js",
	"js/SpriteAnimado.js",
	"js/Jugador.js",
	"js/Enemigo.js",
	"js/EstadoMenuInicial.js",
	"js/EstadoMapamundi2.js",
	"js/EstadoPostNivel.js",
	"js/EstadoNivel.js",
	"js/EstadoNivelEzarel.js",
	"js/EstadoNivelNevra.js",
	"js/EstadoNivelValkyon.js",
	"js/maquinaEstados.js",
	"js/buclePrincipal.js",
	"js/Fondo.js",
	"js/inicio.js",
	"js/cargarElementos.js"
);

foreach($fuentesJavascript as $fuente) {
	echo '<script src="' . $pre . $fuente . '?' . $fecha -> getTimestamp() . '"></script>';
}
