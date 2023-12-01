const containerLineas = document.querySelector(".container-lineas");
const containerLetras = document.querySelector(".container-letras");
const containerLetrasIncorrectas = document.querySelector(".container-letras-incorrectas");
var palabraSecreta = '';
var input = document.querySelector(".container-input");
input.blur();
input.value = "";
input.focus();

function guardarLista(palabra) {
    // Obtiene la lista actual del almacenamiento local
    let listaPalabras = localStorage.getItem("listaPalabras") ? JSON.parse(localStorage.getItem("listaPalabras")) : ['HTML','CSS','JAVASCRIPT','REACT','NODE'];
    // Agrega la palabra a la lista
    listaPalabras.push(palabra);
    // Guarda la lista actualizada en el almacenamiento local
    localStorage.setItem("listaPalabras", JSON.stringify(listaPalabras));
    // Retrasa la redirección a "start.html" en 200 milisegundos
    setTimeout(() => {
        // Redirecciona a start.html
        window.location.href = "start.html";
    }, 200);
}

function agregarPalabra() {
    const palabraNueva = document.getElementById("palabraNueva");
    const palabra = palabraNueva.value.trim();

    if (palabra !== "") {
        palabraNueva.value = "";
        guardarLista(palabra); // Llama a la función guardarLista() para actualizar la lista y redireccionar a "start.html"
    }
}

// Obtiene la lista actual del almacenamiento local
let listaPalabras = localStorage.getItem("listaPalabras") ? JSON.parse(localStorage.getItem("listaPalabras")) : ['HTML','CSS','JAVASCRIPT','REACT','NODE'];
// Actualiza la lista visible en la página
listaPalabras = listaPalabras.map(palabra => palabra.toUpperCase());
console.log(listaPalabras);





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

let listaLetrasIngresadas = []; // es la lista que se me arma y se va actualizando cada vez que yo ingrese una letra nueva.
// la función de esta lista es que si yo quiero ingresar de nuevo la misma letra, que no se guarde de nuevo.

function capturarEvento(event) {
    var codigo = event.which || event.keyCode;
    if(codigo >= 65 && codigo <= 90) {
        var codigoMayuscula = String.fromCharCode(codigo);
        if(!listaLetrasIngresadas.includes(codigoMayuscula)) {
            listaLetrasIngresadas.push(codigoMayuscula);
        }
        else {
            alert("Ya ingresaste esta letra. Probá de nuevo :)");
        }
        dibujarLetraCorrecta(codigoMayuscula);
        console.log("la lista de letras ingresadas es: " + listaLetrasIngresadas);
    }
    else {
        console.log("Solo se permiten letras");
    }
    input.blur();
    input.value = "";
    input.focus();
}

var cantidadDeLetrasCorrectas = 0;

// quiero que cuando escriba la misma letra que ya había escrito, esta se considere como "ya usada"
// y que no se vuelva a contar (es decir, en el contador de cantidad de letras correctas no se tiene que agregar + 1)
//
// "si la letra es igual a una de las letras que ya escribí, entonces no se considera"
//
// lo que quiero es que esa lista final de las letras que ingresé se compare con la lista
// de las letras que contiene la palabra secreta. Entonces, si mi lista contiene todas
// las letras de a otra lista, significa que gané.

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
    verificarSiSeCompletoLaPalabra(listaLetrasIngresadas);
    verificarSiLaLetraEsIncorrecta(cantidadDeLetrasIncorrectas, codigoMayuscula);
}

function verificarSiSeCompletoLaPalabra(listaLetrasIngresadas) {
    // vuelvo a la palabra secreta en una lista
    palabraSecretaSplit = Array.from(new Set(palabraSecreta.split("")));
    console.log("palabraSecretaSplit: " + palabraSecretaSplit);
    if(Array.isArray(listaLetrasIngresadas) && palabraSecretaSplit.every(elemento => listaLetrasIngresadas.includes(elemento))) {
        ganaste();
        //SE MUESTRA CARTEL
    }
}

function verificarSiLaLetraEsIncorrecta(cantidadDeLetrasIncorrectas, codigoMayuscula) {
    if(cantidadDeLetrasIncorrectas == palabraSecreta.length) {
        if(!listaLetrasIncorrectas.includes(codigoMayuscula)) {
            dibujarLetraIncorrecta(codigoMayuscula);
        }
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
        //pincel.beginPath();
    }

    else if (contadorDeGraficos == 10) {
        // Dibujando la soga
        pincel.beginPath();
        pincel.fillStyle = "#0A3871";
        pincel.lineWidth = 5; // Ampliar el grosor de la soga
        pincel.moveTo(199, 217);
        pincel.quadraticCurveTo(235, 300, 271, 217);
        pincel.stroke();
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