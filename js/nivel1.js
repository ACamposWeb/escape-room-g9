const btnUbicacion =
document.getElementById("btnUbicacion");

btnUbicacion.addEventListener(
"click",
obtenerUbicacion
);

function obtenerUbicacion(){

    if(!navigator.geolocation){

        mostrarAlerta(
            "Tu navegador no soporta geolocalización",
            "warning",
            "exclamation-triangle-fill"
        );

        

        return;
    }

    document
        .getElementById("overlayNivel1")
        .style.display = "flex";

    btnUbicacion.disabled = true;

    navigator.geolocation.getCurrentPosition(
        ubicacionCorrecta,
        errorUbicacion
    );

}

function ubicacionCorrecta(posicion){
    document
    .getElementById("overlayNivel1")
    .style.display = "none";

btnUbicacion.disabled = false;

const lat =
    posicion.coords.latitude;

const lon =
    posicion.coords.longitude;

document
    .getElementById("latitud")
    .textContent = lat.toFixed(6);

document
    .getElementById("longitud")
    .textContent = lon.toFixed(6);

ubicacionUsuario = {
    lat,
    lon
};

nivel1Completado = true;

document
    .getElementById("btnNivel2")
    .disabled = false;

mostrarAlerta(
    "Ubicación obtenida correctamente",
    "success",
    "check-circle-fill"
);

}

function errorUbicacion(error){
    document
    .getElementById("overlayNivel1")
    .style.display = "none";

btnUbicacion.disabled = false;

switch(error.code){

    case error.PERMISSION_DENIED:

        mostrarAlerta(
            "Permiso de ubicación denegado",
            "danger",
            "x-circle-fill"
        );

        break;

    case error.POSITION_UNAVAILABLE:

        mostrarAlerta(
            "Ubicación no disponible",
            "danger",
            "x-circle-fill"
        );  
        

        break;

    case error.TIMEOUT:
        mostrarAlerta(
            "Tiempo de espera agotado",
            "danger",
            "x-circle-fill"
        ); 
        

        break;

    default:
        mostrarAlerta(
            "Error desconocido",
            "danger",
            "x-circle-fill"
        ); 
        

}

}
