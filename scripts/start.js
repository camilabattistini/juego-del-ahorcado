/*import { listaPalabras } from "./ingresarPalabra.js";*/
const containerLineas = document.querySelector(".container-lineas");
const containerLetras = document.querySelector(".container-letras");
const containerLetrasIncorrectas = document.querySelector(".container-letras-incorrectas");

const listaPalabras = ['HTML', 'CSS', 'JAVASCRIPT', 'ANGULAR', 'REACT', 'NODE']; /*DESPUES TENGO QUE BORRAR ESTO E IMPORTAR LA LISTA DEL ARCHIVO ingresarPalabra.js */
var palabraSecreta = '';
function crearPalabraSecreta() {
    indice = Math.floor(Math.random() * listaPalabras.length)
    palabraSecreta = listaPalabras[indice];
    console.log(palabraSecreta);
    return palabraSecreta;
}

/*Muestra guiones y crea los divs para cada letra de la palabra */
function mostrarGuiones() {
    for(var i = 0; i < palabraSecreta.length; i++) {
        newDiv = document.createElement("div");
        newDivLetra = document.createElement("div");
        newDiv.className = "guion";
        newDivLetra.setAttribute("id", `container-letra${i}`);
        newDivLetra.className = 'container-letra';
        containerLineas.append(newDiv);
        containerLetras.append(newDivLetra);
    }
}

function capturarEvento(event) {
    var codigo = event.which || event.keyCode;
    if(codigo >= 65 && codigo <= 90) {
        var codigoMayuscula = String.fromCharCode(codigo);
        dibujarLetraCorrecta(codigoMayuscula);
    }
    else {
        console.log("Solo se permiten letras");
    }
}

function dibujarLetraCorrecta(codigoMayuscula) {
    var cantidadDeLetrasIncorrectas = 0;
    for(var i = 0; i < palabraSecreta.length; i++) {
        if(codigoMayuscula == palabraSecreta[i]) {
            divLetraCorrecta = document.querySelector(`#container-letra${i}`);
            divLetraCorrecta.innerHTML = codigoMayuscula;
            //ACA TENGO QUE ARMAR EL CODIGO PARA QUE LA LETRA SE MUESTRE POR PANTALLA
        }
        else {
            cantidadDeLetrasIncorrectas = cantidadDeLetrasIncorrectas + 1;
        }
    }
    verificarSiLaLetraEsIncorrecta(cantidadDeLetrasIncorrectas, codigoMayuscula);
}

function verificarSiLaLetraEsIncorrecta(cantidadDeLetrasIncorrectas, codigoMayuscula) {
    console.log(`La cantidad de letras incorrectas es: ${cantidadDeLetrasIncorrectas}`);
    if(cantidadDeLetrasIncorrectas == palabraSecreta.length) {
        dibujarLetraIncorrecta(codigoMayuscula);
        console.log('Se muestra una parte del dibujo');
    }
}

listaLetrasIncorrectas = [];

function dibujarLetraIncorrecta(codigoMayuscula) {
    listaLetrasIncorrectas.push(codigoMayuscula);
    console.log(listaLetrasIncorrectas);
    containerLetrasIncorrectas.innerHTML = listaLetrasIncorrectas.toString().replace(/,/g, " ");
}



crearPalabraSecreta(), mostrarGuiones();

var pantalla = document.querySelector("canvas");
var pincel = pantalla.getContext("2d");

/*ESTRUCTURA*/
pincel.fillStyle = "#0A3871"
pincel.fillRect(0,510,300,10);
/*pincel.fillRect(50,510,10,-400);
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



