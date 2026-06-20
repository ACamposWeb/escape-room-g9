const btnMapa =
document.getElementById("btnMapa");

const canvas =
document.getElementById("mapaCanvas");

const ctx =
canvas.getContext("2d");

btnMapa.addEventListener(
"click",
dibujarMapa
);

function dibujarMapa(){

if(!ubicacionUsuario){

    mostrarAlerta(
        "Debe completar el nivel 1",
        "warning",
        "exclamation-triangle-fill"
    );

    return;
}

ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
);

ctx.fillStyle="#d9edf7";

ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
);

ctx.strokeStyle="black";

ctx.lineWidth=2;
ctx.font = "18px Arial";
ctx.fillStyle = "black";

/* Rectángulo */

ctx.strokeRect(
    80,
    80,
    250,
    120
);
ctx.fillText(
    "Hospital",
    150,
    150
);

/* Línea */

ctx.beginPath();

ctx.moveTo(
    0,
    250
);

ctx.lineTo(
    800,
    250
);
ctx.fillText(
    "Avenida Principal",
    300,
    270
);
ctx.stroke();

/* Círculo */

ctx.beginPath();

ctx.arc(
    550,
    150,
    60,
    0,
    Math.PI*2
);
ctx.fillText(
    "Parque",
    520,
    150
);

ctx.stroke();

marcarPosicion();

}

function marcarPosicion(){

let x =
((ubicacionUsuario.lon + 180) / 360)
* canvas.width;

let y =
((90 - ubicacionUsuario.lat) / 180)
* canvas.height;

ctx.fillStyle="red";
ctx.fillText(
    "Usted",
    x + 10,
    y
);
ctx.beginPath();


ctx.arc(
    x,
    y,
    8,
    0,
    Math.PI*2
);

ctx.fill();

nivel2Completado = true;

document
    .getElementById("btnNivel3")
    .disabled = false;

mostrarAlerta(
    "Nivel 2 completado",
    "success",
    "geo-alt-fill"
);


}
