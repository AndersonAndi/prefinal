// script.js

// DARK MODE TOGGLE
const darkModeBtn = document.getElementById('darkModeToggle');

darkModeBtn.addEventListener('click', () => {
    // Toggle la animación y el tema oscuro al mismo tiempo
    document.body.classList.toggle('active');        // para animación del toggle
    document.body.classList.toggle('dark-mode');     // para aplicar colores

    const iconDiv = darkModeBtn.querySelector('.sunnyAndMoon');

    // Guardar preferencia en localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        iconDiv.innerHTML = '>>🌙';
    } else {
        localStorage.setItem('theme', 'light');
        iconDiv.innerHTML = '☀️&lt&lt';
    }
});

// Aplicar tema guardado al cargar la página
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    document.body.classList.add('active');  // si quieres que el toggle esté en posición "dark"
}

// DARK MODE TOGGLE2
const darkModeBtn2 = document.getElementById('darkModeToggle2');

darkModeBtn2.addEventListener('click', () => {
    // Toggle la animación y el tema oscuro al mismo tiempo
    document.body.classList.toggle('active');        // para animación del toggle
    document.body.classList.toggle('dark-mode');     // para aplicar colores

    const iconDiv2 = darkModeBtn2.querySelector('.sunnyAndMoon2');

    // Guardar preferencia en localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        iconDiv2.innerHTML = '>>🌙';
    } else {
        localStorage.setItem('theme', 'light');
        iconDiv2.innerHTML = '☀️&lt&lt';
    }
});

// Aplicar tema guardado al cargar la página
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    document.body.classList.add('active');  // si quieres que el toggle esté en posición "dark"
}



// ---------- MOBILE MENU TOGGLE & ANIMATED DIAGONAL FILL ----------

const menuBtn = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

// Create an overlay to perform diagonal color animation
let diagOverlay = null;

function createDiagOverlay() {
  if (diagOverlay) return;
  diagOverlay = document.createElement('div');
  diagOverlay.id = 'diagOverlay';
  Object.assign(diagOverlay.style, {
    position: 'fixed',
    top: 0, left: 0,
    width: '0%',
    height: '0%',
    pointerEvents: 'none',
    zIndex: 1500,
    transformOrigin: '0 0',
    transition: 'width 1ms ease, height 1ms ease'
  });
  document.body.appendChild(diagOverlay);
}

function openMobileMenuAnimated() {
  createDiagOverlay();
  diagOverlay.style.background = `linear-gradient(135deg, var(--color-accent), var(--color-bg))`;
  diagOverlay.style.width = '120%';
  diagOverlay.style.height = '120%';

  // mostrar el menú inmediatamente
  mobileMenu.classList.add('active');

  //DESACTIVAR SCROLL cuando se abre el menú
  document.body.classList.add('no-scroll');

  // limpiar el overlay casi al instante
  diagOverlay.style.transition = 'opacity 0ms ease';
  diagOverlay.style.opacity = '0';
  setTimeout(() => {
    if (diagOverlay) {
      diagOverlay.remove();
      diagOverlay = null;
    }
  }, 100);
}


function closeMobileMenu() {
  menuBtn.classList.remove('active');
  mobileMenu.classList.remove('active');
  // remove overlay if present
  // *** AÑADIR: Activar el scroll (quitar la clase) ***
   document.body.classList.remove('no-scroll'); 
  if (diagOverlay) {
    diagOverlay.remove();
    diagOverlay = null;
  }
}

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('active');
    if (isOpen) {
      closeMobileMenu();
    } else {
      menuBtn.classList.add('active');
      openMobileMenuAnimated();
    }
  });
}

// close mobile menu when clicking any mobile link
const mobileLinks = document.querySelectorAll('.mobile-link');
mobileLinks.forEach(a => {
  a.addEventListener('click', () => {
    // mark corresponding desktop link active (optional)
    const text = a.textContent.trim();
    menuLinks.forEach(l => {
      if (l.textContent.trim() === text) {
        menuLinks.forEach(x => x.classList.remove('active'));
        l.classList.add('active');
      }
    });
    closeMobileMenu();
  });
});

// close menu on Esc key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMobileMenu();
});

// ==============================
// 🔵 SECCIÓN 2: Calcular Puntuación del Estudio
// ==============================

// Obtener referencias a inputs
const inpAgresividad = document.getElementById("p_agresividad");
const inpOfensa = document.getElementById("p_ofensa");
const inpIdeologia = document.getElementById("p_ideologia");
const inpConstructividad = document.getElementById("p_constructividad");
const inpEmpatia = document.getElementById("p_empatia");
const inpDialogo = document.getElementById("p_dialogo");

const btnCalcular = document.getElementById("btnCalcularPuntuacion");
const valorPuntuacion = document.getElementById("valorPuntuacion");

