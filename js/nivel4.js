const btnProcesarNivel4 =
document.getElementById(
"btnProcesarNivel4"
);


btnProcesarNivel4.addEventListener(
"click",
iniciarNivel4
);

function iniciarNivel4(){

btnProcesarNivel4.disabled = true;
let datos = [];

for(let i=0;i<20000;i++){

    datos.push({

        temperatura:
            Number(
                (
                    Math.random()*40
                ).toFixed(2)
            ),

        humedad:
            Number(
                (
                    Math.random()*100
                ).toFixed(2)
            )

    });

}

const worker =
new Worker(
    "workers/workerNivel4.js"
);

worker.postMessage(datos);

worker.onmessage = function(e){

    const data = e.data;

    if(data.progreso !== undefined){

        const barra =
        document.getElementById(
            "barraNivel4"
        );

        barra.style.width =
            data.progreso + "%";

        barra.textContent =
            Math.floor(
                data.progreso
            ) + "%";

    }

    if(data.terminado){

        mostrarResultadoNivel4(data);

        nivel4Completado = true;

        document
            .getElementById(
                "btnNivel5"
            )
            .disabled = false;

        worker.terminate();

    }

};

}

function mostrarResultadoNivel4(resultado){

document
.getElementById("barraNivel4")
.style.width = "100%";

document
.getElementById("barraNivel4")
.textContent = "100%";

const html = `

<div class="card">

    <div class="card-header">
        Estadísticas Procesadas
    </div>

    <div class="card-body">

        <p>
            <strong>Promedio Temperatura:</strong>
            ${resultado.promedioTemp.toFixed(2)}
        </p>

        <p>
            <strong>Promedio Humedad:</strong>
            ${resultado.promedioHum.toFixed(2)}
        </p>

        <p>
            <strong>Máxima Temperatura:</strong>
            ${resultado.maxTemp.toFixed(2)}
        </p>

        <p>
            <strong>Mínima Temperatura:</strong>
            ${resultado.minTemp.toFixed(2)}
        </p>

        <p>
            <strong>Máxima Humedad:</strong>
            ${resultado.maxHum.toFixed(2)}
        </p>

        <p>
            <strong>Mínima Humedad:</strong>
            ${resultado.minHum.toFixed(2)}
        </p>

    </div>

</div>

 `;

document
    .getElementById(
        "resultadoNivel4"
    )
    .innerHTML = html;

}
