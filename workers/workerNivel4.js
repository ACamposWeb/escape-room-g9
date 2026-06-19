self.onmessage = function(e){

const datos = e.data;

let sumaTemp = 0;
let sumaHum = 0;

let maxTemp = -Infinity;
let minTemp = Infinity;

let maxHum = -Infinity;
let minHum = Infinity;

datos.forEach((item,index)=>{

    sumaTemp += item.temperatura;
    sumaHum += item.humedad;

    if(item.temperatura > maxTemp)
        maxTemp = item.temperatura;

    if(item.temperatura < minTemp)
        minTemp = item.temperatura;

    if(item.humedad > maxHum)
        maxHum = item.humedad;

    if(item.humedad < minHum)
        minHum = item.humedad;

    if(index % 200 === 0){

        self.postMessage({

            progreso:
            (index / datos.length) * 100

        });

    }

});

const promedioTemp =
    sumaTemp / datos.length;

const promedioHum =
    sumaHum / datos.length;

self.postMessage({

    terminado:true,

    promedioTemp,

    promedioHum,

    maxTemp,
    minTemp,

    maxHum,
    minHum

});

}
