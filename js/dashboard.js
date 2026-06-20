
const Dashboard = {
    // Crear e inyectar la tabla de los primeros 50 registros
    mostrarTabla: function(datos) {
        let tablaWrapper = document.getElementById('tablaRegistros');
        
        if (!tablaWrapper) {
            tablaWrapper = document.createElement('div');
            tablaWrapper.id = 'tablaRegistros';
            tablaWrapper.className = 'mt-4';
            const contCarga = document.getElementById('contenedorCarga');
            contCarga.parentNode.insertBefore(tablaWrapper, contCarga);
        }

        tablaWrapper.innerHTML = `
            <h5 class="mb-3" style="color: var(--neon-blue);">
                <i class="bi bi-eye-fill"></i> Vista previa: Primeros 50 registros generados
            </h5>
            <div class="table-responsive" style="max-height: 350px; overflow-y: auto; border: 1px solid #444; border-radius: 8px;">
                <table class="table table-dark table-hover mb-0" style="background-color: var(--card-bg);">
                    <thead style="position: sticky; top: 0; background-color: var(--bg-dark); z-index: 10;">
                        <tr style="color: var(--neon-blue); border-bottom: 2px solid var(--neon-blue);">
                            <th class="ps-3">#</th>
                            <th><i class="bi bi-thermometer-half"></i> Temp</th>
                            <th><i class="bi bi-droplet-half"></i> Hum</th>
                            <th><i class="bi bi-speedometer2"></i> Pres</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyRegistros"></tbody>
                </table>
            </div>
        `;

        const tbody = document.getElementById('tbodyRegistros');
        tbody.innerHTML = '';

        datos.slice(0, 50).forEach((r, index) => {
            const esInvalido = r.temp < 0 || r.hum < 0 || r.pres < 0;
            const tr = document.createElement('tr');
            tr.style.borderColor = "#333";
            
            if (esInvalido) {
                tr.style.backgroundColor = "rgba(220, 53, 69, 0.1)";
            }

            tr.innerHTML = `
                <td class="ps-3 fw-bold text-info">${index + 1}</td>
                <td>${r.temp.toFixed(2)} °C</td>
                <td>${r.hum.toFixed(2)} %</td>
                <td>${r.pres.toFixed(2)} hPa</td>
                <td>
                    <span class="badge rounded-pill ${esInvalido ? 'bg-danger' : 'bg-success'}">
                        <i class="bi ${esInvalido ? 'bi-x-circle-fill' : 'bi-check-circle-fill'}"></i>
                        ${esInvalido ? ' Negativo' : ' Válido'}
                    </span>
                </td>
            `;
            tbody.appendChild(tr);
        });

        tablaWrapper.classList.remove('d-none');
    },

    // Mostrar barra de progreso
    mostrarProgreso: function() {
        document.getElementById('contenedorCarga').classList.remove('d-none');
        document.getElementById('resultadoCard').classList.add('d-none');
    },

    // Renderizar Dashboard final
    actualizarResultados: function(datos) {
        document.getElementById('contenedorCarga').classList.add('d-none');
        const statsContent = document.getElementById('statsContent');
        
        const crearTopList = (arr, unidad, colorClase) => {
            return arr.map((val, i) => `
                <tr>
                    <td style="width: 50px;">
                        <span class="badge bg-${colorClase}">#${i + 1}</span>
                    </td>
                    <td class="fw-bold font-monospace">${val} ${unidad}</td>
                </tr>
            `).join('');
        };

        statsContent.innerHTML = `
            <!-- PROMEDIOS -->
            <div class="row g-3 mb-4">
                <div class="col-md-4">
                    <div class="card h-100 text-center" style="background: var(--card-bg); border: 1px solid var(--neon-blue);">
                        <div class="card-body">
                            <i class="bi bi-thermometer display-4" style="color: var(--neon-blue);"></i>
                            <h6 class="text-info text-uppercase mt-2 small">Promedio Temp</h6>
                            <h3 class="mb-0 text-white">${datos.promedioTemp} °C</h3>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card h-100 text-center" style="background: var(--card-bg); border: 1px solid var(--neon-green);">
                        <div class="card-body">
                            <i class="bi bi-droplet-half display-4" style="color: var(--neon-green);"></i>
                            <h6 class="text-success text-uppercase mt-2 small">Promedio Hum</h6>
                            <h3 class="mb-0 text-white">${datos.promedioHum} %</h3>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card h-100 text-center" style="background: var(--card-bg); border: 1px solid #ffae00;">
                        <div class="card-body">
                            <i class="bi bi-speedometer2 display-4" style="color: #ffae00;"></i>
                            <h6 class="text-warning text-uppercase mt-2 small">Promedio Pres</h6>
                            <h3 class="mb-0 text-white">${datos.promedioPres} hPa</h3>
                        </div>
                    </div>
                </div>
            </div>

            <!-- TOTAL VÁLIDOS -->
            <div class="row g-3 mb-4">
                <div class="col-12">
                    <div class="card text-center text-white border-0 shadow-lg" style="background: linear-gradient(45deg, #0d1117, #161c24); border: 1px solid var(--neon-blue) !important;">
                        <div class="card-body py-4">
                            <h5 style="color: var(--neon-blue);">
                                <i class="bi bi-bar-chart-line-fill"></i> Registros Válidos Procesados
                            </h5>
                            <h1 class="display-3 fw-bold" style="text-shadow: 0 0 15px var(--neon-blue);">${datos.total.toLocaleString()}</h1>
                            <p class="mb-0 text-muted">de 250,000 registros simulados</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- TOP 10 -->
            <div class="row g-3">
                <div class="col-md-6">
                    <div class="card bg-dark border-danger h-100">
                        <div class="card-header bg-danger bg-gradient text-white fw-bold">
                            <i class="bi bi-thermometer"></i> Top 10 Temperaturas Más Altas
                        </div>
                        <div class="card-body p-0">
                            <table class="table table-dark table-hover mb-0">
                                <tbody>${crearTopList(datos.topTemp, '°C', 'danger')}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card bg-dark border-warning h-100">
                        <div class="card-header bg-warning bg-gradient text-dark fw-bold">
                            <i class="bi bi-tornado"></i> Top 10 Presiones Más Altas
                        </div>
                        <div class="card-body p-0">
                            <table class="table table-dark table-hover mb-0">
                                <tbody>${crearTopList(datos.topPres, 'hPa', 'warning')}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('resultadoCard').classList.remove('d-none');

    
        const blob = new Blob([JSON.stringify(datos, null, 2)], {type: 'application/json'});
        const btn = document.getElementById('btnDescargar');
        if (btn.href && btn.href.startsWith('blob:')) URL.revokeObjectURL(btn.href);
        btn.href = URL.createObjectURL(blob);
        btn.download = 'estadisticas_portal_cuantico.json';
        
        if (!btn.innerHTML.includes('bi-download')) {
            btn.innerHTML = `<i class="bi bi-download"></i> Descargar Reporte JSON`;
        }
    }
};