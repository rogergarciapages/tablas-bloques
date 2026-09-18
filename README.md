# 🟩🟥🟨 Tablas Bloques - Tablas de Multiplicar Interactivas

![React Native](https://img.shields.io/badge/React_Native-0.86-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Expo](https://img.shields.io/badge/Expo-v57.0-000000?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/Licencia-MIT-green?style=for-the-badge)

Una aplicación divertida, moderna, visual e interactiva construida en **React Native / Expo**, creada especialmente para niños de 8 años para aprender, explorar y dominar las tablas de multiplicar a través de arreglos gráficos de bloques animados e inspirados en el universo visual de **Numberblocks**.

---

## 🌟 5 Pestañas y Secciones Principales

### 1. 🎨 Explorador Visual de Tablas (`ExplorerScreen`)
- Selecciona cualquier tabla del 1 al 12 con colores característicos.
- Cada multiplicación ($A \times B$) se representa mediante una cuadrícula visual de bloques amigables.
- Destaca **Cuadrados Perfectos** ($2 \times 2 = 4$, $3 \times 3 = 9$, $4 \times 4 = 16$, $5 \times 5 = 25$).
- Modo inspector con conteo táctil bloque por bloque y tonos de audio pentatónicos.

### 2. 🛠️ Constructor Libre de Bloques (`BuilderScreen`)
- Incrementa o decrementa Filas y Columnas ($1 \dots 10$) en tiempo real.
- Detecta al instante si el arreglo forma un **Rectángulo** o un **Cuadrado Perfecto**.
- **Adaptabilidad 100% Cero-Scroll**: Escala el tamaño de cada celda automáticamente considerando la altura y ancho disponibles del dispositivo, garantizando visión completa sin barras de desplazamiento.

### 3. 🍹 Cóctel de Tablas / Mezcla (`MixScreen` - ¡Novedad!)
- **Sensor de Sacudida (Motion Shake)**: Al sacudir el móvil (mediante acelerómetro en iOS/Android) o al presionar el botón *"🍹 ¡SACUDIR CÓCTEL!"*, el bloque se parte dinámicamente en sub-bloques más pequeños.
- **Enseña la Propiedad Distributiva del Área**:
  - Por ejemplo, **$10 \times 10 = 100$** al sacudir se descompone en:
    - **4 Cuadrados de $5 \times 5$**: $(5\times5) + (5\times5) + (5\times5) + (5\times5) = 25 + 25 + 25 + 25 = 100$.
    - **$8 \times 8$ + $6 \times 6$**: $(8\times8) + (6\times6) = 64 + 36 = 100$.
    - **2 Bloques de $5 \times 10$**: $(5\times10) + (5\times10) = 50 + 50 = 100$.

### 4. 🎯 Juego de Desafío y Práctica (`QuizScreen`)
- Preguntas interactivas con apoyo visual toggleable de la cuadrícula de bloques.
- Contador de racha de aciertos (🔥), estrellas acumulables (⭐), mensajes motivacionales y celebración con confeti brillante.

### 5. 🏆 Álbum de Logros y Personajes (`RewardsScreen`)
- Galería completa de personajes Bloque (del 1 al 12) con sus esquemas de color, caritas, expresividad, medallas y frases celebres.

---

## 🔊 Motor de Audio Sintetizado (Web Audio API)

No requiere la descarga ni almacenamiento de archivos MP3 pesados:
- **Efectos Pop**: Sonidos de burbuja al tocar cada bloque.
- **Escala Pentatónica**: Tonos ascendentes al contar celdas secuencialmente.
- **Acordes de Magia**: Acorde especial para números cuadrados.
- **Arpegio de Victoria**: Melodía de celebración al acertar o completar un reto.

---

## 📁 Estructura del Código

```text
Tablas/
├── App.tsx                      # Navegación principal por 5 pestañas
├── src/
│   ├── components/
│   │   ├── NumberBlock.tsx      # Bloque individual estilo Numberblock (ojos, boca, badge 100%)
│   │   ├── BlockGrid.tsx        # Matriz responsiva adaptativa R x C sin desbordamiento
│   │   ├── TableSelector.tsx    # Selector horizontal de tablas (1 al 12)
│   │   └── Confetti.tsx         # Animación de partículas de victoria
│   ├── screens/
│   │   ├── ExplorerScreen.tsx   # Vista de exploración de multiplicaciones
│   │   ├── BuilderScreen.tsx    # Modo libre constructor dinámico
│   │   ├── MixScreen.tsx        # Cóctel y partición de bloques con sensor Shake 🍹
│   │   ├── QuizScreen.tsx       # Juego interactivo con racha y estrellas
│   │   └── RewardsScreen.tsx    # Álbum de logros y personajes
│   ├── theme/
│   │   └── colors.ts            # Esquemas visuales y lemas de Numberblocks (1 al 12)
│   └── utils/
│       ├── soundEngine.ts       # Sintetizador de efectos de sonido Web Audio
│       ├── shakeSensor.ts       # Detección de sacudida para Web y Móvil (Shake API)
│       └── decompositions.ts    # Lógica matemática de descomposiciones de área
└── package.json
```

---

## 🚀 Inicio Rápido

### Prerrequisitos

Tener instalado [Node.js](https://nodejs.org/) (v18 o superior).

### Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/rogergarciapages/tablas-bloques.git
   cd tablas-bloques
   ```

2. **Instalar dependencias**:
   ```bash
   npm install --legacy-peer-deps
   ```

### Ejecución

- **En Navegador Web**:
  ```bash
  npm run web
  ```
  Abre la aplicación automáticamente en `http://localhost:8081`.

- **En Dispositivo Móvil / Tablet (Expo Go para iOS y Android)**:
  ```bash
  npm run start
  ```
  Escanea el código QR desde la app **Expo Go**.

---

## 📄 Licencia

Este proyecto está bajo la Licencia **MIT**. ¡Siéntete libre de compartirlo y personalizarlo! 🚀
