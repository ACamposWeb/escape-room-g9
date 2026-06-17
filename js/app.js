let nivel1Completado = false;
let nivel2Completado = false;
let nivel3Completado = false;
let nivel4Completado = false;
let nivel5Completado = false;

let resultadoFinalNivel5 = null;



function actualizarReloj(){

const reloj =
    document.getElementById("reloj");

reloj.textContent =
    new Date().toLocaleTimeString();

}

setInterval(actualizarReloj,1000);

actualizarReloj();



function mostrarAlerta(mensaje, tipo, icono){

    const contenedor =
    document.getElementById(
        "contenedorAlertas"
    );

    contenedor.innerHTML = `

    <div
        class="alert alert-${tipo} alert-dismissible fade show mt-3"
        role="alert">

        <i class="bi bi-${icono}"></i>
        ${mensaje}

        <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert">
        </button>

    </div>

    `;

    setTimeout(()=>{

        contenedor.innerHTML = "";

    },5000);

}
