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
    appName: "BlockTables",
    tabs: {
      explorer: "Tables",
      builder: "Builder",
      mix: "Cocktail",
      quiz: "Challenge",
      rewards: "Badges",
    },
    explorer: {
      bannerTitle: "BlockTables: Visual Explorer 🌟",
      selectPrompt: "Choose a Times Table to Explore 🎨",
      tablePrefix: "Table",
      multHeader: "Multiplication Table for",
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
      bannerTitle: "Challenge Quiz 🎯",
      starsBadge: "Stars",
      streakBadge: "Streak boost!",
      questionPrompt: "What is the answer to...?",
      showHint: "💡 Show Visual Block Hint",
      hideHint: "👁️ Hide Visual Block Hint",
    },
    rewards: {
      bannerTitle: "Badges & Characters 🏆",
      subtitle: "Meet all the Block characters and their powers!",
      masterTag: "⭐ ⭐ ⭐ Master Table",
    },
    grid: {
      autoCount: "▶️ Auto Count",
      resetCount: "🔄 Reset",
      squareBanner: "⭐ PERFECT SQUARE FORMATION! ⭐",
    },
  },
  hi: {
    appName: "BlockTables",
    tabs: {
      explorer: "पहाड़े",
      builder: "बिल्डर",
      mix: "मिश्रण",
      quiz: "चुनौती",
      rewards: "इनाम",
    },
    explorer: {
      bannerTitle: "BlockTables: पहाड़े सीखें 🌟",
      selectPrompt: "सीखने के लिए पहाड़ा चुनें 🎨",
      tablePrefix: "पहाड़ा",
      multHeader: "का पहाड़ा (Multiplication Table)",
      rowsOf: "पंक्तियां",
      squareTag: "वर्ग!",
      tapToCount: "👉 गिनने के लिए छुएं",
      backBtn: "← वापस",
    },
    builder: {
      bannerTitle: "ब्लॉक बिल्डर 🛠️",
      rowsLabel: "पंक्तियां",
      colsLabel: "स्तंभ",
      squaresLabel: "वर्ग:",
      squareStatus: "⭐ वर्ग:",
      rectStatus: "📐 आयत:",
    },
    mix: {
      bannerTitle: "गुणा कॉकटेल 🍹",
      subtitle: "ब्लॉकों को तोड़ने के लिए मोबाइल हिलाएं!",
      shakeBtn: "🍹 कॉकटेल मिक्स करने के लिए हिलाएं! 💥",
    },
    quiz: {
      bannerTitle: "चुनौती गेम 🎯",
      starsBadge: "सितारे",
      streakBadge: "लगातार सही उत्तर!",
      questionPrompt: "उत्तर क्या है...?",
      showHint: "💡 ब्लॉक संकेत दिखाएं",
      hideHint: "👁️ संकेत छुपाएं",
    },
    rewards: {
      bannerTitle: "इनाम और ब्लॉक पात्र 🏆",
      subtitle: "सभी ब्लॉक पात्रों से मिलें!",
      masterTag: "⭐ ⭐ ⭐ मास्टर पहाड़ा",
    },
    grid: {
      autoCount: "▶️ ऑटो गिनती",
      resetCount: "🔄 रीसेट",
      squareBanner: "⭐ पूर्ण वर्ग संरचना! ⭐",
    },
  },
  tr: {
    appName: "BlockTables",
    tabs: {
      explorer: "Tablolar",
      builder: "Kurucu",
      mix: "Karışım",
      quiz: "Yarışma",
      rewards: "Rozetler",
    },
    explorer: {
      bannerTitle: "BlockTables: Görsel Çarpım Tablosu 🌟",
      selectPrompt: "Öğrenmek için Bir Tablo Seçin 🎨",
      tablePrefix: "Tablo",
      multHeader: "Çarpım Tablosu:",
      rowsOf: "satır",
      squareTag: "Kare!",
      tapToCount: "👉 Saymak için dokunun",
      backBtn: "← Geri",
    },
    builder: {
      bannerTitle: "Blok Kurucu 🛠️",
      rowsLabel: "Satırlar",
      colsLabel: "Sütunlar",
      squaresLabel: "Kareler:",
      squareStatus: "⭐ Kare:",
      rectStatus: "📐 Dikdörtgen:",
    },
    mix: {
      bannerTitle: "Çarpım Kokteyli 🍹",
      subtitle: "Blokları bölmek için cihazınızı sallayın!",
      shakeBtn: "🍹 KARIŞTIRMAK İÇİN SALLAYIN! 💥",
    },
    quiz: {
      bannerTitle: "Yarışma Oyunu 🎯",
      starsBadge: "Yıldızlar",
      streakBadge: "Galibiyet serisi!",
      questionPrompt: "İşlemin sonucu nedir...?",
      showHint: "💡 Görsel İpucunu Göster",
      hideHint: "👁️ İpucunu Gizle",
    },
    rewards: {
      bannerTitle: "Rozetler ve Karakterler 🏆",
      subtitle: "Tüm Blok karakterleriyle tanışın!",
      masterTag: "⭐ ⭐ ⭐ Usta Tablo",
    },
    grid: {
      autoCount: "▶️ Otomatik Say",
      resetCount: "🔄 Sıfırla",
      squareBanner: "⭐ MÜKEMMEL KARE FORMU! ⭐",
    },
  },
};

// Auto-detect language helper
export const getDeviceLanguage = (): "es" | "en" | "hi" | "tr" => {
  if (typeof window !== "undefined" && window.navigator) {
    const lang = (window.navigator.language || (window.navigator as any).userLanguage || "").toLowerCase();
    if (lang.startsWith("es")) return "es";
    if (lang.startsWith("en")) return "en";
    if (lang.startsWith("hi")) return "hi";
    if (lang.startsWith("tr")) return "tr";
  }
  return "es";
};
