# 🟩🟥🟨 Tablas Bloques - Tablas de Multiplicar Interactivas

![React Native](https://img.shields.io/badge/React_Native-0.86-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Expo](https://img.shields.io/badge/Expo-v57.0-000000?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/Licencia-MIT-green?style=for-the-badge)

Una aplicación divertida, visual e interactiva construida en **React Native / Expo**, creada especialmente para niños de 8 años para aprender y dominar las tablas de multiplicar a través de arreglos de bloques animados e inspirados en el universo visual de **Numberblocks**.

---

## 🌟 Características Principales

- 🎨 **Explorador Visual de Tablas**:
  - Explora las tablas del 1 al 12.
  - Cada multiplicación ($2 \times 2, 2 \times 3, 3 \times 4\dots$) se representa mediante una cuadrícula visual de bloques amigables.
  - Resaltado especial para **Cuadrados Perfectos** ($2 \times 2 = 4$, $3 \times 3 = 9$, $4 \times 4 = 16$, $5 \times 5 = 25$).
  - Conteo táctil bloque por bloque con efectos de luz y sonidos pentatónicos.

- 🛠️ **Constructor de Cuadrados y Bloques (Modo Libre)**:
  - Cambia las filas y columnas ($1 \dots 10$) en tiempo real.
  - Detecta si el arreglo forma un **Rectángulo** o un **Cuadrado Perfecto**.
  - **Ajuste Responsivo Automático**: La cuadrícula calcula la altura y ancho disponibles para que el 100% de la cuadrícula quepa en pantalla **sin ningún desplazamiento (scroll)** tanto en formato vertical como panorámico.

- 🎯 **Juego de Desafío y Práctica**:
  - Minijuego con preguntas interactivas y opciones múltiples.
  - Pista visual desplegable con la cuadrícula de bloques para ayudar a contar si se necesita apoyo.
  - Contador de racha de aciertos (🔥), estrellas (⭐) y celebración con confeti de partículas.

- 🏆 **Álbum de Logros y Personajes Bloque**:
  - Colección completa de avatares estilo Numberblocks (del 1 al 12) con sus esquemas de color, caritas, expresividad y frases motivacionales.

- 🔊 **Motor de Audio Sintetizado (Web Audio API)**:
  - Efectos sonoros *pop*, escala pentatónica de conteo y arpegios de victoria generados en tiempo real sin requerir descarga de archivos MP3 externos.

---

## 📁 Estructura del Proyecto

```text
Tablas/
├── App.tsx                      # Componente raíz y navegación por pestañas
├── src/
│   ├── components/
│   │   ├── NumberBlock.tsx      # Bloque individual estilo Numberblock con ojos y números
│   │   ├── BlockGrid.tsx        # Renderizado responsivo de cuadrículas R x C
│   │   ├── TableSelector.tsx    # Barra de selección de tablas (1 al 12)
│   │   └── Confetti.tsx         # Animación de partículas para celebraciones
│   ├── screens/
│   │   ├── ExplorerScreen.tsx   # Vista principal de exploración de multiplicaciones
│   │   ├── BuilderScreen.tsx    # Modo libre constructor sin scroll
│   │   ├── QuizScreen.tsx       # Juego interactivo de preguntas y estrellas
│   │   └── RewardsScreen.tsx    # Álbum de logros y personajes
│   ├── theme/
│   │   └── colors.ts            # Esquemas de color y lemas de Numberblocks (1 al 12)
│   └── utils/
│       └── soundEngine.ts       # Sintetizador de efectos de sonido Web Audio
└── package.json
```

---

## 🚀 Inicio Rápido

### Prerrequisitos

Tener instalado [Node.js](https://nodejs.org/) (v18 o superior) en tu sistema.

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

### Ejecutar en Desarrollo

- **En Navegador Web**:
  ```bash
  npm run web
  ```
  Abre la aplicación de inmediato en `http://localhost:8081`.

- **En Dispositivo Móvil / Tablet (Expo Go)**:
  ```bash
  npm run start
  ```
  Escanea el código QR proyectado en la consola desde la aplicación **Expo Go** (disponible para iOS y Android).

---

## 📱 Diseño Responsivo Adapts-to-Screen

Toda la aplicación utiliza cálculo dinámico de dimensiones:
- **Cero Scrollbars**: Las matrices grandes ($10 \times 10 = 100$) reducen su escala automáticamente basándose en la altura de la ventana para evitar solapamientos con las barras de navegación.
- **Numeración Garantizada**: Todas las celdas muestran sus números secuenciales sin truncamientos.

---

## 📄 Licencia

Este proyecto está bajo la Licencia **MIT**. ¡Siéntete libre de compartirlo y adaptarlo! 🚀
