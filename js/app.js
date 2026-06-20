let ubicacionUsuario = null;
let fotoCapturada = null;

let nivel1Completado = false;
let nivel2Completado = false;
let nivel3Completado = false;
let nivel4Completado = false;
let nivel5Completado = false;

let resultadoFinalNivel5 = null;

function mostrarNivel(idNivel){

document
    .querySelectorAll(".nivel")
    .forEach(nivel=>{
        nivel.classList.remove("activo");
    });

document
    .getElementById(idNivel)
    .classList.add("activo");

}

function actualizarReloj(){

const reloj =
    document.getElementById("reloj");

reloj.textContent =
    new Date().toLocaleTimeString();

}

setInterval(actualizarReloj,1000);

actualizarReloj();

document
.getElementById("btnNivel2")
.addEventListener("click",()=>{

if(nivel1Completado){
    mostrarNivel("nivel2");
}

});

document
.getElementById("btnNivel3")
.addEventListener("click",()=>{

if(nivel2Completado){
    mostrarNivel("nivel3");
}

});

document
.getElementById("btnNivel4")
.addEventListener("click",()=>{

if(nivel3Completado){
    mostrarNivel("nivel4");
}

});

document
.getElementById("btnNivel5")
.addEventListener("click",()=>{

if(nivel4Completado){
    mostrarNivel("nivel5");
}

});

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
