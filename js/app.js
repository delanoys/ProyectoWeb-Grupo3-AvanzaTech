const ciudadInput = document.getElementById('ciudadInput');
const obtenerClimaBtn = document.getElementById('obtenerClimaBtn');
const resultadoClimaDiv = document.getElementById('resultadoClima');

async function obtenerClima() {
    const ciudad = ciudadInput.value.trim(); 
    if (ciudad === '') {
        resultadoClimaDiv.innerHTML = '<p class="error">Por favor, introduce el nombre de una ciudad.</p>';
        return; 
    }

    resultadoClimaDiv.innerHTML = '<p>Cargando clima...</p>'; 

    try {
        const geoUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(ciudad)}&format=json&limit=1`;
        const geoResponse = await fetch(geoUrl);
        if (!geoResponse.ok) {
            throw new Error(`Error al buscar la ciudad: ${geoResponse.status}`);
        }
        
        
        const geoData = await geoResponse.json();
        console.log(geoUrl);
        if (geoData.length === 0) {
            resultadoClimaDiv.innerHTML = `<p class="error">No se encontró la ciudad "${ciudad}".</p>`;
            return;
        }
        const latitud = geoData[0].lat;
        const longitud = geoData[0].lon;
        const climaUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current_weather=true&forecast_days=1`;
        const climaResponse = await fetch(climaUrl);

        if (!climaResponse.ok) {
            throw new Error(`Error al obtener datos del clima: ${climaResponse.status}`);
        }

        const climaData = await climaResponse.json();
        if (!climaData.current_weather) {
            resultadoClimaDiv.innerHTML = `<p class="error">No se pudo obtener el clima actual para "${ciudad}".</p>`;
            return;
        }
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
            <p><strong>Ciudad:</strong> ${geoData[0].display_name}</p>
            <p><strong>Temperatura:</strong> ${temperatura}°C</p>
            <p><strong>Condición:</strong> ${descripcionClima}</p>
            <p><strong>Viento:</strong> ${velocidadViento} km/h</p>
        `;

    } catch (error) {
        console.error('Hubo un error:', error);
        resultadoClimaDiv.innerHTML = `<p class="error">No se pudo obtener el clima. Error: ${error.message}.</p>`;
    }
}

obtenerClimaBtn.addEventListener('click', obtenerClima);

ciudadInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        obtenerClima();
    }
});