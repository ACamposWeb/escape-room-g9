self.onmessage = function(e){
const datos = e.data;

const registrosValidos = [];

const total =
    datos.length;

for(
    let i=0;
    i<datos.length;
    i++
){

    const registro =
    datos[i];

    if(

        registro.temperatura >= 0 &&
        registro.humedad >= 0 &&
        registro.presion >= 0

    ){

        registrosValidos.push(
            registro
        );

    }

    if(i % 2500 === 0){

        self.postMessage({

            progreso:
            (
                i /
                total
            ) * 100

        });

    }

}

let suma = 0;

registrosValidos.forEach(r=>{

    suma +=
        r.temperatura +
        r.humedad +
        r.presion;

});

const promedioGeneral =
    suma /
    (
        registrosValidos.length * 3
    );

const topTemperaturas =

    registrosValidos

    .map(r=>r.temperatura)

    .sort(
        (a,b)=>b-a
    )

    .slice(0,10);

const topPresiones =

    registrosValidos

    .map(r=>r.presion)

    .sort(
        (a,b)=>b-a
    )

    .slice(0,10);

self.postMessage({

    finalizado:true,

    registrosValidos:
    registrosValidos.length,

    promedioGeneral,

    topTemperaturas,

    topPresiones

});

};
