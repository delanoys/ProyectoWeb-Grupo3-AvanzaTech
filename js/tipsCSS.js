class CssTipManager {
            constructor() {
                // APIs disponibles para obtener quotes/tips
                this.apis = [
                    {
                        name: 'quotable',
                        url: 'https://api.quotable.io/random?tags=technology|computers',
                        parse: (data) => `"${data.content}" - ${data.author}`
                    },
                    {
                        name: 'programming-quotes',
                        url: 'https://programming-quotes-api.herokuapp.com/quotes/random',
                        parse: (data) => `"${data.en}" - ${data.author}`
                    }
                ];
                
                // Tips de respaldo en caso de que las APIs fallen
                this.fallbackTips = [
                    "Usa :hover para crear efectos interactivos al pasar el mouse sobre elementos.",
                    "Grid Layout es perfecto para crear layouts complejos de forma sencilla con display: grid.",
                    "Las variables CSS (--mi-variable) te permiten reutilizar valores en toda tu hoja de estilos.",
                    "Flexbox es ideal para alinear elementos con justify-content y align-items.",
                    "Transform: scale() puede crear efectos de zoom suaves sin afectar el layout.",
                    "Box-shadow con múltiples valores puede crear efectos de profundidad realistas.",
                    "Clip-path te permite crear formas personalizadas recortando elementos.",
                    "Animation con @keyframes permite crear animaciones complejas y fluidas.",
                    "Position: sticky combina las ventajas de relative y fixed según el scroll.",
                    "Filter: blur() y otros filtros CSS pueden crear efectos visuales impactantes.",
                    "Pseudo-elementos ::before y ::after permiten añadir contenido decorativo sin HTML extra.",
                    "Media queries permiten crear diseños responsivos adaptados a diferentes pantallas.",
                    "Z-index controla el orden de apilamiento de elementos posicionados.",
                    "Transition suaviza los cambios de propiedades CSS para mejor experiencia de usuario.",
                    "Object-fit controla cómo las imágenes se ajustan dentro de sus contenedores."
                ];
                
                this.currentApiIndex = 0;
                this.tipCounter = 1;
                this.lastQuote = '';
                this.init();
            }

            init() {
                this.showRandomTip();
                this.setupEventListeners();
                this.updateApiStatus(true); // Inicializar como online
            }

            setupEventListeners() {
                const refreshBtn = document.getElementById('refresh-tip');
                refreshBtn.addEventListener('click', () => {
                    this.showRandomTip(true);
                });
            }

            async showRandomTip(isRefresh = false) {
                const tipTextElement = document.getElementById('css-tip-text');
                const loadingSpinner = document.getElementById('loading-spinner');
                const tipCounterElement = document.getElementById('tip-counter');
                const categoryElement = document.getElementById('tip-category');

                if (isRefresh) {
                    // Animación de carga
                    tipTextElement.classList.add('loading');
                    loadingSpinner.style.display = 'block';
                }

                try {
                    // Intentar obtener quote desde API
                    let quote = await this.fetchFromAPI();
                    
                    if (!quote) {
                        // Si la API falla, usar tips locales
                        quote = this.getRandomFallbackTip();
                        categoryElement.textContent = 'CSS';
                        categoryElement.className = 'tip-category';
                        this.updateApiStatus(false);
                    } else {
                        categoryElement.textContent = 'INSPIRACIÓN';
                        categoryElement.className = 'tip-category inspiration';
                        this.updateApiStatus(true);
                    }

                    // Actualizar contenido
                    tipTextElement.textContent = quote;
                    
                    if (isRefresh) {
                        this.tipCounter++;
                        tipCounterElement.textContent = this.tipCounter;
                    }

                    this.lastQuote = quote;

                } catch (error) {
                    console.error('Error al obtener tip:', error);
                    // Fallback a tips locales
                    const fallbackTip = this.getRandomFallbackTip();
                    tipTextElement.textContent = fallbackTip;
                    categoryElement.textContent = 'CSS';
                    categoryElement.className = 'tip-category';
                    this.updateApiStatus(false);
                }

                // Remover estados de carga
                tipTextElement.classList.remove('loading');
                loadingSpinner.style.display = 'none';

                // Guardar estado
                this.saveState();
            }

            getRandomFallbackTip() {
                let randomTip;
                do {
                    const randomIndex = Math.floor(Math.random() * this.fallbackTips.length);
                    randomTip = this.fallbackTips[randomIndex];
                } while (randomTip === this.lastQuote && this.fallbackTips.length > 1);
                
                return randomTip;
            }

            async fetchFromAPI() {
                // Intentar con diferentes APIs
                for (let i = 0; i < this.apis.length; i++) {
                    const apiIndex = (this.currentApiIndex + i) % this.apis.length;
                    const api = this.apis[apiIndex];
                    
                    try {
                        console.log(`Intentando API: ${api.name}`);
                        
                        const controller = new AbortController();
                        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 segundos timeout
                        
                        const response = await fetch(api.url, {
                            method: 'GET',
                            signal: controller.signal,
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            }
                        });
                        
                        clearTimeout(timeoutId);
                        
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        
                        const data = await response.json();
                        console.log('Datos recibidos:', data);
                        
                        // Cambiar al siguiente API para la próxima vez
                        this.currentApiIndex = (apiIndex + 1) % this.apis.length;
                        
                        return api.parse(data);
                        
                    } catch (error) {
                        console.warn(`Error con API ${api.name}:`, error.message);
                        continue; // Intentar con la siguiente API
                    }
                }
                
                // Si todas las APIs fallan, retornar null
                console.log('Todas las APIs fallaron, usando tips locales');
                return null;
            }

            updateApiStatus(isOnline) {
                const apiStatus = document.getElementById('api-status');
                if (isOnline) {
                    apiStatus.className = 'api-status';
                    apiStatus.title = 'API Online - Contenido dinámico';
                } else {
                    apiStatus.className = 'api-status offline';
                    apiStatus.title = 'API Offline - Contenido local';
                }
            }

            saveState() {
                // En un entorno real, podrías guardar en localStorage
                // localStorage.setItem('cssTipState', JSON.stringify({
                //     currentApiIndex: this.currentApiIndex,
                //     tipCounter: this.tipCounter
                // }));
            }

            loadState() {
                // En un entorno real, podrías cargar desde localStorage
                // const saved = localStorage.getItem('cssTipState');
                // if (saved) {
                //     const state = JSON.parse(saved);
                //     this.currentApiIndex = state.currentApiIndex || 0;
                //     this.tipCounter = state.tipCounter || 1;
                // }
            }

            // Función para mostrar información de la API actual
            displayApiStatus() {
                const currentApi = this.apis[this.currentApiIndex];
                console.log(`API actual: ${currentApi.name}`);
                console.log(`URL: ${currentApi.url}`);
            }
        }

        // Inicializar la aplicación cuando el DOM esté listo
        document.addEventListener('DOMContentLoaded', () => {
            new CssTipManager();
        });

        // Efecto de partículas opcional para el fondo
        function createFloatingElements() {
            const body = document.body;
            for (let i = 0; i < 6; i++) {
                const element = document.createElement('div');
                element.style.cssText = `
                    position: fixed;
                    width: ${Math.random() * 10 + 5}px;
                    height: ${Math.random() * 10 + 5}px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 50%;
                    pointer-events: none;
                    animation: float ${Math.random() * 20 + 10}s infinite linear;
                    left: ${Math.random() * 100}vw;
                    top: ${Math.random() * 100}vh;
                `;
                body.appendChild(element);
            }
        }

        // Activar efectos de partículas
        setTimeout(createFloatingElements, 1000);