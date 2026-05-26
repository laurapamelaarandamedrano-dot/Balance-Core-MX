// ============================================================
// BALANCE CORE MÉXICO — App Logic
// AI powered by Claude (Anthropic) · PDF via jsPDF
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

  // UI loading state
  const btn = document.getElementById('generateBtn');
  btn.disabled = true;
  btn.querySelector('.btn-text').style.display = 'none';
  btn.querySelector('.btn-loader').style.display = 'flex';

  // Show results area
  const results = document.getElementById('results');
  results.style.display = 'block';
  document.getElementById('pdfBtn').style.display = 'none';
  document.getElementById('aiContent').innerHTML = `<div class="loading-pulses"><div class="lp"></div><div class="lp"></div><div class="lp"></div></div>`;

  // Gather data
  const iim = getIIM(state);
  const ime = getIME(state);
  const agua = getAgua(state);
  const internet2023 = DATA.internet['2023'];

  // Compute dimension scores (0-100, higher = more balanced / better)
  const dimScores = {};

  if (dims.includes('estructura')) {
    // Based on IME - lower marginalization = better structure
    const gmMap = { 'Muy bajo': 92, 'Bajo': 75, 'Medio': 55, 'Alto': 35, 'Muy alto': 15 };
    dimScores.estructura = gmMap[ime?.GM_2020] || 50;
  }
  if (dims.includes('identidad')) {
    // Based on IIM - very high migration = identity fragmentation signal
    const gimMap = { 'Muy bajo': 85, 'Bajo': 70, 'Medio': 55, 'Alto': 35, 'Muy alto': 20 };
    dimScores.identidad = gimMap[iim?.gim_dp2] || 50;
  }
  if (dims.includes('conectividad')) {
    // Based on national internet usage avg (state-level breakdown not available, use national 2023 proxy)
    const avgInternet = internet2023.reduce((s, d) => s + d.porcentaje_total, 0) / internet2023.length;
    // Adjust by marginalization level
    const marginAdj = { 'Muy bajo': 10, 'Bajo': 5, 'Medio': 0, 'Alto': -10, 'Muy alto': -18 };
    dimScores.conectividad = Math.min(95, Math.max(10, Math.round(avgInternet + (marginAdj[ime?.GM_2020] || 0))));
  }
  if (dims.includes('etica')) {
    // Based on number of aquifer studies (more = more monitored/managed)
    const maxAcuiferos = 158; // Chihuahua
    const acuiferos = agua?.acuiferos || 30;
    // Balance: not too few (unmonitored) not too many (over-extraction risk)
    const raw = (acuiferos / maxAcuiferos) * 100;
    // Very high = higher risk of over-extraction; low = low monitoring
    // Ideal is middle (50-80 range)
    dimScores.etica = raw > 80 ? Math.round(100 - (raw - 80) * 1.5) : Math.round(raw);
    dimScores.etica = Math.max(20, Math.min(88, dimScores.etica));
  }

  const overallScore = Math.round(Object.values(dimScores).reduce((a, b) => a + b, 0) / Object.keys(dimScores).length);

  // Render dimension cards
  renderDimCards(state, dims, dimScores, iim, ime, agua);

  // Animate score ring
  document.getElementById('stateBadge').textContent = state.toUpperCase();
  animateScore(overallScore);

  // Build AI prompt
  const prompt = buildPrompt(state, dims, dimScores, iim, ime, agua, overallScore);

  try {
    const aiText = await callClaude(prompt);
    document.getElementById('aiContent').innerHTML = formatAIResponse(aiText);
    currentAnalysis = { state, dims, dimScores, iim, ime, agua, overallScore, aiText };
    document.getElementById('pdfBtn').style.display = 'inline-flex';
  } catch (err) {
    document.getElementById('aiContent').innerHTML = `<p style="color:#f87171">Error al conectar con el motor de IA. Verifica tu conexión o intenta más tarde.</p>`;
    console.error(err);
  }

  // Restore button
  btn.disabled = false;
  btn.querySelector('.btn-text').style.display = 'flex';
  btn.querySelector('.btn-loader').style.display = 'none';

  // Smooth scroll to results
  results.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderDimCards(state, dims, dimScores, iim, ime, agua) {
  const container = document.getElementById('dimsResults');
  container.innerHTML = '';

  const configs = {
    estructura: {
      title: 'Estructura',
      getData: () => ime ? [
        `Grado de marginación: <strong>${ime.GM_2020}</strong>`,
        `Analfabetismo: <strong>${ime.ANALF?.toFixed(1)}%</strong>`,
        `Sin educación básica: <strong>${ime.SBASC?.toFixed(1)}%</strong>`,
        `Población bajo 2 salarios mínimos: <strong>${ime.PO2SM?.toFixed(1)}%</strong>`,
        `Viviendas sin agua entubada: <strong>${ime.OVSAE?.toFixed(1)}%</strong>`
      ] : []
    },
    identidad: {
      title: 'Identidad',
      getData: () => iim ? [
        `Grado de intensidad migratoria: <strong>${iim.gim_dp2}</strong>`,
        `Posición nacional: <strong>#${iim.pos_nal} de 32</strong>`,
        `Viviendas con remesas: <strong>${iim.viv_rem?.toFixed(2)}%</strong>`,
        `Viviendas con emigrantes: <strong>${iim.viv_emig?.toFixed(2)}%</strong>`,
        `Índice IIM: <strong>${iim.iim_dp2?.toFixed(2)}</strong>`
      ] : []
    },
    conectividad: {
      title: 'Conectividad',
      getData: () => [
        `Usuarios internet 18-25 años (2023): <strong>56.0%</strong>`,
        `Usuarios internet 60+ años (2023): <strong>13.9%</strong>`,
        `Brecha de género digital: <strong>+2.4pp hombres</strong>`,
        `Marginación ajustada al acceso: <strong>${ime?.GM_2020 || 'N/D'}</strong>`,
        `Acceso nacional promedio: <strong>~37.9%</strong>`
      ]
    },
    etica: {
      title: 'Ética Planetaria',
      getData: () => agua ? [
        `Acuíferos registrados (CONAGUA): <strong>${agua.acuiferos}</strong>`,
        `Posición relativa (máx. 158): <strong>${((agua.acuiferos/158)*100).toFixed(0)}° percentil</strong>`,
        `Densidad hídrica subterránea: <strong>${agua.acuiferos > 80 ? 'Alta' : agua.acuiferos > 40 ? 'Media' : 'Baja'}</strong>`,
        `Riesgo de sobreexplotación: <strong>${agua.acuiferos > 100 ? 'Elevado' : agua.acuiferos > 50 ? 'Moderado' : 'Bajo'}</strong>`,
        `Cobertura de monitoreo: <strong>${agua.acuiferos > 60 ? 'Alta' : 'Parcial'}</strong>`
      ] : []
    }
  };

  const levelMap = (score) => score >= 70 ? ['bajo', 'Equilibrio Alto'] : score >= 45 ? ['medio', 'Equilibrio Medio'] : ['alto', 'Desequilibrio'];

  dims.forEach(dim => {
    const cfg = configs[dim];
    const score = dimScores[dim];
    const [levelClass, levelLabel] = levelMap(score);
    const dataLines = cfg.getData();

    const card = document.createElement('div');
    card.className = 'dim-card';
    card.innerHTML = `
      <div class="dim-card-header">
        <div class="dim-card-title">${cfg.title.toUpperCase()}</div>
        <div class="dim-card-level level-${levelClass}">${levelLabel}</div>
      </div>
      <div class="dim-bar-bg"><div class="dim-bar-fill" style="width:0%" data-target="${score}%"></div></div>
      <div class="dim-card-data">${dataLines.map(l => `<div>· ${l}</div>`).join('')}</div>
    `;
    container.appendChild(card);

    // Animate bar
    setTimeout(() => {
      card.querySelector('.dim-bar-fill').style.width = score + '%';
    }, 100);
  });
}

