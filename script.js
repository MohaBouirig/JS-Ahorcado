// variables globales
let palabrasAleatorias = ["Pelota", "Jardin", "Cielo", "Carrera"];
let palabras = prompt("Introduce las palabras con las que desea jugar:");
let letrasIntroducidas;
let guiones;
let palabraEscogida = null;
let contFallos;
let palabrasAcertadas;
let partidasPerdidas;
let partidasAbandonadas;

function iniciar() {
    let arrayPalabras = [];
    letrasIntroducidas = [];
    guiones = [];
    letra.value = ""; // limpia el imput text
    let min = 0;
    contFallos = 0;
    palabrasAcertadas = leerCookie("cookiePalabrasAcertadas");
    partidasPerdidas = leerCookie("cookiePartidasPerdidas");
    partidasAbandonadas = leerCookie("cookiePalabrasAbandonas");

    // si en el prompt le damos a cancelar o aceptar sin introducir palabras entonces nos escogera las palabras predefinidas
    if (palabras == null || palabras == "") {
        palabraEscogida = escogerPalabra(palabrasAleatorias, min, (palabrasAleatorias.length - 1));
        dibujarGuionPalabra(palabraEscogida);

    } else {
        // en caso contrario separaremos las palabras por la coma y escogeremos una con la funcion escoger alabra
        arrayPalabras = palabras.trim().split(",");
        palabraEscogida = escogerPalabra(arrayPalabras, min, (arrayPalabras.length - 1));
        dibujarGuionPalabra(palabraEscogida);
    }

    // reseteo los valores de la imagen, las palabras introducidas y el mensaje de que ha ganado la partida
    document.getElementById("mostrarLetrasIntroducidas").textContent = "";
    document.getElementById("estadoPartida").textContent = "";
    document.getElementById("imagenAplicacion").src = "/imagenes/ahorcado_0.png";

    // muestro las estadisticas con los valores de las cookies
    document.getElementById("mostrarPalabrasAcertadas").textContent = "Palabras acertadas: " + leerCookie("cookiePalabrasAcertadas");
    document.getElementById("mostrarPartidasAbandonadas").textContent = "Partidas abandonadas: " + leerCookie("cookiePalabrasAbandonas");
    document.getElementById("mostrarPartidasPerdidas").textContent = "Partidas perdidas: " + leerCookie("cookiePartidasPerdidas");
    console.log(palabraEscogida);
    console.log(guiones);
}

function escogerPalabra(array, min, max) {
    // devuelve un numero random entre 0 y el tamaño de una palabra ejemplo cielo (5)
    return array[Math.floor(Math.random() * (max - min + 1) + min)];
}

function dibujarGuionPalabra(palabra) {
    // recorro la longitud de la palabra y por cada letra dibujo una _
    for (let i = 0; i < palabra.length; i++) {
        guiones[i] = " _ ";
    }
    document.getElementById("mostrarPalabraHtml").textContent = guiones;
}

function introducirLetra() {
    // guardo el valor de la letra introducida en una variable
    let letras = letra.value;
    // si cumple alguna de estas condiciones entonces muestra un mensaje de error
    if (letras == null || letras == " " || letras == "_" || letras == "") {
        inputErroneo.innerHTML = "<p><strong> El campo de texto no acepta caracteres y tampoco puede estar vacio!</strong><p>";
    } else {
        // si no llamara al metodo que comprueba las letras, y ira mostrando las letras introducidas y la palabra con las letras acertadas
        comprobarLetras(letras.charAt(0)); // solo coge la primera letra por si introducimos varias letras
        letrasIntroducidas.push(letras.charAt(0));
        document.getElementById("mostrarLetrasIntroducidas").textContent = "Letras introducidas: " + letrasIntroducidas;
        console.log(guiones);
    }

}

