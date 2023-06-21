/*import { listaPalabras } from "./ingresarPalabra.js";*/
const containerLineas = document.querySelector(".container-lineas");

const listaPalabras = ['HTML', 'CSS', 'JAVASCRIPT', 'ANGULAR', 'REACT', 'NODE']; /*DESPUES TENGO QUE BORRAR ESTO E IMPORTAR LA LISTA DEL ARCHIVO ingresarPalabra.js */
var palabraSecreta = '';
function crearPalabraSecreta() {
    indice = Math.floor(Math.random() * listaPalabras.length)
    palabraSecreta = listaPalabras[indice];
    console.log(palabraSecreta);
    return palabraSecreta;
}

function mostrarGuiones() {
    for(var i = 0; i < palabraSecreta.length; i++) {
        newDiv = document.createElement("div");
        newDiv.className = "guion";
        containerLineas.append(newDiv);
    }
}
/*var pantalla = document.querySelector("canvas");
var pincel = pantalla.getContext("2d");

/*ESTRUCTURA*/
/*pincel.fillStyle = "#0A3871"
pincel.fillRect(0,510,300,10);
pincel.fillRect(50,510,10,-400);
pincel.fillRect(60,110,180,10);
pincel.fillRect(230,120,10,50);

/*EMPLIEZA EL CUERPO*/ 
/*pincel.arc(235,209,40,0,2*3.14);
pincel.fill();
pincel.beginPath();
pincel.fillStyle = "aquamarine";
pincel.arc(235,209,30,0,2*3.14);
pincel.fill();
/*torso*/
/*pincel.beginPath();
pincel.fillStyle = "#0A3871";
pincel.fillRect(230,248,10,100);
/*brazo izquierdo*/
/*pincel.moveTo(230,260);
pincel.lineTo(205,280);
pincel.lineTo(210,286);
pincel.lineTo(230,270);
pincel.fill();
/*brazo derecho*/
/*pincel.moveTo(240,260);
pincel.lineTo(265,280);
pincel.lineTo(260,286);
pincel.lineTo(240,270);
pincel.fill();
/*pierna izquierda*/
/*pincel.moveTo(230,343);
pincel.lineTo(190,393);
pincel.lineTo(195,398);
pincel.lineTo(235,348);
pincel.fill();
/*pierna derecha*/
/*pincel.moveTo(240,343);
pincel.lineTo(280,393);
pincel.lineTo(275,398);
pincel.lineTo(235,348);
pincel.fill();
pincel.beginPath();*/



