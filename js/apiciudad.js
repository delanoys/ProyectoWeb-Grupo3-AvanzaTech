const resultadoClimaDiv = document.getElementById('resultadoClima');

async function obtenerClimaConUbicacion() {
  resultadoClimaDiv.innerHTML = '<p>Obteniendo tu ubicación actual...</p>';

  if (!navigator.geolocation) {
    resultadoClimaDiv.innerHTML = '<p class="error">La geolocalización no es compatible con este navegador.</p>';
    return;
  }

  navigator.geolocation.getCurrentPosition(async (position) => {
    const latitud = position.coords.latitude;
    const longitud = position.coords.longitude;

    try {
      const climaUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current_weather=true&forecast_days=1`;
      const climaResponse = await fetch(climaUrl);
      if (!climaResponse.ok) {
        throw new Error(`Error al obtener datos del clima: ${climaResponse.status}`);
      }

      const climaData = await climaResponse.json();
      if (!climaData.current_weather) {
        resultadoClimaDiv.innerHTML = `<p class="error">No se pudo obtener el clima.</p>`;
        return;
      }

      const geoUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitud}&lon=${longitud}&format=json`;
      const geoResponse = await fetch(geoUrl);
      const geoData = await geoResponse.json();
      const ciudad = geoData.address.city || geoData.address.town || geoData.address.village || 'Tu ubicación';

      const temperatura = climaData.current_weather.temperature;
      const velocidadViento = climaData.current_weather.windspeed;
      const weatherCode = climaData.current_weather.weathercode;

      function obtenerDescripcionClima(code) {
        if (code >= 0 && code <= 3) return 'Soleado / Parcialmente Nublado';
        if (code >= 45 && code <= 48) return 'Niebla';
        if (code >= 51 && code <= 55) return 'Llovizna';
        if (code >= 61 && code <= 65) return 'Lluvia';
        if (code >= 71 && code <= 75) return 'Nieve';
        if (code >= 95 && code <= 99) return 'Tormenta';
        return 'Condición Desconocida';
      }

      const descripcionClima = obtenerDescripcionClima(weatherCode);
      resultadoClimaDiv.innerHTML = `
        <div class="clima-tarjeta">
          <h4>${ciudad}</h4>
          <p><strong>Temperatura:</strong> ${temperatura}°C</p>
          <p><strong>Condición:</strong> ${descripcionClima}</p>
          <p><strong>Viento:</strong> ${velocidadViento} km/h</p>
        </div>
      `;
    } catch (error) {
      console.error('Error:', error);
      resultadoClimaDiv.innerHTML = `<p class="error">No se pudo obtener el clima. ${error.message}</p>`;
    }
  }, (error) => {
    resultadoClimaDiv.innerHTML = `<p class="error">No se pudo acceder a tu ubicación. ${error.message}</p>`;
  });
}

document.addEventListener('DOMContentLoaded', obtenerClimaConUbicacion);
