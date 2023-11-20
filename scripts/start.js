const containerLineas = document.querySelector(".container-lineas");
const containerLetras = document.querySelector(".container-letras");
const containerLetrasIncorrectas = document.querySelector(".container-letras-incorrectas");
const listaPalabras = JSON.parse(localStorage.getItem('listaPalabras')) || ['HTML', 'CSS', 'JAVASCRIPT', 'ANGULAR', 'REACT', 'NODE']; /*DESPUES TENGO QUE BORRAR ESTO E IMPORTAR LA LISTA DEL ARCHIVO ingresarPalabra.js */
var palabraSecreta = '';

//CANVAS
var pantalla = document.querySelector("canvas");
var pincel = pantalla.getContext("2d");

/*ESTRUCTURA*/
pincel.fillStyle = "#0A3871"
pincel.fillRect(0,510,300,10);

function desistir() {
    //funcion para el boton "desistir"
}

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

var cantidadDeLetrasCorrectas = 0;

function dibujarLetraCorrecta(codigoMayuscula) {
    var cantidadDeLetrasIncorrectas = 0;
    for(var i = 0; i < palabraSecreta.length; i++) {
        if(codigoMayuscula == palabraSecreta[i]) {
            divLetraCorrecta = document.querySelector(`#container-letra${i}`);
            divLetraCorrecta.innerHTML = codigoMayuscula;
            cantidadDeLetrasCorrectas = cantidadDeLetrasCorrectas + 1;
        }
        else {
            cantidadDeLetrasIncorrectas = cantidadDeLetrasIncorrectas + 1;
        }
    }
    verificarSiSeCompletoLaPalabra(cantidadDeLetrasCorrectas);
    verificarSiLaLetraEsIncorrecta(cantidadDeLetrasIncorrectas, codigoMayuscula);
}

function verificarSiSeCompletoLaPalabra(cantidadDeLetrasCorrectas) {
    if(cantidadDeLetrasCorrectas == palabraSecreta.length) {
        ganaste();
        //SE MUESTRA CARTEL
    }
}

function verificarSiLaLetraEsIncorrecta(cantidadDeLetrasIncorrectas, codigoMayuscula) {
    if(cantidadDeLetrasIncorrectas == palabraSecreta.length) {
        dibujarLetraIncorrecta(codigoMayuscula);
    }
}

listaLetrasIncorrectas = [];

function dibujarLetraIncorrecta(codigoMayuscula) {
    listaLetrasIncorrectas.push(codigoMayuscula);
    console.log(listaLetrasIncorrectas);
    containerLetrasIncorrectas.innerHTML = listaLetrasIncorrectas.toString().replace(/,/g, " ");
    dibujarAhorcado();
}

// const listaDeGraficos = {1 : pincel.fillRect(50,510,10,-400), 2 : "Dibujando cabeza", 3 : "Dibujando tronco", 4 : "Dibujando pie izquierdo", 5 : "Dibujando pie derecho", 6 : "Dibujando brazo izquierdo"};

function dibujarAhorcado() {
    var contadorDeGraficos = listaLetrasIncorrectas.length;

    //DIBUJANDO HORCA
    if(contadorDeGraficos == 1) {
        pincel.fillRect(50,510,10,-400);
    }
    else if(contadorDeGraficos == 2) {
        pincel.fillRect(60,110,180,10);
    }
    else if(contadorDeGraficos == 3) {
        pincel.fillRect(230,120,10,50);
    }
    //DIBUJANDO CABEZA
    else if (contadorDeGraficos == 4) {
        pincel.arc(235, 209, 40, 0, 2 * 3.14);
        pincel.fill();
        pincel.beginPath();
        pincel.fillStyle = "white";
        pincel.arc(235, 209, 30, 0, 2 * 3.14);
        pincel.fill();
    }
    //DIBUJANDO TORSO
    else if (contadorDeGraficos == 5) {
        pincel.beginPath();
        pincel.fillStyle = "#0A3871";
        pincel.fillRect(230, 248, 10, 100);
    }
    //DIBUJANDO BRAZO IZQUIERDO
    else if (contadorDeGraficos == 6) {
        pincel.moveTo(230, 260);
        pincel.lineTo(205, 280);
        pincel.lineTo(210, 286);
        pincel.lineTo(230, 270);
        pincel.fill();
    }
    //DIBUJANDO BRAZO DERECHO
    else if (contadorDeGraficos == 7) {
        pincel.moveTo(240, 260);
        pincel.lineTo(265, 280);
        pincel.lineTo(260, 286);
        pincel.lineTo(240, 270);
        pincel.fill();
    }
    //DIBUJANDO PIERNA IZQUIERDA
    else if (contadorDeGraficos == 8) {
        pincel.moveTo(230, 343);
        pincel.lineTo(190, 393);
        pincel.lineTo(195, 398);
        pincel.lineTo(235, 348);
        pincel.fill();
    }
    //DIBUJANDO PIERNA DERECHA
    else if (contadorDeGraficos == 9) {
        pincel.moveTo(240, 343);
        pincel.lineTo(280, 393);
        pincel.lineTo(275, 398);
        pincel.lineTo(235, 348);
        pincel.fill();
        pincel.beginPath();
    }

    else if (contadorDeGraficos == 10) {
        finDelJuego();
    }

}

const containerInputYMensaje = document.querySelector(".container-input-y-mensaje");

function finDelJuego() {
    //dibujo del ahorcado y cartel
    mensaje = document.createElement("h");
    mensaje.innerHTML = "Fin del juego!";
    mensaje.className = "mensaje";
    containerInputYMensaje.append(mensaje);
    //boton para reiniciar el juego
}

function ganaste() {
    var mensaje = document.createElement("h");
    mensaje.innerHTML = "Ganaste, Felicidades!";
    mensaje.className = "ganaste";
    containerInputYMensaje.append(mensaje);
}

function crearPalabraNueva() {
    var palabraNueva = document.querySelector(".ingresarTexto").value;
    palabraNueva = palabraNueva.toUpperCase();
    listaPalabras.push(palabraNueva);
    console.log(listaPalabras);
}

crearPalabraSecreta(), mostrarGuiones();
console.log(listaPalabras);