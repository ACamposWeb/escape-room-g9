document.getElementById('btnGenerar').addEventListener('click', function() {
    const btn = this;
    const progressBar = document.getElementById('progressBar');
    const percentText = document.getElementById('percentText');

    // Reset de UI
    document.getElementById('resultadoCard').classList.add('d-none');
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status"></span>INICIANDO PORTAL...`;
    
    progressBar.style.width = '0%';
    progressBar.setAttribute('aria-valuenow', 0);
    progressBar.innerText = '0%';
    progressBar.classList.add('progress-bar-animated', 'progress-bar-striped');
    if(percentText) percentText.innerText = '0%';

    // Generar 250,000 registros
    const registros = Array.from({length: 250000}, () => {
        const generarSesgado = (min, max, potencia) => {
            const rango = max - min;
            let val = min + Math.pow(Math.random(), potencia) * rango;
            if (Math.random() < 0.15) {
                val = -(Math.random() * 10 + 0.5);
            }
            return parseFloat(val.toFixed(2));
        };

        return {
            temp: generarSesgado(20, 45, 2),
            hum:  generarSesgado(40, 95, 1.5),
            pres: generarSesgado(1000, 1030, 3)
        };
    });

    // Mostrar tabla y barra de progreso
    Dashboard.mostrarTabla(registros);
    Dashboard.mostrarProgreso();

    setTimeout(() => {
        btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status"></span>PROCESANDO DATOS...`;
        
        const worker = new Worker('js/worker.js');
        worker.postMessage(registros);

        worker.onmessage = function(e) {
            if (e.data.type === 'progress') {
                const percent = Math.min(Math.round(e.data.value), 100);
                
                progressBar.style.width = percent + '%';
                progressBar.setAttribute('aria-valuenow', percent);
                progressBar.innerText = percent + '%';
                if(percentText) percentText.innerText = percent + '%';

                if (percent === 100) {
                    progressBar.classList.remove('progress-bar-animated', 'progress-bar-striped');
                    progressBar.classList.replace('bg-warning', 'bg-success');
                    progressBar.innerText = '100% - Finalizando...';
                if (percentText) percentText.innerText = 'Finalizando...';
                }
            } 
            else if (e.data.type === 'complete') {
                progressBar.style.width = '100%';
                progressBar.innerText = '100% - Completado';
                if(percentText) percentText.innerText = 'Completado';

                // pausa antes de mostrar resultados
                setTimeout(() => {
                    Dashboard.actualizarResultados(e.data.result);
                    worker.terminate();
                    
                    // Restaurar botón
                    btn.disabled = false;
                    btn.innerHTML = `<i class="bi bi-cpu-fill"></i> Generar y Procesar Registros`;
                    
                    document.getElementById('nivelCompletado').classList.remove('d-none');

                    // Restaurar estilo de barra para la próxima carga
                    progressBar.classList.replace('bg-success', 'bg-warning');
                    progressBar.classList.add('progress-bar-animated', 'progress-bar-striped');
                }, 800);
            }

        };

        worker.onerror = function(err) {
            console.error("Error en Worker:", err);
            btn.disabled = false;
            btn.innerHTML = `<i class="bi bi-cpu-fill"></i> Generar y Procesar Registros`;
            alert("Ocurrió un error en el portal cuántico. Revisa la consola.");
            worker.terminate();
        };
    }, 300);
});