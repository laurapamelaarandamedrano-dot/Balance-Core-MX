# Balance Core México 🌌

Plataforma de inteligencia pública que genera diagnósticos con IA y estrategias de política pública para los 32 estados de México, basada en el marco filosófico del **Balance Core**.

## Archivos

```
balance-core-mx/
├── index.html      ← Estructura principal
├── styles.css      ← Estética cosmos/filosófica
├── data.js         ← Datos reales (CONAPO, INEGI, CONAGUA)
├── app.js          ← Lógica IA + generador PDF
└── netlify.toml    ← Configuración de headers
```

## Datos incluidos

- **IIM 2020** — Índice de Intensidad Migratoria México-EUA (CONAPO)
- **IME 2020** — Índice de Marginación Estatal (CONAPO)
- **ENDUTIH 2023** — Usuarios de internet por edad/género (INEGI)
- **CONAGUA** — Biblioteca de acuíferos subterráneos por estado

## Despliegue en Netlify

### Opción A: Drag & Drop (más rápido)
1. Ve a [app.netlify.com](https://app.netlify.com)
2. Haz login (o crea cuenta gratis)
3. En el dashboard, arrastra **toda la carpeta** `balance-core-mx/` a la zona de drop
4. ¡Listo! Netlify te da una URL pública en segundos

### Opción B: Git (recomendado para actualizaciones)
```bash
git init
git add .
git commit -m "Balance Core México v1.0"
# Sube a GitHub, luego conecta el repo en Netlify
```

## ⚠️ API Key de Anthropic

La app llama directamente a la API de Anthropic desde el navegador.
Para producción, se recomienda usar una **Netlify Function** como proxy:

1. Crea `netlify/functions/ai.js` con tu API key en variable de entorno
2. En Netlify dashboard: Site settings → Environment variables → `ANTHROPIC_API_KEY`
3. Cambia la URL del fetch en `app.js` de `https://api.anthropic.com/v1/messages` a `/.netlify/functions/ai`

Ver ejemplo de proxy function en la sección abajo.

## Proxy Function (opcional pero recomendado)

Crea `netlify/functions/ai.js`:

```javascript
exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify(body)
  });
  const data = await response.json();
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };
};
```

## Obra en constante evolución

Este es el **prototipo México** de un modelo de inteligencia pública basado en el Balance Core. El plan de expansión incluye América Latina (2025), África y Asia (2026).

Fundamentado en: *The Balance Core: A New Architecture of 21st-Century Power*
