/*FUNCION PARA GUARDAR PALABRAS NUEVAS EN EL PROGRAMA*/
const listaPalabras = [];

function crearPalabraNueva() {
    var palabraNueva = document.querySelector(".ingresarTexto").value;
    palabraNueva = palabraNueva.toUpperCase();
    listaPalabras.push(palabraNueva);
    console.log(listaPalabras);
}

/*export {listaPalabras};*/