// Función principal
function calcularPuntuacion() {
  const a = Number(inpAgresividad.value);
  const o = Number(inpOfensa.value);
  const i = Number(inpIdeologia.value);
  const c = Number(inpConstructividad.value);
  const e = Number(inpEmpatia.value);
  const d = Number(inpDialogo.value);

  // Fórmula total según tu descripción
  const total =
      a * 0.25 +
      o * 0.20 +
      i * 0.15 +
      (100 - c) * 0.20 +
      (100 - e) * 0.10 +
      (100 - d) * 0.10;

  // Mostrar resultado con 2 decimales
  valorPuntuacion.textContent = total.toFixed(2);
}

// Evento del botón
btnCalcular.addEventListener("click", calcularPuntuacion);



// ===== Sección 3: comportamientos botones grafica =====
(function(){
  const btnFecha = document.getElementById('btnOrdenarFecha');
  const btnMinMax = document.getElementById('btnOrdenarMinMax');
  let minMaxState = 0; // 0 = off, 1 = min, 2 = max (alternar)

  btnFecha?.addEventListener('click', () => {
    // emitir evento; tu módulo de graficas debe escuchar y reordenar
    window.dispatchEvent(new CustomEvent('ordenarPorFecha'));
  });

  btnMinMax?.addEventListener('click', () => {
    minMaxState = (minMaxState + 1) % 3; // 0->1->2->0
    if(minMaxState === 0) btnMinMax.classList.remove('active-min', 'active-max');
    if(minMaxState === 1) { // min
      btnMinMax.classList.add('active-min');
      btnMinMax.classList.remove('active-max');
      window.dispatchEvent(new CustomEvent('ordenarMin')); 
    }
    if(minMaxState === 2) { // max
      btnMinMax.classList.add('active-max');
      btnMinMax.classList.remove('active-min');
      window.dispatchEvent(new CustomEvent('ordenarMax')); 
    }
  });
})();

