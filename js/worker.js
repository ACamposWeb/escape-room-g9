
self.onmessage = function(e) {
    const data = e.data;
    const totalRegistros = data.length;
    let validData = [];
    
    // Bloques de 2,500 generan ~100 actualizaciones de 1% cada una
    const blockSize = 2500; 
    let currentIndex = 0;

    // Enviar 0% inicial para que la barra aparezca inmediatamente
    self.postMessage({ type: 'progress', value: 0 });

    function processNextBlock() {
        const end = Math.min(currentIndex + blockSize, totalRegistros);
        
        // Filtrar bloque actual
        for (let i = currentIndex; i < end; i++) {
            const r = data[i];
            if (r.temp >= 0 && r.hum >= 0 && r.pres >= 0) {
                validData.push(r);
            }
        }
        
        currentIndex = end;
        const percent = Math.floor((currentIndex / totalRegistros) * 100);
        self.postMessage({ type: 'progress', value: percent });

        if (currentIndex < totalRegistros) {
            setTimeout(processNextBlock, 25);
        } else {
            self.postMessage({ type: 'progress', value: 100 });
            setTimeout(calcularYEnviarResultados, 500);
        }
    }

    function calcularYEnviarResultados() {
        const totalValidos = validData.length;

        if (totalValidos === 0) {
            self.postMessage({ 
                type: 'complete', 
                result: { promedioTemp: "0.00", promedioHum: "0.00", promedioPres: "0.00", topTemp: [], topPres: [], total: 0 } 
            });
            return;
        }

        const sumTemp = validData.reduce((acc, curr) => acc + curr.temp, 0);
        const sumHum  = validData.reduce((acc, curr) => acc + curr.hum, 0);
        const sumPres = validData.reduce((acc, curr) => acc + curr.pres, 0);

        const obtenerTop10 = (arr, prop) => {
            return [...new Set(arr.map(r => r[prop]))]
                .sort((a, b) => b - a)
                .slice(0, 10)
                .map(val => val.toFixed(2));
        };

        self.postMessage({
            type: 'complete',
            result: {
                promedioTemp: (sumTemp / totalValidos).toFixed(2),
                promedioHum: (sumHum / totalValidos).toFixed(2),
                promedioPres: (sumPres / totalValidos).toFixed(2),
                topTemp: obtenerTop10(validData, 'temp'),
                topPres: obtenerTop10(validData, 'pres'),
                total: totalValidos
            }
        });
    }

    processNextBlock();
};