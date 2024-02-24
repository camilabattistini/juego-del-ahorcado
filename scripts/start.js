const containerLineas = document.querySelector(".container-lineas");
const containerLetras = document.querySelector(".container-letras");
const containerLetrasIncorrectas = document.querySelector(".container-letras-incorrectas");
var palabraSecreta = '';
var input = document.querySelector(".container-input");
// Se borra el contenido del input y se establece el enfoque
input.blur();
input.value = "";
input.focus();

var listaPalabras = localStorage.getItem("listaPalabras") ? JSON.parse(localStorage.getItem("listaPalabras")) : ['HTML','CSS','JAVASCRIPT','REACT','NODE'];

console.log("Lista de palabras: " + listaPalabras);

function guardarLista(palabra) {
    // Obtiene la lista actual del almacenamiento local
    let listaPalabras = localStorage.getItem("listaPalabras") ? JSON.parse(localStorage.getItem("listaPalabras")) : ['HTML','CSS','JAVASCRIPT','REACT','NODE'];

    // Agrega la palabra a la lista
    palabra = palabra.toUpperCase();

    // Agrega la palabra a la lista si no existe aún
    if (!listaPalabras.includes(palabra)) {
        listaPalabras.push(palabra);
    }
    else {
        alert("Esa palabra ya se encuentra guardada. Intentá de nuevo :D");
    }
    // Guarda la lista actualizada en el almacenamiento local
    localStorage.setItem("listaPalabras", JSON.stringify(listaPalabras));

    // Retrasa la redirección a "start.html" en 200 milisegundos
    setTimeout(() => {
        // Redirecciona a start.html
        window.location.href = "start.html";
    }, 200);
    console.log("Lista de palabras actualizada: " + listaPalabras);
}

function agregarPalabra() {
    const palabraNueva = document.getElementById("palabraNueva");
    const palabra = palabraNueva.value.trim(); // .trim() elimina los espacios en blanco antes y después del valor ingresado
    const contieneNumeros = /\d/.test(palabra); // Expresión regular para verificar si hay números en la palabra
    var expresionRegular = /[*/?¿.!|°¡;:{}'-]/;
    const contieneSimbolos = expresionRegular.test(palabra);


    if (palabra !== "" && !contieneNumeros && !contieneSimbolos) {
        palabraNueva.value = "";
        guardarLista(palabra); // Llama a la función guardarLista() para actualizar la lista y redireccionar a "start.html"
    }
    else {
        alert("Lo sentimos. Este valor no se puede ingresar ya que puede que contenga números, símbolos o que esté vacío :( intenta de nuevo");
    }
}



function desistir() {
    //funcion para el boton "desistir"
}

function crearPalabraSecreta() {
    // Selecciona aleatoriamente una palabra de listaPalabras y la guarda como "palabraSecreta"
    indice = Math.floor(Math.random() * listaPalabras.length)
    palabraSecreta = listaPalabras[indice];
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

function capturarEvento() {
    if (input.value !== "") {
        var codigo = input.value.toUpperCase().charCodeAt();
        if (codigo >= 65 && codigo <= 90) {
            var codigoMayuscula = String.fromCharCode(codigo);
            if (!listaLetrasIngresadas.includes(codigoMayuscula)) {
                listaLetrasIngresadas.push(codigoMayuscula); // si la lista no incluye la letra que estoy ingresando, se guarda
            }
            else { // sino, se muestra un cartel avisando que ya había ingresado esa letra antes
                alert("Ya ingresaste esta letra. Probá de nuevo :)");
            }
            dibujarLetraCorrecta(codigoMayuscula);
        }
        else {
            alert("Solo se permiten letras");
        }
        // Se borra el contenido del imput y se establece el enfoque cada vez que ingrese una letra nueva
        input.blur();
        input.value = "";
        input.focus();
    }
}

input.addEventListener("input", capturarEvento);


function dibujarLetraCorrecta(codigoMayuscula) {
    var cantidadDeLetrasIncorrectas = 0;
    for(var i = 0; i < palabraSecreta.length; i++) {
        if(codigoMayuscula == palabraSecreta[i]) {
            divLetraCorrecta = document.querySelector(`#container-letra${i}`);
            divLetraCorrecta.innerHTML = codigoMayuscula;
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
    containerLetrasIncorrectas.innerHTML = listaLetrasIncorrectas.toString().replace(/,/g, " ");
    dibujarAhorcado();
}


//CANVAS
var pantalla = document.querySelector("canvas");
var pincel = pantalla.getContext("2d");

/*ESTRUCTURA*/
pincel.fillStyle = "#0A3871"
pincel.fillRect(0,510,300,10);

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
        pincel.strokeStyle = "#0A3871";
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