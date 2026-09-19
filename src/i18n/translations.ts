export interface TranslationDictionary {
  appName: string;
  tabs: {
    explorer: string;
    builder: string;
    mix: string;
    quiz: string;
    rewards: string;
  };
  explorer: {
    bannerTitle: string;
    selectPrompt: string;
    tablePrefix: string;
    multHeader: string;
    rowsOf: string;
    squareTag: string;
    tapToCount: string;
    backBtn: string;
  };
  builder: {
    bannerTitle: string;
    rowsLabel: string;
    colsLabel: string;
    squaresLabel: string;
    squareStatus: string;
    rectStatus: string;
  };
  mix: {
    bannerTitle: string;
    subtitle: string;
    shakeBtn: string;
  };
  quiz: {
    bannerTitle: string;
    starsBadge: string;
    streakBadge: string;
    questionPrompt: string;
    showHint: string;
    hideHint: string;
  };
  rewards: {
    bannerTitle: string;
    subtitle: string;
    masterTag: string;
  };
  grid: {
    autoCount: string;
    resetCount: string;
    squareBanner: string;
  };
}

export const TRANSLATIONS: Record<string, TranslationDictionary> = {
  es: {
    appName: "Tablas Bloques",
    tabs: {
      explorer: "Tablas",
      builder: "Constructor",
      mix: "Cóctel",
      quiz: "Desafío",
      rewards: "Logros",
    },
    explorer: {
      bannerTitle: "Explorador Visual de Tablas 🌟",
      selectPrompt: "Elige una Tabla para Explorar 🎨",
      tablePrefix: "Tabla",
      multHeader: "Multiplicaciones de la Tabla del",
      rowsOf: "filas de",
      squareTag: "¡Cuadrado!",
      tapToCount: "👉 Toca para contar",
      backBtn: "← Volver",
    },
    builder: {
      bannerTitle: "Constructor de Bloques 🛠️",
      rowsLabel: "Filas",
      colsLabel: "Columnas",
      squaresLabel: "Cuadrados:",
      squareStatus: "⭐ Cuadrado:",
      rectStatus: "📐 Rectángulo:",
    },
    mix: {
      bannerTitle: "Cóctel de Tablas 🍹",
      subtitle: "¡Sacude el móvil o presiona para partir y mezclar bloques!",
      shakeBtn: "🍹 ¡SACUDIR CÓCTEL DE MULTIPLICACIÓN! 💥",
    },
    quiz: {
      bannerTitle: "Juego de Desafío 🎯",
      starsBadge: "Estrellas",
      streakBadge: "¡Racha de aciertos!",
      questionPrompt: "¿Cuál es el resultado de...?",
      showHint: "💡 Mostrar Pista Visual de Bloques",
      hideHint: "👁️ Ocultar Pista Visual de Bloques",
    },
    rewards: {
      bannerTitle: "Álbum de Personajes y Logros 🏆",
      subtitle: "¡Conoce a todos los personajes Bloque y sus poderes!",
      masterTag: "⭐ ⭐ ⭐ Tabla Máster",
    },
    grid: {
      autoCount: "▶️ Contar en Auto",
      resetCount: "🔄 Reiniciar",
      squareBanner: "⭐ ¡FORMACIÓN DE CUADRADO PERFECTO! ⭐",
    },
  },
  en: {
    appName: "Block Tables",
    tabs: {
      explorer: "Tables",
      builder: "Builder",
      mix: "Cocktail",
      quiz: "Challenge",
      rewards: "Badges",
    },
    explorer: {
      bannerTitle: "Visual Multiplication Explorer 🌟",
      selectPrompt: "Choose a Table to Explore 🎨",
      tablePrefix: "Table",
      multHeader: "Multiplications for Table of",
      rowsOf: "rows of",
      squareTag: "Square!",
      tapToCount: "👉 Tap to count",
      backBtn: "← Back",
    },
    builder: {
      bannerTitle: "Block Builder 🛠️",
      rowsLabel: "Rows",
      colsLabel: "Columns",
      squaresLabel: "Squares:",
      squareStatus: "⭐ Square:",
      rectStatus: "📐 Rectangle:",
    },
    mix: {
      bannerTitle: "Multiplication Cocktail 🍹",
      subtitle: "Shake your device or tap to mix and split blocks!",
      shakeBtn: "🍹 SHAKE MULTIPLICATION COCKTAIL! 💥",
    },
    quiz: {
      bannerTitle: "Challenge Game 🎯",
      starsBadge: "Stars",
      streakBadge: "Streak boost!",
      questionPrompt: "What is the answer to...?",
      showHint: "💡 Show Visual Block Hint",
      hideHint: "👁️ Hide Visual Block Hint",
    },
    rewards: {
      bannerTitle: "Badges & Character Album 🏆",
      subtitle: "Meet all the Block characters and their powers!",
      masterTag: "⭐ ⭐ ⭐ Master Table",
    },
    grid: {
      autoCount: "▶️ Auto Count",
      resetCount: "🔄 Reset",
      squareBanner: "⭐ PERFECT SQUARE FORMATION! ⭐",
    },
  },
};

// Auto-detect language helper
export const getDeviceLanguage = (): "es" | "en" => {
  if (typeof window !== "undefined" && window.navigator) {
    const lang = window.navigator.language || (window.navigator as any).userLanguage || "";
    if (lang.toLowerCase().startsWith("es")) return "es";
    if (lang.toLowerCase().startsWith("en")) return "en";
  }
  return "es";
};