function animateScore(score) {
  const arc = document.getElementById('scoreArc');
  const val = document.getElementById('scoreValue');
  const circumference = 326.7;
  const offset = circumference - (score / 100) * circumference;
  setTimeout(() => {
    arc.style.transition = 'stroke-dashoffset 1.5s ease';
    arc.style.strokeDashoffset = offset;
    val.textContent = score;
  }, 200);
}

function buildPrompt(state, dims, dimScores, iim, ime, agua, overallScore) {
  const dimLabels = { estructura: 'Estructura', identidad: 'Identidad', conectividad: 'Conectividad', etica: 'Ética Planetaria' };

  let dataBlock = `ESTADO ANALIZADO: ${state}\nÍNDICE DE EQUILIBRIO GENERAL: ${overallScore}/100\n\n`;

  if (dims.includes('estructura') && ime) {
    dataBlock += `DIMENSIÓN ESTRUCTURA (score: ${dimScores.estructura}/100):\n- Grado de marginación 2020: ${ime.GM_2020}\n- Analfabetismo: ${ime.ANALF?.toFixed(1)}%\n- Sin educación básica: ${ime.SBASC?.toFixed(1)}%\n- Población bajo 2 salarios mínimos: ${ime.PO2SM?.toFixed(1)}%\n- Viviendas sin agua entubada: ${ime.OVSAE?.toFixed(1)}%\n- Viviendas sin drenaje: ${ime.OVSDE?.toFixed(1)}%\n\n`;
  }
  if (dims.includes('identidad') && iim) {
    dataBlock += `DIMENSIÓN IDENTIDAD - MIGRACIÓN (score: ${dimScores.identidad}/100):\n- Grado de intensidad migratoria México-EUA: ${iim.gim_dp2}\n- Ranking nacional de migración: #${iim.pos_nal} de 32\n- Viviendas con remesas: ${iim.viv_rem?.toFixed(2)}%\n- Viviendas con emigrantes actuales: ${iim.viv_emig?.toFixed(2)}%\n- Viviendas con migrantes circulares: ${iim.viv_circ?.toFixed(2)}%\n- Viviendas con migrantes de retorno: ${iim.viv_ret?.toFixed(2)}%\n\n`;
  }
  if (dims.includes('conectividad')) {
    dataBlock += `DIMENSIÓN CONECTIVIDAD (score: ${dimScores.conectividad}/100):\n- Datos nacionales ENDUTIH 2023 aplicados con ajuste por marginación estatal\n- Usuarios de internet 18-25 años (nacional): 56.0%\n- Usuarios 60+ años (nacional): 13.9%\n- Brecha por género: hombres +2.4pp sobre mujeres\n- La marginación ${ime?.GM_2020} del estado implica acceso digital inferior al promedio nacional\n\n`;
  }
  if (dims.includes('etica') && agua) {
    dataBlock += `DIMENSIÓN ÉTICA PLANETARIA - AGUA (score: ${dimScores.etica}/100):\n- Acuíferos registrados por CONAGUA: ${agua.acuiferos}\n- Posición relativa respecto al estado con más acuíferos (Chihuahua=158): ${((agua.acuiferos/158)*100).toFixed(0)}%\n- Clasificación de riesgo hídrico: ${agua.acuiferos > 100 ? 'Alto riesgo de sobreexplotación' : agua.acuiferos > 50 ? 'Riesgo moderado' : 'Bajo número de acuíferos registrados = posible submonitoreo'}\n\n`;
  }

  return `Eres un analista senior de política pública para México, experto en el marco filosófico del Balance Core (equilibrio entre Estructura, Identidad, Conectividad y Ética Planetaria).

Con base en los siguientes datos REALES del estado de ${state}:

${dataBlock}

Genera un diagnóstico ejecutivo en español con:

1. **Diagnóstico del Desequilibrio** (2-3 párrafos): Describe los principales desequilibrios detectados en las dimensiones analizadas usando los datos específicos. Nombra cifras concretas. Usa el lenguaje del Balance Core.

2. **3 Políticas Públicas Prioritarias**: Para cada una incluye:
   - Nombre de la política
   - Dimensión que ataca (Estructura/Identidad/Conectividad/Ética Planetaria)
   - Justificación con datos
   - Acciones concretas (3-4 acciones)
   - Indicador de éxito medible

3. **Ruta de Equilibrio** (1 párrafo): Cómo estas políticas restablecen el balance entre las 4 dimensiones del Balance Core.

Sé específico, usa los datos reales proporcionados, y habla en términos de equilibrio sistémico. Evita generalidades. El tono es de un documento de gobierno de alto nivel pero accesible.`;
}