function comprobarLetras(letra) {
    // guardo el valor de la palabra escogida en mayusculas en una variable
    let palabraMayusculas = palabraEscogida.toUpperCase();
    // guardo el valor de la letra introducida en mayusculas en una variable
    let letraMayuscula = letra.toUpperCase();
    // en el bucle le indico la longitud de la palabra, ira comprobando letra por letra y si coincide la añadira en un array llamado guiones
    for (let i = 0; i < palabraEscogida.length; i++) {
        if (palabraMayusculas[i].includes(letraMayuscula)) {
            guiones[i] = letraMayuscula;

        }

    }

    // muestro el array con las letras, encontradas, si no pues aparecera _
    document.getElementById("mostrarPalabraHtml").textContent = guiones;
    // si la letra introducida no coincide con ninguna de la letra de la palabra, entonces se sumara un fallo
    if (!guiones.includes(letraMayuscula)) {
        contFallos++;
    }

    // segun los fallos mostrara una foto del personaje ahorcandose
    if (contFallos == 1) {
        document.getElementById("imagenAplicacion").src = "/imagenes/ahorcado_1.png";
    } else if (contFallos == 2) {
        document.getElementById("imagenAplicacion").src = "/imagenes/ahorcado_2.png";
    } else if (contFallos == 3) {
        document.getElementById("imagenAplicacion").src = "/imagenes/ahorcado_3.png";
    } else if (contFallos == 4) {
        document.getElementById("imagenAplicacion").src = "/imagenes/ahorcado_4.png";
    } else if (contFallos >= 5) {
        document.getElementById("imagenAplicacion").src = "/imagenes/ahorcado_5.png";
        // al haber llegado al maximo de intentos, en 0,5seg se llamara a una funcion game over para ostrar una imagen con game over
        setTimeout(gameOver, 500);
        // se aumentara 1 en partidas perdidas
        partidasPerdidas++;
        // creo cookie con nombre, valor, expira en 60 dias y la muestro
        setCookie("cookiePartidasPerdidas", partidasPerdidas, 60); 
        document.getElementById("mostrarPartidasPerdidas").textContent = "Partidas perdidas: " + leerCookie("cookiePartidasPerdidas");
        // reseteo las letras introducidas
        letrasIntroducidas = [];
        document.getElementById("mostrarLetrasIntroducidas").textContent = "";
        // y en 10 seg llama a la funcion iniciar
        setTimeout(iniciar, 10000);
    }


    if (!guiones.includes(" _ ")) {
        palabrasAcertadas++; // le sumo 1 a palabras acertadas
        document.getElementById("estadoPartida").textContent = "PALABRA ACERTADA"; // muestro el mensaje de palabra acertada
        setCookie("cookiePalabrasAcertadas", palabrasAcertadas, 60); // creo cookie con nombre, valor y expira en 60 dias

        // reseteo las letras introducidas
        letrasIntroducidas = [];
        document.getElementById("mostrarLetrasIntroducidas").textContent = "";

        // muestro las palabras acertadas
        document.getElementById("mostrarPalabrasAcertadas").textContent = "Palabras acertadas: " + leerCookie("cookiePalabrasAcertadas");
        // y en 2 seg llama a la funcion iniciar
        setTimeout(iniciar, 2000);
    }

}

function gameOver() {
    // muestro una de game over
    document.getElementById("imagenAplicacion").src = "/imagenes/game-over.jpg"
}

function abandonarPartida() {
    partidasAbandonadas++; // sumo 1 a partidas abandonadas
    setCookie("cookiePalabrasAbandonas", partidasAbandonadas, 60) // creo cookie con nombre, valor y expira en 60 dias

    // muestro las partidas abandonadas
    document.getElementById("mostrarPartidasAbandonadas").textContent = "Partidas abandonadas: " + leerCookie("cookiePalabrasAbandonas");

    // reseteo las letras introducidas
    letrasIntroducidas = [];
    document.getElementById("mostrarLetrasIntroducidas").textContent = "";

    // y en 5 seg llama a la funcion iniciar
    setTimeout(iniciar, 5000);
}

function setCookie(cname, cvalue, exdays) {
    // Crear una nueva instancia de la clase Date para obtener la fecha actual
    const d = new Date();

    // Calcular la fecha de expiración sumando el número de días especificado en exdays
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));

    // Construir la cadena de expiración en formato UTC
    let expires = "expires=" + d.toUTCString();

    // Configurar la cookie en el documento con el nombre, valor, fecha de expiración y la ruta "/"
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


function leerCookie(nombre) {

    // Clave de búsqueda. Es el nombre de la cookie
    let clave = nombre + "=";

    // Obtengo todas las cookies y las separo con ;
    let cookies = document.cookie.split(';');

    // Recorro todas las cookies
    for (let i = 0; i < cookies.length; i++) {

        // Obtengo una cookie individual
        let c = cookies[i];

        // Eliminar espacios en blanco al principio de la cookie
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);

        // Verificar si la cookie actual comienza con la clave de búsqueda
        if (c.indexOf(clave) == 0) {
            // Si se encuentra la cookie devolvera el valor decodificado de la cookie
            return decodeURIComponent(c.substring(clave.length, c.length));
        }
    }

    // Si no se encuentra la cookie devolvera 0
    return 0;

}