// ===== SECCIÓN 4: TABLA DE FRECUENCIAS DINÁMICA =====
(function(){

  const tbody = document.querySelector('#tablaFrecuencias tbody');
  const colTitulo = document.getElementById('col-titulo');

  // Aquí guardaremos los datos del CSV ordParInd
  let datosCSV = [];

  const columnas = [
    "Puntuación",
    "Agresividad",
    "Ofensa",
    "Ideología",
    "Constructividad",
    "Empatía",
    "Diálogo"
  ];

  // Mapa → botón ↔ columna del CSV ordenado
  const mapOrd = {
    "Agresividad": "Agresividad_Ordenado",
    "Ofensa": "Ofensa_Ordenado",
    "Ideología": "Ideología_Ordenado",
    "Constructividad": "Constructividad_Ordenado",
    "Empatía": "Empatía_Ordenado",
    "Diálogo": "Diálogo_Ordenado",
    "Puntuación": "Total_Ordenado"
  };

  function actualizarTituloColumna(nombre) {
    colTitulo.innerHTML = `
      Valor <br> (${nombre})<br><span class="abbr">X</span>
    `;
  }

  // Obtiene valores de la columna correspondiente del CSV ordenado
  function obtenerValores(columna) {

    // mapa de índices en ordParInd.csv
    const indexMap = {
      "Agresividad": 0,
      "Ofensa": 1,
      "Ideología": 2,
      "Constructividad": 3,
      "Empatía": 4,
      "Diálogo": 5,
      "Puntuación": 6   // Total_Ordenado
    };

    const idx = indexMap[columna];
    //console.log("Extrayendo columna:", columna, " → índice:", idx);

    return datosCSV
      .map(row => {
        const keys = Object.keys(row);
        const valor = parseFloat(row[keys[idx]]);
        return valor;
      })
      .filter(v => !isNaN(v));
  }




  // Generar tabla de frecuencias
  function generarTablaFrecuencias(valores){

    const freq = {};
    valores.forEach(v => freq[v] = (freq[v] || 0) + 1);

    const unicos = Object.keys(freq).map(Number).sort((a,b)=>a-b);

    const total = valores.length;
    let acumulada = 0;

    tbody.innerHTML = '';

    unicos.forEach(v => {
      const f = freq[v];
      acumulada += f;

      const fr = f / total;
      const Fr = acumulada / total;

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${v}</td>
        <td>${f}</td>
        <td>${acumulada}</td>
        <td>${fr.toFixed(3)}</td>
        <td>${Fr.toFixed(3)}</td>
        <td>${(fr*100).toFixed(1)}%</td>
        <td>${(Fr*100).toFixed(1)}%</td>
      `;
      tbody.appendChild(tr);
    });
  }

  // Estadísticos
  function estadisticas(valores){
    const n = valores.length;

    if(n===0)
      return { media:'--', mediana:'--', moda:'--' };

    const media = (valores.reduce((a,b)=>a+b,0) / n).toFixed(2);

    const sorted = valores.slice().sort((a,b)=>a-b);
    const mediana = (n % 2 === 1)
      ? sorted[(n-1)/2].toFixed(2)
      : ((sorted[n/2 - 1] + sorted[n/2]) / 2).toFixed(2);

    const freq = {};
    sorted.forEach(v => freq[v] = (freq[v]||0)+1);

    let moda = sorted[0], maxf = 0;
    for(const k in freq){
      if(freq[k] > maxf){
        maxf = freq[k];
        moda = k;
      }
    }

    return { media, mediana, moda };
  }

  // Botones cambio parámetro
  document.querySelectorAll(".col-botones button").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const nombre = btn.dataset.col;
      //console.log("Seleccionado:", nombre);

      actualizarTituloColumna(nombre);

      const valores = obtenerValores(nombre);

     0// console.log("Valores obtenidos:", valores);

      generarTablaFrecuencias(valores);

      const est = estadisticas(valores);
      document.getElementById('stat-media').textContent = est.media;
      document.getElementById('stat-mediana').textContent = est.mediana;
      document.getElementById('stat-moda').textContent = est.moda;
    });
  });

  // Cargar CSV ordParInd
  async function cargarCSV() {
    //if (!medioID || !datosMedios[medioID]) return;

    //const d = datosMedios[medioID];

    const resp = await fetch("data/ordParInd.csv"); // ✅ agregar esta ruta en tu datosMedios
    const text = await resp.text();

    const lineas = text.trim().split("\n");
    const headers = lineas[0].split(",");

    datosCSV = lineas.slice(1).map(l => {
      const celdas = l.split(",");
      const obj = {};
      headers.forEach((h, i) => {
        obj[h] = celdas[i]?.trim();
      });
      return obj;
    });
  }

  // Carga inicial → Puntuación
  document.addEventListener("DOMContentLoaded", async ()=>{

    await cargarCSV();

    const valores = obtenerValores("Puntuación");

    generarTablaFrecuencias(valores);

    const est = estadisticas(valores);
    document.getElementById('stat-media').textContent = est.media;
    document.getElementById('stat-mediana').textContent = est.mediana;
    document.getElementById('stat-moda').textContent = est.moda;
  });

})();





// ===== Seccion 5: exponer contenedores para tus graficas existentes =====
(function(){
  // Si tienes conteo de palabras en window.DATA.palabras.total
  document.addEventListener('DOMContentLoaded', () => {
    const totalPal = window.DATA?.palabras?.total ?? 0;
    document.getElementById('cantidadPalabras').textContent = totalPal;
    // Dispatch para que tus scripts monten las graficas con datos
    window.dispatchEvent(new CustomEvent('montarGraficasPalabras', { detail: window.DATA?.palabras }));
  });
})();


// ===== Seccion 6: controlar botones de vista y exponer datos =====
(function(){
  const btnPct = document.getElementById('vistaPorcentaje');
  const btnCnt = document.getElementById('vistaCantidad');

  btnPct.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('tortaVistaPct'));
  });
  btnCnt.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('tortaVistaCnt'));
  });

  document.addEventListener('DOMContentLoaded', () => {
    const totals = window.DATA?.clasificacion || { total:0, destructivos:0, neutrales:0, constructivos:0 };
    document.getElementById('cantidadComentariosTotal').textContent = totals.total;
    document.getElementById('countDestructivos').textContent = totals.destructivos;
    document.getElementById('countNeutrales').textContent = totals.neutrales;
    document.getElementById('countConstructivos').textContent = totals.constructivos;
    // indicar al módulo de gráficos que pinte la torta
    window.dispatchEvent(new CustomEvent('montarTorta', { detail: totals }));
  });
})();

// ===== Seccion 7: click en medio -> abrir estudio específico =====
(function(){
  document.querySelectorAll('.medio-estudio').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.dataset.id;
      // emitir evento con id; tu app puede escuchar y mostrar la vista detallada
      window.location.href = `subestudio.html?medio=${id}`;
    });
  });
})();

// Cargar desde el inicio y descavtivar el scroll automático al navegar
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

/*btnSwitch.onclick = function() {topFunction()};*/

function topFunction() {
  window.scrollTo({
    top: -100,
    behavior: 'smooth' // Desplazamiento suave
  });
}

// Ejecuta la función automáticamente cuando la página esté lista
document.addEventListener('DOMContentLoaded', (event) => {
    //console.log('La página se ha cargado. Ejecutando topFunction().');
    topFunction();
});

// ==========================================
// Sección 3 — Gráfico dinámico con OrdFecha y OrdParInd
// ==========================================

// ============ VARIABLES =============
let datosOriginal = [];       // comentarios_evaluados.csv
let ordenParamMap = {};       // ordParInd.csv
let estadoOrden = "default";  // "default" | "maxmin" | "minmax"

const columnas = {
  "Puntuacion": "Total",
  "Agresividad": "Agresividad",
  "Ofensa": "Ofensa",
  "Ideologia": "Ideología",
  "Constructividad": "Constructividad",
  "Empatia": "Empatía",
  "Dialogo": "Diálogo"
};

let chart = null;

// ------------------------------
// CSV Parser seguro
// ------------------------------
function parseCSV(text) {
  const rows = [];
  let row = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    if (ch === '"' && inQuotes && next === '"') {
      current += '"';
      i++;
      continue;
    }
    if (ch === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (ch === "," && !inQuotes) {
      row.push(current);
      current = "";
      continue;
    }
    if ((ch === "\n" || ch === "\r") && !inQuotes) {
      if (current !== "" || row.length > 0) row.push(current);
      if (row.length > 0) rows.push(row);
      row = [];
      current = "";
      if (ch === "\r" && next === "\n") i++;
      continue;
    }
    current += ch;
  }

  if (current !== "" || row.length > 0) row.push(current);
  if (row.length > 0) rows.push(row);
  return rows.map(r => r.map(c => (c ?? "").trim()));
}

// ------------------------------
// Cargar comentarios_evaluados.csv
// ------------------------------
async function cargarCSV(url) {
  const res = await fetch(url);
  if (!res.ok) return [];

  const text = await res.text();
  const rows = parseCSV(text);
  if (rows.length < 2) return [];

  const headers = rows[0];

  return rows.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = row[i] ?? "";
    });
    return obj;
  });
}

// ------------------------------
// Cargar ordParInd.csv
// columnas independientes ordenadas MAX→MIN
// ------------------------------
async function cargarOrdenParamMap(url) {
  const res = await fetch(url);
  if (!res.ok) return {};

  const text = await res.text();
  const rows = parseCSV(text);
  if (rows.length < 2) return {};

  const headers = rows[0];
  const map = {};

  headers.forEach((h, ci) => {
    const nombre = h.replace(/_Ordenado$/i, "").trim();

    const valores = rows.slice(1).map(r => {
      const n = Number(String(r[ci]).replace(",", "."));
      return isNaN(n) ? null : n;
    });

    map[nombre] = valores;
  });

  return map;
}

// ------------------------------
// Obtener serie a graficar
// ------------------------------
function obtenerSerie(nombreBoton) {
  const col = columnas[nombreBoton];

  if (!col) return [];

  // ✅ modo por defecto — usar orden por fecha
  if (estadoOrden === "default") {
    return datosOriginal.map(r => {
      const n = Number(String(r[col]).replace(",", "."));
      return isNaN(n) ? null : n;
    });
  }

  // ✅ modo ordenar — usar ordParInd.csv
  if (!ordenParamMap[col]) return [];

  const valores = [...ordenParamMap[col]]; // copiar

  if (estadoOrden === "minmax") return valores.reverse(); // ascendente

  return valores; // maxmin (descendente)
}

// ------------------------------
// Dibujar gráfico
// ------------------------------
function dibujarGrafico() {
  const ctxEl = document.getElementById("grafico");
  if (!ctxEl) return;
  const ctx = ctxEl.getContext("2d");

  if (chart) chart.destroy();

  const activos = [...document.querySelectorAll(".param-btn.active")];
  if (activos.length === 0) return;

  const datasets = activos.map(btn => {
    const nombre = btn.dataset.param;
    return {
      label: nombre,
      data: obtenerSerie(nombre),
      borderWidth: 2,
      fill: false,
      tension: 0.3
    };
  });

  const minLen = Math.min(...datasets.map(d => d.data.length));
  const labels = Array.from({ length: minLen }, (_, i) => i + 1);

  datasets.forEach(d => d.data = d.data.slice(0, minLen));

  chart = new Chart(ctx, {
    type: "line",
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: { legend: { position: "top" } },
      scales: { y: { beginAtZero: true } }
    }
  });
}

// ------------------------------
// Eventos UI — selección parámetros
// ------------------------------
function toggleParametro(btn) {
  btn.classList.toggle("active");
  dibujarGrafico();
}

// ------------------------------
// Botón ordenar
// Ciclo: default → maxmin → minmax → default
// ------------------------------
document.getElementById("sortButton").onclick = () => {
  if (estadoOrden === "default") estadoOrden = "maxmin";
  else if (estadoOrden === "maxmin") estadoOrden = "minmax";
  else estadoOrden = "default";

  actualizarTextoOrden();
  dibujarGrafico();
};

function actualizarTextoOrden() {
  const b = document.getElementById("sortButton");
  if (estadoOrden === "default") b.textContent = "Orden: Fecha";
  else if (estadoOrden === "maxmin") b.textContent = "Orden: Max–Min";
  else b.textContent = "Orden: Min–Max";
}

// ------------------------------
// Inicio
// ------------------------------
window.addEventListener("DOMContentLoaded", async () => {
  //if (!medioID || !datosMedios[medioID]) return;

  //const d = datosMedios[medioID];

  datosOriginal = await cargarCSV("data/comentarios_evaluados.csv");
  ordenParamMap = await cargarOrdenParamMap("data/ordParInd.csv");

  document.querySelectorAll(".param-btn").forEach(btn => {
    btn.onclick = () => toggleParametro(btn);
  });

  const btnP = document.querySelector('.param-btn[data-param="Puntuacion"]');
  if (btnP) btnP.classList.add("active");

  actualizarTextoOrden();
  dibujarGrafico();
});

// ============================
// SECCIÓN 4.5 — Gráfico Parámetros
// ============================

// ============================
// SECCIÓN 4.5 — Gráfico Parámetros
// ============================

let totalComentarios = 0;  
let graficoParametros;

// 1️⃣ Función para contar filas del CSV (sin cabecera)
function contarComentarios(csv) {
  const lineas = csv.trim().split("\n");
  return Math.max(0, lineas.length - 1); // evita negativos si está vacío
}

// 2️⃣ Procesar el CSV de parámetros
function procesarCSVparametros(csv) {
  const lineas = csv.trim().split("\n");
  const datos = lineas.slice(1); // quitar encabezado

  const labels = [];
  const totales = [];
  const porcentajes = [];

  datos.forEach(fila => {
    const [parametro, valor] = fila.split(",");

    const total = Number(valor);
    if (!parametro || isNaN(total)) return;

    labels.push(parametro);
    totales.push(total);

    // ✅ porcentaje dinámico basado en totalComentarios real
    const porcentaje = (total / (totalComentarios * 100)) * 100;
    porcentajes.push(Number(porcentaje.toFixed(2)));
  });

  generarGraficoParametros(labels, totales, porcentajes);
}

// 3️⃣ Gráfico
function generarGraficoParametros(labels, totales, porcentajes) {
  const ctx = document.getElementById("graficaParametros").getContext("2d");

  if (graficoParametros) graficoParametros.destroy();

  graficoParametros = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Total",
        data: totales,
        backgroundColor: "rgba(0, 200, 255, 0.75)"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(ctx) {
              return ` ${ctx.raw} (${porcentajes[ctx.dataIndex]}%)`;
            }
          }
        }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

//const di = datosMedios[medioID];
// ✅ 4️⃣ Primero cargamos comentarios_evaluados.csv → contamos filas
fetch("data/comentarios_evaluados.csv")
  .then(res => res.text())
  .then(csv => {
    totalComentarios = contarComentarios(csv);
    console.log("Total comentarios =", totalComentarios);

    // ✅ Luego cargamos el CSV de parámetros
    return fetch("data/totales.csv");
  })
  .then(res => res.text())
  .then(procesarCSVparametros)
  .catch(err => console.error("Error:", err));

  //fetch()  // ==========================================
  // seccion 5: GRAFICOS DE PALABRAS
  // ==========================================
  // ==========================================
  // SECCIÓN 5: GRAFICO DE BARRAS (INDEPENDIENTE)
  // ==========================================



  // STOPWORDS locales (independiente del otro gráfico)
  const stopwordsBarras = [
    "de","la","que","el","en","y","a","los","del","se","las","por","un","para",
    "con","no","una","su","al","lo","como","más","pero","sus","le","ya","o","este",
    "sí","porque","esta","entre","cuando","muy","sin","sobre","también","me",
    "hasta","hay","donde","quien","desde","todo","nos","durante","todos","uno",
    "les","ni","contra","otros","ese","eso","ante","ellos","e","esto","mí","antes",
    "algunos","qué","unos","yo","otro","otras","otra","él","tanto","esa","estos",
    "mucho","quienes","nada","muchos","cual","poco","ella","estar","estas","algunas",
    "algo","nosotros","mi","mis","tú","te","ti","tu","tus","ellas","nosotras","vosotros",
    "vosotras","os","mío","mía","míos","mías","tuyo","tuya","tuyos","tuyas","suyo",
    "suya","suyos","suyas","nuestro","nuestra","nuestros","nuestras","vuestro",
    "vuestra","vuestros","vuestras","esos","esas","estoy","estás","está","estamos",
    "estáis","están","esté","estés","estemos","estéis","estén","estaré","estarás",
    "estará","estaremos","estaréis","estarán","estaría","estarías","estaríamos",
    "estaríais","estarían","estaba","estabas","estábamos","estabais","estaban", "q", "es", "son"
  ];

  // Variable local independiente
  let graficoBarras = null;

  // Función independiente para procesar CSV
  function procesarCSVparaBarras(csvTexto) {

      const lineas = csvTexto
          .split("\n")
          .map(l => l.trim())
          .filter(l => l !== "");

      const filas = lineas.slice(1); // ignorar encabezado

      const contador = {};

      filas.forEach(fila => {
          const columnas = fila.split(",");

          columnas.forEach(palabra => {
              if (!palabra) return;

              palabra = palabra
                  .toLowerCase()
                  .replace(/[^a-záéíóúñü]/g, "");

              if (!palabra) return;
              if (stopwordsBarras.includes(palabra)) return;

              contador[palabra] = (contador[palabra] || 0) + 1;
          });
      });

      const top = Object.entries(contador)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 20);

      const labels = top.map(x => x[0]);
      const data = top.map(x => x[1]);

      generarGraficoBarras(labels, data);
  }


  // Gráfico de barras independiente
  function generarGraficoBarras(labels, data) {
    const ctx = document.getElementById("graficaBarras").getContext("2d");

    if (graficoBarras) graficoBarras.destroy();

    const esMovil = window.innerWidth <= 817;

    // 🔥 fuerza al canvas a usar altura fija del contenedor
    const cont = document.getElementById("grafBarras");
    const canvas = document.getElementById("graficaBarras");

    // altura EXACTA del contenedor → Chart.js ya no calculará nada raro
    canvas.style.height = cont.clientHeight + "px";
    canvas.style.width  = cont.clientWidth + "px";


    graficoBarras = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: "rgba(0,200,255,0.7)",
          barThickness: esMovil ? 12 : 20,   // ✅ barras más delgadas en móvil
          maxBarThickness: 22,
          categoryPercentage: esMovil ? 0.7 : 0.9,
          barPercentage: esMovil ? 0.7 : 0.9
        }]
      },
      options: {
        indexAxis: "y", // ✅ horizontal SIEMPRE
        responsive: true ,
        maintainAspectRatio: false, // ✅ permite llenar el div
        resizeDelay: 300, // evita loops de resize
        animation: false,   // evita triggers dobles

        layout: {
          padding: 0 // ✅ sin márgenes internos
        },
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: "Top 20 palabras más repetidas",
            padding: { top: esMovil ? 2 : 10, bottom: 6 }
          }
        },
        scales: {
          y: {
            ticks: {
              font: {
                size: esMovil ? 9 : 12 // ✅ texto más pequeño en móvil
              }
            }
          },
          x: {
            beginAtZero: true,
            ticks: {
              font: {
                size: esMovil ? 9 : 12
              }
            }
          }
        }
      }
    });
  }



  // Cargar CSV de manera independiente
  fetch("data/palabras_por_fila.csv")
      .then(res => res.text())
      .then(procesarCSVparaBarras)
      .catch(err => console.error("Error cargando CSV de barras:", err));

  // ====== GRÁFICO DE BURBUJAS INTEGRADO (SECCIÓN 5) ======

  // Stopwords para limpiar palabras
  const stopwords = [
    "de", "del", "la", "el", "los", "las", "y", "en", "a", "que", "un", "una", "con",
    "por", "para", "se", "al", "lo", "su", "sus", "le", "les", "me", "te", "es", "ya",
    "mi", "tu", "muy", "pero", "sin", "no", "sí", "ni", "o", "u", "como", "más",
    "menos", "eso", "esa", "ese", "esta", "este", "estas", "estos", "unos", "unas",
    "son", "si", "va", "ser", "q", "vez"
  ];

  const svg = d3.select("#bubbleChart");

  // Se ajusta al tamaño real del div
  function getSize() {
    const box = document.getElementById("grafBurbuja");
    return {
      width: box.clientWidth,
      height: box.clientHeight
    };
  }

  // Cargar CSV real
  d3.text("data/palabras_por_fila.csv")
    .then(processCSV)
    .catch(err => console.error("Error al cargar CSV de palabras:", err));

  function processCSV(data) {
    const rows = data.split(/\r?\n/);
    //const first100 = rows.slice(0, 100);

    let words = [];

    rows.forEach(row => {
      const cols = row.split(",");
      cols.forEach(word => {
        const clean = word.trim().toLowerCase();
        if (clean && !stopwords.includes(clean)) {
          words.push(clean);
        }
      });
    });

    // Contar frecuencia de palabras
    const counts = d3.rollup(words, v => v.length, d => d);
    let wordData = Array.from(counts, ([name, value]) => ({ name, value }));

    // Filtrar palabras con frecuencia > 1
    wordData = wordData.filter(d => d.value > 1);

    // Tomar Top 40
    wordData.sort((a, b) => b.value - a.value);
    wordData = wordData.slice(0, 40);

    // Actualizar contador en el HTML
    document.getElementById("cantidadPalabras").textContent = wordData.length;

    drawBubbleChart(wordData);
  }

  function drawBubbleChart(wordData) {
    svg.selectAll("*").remove(); // Limpia anterior

    const { width, height } = getSize();

    const root = d3.pack()
      .size([width, height])
      .padding(4)(
        d3.hierarchy({ children: wordData })
          .sum(d => d.value)
      );

    const nodes = svg.selectAll("g")
      .data(root.leaves())
      .join("g")
      .attr("transform", d => `translate(${d.x},${d.y})`);

    nodes.append("circle")
      .attr("r", d => d.r)
      .attr("fill", (d, i) => d3.interpolateRainbow(i / root.leaves().length));

    nodes.append("text")
      .text(d => d.data.name)
      .attr("dy", "0.3em")
      .style("font-size", d =>
        Math.min(2 * d.r / d.data.name.length, 14) + "px"
      );
  }

// Redibujar si cambia el tamaño de la ventana (responsivo)
/*window.addEventListener("resize", () => {
  d3.text("data/palabras_por_fila.csv").then(processCSV);
});*/

// =======================================
//   GRAFICO TORTA 3D SECCIÓN 6
// =======================================

// Cargar Google Charts
google.charts.load("current", { packages: ["corechart"] });

let vistaPorcentaje = false;

// Contadores
let countNeg = 0; // destructivo
let countNeu = 0; // neutro
let countPos = 0; // constructivo

// ------------------------------
// PARSER CSV SEGURO (respeta comas entre comillas)
// ------------------------------
function parseCSV(text) {
  const rows = [];
  let row = [];
  let current = "";
  let insideQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"' && insideQuotes && next === '"') {
      current += '"';
      i++;
      continue;
    }

    if (char === '"') {
      insideQuotes = !insideQuotes;
      continue;
    }

    if (char === "," && !insideQuotes) {
      row.push(current);
      current = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !insideQuotes) {
      if (current !== "") row.push(current);
      if (row.length > 0) rows.push(row);
      row = [];
      current = "";
      continue;
    }

    current += char;
  }

  if (current !== "") row.push(current);
  if (row.length > 0) rows.push(row);

  return rows;
}

// ------------------------------
// Leer CSV y contar categorías
// ------------------------------


google.charts.setOnLoadCallback(() => {
  fetch("data/comentarios_evaluados.csv")
    .then(r => r.text())
    .then(csv => {
      const filas = parseCSV(csv);
      filas.shift(); // remover encabezado

      filas.forEach(col => {
        const cat = col[8]?.trim();

        if (cat === "1" || cat === "1.0") countPos++;     // ✅ Constructivo
        else if (cat === "0" || cat === "0.0") countNeu++; // ⚪ Neutro
        else if (cat === "-1" || cat === "-1.0") countNeg++; // ❌ Destructivo
      });

      // ✅ Actualizar HTML inmediatamente
      document.getElementById("countConstructivos").textContent = countPos;
      document.getElementById("countNeutrales").textContent = countNeu;
      document.getElementById("countDestructivos").textContent = countNeg;

      document.getElementById("cantidadComentariosTotal").textContent =
        countNeg + countNeu + countPos;

      // ✅ Dibujar gráfico recién cuando ya hay datos
      dibujarTorta();
    });
});

// ------------------------------
// Dibujar torta
// ------------------------------
function dibujarTorta() {
  const data = google.visualization.arrayToDataTable([
    ["Clasificación", "Cantidad"],
    ["Constructivos (1)", countPos],
    ["Neutrales (0)", countNeu],
    ["Destructivos (-1)", countNeg]
  ]);

  const options = {
    is3D: true,
    backgroundColor: "transparent",
    pieSliceText: vistaPorcentaje ? "percentage" : "value",
  };

  const chart = new google.visualization.PieChart(
    document.getElementById("grafTorta")
  );

  chart.draw(data, options);
}

// ------------------------------
// Botones alternar vista
// ------------------------------
document.getElementById("vistaPorcentaje").onclick = () => {
  vistaPorcentaje = true;
  dibujarTorta();
};

document.getElementById("vistaCantidad").onclick = () => {
  vistaPorcentaje = false;
  dibujarTorta();
};

// Seccion 6.5  
// ============================
// Calculadora Multinomial (sección 6.5)
// ============================

// util: factorial con BigInt (iterativo)
function factorialBig(n) {
  let res = 1n;
  for (let i = 2n; i <= BigInt(n); i++) res *= i;
  return res;
}

// util: pow BigInt (base BigInt, exp integer >=0)
function powBig(baseBig, exp) {
  let r = 1n;
  for (let i = 0; i < exp; i++) r *= baseBig;
  return r;
}

// gcd para BigInt
function gcdBig(a, b) {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b !== 0n) {
    const t = a % b;
    a = b;
    b = t;
  }
  return a;
}

// función para cargar probabilidades desde la Sección 6
function cargarProbabilidadesMultinomial() {
  // lee totales y conteos desde sección 6
  const total = parseInt(document.getElementById("cantidadComentariosTotal").textContent || "0", 10) || 0;
  const destr = parseInt(document.getElementById("countDestructivos").textContent || "0", 10) || 0;
  const neut = parseInt(document.getElementById("countNeutrales").textContent || "0", 10) || 0;
  const cons = parseInt(document.getElementById("countConstructivos").textContent || "0", 10) || 0;

  // evita división por cero
  if (total <= 0) {
    document.getElementById("p_destructivo").textContent = "--";
    document.getElementById("p_neutral").textContent = "--";
    document.getElementById("p_constructivo").textContent = "--";
    return;
  }

  // muestra probabilidades en decimal (4 decimales) y también el ratio (counts/total)
  document.getElementById("p_destructivo").textContent = `${(destr/total).toFixed(4)} (${destr}/${total})`;
  document.getElementById("p_neutral").textContent = `${(neut/total).toFixed(4)} (${neut}/${total})`;
  document.getElementById("p_constructivo").textContent = `${(cons/total).toFixed(4)} (${cons}/${total})`;
}

// esperar un poco por si el gráfico de la Sección 6 se dibuja después
setTimeout(cargarProbabilidadesMultinomial, 700);

// evento del botón calcular
document.getElementById("btnCalcularMultinomial").addEventListener("click", function () {
  // leer x_i
  const x1 = parseInt(document.getElementById("x_destructivo").value || "0", 10);
  const x2 = parseInt(document.getElementById("x_neutral").value || "0", 10);
  const x3 = parseInt(document.getElementById("x_constructivo").value || "0", 10);

  const totalComentarios = parseInt(document.getElementById("cantidadComentariosTotal").textContent || "0", 10) || 0;
  const count1 = parseInt(document.getElementById("countDestructivos").textContent || "0", 10) || 0;
  const count2 = parseInt(document.getElementById("countNeutrales").textContent || "0", 10) || 0;
  const count3 = parseInt(document.getElementById("countConstructivos").textContent || "0", 10) || 0;

  const n = x1 + x2 + x3;

  if (n <= 0) {
    alert("⚠️ Ingrese al menos una frecuencia (la suma de x_i debe ser mayor que 0).");
    return;
  }

  // valida que existan probabilidades válidas
  if (totalComentarios <= 0 || (count1 + count2 + count3) <= 0) {
    alert("⚠️ La Sección 6 no tiene totales válidos. Asegúrate que el gráfico/torta esté cargado.");
    return;
  }

  // coeficiente multinomial: n! / (x1! x2! x3!)
  const coefBig = factorialBig(n) / (factorialBig(x1) * factorialBig(x2) * factorialBig(x3)); // BigInt

  // Probabilidades p_i exactas = count_i / totalComentarios
  // prob racional = coef * (count1^x1 * count2^x2 * count3^x3) / (totalComentarios^n)

  const numCountsPow = powBig(BigInt(count1), x1) * powBig(BigInt(count2), x2) * powBig(BigInt(count3), x3);
  const denomTotalPow = powBig(BigInt(totalComentarios), n);

  // numerador y denominador exactos (BigInt)
  const numeradorExact = coefBig * numCountsPow; // BigInt
  const denominadorExact = denomTotalPow;        // BigInt

  // simplificar la fracción
  const g = gcdBig(numeradorExact, denominadorExact);
  const numeradorSimp = numeradorExact / g;
  const denominadorSimp = denominadorExact / g;

  // decimal (usar Number pero con posible pérdida si muy pequeño; convertimos con division BigInt->Number con precaución)
  const decimalProb = Number(numeradorExact) / Number(denominadorExact);

  // preparar render de MathJax: fórmula con valores
  // Forma TeX: P = (n!/(x1! x2! x3!)) p1^{x1} p2^{x2} p3^{x3}
  // p_i se muestran como counts/total
  const texFormula = `\\[
    P=\\dfrac{${n}!}{${x1}!\\,${x2}!\\,${x3}!}\\;\\left(\\frac{${count1}}{${totalComentarios}}\\right)^{${x1}}\\left(\\frac{${count2}}{${totalComentarios}}\\right)^{${x2}}\\left(\\frac{${count3}}{${totalComentarios}}\\right)^{${x3}}
  \\]`;

  // actualizar el DOM:
  // 1) rectángulo decimal
  const rect = document.getElementById("rectangulo-prob-decimal");
  const placeholder = rect.querySelector(".rect-placeholder");
  placeholder.textContent = decimalProb.toPrecision(10);

  // 2) mostrar resultado bloque
  document.getElementById("resultadoMultinomial").style.display = "block";

  // 3) fórmula reemplazada (MathJax)
  document.getElementById("formulaReemplazada").textContent = ""; // limpiar
  document.getElementById("formulaReemplazada").innerHTML = texFormula;

  // 4) fracción exacta (simplificada)
  const fraccionTexto = `${numeradorSimp.toString()} / ${denominadorSimp.toString()}`;
  document.getElementById("resultadoFraccion").innerHTML =
  `\\[
    \\frac{${numeradorSimp.toString()}}{${denominadorSimp.toString()}}
  \\]`;


  // 5) decimal y porcentaje
  // si decimalProb es NaN (por limitaciones de Number) se intenta hacer división con BigInt a string usando division de BigInt -> produce floater?
  if (!Number.isFinite(decimalProb)) {
    // Fallback: convertir a número con división de BigInt usando BigInt -> string division via arbitrary precision is complex.
    // Informar que el resultado es demasiado pequeño o se perdió precisión.
    document.getElementById("resultadoDecimal").textContent = "Decimal excesivamente pequeño (precisión limitada).";
    document.getElementById("resultadoPorcentaje").textContent = "—";
    rect.querySelector(".rect-placeholder").textContent = "Decimal demasiado pequeño para representar con precisión";
  } else {
    // formatear
    const decStr = decimalProb.toFixed(12).replace(/(?:\.0+|(\.\d+?)0+)$/, "$1");
    document.getElementById("resultadoDecimal").textContent = decStr;
    document.getElementById("resultadoPorcentaje").textContent = (decimalProb * 100).toFixed(8) + "%";
    rect.querySelector(".rect-placeholder").textContent = decStr; // además lo ponemos en el rectángulo
  }

  // 6) render MathJax para la fórmulaReemplazada (si MathJax está cargado)
  if (window.MathJax && window.MathJax.typesetPromise) {
    window.MathJax.typesetClear();
    window.MathJax.typesetPromise([ 
      document.getElementById("formulaReemplazada"),
      document.getElementById("resultadoFraccion"),
      document.getElementById("formula-multinomial")
    ]).catch((err) => console.warn("MathJax error:", err));
  }

});