async function callClaude(prompt) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }]
    })
  });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  const data = await response.json();
  return data.content.map(b => b.text || '').join('');
}

function formatAIResponse(text) {
  let html = text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h3>$1</h3>')
    .replace(/^# (.+)$/gm, '<h3>$1</h3>')
    .replace(/^\d+\.\s+\*\*(.+?)\*\*/gm, '<h3>$1</h3>')
    .replace(/^[-*]\s+(.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, m => `<ul>${m}</ul>`)
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hup])/gm, '');

  if (!html.startsWith('<')) html = '<p>' + html + '</p>';
  return html;
}

// ============================================================
// PDF GENERATION
// ============================================================
function downloadPDF() {
  if (!currentAnalysis) return;
  const { state, dims, dimScores, iim, ime, agua, overallScore, aiText } = currentAnalysis;
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const W = 210, H = 297;
  const margin = 20;
  let y = 0;

  // ---- COVER PAGE ----
  doc.setFillColor(5, 8, 22);
  doc.rect(0, 0, W, H, 'F');

  // Gold accent bar
  doc.setFillColor(201, 168, 76);
  doc.rect(0, 0, 6, H, 'F');

  // Title
  doc.setTextColor(201, 168, 76);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('BALANCE CORE MÉXICO', margin + 10, 40);
  doc.text('DIAGNÓSTICO DE POLÍTICA PÚBLICA', margin + 10, 47);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text(state.toUpperCase(), margin + 10, 80);

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(180, 170, 140);
  doc.text('Análisis multidimensional basado en el marco del Balance Core', margin + 10, 92);

  // Score box
  doc.setFillColor(17, 26, 62);
  doc.roundedRect(margin + 10, 110, 80, 40, 4, 4, 'F');
  doc.setDrawColor(201, 168, 76);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin + 10, 110, 80, 40, 4, 4, 'S');
  doc.setTextColor(201, 168, 76);
  doc.setFontSize(9);
  doc.text('ÍNDICE DE EQUILIBRIO', margin + 50, 120, { align: 'center' });
  doc.setFontSize(32);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(240, 208, 128);
  doc.text(String(overallScore), margin + 50, 140, { align: 'center' });
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(180, 170, 140);
  doc.text('de 100', margin + 50, 147, { align: 'center' });

  // Dimensions on cover
  const dimNames = { estructura: 'Estructura', identidad: 'Identidad', conectividad: 'Conectividad', etica: 'Ética Planetaria' };
  let bx = margin + 10, by = 165;
  dims.forEach((dim, i) => {
    const score = dimScores[dim];
    doc.setFillColor(17, 26, 62);
    doc.roundedRect(bx, by, 38, 22, 3, 3, 'F');
    doc.setTextColor(201, 168, 76);
    doc.setFontSize(7);
    doc.text(dimNames[dim].toUpperCase(), bx + 19, by + 8, { align: 'center' });
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(240, 208, 128);
    doc.text(String(score), bx + 19, by + 17, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    bx += 42;
    if (i === 1) { bx = margin + 10; by += 26; }
  });

  // Footer cover
  doc.setTextColor(100, 98, 130);
  doc.setFontSize(8);
  const today = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`Generado el ${today} · Balance Core México · balance-core.mx`, W / 2, H - 15, { align: 'center' });
  doc.setTextColor(60, 58, 90);
  doc.text('Obra en constante evolución · Modelo replicable globalmente · IA: Claude (Anthropic)', W / 2, H - 10, { align: 'center' });

  // ---- DATA PAGE ----
  doc.addPage();
  doc.setFillColor(5, 8, 22);
  doc.rect(0, 0, W, H, 'F');
  doc.setFillColor(201, 168, 76);
  doc.rect(0, 0, 6, H, 'F');

  y = 25;
  doc.setTextColor(201, 168, 76);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('DATOS DE DIAGNÓSTICO', margin + 10, y);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  y += 10;
  doc.text(`Indicadores Clave — ${state}`, margin + 10, y);
  y += 12;
  doc.setDrawColor(201, 168, 76);
  doc.setLineWidth(0.3);
  doc.line(margin + 10, y, W - margin, y);
  y += 10;

  function addDataSection(title, rows) {
    if (y > H - 40) { doc.addPage(); doc.setFillColor(5, 8, 22); doc.rect(0, 0, W, H, 'F'); doc.setFillColor(201, 168, 76); doc.rect(0, 0, 6, H, 'F'); y = 25; }
    doc.setFillColor(17, 26, 62);
    doc.roundedRect(margin + 10, y, W - margin * 2 - 10, 8, 2, 2, 'F');
    doc.setTextColor(201, 168, 76);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(title.toUpperCase(), margin + 14, y + 5.5);
    y += 12;
    rows.forEach(([label, value]) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(180, 170, 140);
      doc.text(label, margin + 14, y);
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.text(String(value), W - margin - 10, y, { align: 'right' });
      y += 6;
    });
    y += 4;
  }

  if (dims.includes('estructura') && ime) {
    addDataSection('Estructura — Índice de Marginación 2020', [
      ['Grado de Marginación', ime.GM_2020],
      ['Analfabetismo', `${ime.ANALF?.toFixed(1)}%`],
      ['Sin educación básica', `${ime.SBASC?.toFixed(1)}%`],
      ['Población bajo 2 salarios mínimos', `${ime.PO2SM?.toFixed(1)}%`],
      ['Viviendas sin agua entubada', `${ime.OVSAE?.toFixed(1)}%`],
      ['Viviendas sin drenaje', `${ime.OVSDE?.toFixed(1)}%`],
      ['Viviendas sin electricidad', `${ime.OVSEE?.toFixed(1)}%`],
    ]);
  }
  if (dims.includes('identidad') && iim) {
    addDataSection('Identidad — Intensidad Migratoria México-EUA 2020', [
      ['Grado de Intensidad Migratoria', iim.gim_dp2],
      ['Posición nacional', `#${iim.pos_nal} de 32`],
      ['Viviendas con remesas', `${iim.viv_rem?.toFixed(2)}%`],
      ['Viviendas con emigrantes', `${iim.viv_emig?.toFixed(2)}%`],
      ['Viviendas con migrantes circulares', `${iim.viv_circ?.toFixed(2)}%`],
      ['Viviendas con migrantes de retorno', `${iim.viv_ret?.toFixed(2)}%`],
    ]);
  }
  if (dims.includes('conectividad')) {
    addDataSection('Conectividad — Usuarios de Internet 2023 (ENDUTIH-INEGI)', [
      ['Usuarios 12-17 años (nacional)', '51.9%'],
      ['Usuarios 18-25 años (nacional)', '56.0%'],
      ['Usuarios 26-49 años (nacional)', '40.9%'],
      ['Usuarios 60+ años (nacional)', '13.9%'],
      ['Brecha de género (18-25)', 'H: 54.8% / M: 57.2%'],
      ['Ajuste por marginación estatal', ime?.GM_2020 || 'N/D'],
    ]);
  }
  if (dims.includes('etica') && agua) {
    addDataSection('Ética Planetaria — Acuíferos Subterráneos (CONAGUA)', [
      ['Acuíferos registrados', String(agua.acuiferos)],
      ['Percentil nacional (máx: Chihuahua 158)', `${((agua.acuiferos / 158) * 100).toFixed(0)}°`],
      ['Clasificación hídrica', agua.acuiferos > 100 ? 'Alta densidad' : agua.acuiferos > 50 ? 'Media densidad' : 'Baja densidad'],
      ['Riesgo de sobreexplotación', agua.acuiferos > 100 ? 'Elevado' : agua.acuiferos > 50 ? 'Moderado' : 'Bajo'],
    ]);
  }

  // ---- ANALYSIS PAGE(S) ----
  doc.addPage();
  doc.setFillColor(5, 8, 22);
  doc.rect(0, 0, W, H, 'F');
  doc.setFillColor(201, 168, 76);
  doc.rect(0, 0, 6, H, 'F');

  y = 25;
  doc.setTextColor(201, 168, 76);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('ANÁLISIS & ESTRATEGIA', margin + 10, y);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  y += 10;
  doc.text('Políticas Públicas Recomendadas', margin + 10, y);
  y += 8;
  doc.setDrawColor(201, 168, 76);
  doc.setLineWidth(0.3);
  doc.line(margin + 10, y, W - margin, y);
  y += 10;

  // Clean AI text for PDF
  const cleanText = aiText
    .replace(/\*\*/g, '')
    .replace(/^#{1,3}\s+/gm, '')
    .replace(/^[-*]\s+/gm, '• ');

  const lines = doc.splitTextToSize(cleanText, W - margin * 2 - 14);
  const lineHeight = 5.5;

  for (const line of lines) {
    if (y > H - 20) {
      doc.addPage();
      doc.setFillColor(5, 8, 22);
      doc.rect(0, 0, W, H, 'F');
      doc.setFillColor(201, 168, 76);
      doc.rect(0, 0, 6, H, 'F');
      y = 25;
    }
    const isBold = line.match(/^[A-Z0-9][\w\s]+:/) || line.match(/^\d+\./);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(isBold ? 240 : 200, isBold ? 208 : 198, isBold ? 128 : 178);
    doc.text(line, margin + 10, y);
    y += lineHeight;
  }

  // ---- FINAL PAGE: Vision Global ----
  doc.addPage();
  doc.setFillColor(5, 8, 22);
  doc.rect(0, 0, W, H, 'F');
  doc.setFillColor(201, 168, 76);
  doc.rect(0, 0, 6, H, 'F');

  y = H / 2 - 40;
  doc.setTextColor(201, 168, 76);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('VISIÓN GLOBAL', W / 2, y, { align: 'center' });
  y += 14;
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('México es el primer laboratorio.', W / 2, y, { align: 'center' });
  y += 10;
  doc.text('El mundo es el destino.', W / 2, y, { align: 'center' });
  y += 16;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(180, 170, 140);
  const visionText = 'Balance Core México es el prototipo de un modelo de inteligencia pública diseñado para replicarse en cualquier nación. Fundamentado en The Balance Core: A New Architecture of 21st-Century Power.';
  const vLines = doc.splitTextToSize(visionText, 120);
  vLines.forEach(l => { doc.text(l, W / 2, y, { align: 'center' }); y += 7; });

  y += 20;
  doc.setTextColor(100, 98, 130);
  doc.setFontSize(8);
  doc.text('Obra en constante evolución · Modelo replicable globalmente', W / 2, y, { align: 'center' });
  doc.text('Datos: CONAPO · INEGI · CONAGUA · IA: Claude (Anthropic)', W / 2, y + 6, { align: 'center' });
  doc.text(`balance-core.mx · ${today}`, W / 2, y + 12, { align: 'center' });

  doc.save(`BalanceCore_${state.replace(/\s+/g, '_')}_${new Date().getFullYear()}.pdf`);
}
