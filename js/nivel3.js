// NIVEL 3 - LA EVIDENCIA DEL EXPLORADOR

const btnCamara = document.getElementById("btnCamara");
const btnCapturar = document.getElementById("btnCapturar");
const video = document.getElementById("video");

let streamCamara = null;

// La foto solo se puede capturar una vez la cámara esté activa
btnCapturar.disabled = true;

btnCamara.addEventListener(
    "click",
    iniciarCamara
);

btnCapturar.addEventListener(
    "click",
    capturarFoto
);

// Si ya existe una foto guardada de una sesión anterior, se restaura
window.addEventListener("load", () => {

    const foto =
        localStorage.getItem("fotoExplorador");

    if (foto) {

        document
            .getElementById("fotoGuardada")
            .src = foto;

        fotoCapturada = foto;
        nivel3Completado = true;

        document
            .getElementById("btnNivel4")
            .disabled = false;

    }

});

async function iniciarCamara(){

    try {

        streamCamara =
            await navigator.mediaDevices.getUserMedia({
                video: true
            });

        video.srcObject = streamCamara;

        btnCapturar.disabled = false;
        btnCamara.disabled = true;

    }
    catch (error) {

        manejarErrorCamara(error);
        console.error(error);

    }

}

// Diferencia entre cámara no encontrada y permiso denegado (requisito 5)
function manejarErrorCamara(error){

    if (
        error.name === "NotFoundError" ||
        error.name === "DevicesNotFoundError"
    ) {

        mostrarAlerta(
            "No se encontró ninguna cámara en este dispositivo",
            "danger",
            "camera-video-off-fill"
        );

    }
    else if (
        error.name === "NotAllowedError" ||
        error.name === "PermissionDeniedError"
    ) {

        mostrarAlerta(
            "Permiso de cámara denegado. Debes permitirlo para continuar",
            "danger",
            "x-circle-fill"
        );

    }
    else {

        mostrarAlerta(
            "No se pudo acceder a la cámara: " + error.message,
            "danger",
            "exclamation-triangle-fill"
        );

    }

}

function capturarFoto(){

    if (!streamCamara) {

        mostrarAlerta(
            "Debe activar la cámara primero",
            "warning",
            "exclamation-triangle-fill"
        );

        return;

    }

    const canvas = document.getElementById("fotoCanvas");
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
        video,
        0,
        0,
        canvas.width,
        canvas.height
    );

    const imagen =
        canvas.toDataURL("image/png");

    localStorage.setItem(
        "fotoExplorador",
        imagen
    );

    document
        .getElementById("fotoGuardada")
        .src = imagen;

    fotoCapturada = imagen;
    nivel3Completado = true;

    document
        .getElementById("btnNivel4")
        .disabled = false;

    mostrarAlerta(
        "Fotografía guardada en LocalStorage",
        "success",
        "camera-fill"
    );

}