const btnCamara = document.getElementById("btnCamara");

const btnCapturar = document.getElementById("btnCapturar");

const video = document.getElementById("video");

let streamCamara = null;

btnCamara.addEventListener(
"click",
iniciarCamara 
);

btnCapturar.addEventListener(
"click",
capturarFoto
);

window.addEventListener("load",()=>{

    const foto =
    localStorage.getItem(
        "fotoExplorador"
    );

    if(foto){

        document
        .getElementById(
            "fotoGuardada"
        )
        .src = foto;

    }

});

async function iniciarCamara(){
    console.log("Nivel 3 iniciado");
try{

    streamCamara =
    await navigator.mediaDevices.getUserMedia({
        video:true
    });

    video.srcObject = streamCamara;

}
catch(error){

    mostrarAlerta(
        "Cámara no encontrada o permiso denegado",
        "danger",
        "x-circle-fill"
    );
    

    console.error(error);

}

}

function capturarFoto(){

if(!streamCamara){

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
