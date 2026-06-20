const btnProcesarNivel5 =
document.getElementById(
"btnProcesarNivel5"
);



const btnExportar =
document.getElementById(
"btnExportar"
);

btnProcesarNivel5.addEventListener(
"click",
iniciarNivel5
);

btnExportar.addEventListener(
"click",
descargarJSON
);

function iniciarNivel5(){
    console.log("Nivel 5 iniciado");
btnProcesarNivel5.disabled = true;
const datos = [];

for(let i=0;i<250000;i++){

    let temperatura =
        Number(
            (
                Math.random()*60
            ).toFixed(5)
        );

    let humedad =
        Number(
            (
                Math.random()*100
            ).toFixed(5)
        );

    let presion =
        Number(
            (
                900 + Math.random()*200
            ).toFixed(2)
        );

    if(Math.random() < 0.10){
        temperatura *= -1;
    }

    if(Math.random() < 0.10){
        humedad *= -1;
    }

    if(Math.random() < 0.10){
        presion *= -1;
    }

    datos.push({

        temperatura,
        humedad,
        presion

    });

}

const worker =
new Worker(
    "workers/workerNivel5.js"
);

worker.postMessage(datos);

worker.onmessage = function(e){

    const data = e.data;

    if(data.progreso !== undefined){

        const barra =
        document.getElementById(
            "barraNivel5"
        );

        barra.style.width =
            data.progreso + "%";

        barra.textContent =
            Math.floor(
                data.progreso
            ) + "%";

    }

    if(data.finalizado){

        resultadoFinalNivel5 = data;

        mostrarResultadoNivel5(data);

        document
        .getElementById(
            "btnExportar"
        )
        .disabled = false;

        nivel5Completado = true;

        worker.terminate();

    }

};

}

function mostrarResultadoNivel5(data){

document
.getElementById(
    "barraNivel5"
)
.style.width = "100%";

document
.getElementById(
    "barraNivel5"
)
.textContent = "100%";

let html = `

<div class="card">

    <div class="card-header">
        Resultados Finales
    </div>

    <div class="card-body">

        <p>
            <strong>Registros válidos:</strong>
            ${data.registrosValidos}
        </p>

        <p>
            <strong>Promedio General:</strong>
            ${data.promedioGeneral.toFixed(2)}
        </p>

        <hr>

        <h5>
            Top 10 Temperaturas
        </h5>

        <ol>
 `;

data.topTemperaturas.forEach(valor=>{

    html += `
        <li>${valor}</li>
     `;

});

html += `
        </ol>

        <h5>
            Top 10 Presiones
        </h5>

        <ol>
 `;

data.topPresiones.forEach(valor=>{

    html += `
        <li>${valor}</li>
     `;

});

html += `

        </ol>

    </div>

</div>

 `;

document
    .getElementById(
        "resultadoNivel5"
    )
    .innerHTML = html;

mostrarAlerta(
    "¡Felicidades! Has recuperado el acceso a la base de datos de la ciudad inteligente.",
    "success",
    "geo-alt-fill"
);


}

function descargarJSON(){

if(!resultadoFinalNivel5){

    mostrarAlerta(
        "No existen resultados",
        "warning",
        "exclamation-triangle-fill"
    );
    

    return;

}

const blob =
new Blob(

    [
        JSON.stringify(
            resultadoFinalNivel5,
            null,
            2
        )
    ],

    {
        type:
        "application/json"
    }

);

const url =
URL.createObjectURL(blob);

const enlace =
document.createElement("a");

enlace.href = url;

enlace.download =
"resultado_final.json";

enlace.click();

URL.revokeObjectURL(url); 

}
