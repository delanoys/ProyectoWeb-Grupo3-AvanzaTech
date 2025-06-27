const resultadoClimaDiv = document.getElementById('resultadoClima');

document.addEventListener('DOMContentLoaded', obtenerClimaConUbicacion);

async function obtenerClimaConUbicacion() {
  resultadoClimaDiv.innerHTML = '<p>Obteniendo tu ubicación actual…</p>';

  if (!navigator.geolocation) {
    resultadoClimaDiv.innerHTML = '<p class="error">La geolocalización no es compatible con este navegador.</p>';
    return;
  }

  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    try {
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&forecast_days=1`);
      const weatherData = await weatherRes.json();
      const weather = weatherData.current_weather;

      const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
      const geoData = await geoRes.json();

      const ciudad = geoData.address.city || geoData.address.town || geoData.address.village || 'Tu ubicación';
      const temperatura = weather.temperature;
      const viento = weather.windspeed;
      const codigo = weather.weathercode;

      const descripcion = obtenerDescripcionClima(codigo);
      const icono = descripcion.match(/^[^\s]+/)[0];
      const texto = descripcion.replace(icono, '').trim();
      const fecha = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });

      const noticia = `
        <div class="clima-tarjeta">
          <p><em>${ciudad}, ${fecha}</em><br>${icono} Hoy se espera <strong>${texto.toLowerCase()}</strong> con una temperatura de <strong>${temperatura}°C</strong> y vientos de hasta <strong>${viento} km/h</strong>.</p>
        </div>
      `;
      resultadoClimaDiv.innerHTML = noticia;

      const tipoClima = obtenerTipoClima(codigo);
      document.body.className = `fondo-${tipoClima}`;
    } catch (e) {
      resultadoClimaDiv.innerHTML = `<p class="error">Error al obtener el clima: ${e.message}</p>`;
    }
  }, (err) => {
    resultadoClimaDiv.innerHTML = `<p class="error">No se pudo acceder a tu ubicación: ${err.message}</p>`;
  });
}

function obtenerDescripcionClima(code) {
  if (code <= 1) return '☀️ Soleado';
  if (code === 2) return '⛅ Parcialmente Nublado';
  if (code === 3) return '☁️ Nublado';
  if (code >= 45 && code <= 48) return '🌫️ Niebla';
  if (code >= 51 && code <= 55) return '🌦️ Llovizna';
  if (code >= 61 && code <= 65) return '🌧️ Lluvia';
  if (code >= 71 && code <= 75) return '❄️ Nieve';
  if (code >= 95 && code <= 99) return '⛈️ Tormenta';
  return '🌈 Condición Desconocida';
}

function obtenerTipoClima(code) {
  if (code <= 1) return 'soleado';
  if (code === 2) return 'parcialmente-nublado';
  if (code === 3) return 'nublado';
  if (code >= 45 && code <= 48) return 'niebla';
  if (code >= 51 && code <= 55) return 'llovizna';
  if (code >= 61 && code <= 65) return 'lluvia';
  if (code >= 71 && code <= 75) return 'nieve';
  if (code >= 95 && code <= 99) return 'tormenta';
  return 'desconocido';
}
