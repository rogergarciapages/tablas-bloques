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
  ar: {
    appName: "BlockTables",
    tabs: {
      explorer: "الجداول",
      builder: "المُنشئ",
      mix: "الكوكتيل",
      quiz: "التحدي",
      rewards: "الإنجازات",
    },
    explorer: {
      bannerTitle: "BlockTables: مستكشف جدول الضرب 🌟",
      selectPrompt: "اختر جدول ضرب للاستكشاف 🎨",
      tablePrefix: "جدول",
      multHeader: "جدول ضرب العدد",
      rowsOf: "صفوف من",
      squareTag: "مربع!",
      tapToCount: "👉 انقر للعد",
      backBtn: "← عودة",
    },
    builder: {
      bannerTitle: "مُنشئ الكتل 🛠️",
      rowsLabel: "الصفوف",
      colsLabel: "الأعمدة",
      squaresLabel: "مربعات:",
      squareStatus: "⭐ مربع:",
      rectStatus: "📐 مستطيل:",
    },
    mix: {
      bannerTitle: "كوكتيل الضرب 🍹",
      subtitle: "هز الجهاز لتقسيم الكتل وخفقها!",
      shakeBtn: "🍹 هز لخلط كوكتيل الضرب! 💥",
    },
    quiz: {
      bannerTitle: "لعبة التحدي 🎯",
      starsBadge: "نجوم",
      streakBadge: "سلسلة إجابات صحيحة!",
      questionPrompt: "ما هي الإجابة الصحيحة...؟",
      showHint: "💡 إظهار تلميح الكتل",
      hideHint: "👁️ إخفاء التلميح",
    },
    rewards: {
      bannerTitle: "الإنجازات والشخصيات 🏆",
      subtitle: "تعرف على جميع شخصيات الكتل!",
      masterTag: "⭐ ⭐ ⭐ خبير الجدول",
    },
    grid: {
      autoCount: "▶️ عد تلقائي",
      resetCount: "🔄 إعادة ضبط",
      squareBanner: "⭐ تشكيل مربع مثالي! ⭐",
    },
  },
  ko: {
    appName: "BlockTables",
    tabs: {
      explorer: "구구단",
      builder: "만들기",
      mix: "믹스",
      quiz: "퀴즈",
      rewards: "뱃지",
    },
    explorer: {
      bannerTitle: "BlockTables: 시각 구구단 탐험 🌟",
      selectPrompt: "학습할 구구단을 선택하세요 🎨",
      tablePrefix: "단",
      multHeader: "구구단:",
      rowsOf: "줄의",
      squareTag: "정사각형!",
      tapToCount: "👉 눌러서 세어보기",
      backBtn: "← 뒤로",
    },
    builder: {
      bannerTitle: "블록 만들기 🛠️",
      rowsLabel: "세로",
      colsLabel: "가로",
      squaresLabel: "정사각형:",
      squareStatus: "⭐ 정사각형:",
      rectStatus: "📐 직사각형:",
    },
    mix: {
      bannerTitle: "구구단 칵테일 🍹",
      subtitle: "기기를 흔들어 블록을 조각내세요!",
      shakeBtn: "🍹 칵테일 믹스 쉐이크! 💥",
    },
    quiz: {
      bannerTitle: "도전 퀴즈 게임 🎯",
      starsBadge: "별",
      streakBadge: "연속 정답!",
      questionPrompt: "정답은 무엇일까요...?",
      showHint: "💡 블록 힌트 보기",
      hideHint: "👁️ 힌트 숨기기",
    },
    rewards: {
      bannerTitle: "뱃지 및 캐릭터 🏆",
      subtitle: "모든 블록 캐릭터를 만나보세요!",
      masterTag: "⭐ ⭐ ⭐ 구구단 마스터",
    },
    grid: {
      autoCount: "▶️ 자동 세기",
      resetCount: "🔄 리셋",
      squareBanner: "⭐ 완벽한 정사각형! ⭐",
    },
  },
  ja: {
    appName: "BlockTables",
    tabs: {
      explorer: "九九の表",
      builder: "ビルダー",
      mix: "ミックス",
      quiz: "クイズ",
      rewards: "バッジ",
    },
    explorer: {
      bannerTitle: "BlockTables: 楽しく学べる九九の表 🌟",
      selectPrompt: "学習する段を選んでね 🎨",
      tablePrefix: "の段",
      multHeader: "九九の表:",
      rowsOf: "行",
      squareTag: "正方形！",
      tapToCount: "👉 タップして数える",
      backBtn: "← 戻る",
    },
    builder: {
      bannerTitle: "ブロックビルダー 🛠️",
      rowsLabel: "たて",
      colsLabel: "よこ",
      squaresLabel: "正方形:",
      squareStatus: "⭐ 正方形:",
      rectStatus: "📐 長方形:",
    },
    mix: {
      bannerTitle: "かけ算カクテル 🍹",
      subtitle: "端末を振ってブロックを分けてみよう！",
      shakeBtn: "🍹 シェイクしてミックス！ 💥",
    },
    quiz: {
      bannerTitle: "チャレンジクイズ 🎯",
      starsBadge: "スター",
      streakBadge: "連続正解！",
      questionPrompt: "こたえはどれかな...？",
      showHint: "💡 ヒントを表示",
      hideHint: "👁️ ヒントを隠す",
    },
    rewards: {
      bannerTitle: "バッジと cluster キャラ 🏆",
      subtitle: "すべてのブロックキャラに会おう！",
      masterTag: "⭐ ⭐ ⭐ 九九マスター",
    },
    grid: {
      autoCount: "▶️ じどうで数える",
      resetCount: "🔄 リセット",
      squareBanner: "⭐ かんぺきな正方形！ ⭐",
    },
  },
  pt: {
    appName: "BlockTables",
    tabs: {
      explorer: "Tabuada",
      builder: "Construtor",
      mix: "Cócktail",
      quiz: "Desafio",
      rewards: "Conquistas",
    },
    explorer: {
      bannerTitle: "BlockTables: Explorador Visual 🌟",
      selectPrompt: "Escolha uma Tabuada para Explorar 🎨",
      tablePrefix: "Tabuada",
      multHeader: "Tabuada de Multiplicação do",
      rowsOf: "linhas de",
      squareTag: "Quadrado!",
      tapToCount: "👉 Toque para contar",
      backBtn: "← Voltar",
    },
    builder: {
      bannerTitle: "Construtor de Blocos 🛠️",
      rowsLabel: "Linhas",
      colsLabel: "Colunas",
      squaresLabel: "Quadrados:",
      squareStatus: "⭐ Quadrado:",
      rectStatus: "📐 Retângulo:",
    },
    mix: {
      bannerTitle: "Cócktail de Multiplicação 🍹",
      subtitle: "Agite o dispositivo para dividir os blocos!",
      shakeBtn: "🍹 AGITE PARA MISTURAR! 💥",
    },
    quiz: {
      bannerTitle: "Jogo de Desafio 🎯",
      starsBadge: "Estrelas",
      streakBadge: "Sequência de acertos!",
      questionPrompt: "Qual é o resultado de...?",
      showHint: "💡 Mostrar Dica de Blocos",
      hideHint: "👁️ Ocultar Dica de Blocos",
    },
    rewards: {
      bannerTitle: "Conquistas e Personagens 🏆",
      subtitle: "Conheça todos os personagens Bloco!",
      masterTag: "⭐ ⭐ ⭐ Mestre da Tabuada",
    },
    grid: {
      autoCount: "▶️ Contar Automático",
      resetCount: "🔄 Reiniciar",
      squareBanner: "⭐ FORMAÇÃO DE QUADRADO PERFEITO! ⭐",
    },
  },
  ru: {
    appName: "BlockTables",
    tabs: {
      explorer: "Таблицы",
      builder: "Конструктор",
      mix: "Микс",
      quiz: "Викторина",
      rewards: "Награды",
    },
    explorer: {
      bannerTitle: "BlockTables: Таблица Умножения 🌟",
      selectPrompt: "Выберите таблицу для изучения 🎨",
      tablePrefix: "Таблица",
      multHeader: "Таблица умножения на",
      rowsOf: "строк по",
      squareTag: "Квадрат!",
      tapToCount: "👉 Нажмите, чтобы посчитать",
      backBtn: "← Назад",
    },
    builder: {
      bannerTitle: "Конструктор Блоков 🛠️",
      rowsLabel: "Строки",
      colsLabel: "Столбцы",
      squaresLabel: "Квадраты:",
      squareStatus: "⭐ Квадрат:",
      rectStatus: "📐 Прямоугольник:",
    },
    mix: {
      bannerTitle: "Коктейль Умножения 🍹",
      subtitle: "Встряхните устройство, чтобы разделить блоки!",
      shakeBtn: "🍹 ВСТРЯХНИТЕ ДЛЯ МИКСА! 💥",
    },
    quiz: {
      bannerTitle: "Математическая Викторина 🎯",
      starsBadge: "Звезды",
      streakBadge: "Серия побед!",
      questionPrompt: "Какой ответ...?",
      showHint: "💡 Показать подсказку",
      hideHint: "👁️ Скрыть подсказку",
    },
    rewards: {
      bannerTitle: "Награды и Персонажи 🏆",
      subtitle: "Познакомьтесь со всеми персонажами!",
      masterTag: "⭐ ⭐ ⭐ Мастер Таблицы",
    },
    grid: {
      autoCount: "▶️ Автосчет",
      resetCount: "🔄 Сброс",
      squareBanner: "⭐ ИДЕАЛЬНЫЙ КВАДРАТ! ⭐",
    },
  },
  ur: {
    appName: "BlockTables",
    tabs: {
      explorer: "پہاڑے",
      builder: "بلڈر",
      mix: "مکس",
      quiz: "چیلنج",
      rewards: "انعامات",
    },
    explorer: {
      bannerTitle: "BlockTables: ضرب کے پہاڑے 🌟",
      selectPrompt: "سیکھنے کے لیے پہاڑا منتخب کریں 🎨",
      tablePrefix: "پہاڑا",
      multHeader: "کا ضرب کا پہاڑا",
      rowsOf: "قطاریں",
      squareTag: "مربع!",
      tapToCount: "👉 گننے کے لیے چھوئیں",
      backBtn: "← واپس",
    },
    builder: {
      bannerTitle: "بلاک بلڈر 🛠️",
      rowsLabel: "قطاریں",
      colsLabel: "کالم",
      squaresLabel: "مربع:",
      squareStatus: "⭐ مربع:",
      rectStatus: "📐 مستطیل:",
    },
    mix: {
      bannerTitle: "ضرب کا کاک ٹیل 🍹",
      subtitle: "بلاک توڑنے کے لیے ڈیوائس کو ہلائیں!",
      shakeBtn: "🍹 مکس کرنے کے لیے ہلائیں! 💥",
    },
    quiz: {
      bannerTitle: "چیلنج گیم 🎯",
      starsBadge: "ستارے",
      streakBadge: "مسلسل درست جوابات!",
      questionPrompt: "جواب کیا ہے...؟",
      showHint: "💡 بلاک کا اشارہ دکھائیں",
      hideHint: "👁️ اشارہ چھپائیں",
    },
    rewards: {
      bannerTitle: "انعامات اور کردار 🏆",
      subtitle: "تمام بلاک کرداروں سے ملیں!",
      masterTag: "⭐ ⭐ ⭐ ماسٹر پہاڑا",
    },
    grid: {
      autoCount: "▶️ آٹو گنتی",
      resetCount: "🔄 ری سیٹ",
      squareBanner: "⭐ مکمل مربع تشکیل! ⭐",
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
export const getDeviceLanguage = (): "es" | "en" | "ar" | "ko" | "ja" | "pt" | "ru" | "ur" | "hi" | "tr" => {
  if (typeof window !== "undefined" && window.navigator) {
    const lang = (window.navigator.language || (window.navigator as any).userLanguage || "").toLowerCase();
    if (lang.startsWith("es")) return "es";
    if (lang.startsWith("en")) return "en";
    if (lang.startsWith("ar")) return "ar";
    if (lang.startsWith("ko")) return "ko";
    if (lang.startsWith("ja")) return "ja";
    if (lang.startsWith("pt")) return "pt";
    if (lang.startsWith("ru")) return "ru";
    if (lang.startsWith("ur")) return "ur";
    if (lang.startsWith("hi")) return "hi";
    if (lang.startsWith("tr")) return "tr";
  }
  return "es";
};
