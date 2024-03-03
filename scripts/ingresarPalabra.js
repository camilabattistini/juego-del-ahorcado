var listaPalabras = localStorage.getItem("listaPalabras") ? JSON.parse(localStorage.getItem("listaPalabras")) : ['HTML','CSS','JAVASCRIPT','REACT','NODE'];
//console.log("Lista de palabras: " + listaPalabras);

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
    //console.log("Lista de palabras actualizada: " + listaPalabras);
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