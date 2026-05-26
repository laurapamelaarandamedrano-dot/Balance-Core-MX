// ============================================================
// BALANCE CORE MÉXICO — Lógica de Producción (Local & Autónoma)
// Diseñado para GitHub Pages · Blindado para jsPDF sin APIs externas
// ============================================================

let currentAnalysis = null;

async function generateAnalysis() {
  const state = document.getElementById('stateSelect').value;
  if (!state) {
    alert('Por favor selecciona un estado.');
    return;
  }
  const dims = [...document.querySelectorAll('.checkboxes input:checked')].map(i => i.value);
  if (dims.length === 0) {
    alert('Por favor selecciona al menos una dimensión.');
    return;
  }

  // Estado de carga visual en la interfaz (Efecto Cosmos)
  const btn = document.getElementById('generateBtn');
  btn.disabled = true;
  btn.querySelector('.btn-text').style.display = 'none';
  btn.querySelector('.btn-loader').style.display = 'flex';

  const results = document.getElementById('results');
  results.style.display = 'block';
  document.getElementById('pdfBtn').style.display = 'none';
  document.getElementById('aiContent').innerHTML = `<div class="loading-pulses"><div class="lp"></div><div class="lp"></div><div class="lp"></div></div>`;

  // Cargar indicadores reales desde data.js
  const iim = getIIM(state);
  const ime = getIME(state);
  const agua = getAgua(state);
  const internet2023 = DATA.internet['2023'];

  // Procesar puntuaciones del Balance Core (0 a 100)
  const dimScores = {};
  
  if (dims.includes('estructura')) {
    const gmMap = { 'Muy bajo': 92, 'Bajo': 75, 'Medio': 55, 'Alto': 35, 'Muy alto': 15 };
    dimScores.estructura = gmMap[ime?.GM_2020] || 50;
  }
  if (dims.includes('identidad')) {
    const gimMap = { 'Muy bajo': 85, 'Bajo': 70, 'Medio': 55, 'Alto': 35, 'Muy alto': 20 };
    dimScores.identidad = gimMap[iim?.gim_dp2] || 50;
  }
  if (dims.includes('conectividad')) {
    const avgInternet = internet2023.reduce((s, d) => s + d.porcentaje_total, 0) / internet2023.length;
    const marginAdj = { 'Muy bajo': 10, 'Bajo': 5, 'Medio': 0, 'Alto': -10, 'Muy alto': -18 };
    dimScores.conectividad = Math.min(95, Math.max(10, Math.round(avgInternet + (marginAdj[ime?.GM_2020] || 0))));
  }
  if (dims.includes('etica')) {
    const maxAcuiferos = 158;
    const acuiferos = agua?.acuiferos || 30;
    const raw = (acuiferos / maxAcuiferos) * 100;
    dimScores.etica = raw > 80 ? Math.round(100 - (raw - 80) * 1.5) : Math.round(raw);
    dimScores.etica = Math.max(20, Math.min(88, dimScores.etica));
  }

  const overallScore = Math.round(Object.values(dimScores).reduce((a, b) => a + b, 0) / Object.keys(dimScores).length);

  // Pintar los componentes interactivos en pantalla
  renderDimCards(state, dims, dimScores, iim, ime, agua);
  if(document.getElementById('stateBadge')) {
    document.getElementById('stateBadge').textContent = state.toUpperCase();
  }
  animateScore(overallScore);

  // Retraso estético calculado para emular el procesamiento analítico del modelo
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Generación dinámica del texto estratégico basada en métricas reales del estado
  const marginacionLabel = ime ? ime.GM_2020 : 'No disponible';
  const migracionLabel = iim ? iim.gim_dp2 : 'No disponible';
  const numAcuiferos = agua ? agua.acuiferos : 0;

  const aiText = `### 1. Diagnostico del Desequilibrio
El estado de ${state} presenta un patron de desequilibrio sistemico analizado bajo el marco conceptual del Balance Core. Los datos de diagnostico territorial revelan un Indice de Marginacion Estatal clasificado como un grado ${marginacionLabel}, lo que evidencia retos profundos en la distribucion de infraestructura y el acceso equitativo a servicios basicos. Adicionalmente, el Indice de Intensidad Migratoria se ubica en un nivel ${migracionLabel}, senalando un flujo constante de capital humano que impacta directamente en el tejido social y la cohesion comunitaria. En el ambito ecologico, el registro de ${numAcuiferos} acuiferos prioritarios plantea la urgencia de establecer politicas de sustentabilidad hidrica para mitigar riesgos de estres ambiental y asegurar la viabilidad del desarrollo regional a largo plazo.

### 2. 3 Politicas Publicas Prioritarias
* Politica 1: Programa de Infraestructura Social Cohesionada
- Dimension: Estructura
- Justificacion: Dado el grado de marginacion ${marginacionLabel} detectado en ${state}, es prioritario optimizar los servicios publicos esenciales en los municipios mas vulnerables para reestablecer el equilibrio estructural.
- Acciones concretas:
  - Diseno de un mapa de calor participativo para focalizar obras publicas prioritarias de agua, drenaje y electrificacion.
  - Creacion de comites ciudadanos de contraloria social para supervisar la transparencia en la ejecucion del gasto.
- Indicador de exito: Disminucion progresiva de las carencias por servicios basicos residenciales en un horizonte de 36 meses.

* Politica 2: Red Institucional de Arraigo e Identidad Regional
- Dimension: Identidad
- Justificacion: La intensidad migratoria de nivel ${migracionLabel} en ${state} exige politicas deliberadas para retener el talento joven y canalizar productivamente las remesas familiares.
- Acciones concretas:
  - Lanzamiento de fondos de coinversion publica para proyectos productivos impulsados por migrantes en retorno.
  - Implementacion de incubadoras de empresas comunitarias enfocadas en sectores tecnologicos e identitarios.
- Indicador de exito: Incremento medible en la tasa de retencion laboral interna de la poblacion de 18 a 35 anos.

* Politica 3: Gobernanza Digital y Sostenibilidad Hidrica Local
- Dimension: Conectividad y Etica Planetaria
- Justificacion: Equilibrar el entorno tecnologico con el cuidado de los recursos naturales del estado es vital para proyectar un crecimiento soberano y de vanguardia.
- Acciones concretas:
  - Despliegue de nodos publicos de conectividad digital universal en escuelas y plazas comunitarias.
  - Modernizacion de los sistemas de monitoreo hidrico subterraneo para regular la extraccion de los ${numAcuiferos} acuiferos de la region.
- Indicador de exito: Lograr una cobertura de conectividad digital efectiva del 70% en zonas rurales en un plazo de 3 anos.

### 3. Ruta de Equilibrio
La articulacion coordinada de estas tres directrices estrategicas posiciona a ${state} como un entorno idoneo para el despliegue practico del modelo Balance Core. Al robustecer la base estructural material y propiciar un entorno de arraigo para la identidad colectiva, se sientan las plataformas solidas para que las innovaciones en conectividad y la etica planetaria actuen como catalizadores del desarrollo soberano. Este diagnostico constituye un mapa de ruta replicable y cientificamente sustentado para la toma de decisiones gubernamentales de alta precision.`;

  document.getElementById('aiContent').innerHTML = formatAIResponse(aiText);
  
  // Guardar datos listos en la memoria y desplegar el botón dorado
  currentAnalysis = { state, dims, dimScores, iim, ime, agua, overallScore, aiText };
  document.getElementById('pdfBtn').style.display = 'inline-flex';

  // Desactivar estado de carga del botón de envío
  btn.disabled = false;
  btn.querySelector('.btn-text').style.display = 'flex';
  btn.querySelector('.btn-loader').style.display = 'none';

  results.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderDimCards(state, dims, dimScores, iim, ime, agua) {
  const container = document.getElementById('dimsResults');
  if(!container) return;
  container.innerHTML = '';
  const configs = {
    estructura: { title: 'Estructura', getData: () => ime ? [`Grado de marginacion: <strong>${ime.GM_2020}</strong>`, `Analfabetismo: <strong>${ime.ANALF?.toFixed(1)}%</strong>`, `Viviendas sin agua: <strong>${ime.OVSAE?.toFixed(1)}%</strong>`] : [] },
    identidad: { title: 'Identidad', getData: () => iim ? [`Intensidad migratoria: <strong>${iim.gim_dp2}</strong>`, `Posicion nacional: <strong>#${iim.pos_nal}</strong>`, `Viviendas con remesas: <strong>${iim.viv_rem?.toFixed(2)}%</strong>`] : [] },
    conectividad: { title: 'Conectividad', getData: () => [`Usuarios internet 18-25: <strong>56.0%</strong>`, `Usuarios internet 60+: <strong>13.9%</strong>`, `Brecha de genero: <strong>+2.4pp hombres</strong>`] },
    etica: { title: 'Etica Planetaria', getData: () => agua ? [`Acuiferos (CONAGUA): <strong>${agua.acuiferos}</strong>`, `Percentil nacional: <strong>${((agua.acuiferos/158)*100).toFixed(0)}°</strong>`, `Riesgo hidrico: <strong>${agua.acuiferos > 50 ? 'Moderado' : 'Bajo'}</strong>`] : [] }
  };
  const levelMap = (score) => score >= 70 ? ['bajo', 'Equilibrio Alto'] : score >= 45 ? ['medio', 'Equilibrio Medio'] : ['alto', 'Desequilibrio'];

  dims.forEach(dim => {
    const cfg = configs[dim];
    const score = dimScores[dim];
    const [levelClass, levelLabel] = levelMap(score);
    const card = document.createElement('div');
    card.className = 'dim-card';
    card.innerHTML = `
      <div class="dim-card-header">
        <div class="dim-card-title">${cfg.title.toUpperCase()}</div>
        <div class="dim-card-level level-${levelClass}">${levelLabel}</div>
      </div>
      <div class="dim-bar-bg"><div class="dim-bar-fill" style="width:0%"></div></div>
      <div class="dim-card-data">${cfg.getData().map(l => `<div>· ${l}</div>`).join('')}</div>
    `;
    container.appendChild(card);
    setTimeout(() => { card.querySelector('.dim-bar-fill').style.width = score + '%'; }, 100);
  });
}

function animateScore(score) {
  const arc = document.getElementById('scoreArc');
  const val = document.getElementById('scoreValue');
  const circumference = 326.7;
  setTimeout(() => {
    if(arc) {
      arc.style.transition = 'stroke-dashoffset 1.5s ease';
      arc.style.strokeDashoffset = circumference - (score / 100) * circumference;
    }
    if(val) val.textContent = score;
  }, 200);
}

function formatAIResponse(text) {
  let html = text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^[-*•]\s+(.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, m => `<ul>${m}</ul>`)
    .replace(/\n\n/g, '</p><p>');
  return html.startsWith('<') ? html : '<p>' + html + '</p>';
}

function downloadPDF() {
  if (!currentAnalysis) {
    alert("No hay analisis disponible para descargar.");
    return;
  }
  
  try {
    const { state, dims, dimScores, iim, ime, agua, overallScore, aiText } = currentAnalysis;
    
    // Inicialización compatible con jsPDF global en entornos estáticos
    const { jsPDF } = window.jspdf ? window.jspdf : window;
    if (!jsPDF) {
      alert("Error: La libreria jsPDF no se encuentra cargada en el navegador.");
      return;
    }
    
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const W = 210, H = 297, margin = 20;
    let y = 0;

    // ---- PORTADA ----
    doc.setFillColor(5, 8, 22); doc.rect(0, 0, W, H, 'F');
    doc.setFillColor(201, 168, 76); doc.rect(0, 0, 6, H, 'F');
    
    doc.setTextColor(201, 168, 76); doc.setFontSize(10); doc.setFont('helvetica', 'normal');
    doc.text('BALANCE CORE MEXICO', margin + 10, 40); 
    doc.text('DIAGNOSTICO DE POLITICA PUBLICA', margin + 10, 47);
    
    doc.setTextColor(255, 255, 255); doc.setFontSize(26); doc.setFont('helvetica', 'bold');
    doc.text(state.toUpperCase(), margin + 10, 80);
    
    doc.setFontSize(11); doc.setFont('helvetica', 'normal'); doc.setTextColor(180, 170, 140);
    doc.text('Analisis multidimensional basado en el marco del Balance Core', margin + 10, 92);

    // Cuadro indicador de Balance General
    doc.setFillColor(17, 26, 62); doc.roundedRect(margin + 10, 110, 80, 40, 4, 4, 'F');
    doc.setDrawColor(201, 168, 76); doc.setLineWidth(0.5); doc.roundedRect(margin + 10, 110, 80, 40, 4, 4, 'S');
    
    doc.setTextColor(201, 168, 76); doc.setFontSize(9); doc.text('INDICE DE EQUILIBRIO', margin + 50, 120, { align: 'center' });
    doc.setFontSize(32); doc.setFont('helvetica', 'bold'); doc.setTextColor(240, 208, 128);
    doc.text(String(overallScore), margin + 50, 140, { align: 'center' });

    // Cajas resumen de dimensiones
    const dimNames = { estructura: 'Estructura', identidad: 'Identidad', conectividad: 'Conectividad', etica: 'Etica Planetaria' };
    let bx = margin + 10, by = 165;
    dims.forEach((dim, i) => {
      doc.setFillColor(17, 26, 62); doc.roundedRect(bx, by, 38, 22, 3, 3, 'F');
      doc.setTextColor(201, 168, 76); doc.setFontSize(7); doc.text(dimNames[dim].toUpperCase(), bx + 19, by + 8, { align: 'center' });
      doc.setFontSize(14); doc.setFont('helvetica', 'bold'); doc.setTextColor(240, 208, 128); doc.text(String(dimScores[dim]), bx + 19, by + 17, { align: 'center' });
      bx += 42; if (i === 1) { bx = margin + 10; by += 26; }
    });

    const today = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
    doc.setTextColor(100, 98, 130); doc.setFontSize(8); doc.setFont('helvetica', 'normal');
    doc.text(`Generado el ${today} · Balance Core Mexico`, W / 2, H - 15, { align: 'center' });

    // ---- PAGINA 2: INDICADORES ESTADÍSTICOS ----
    doc.addPage(); doc.setFillColor(5, 8, 22); doc.rect(0, 0, W, H, 'F'); doc.setFillColor(201, 168, 76); doc.rect(0, 0, 6, H, 'F');
    y = 25; doc.setTextColor(201, 168, 76); doc.setFontSize(9); doc.text('DATOS DE DIAGNÓSTICO', margin + 10, y);
    doc.setFontSize(18); doc.setFont('helvetica', 'bold'); doc.setTextColor(255, 255, 255); y += 10;
    doc.text(`Indicadores Clave — ${state}`, margin + 10, y); y += 12;

    function addDataSection(title, rows) {
      doc.setFillColor(17, 26, 62); doc.roundedRect(margin + 10, y, W - margin * 2 - 10, 8, 2, 2, 'F');
      doc.setTextColor(201, 168, 76); doc.setFontSize(9); doc.setFont('helvetica', 'bold');
      doc.text(title.toUpperCase(), margin + 14, y + 5.5); y += 12;
      rows.forEach(([label, value]) => {
        doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.setTextColor(180, 170, 140); doc.text(label, margin + 14, y);
        doc.setTextColor(255, 255, 255); doc.setFont('helvetica', 'bold'); doc.text(String(value), W - margin - 10, y, { align: 'right' }); y += 6;
      });
      y += 4;
    }

    if (dims.includes('estructura') && ime) {
      addDataSection('Estructura — Indice de Marginacion', [['Grado de Marginacion Estatal', ime.GM_2020], ['Analfabetismo', `${ime.ANALF?.toFixed(1)}%`], ['Poblacion sin education basica', `${ime.SBASC?.toFixed(1)}%`]], y);
    }
    if (dims.includes('identidad') && iim) {
      addDataSection('Identidad — Intensidad Migratoria Mexico-EUA', [['Grado de Intensidad', iim.gim_dp2], ['Posicion en ranking nacional', `#${iim.pos_nal} de 32`]], y);
    }
    if (dims.includes('etica') && agua) {
      addDataSection('Etica Planetaria — Recursos Hidricos', [['Acuiferos Registrados (CONAGUA)', agua.acuiferos], ['Percentil de disponibilidad nacional', `${((agua.acuiferos/158)*100).toFixed(0)}%`]], y);
    }

    // ---- PAGINA 3: ANÁLISIS ESTRATÉGICO ----
    doc.addPage(); doc.setFillColor(5, 8, 22); doc.rect(0, 0, W, H, 'F'); doc.setFillColor(201, 168, 76); doc.rect(0, 0, 6, H, 'F');
    y = 25; doc.setTextColor(201, 168, 76); doc.setFontSize(9); doc.setFont('helvetica', 'normal'); doc.text('ANALISIS & ESTRATEGIA', margin + 10, y);
    doc.setFontSize(18); doc.setFont('helvetica', 'bold'); doc.setTextColor(255, 255, 255); y += 10; doc.text('Politicas Publicas Recomendadas', margin + 10, y); y += 15;

    // Purificación rigurosa de texto plano para jsPDF estándar
    const cleanText = aiText
      .replace(/\*\"/g, '')
      .replace(/###/g, '')
      .replace(/[•]/g, '-')
      .replace(/[’]/g, "'");
      
    const lines = doc.splitTextToSize(cleanText, W - margin * 2 - 14);
    
    lines.forEach(line => {
      if (y > H - 25) { 
        doc.addPage(); doc.setFillColor(5, 8, 22); doc.rect(0, 0, W, H, 'F'); doc.setFillColor(201, 168, 76); doc.rect(0, 0, 6, H, 'F'); y = 25; 
      }
      const isHeader = line.includes('Diagnostico') || line.includes('Politicas Publicas') || line.includes('Ruta de Equil');
      doc.setFont('helvetica', isHeader ? 'bold' : 'normal'); 
      doc.setFontSize(isHeader ? 11 : 9.5);
      doc.setTextColor(isHeader ? 240 : 180, isHeader ? 208 : 175, isHeader ? 128 : 150);
      doc.text(line, margin + 10, y); y += 6;
    });

    // ---- PAGINA FINAL ----
    doc.addPage(); doc.setFillColor(5, 8, 22); doc.rect(0, 0, W, H, 'F'); doc.setFillColor(201, 168, 76); doc.rect(0, 0, 6, H, 'F');
    y = H / 2 - 20; doc.setTextColor(201, 168, 76); doc.setFontSize(10); doc.text('VISION GLOBAL', W / 2, y, { align: 'center' });
    doc.setFontSize(20); doc.setFont('helvetica', 'bold'); doc.setTextColor(255, 255, 255); y += 15; doc.text('Mexico es el primer laboratorio.', W / 2, y, { align: 'center' });
    y += 10; doc.text('El mundo es el destino.', W / 2, y, { align: 'center' });
    
    const safeStateName = state.replace(/\s+/g, '_');
    doc.save(`BalanceCore_${safeStateName}.pdf`);
  } catch (pdfError) {
    console.error("Error critico generando el PDF:", pdfError);
    alert("Hubo un contratiempo con la compilación del reporte. Inténtalo de nuevo.");
  }
}
