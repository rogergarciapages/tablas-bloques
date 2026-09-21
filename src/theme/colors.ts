export interface NumberBlockTheme {
  number: number;
  name: string;
  primary: string;
  secondary: string;
  darkAccent: string;
  lightAccent: string;
  glowColor: string;
  eyesCount: number;
  isSquare: boolean;
  motto: string;
}

export const COSMIC_THEME = {
  bg: "#090A1C",
  cardBg: "#121433",
  cardBgLight: "#181A40",
  border: "rgba(99, 102, 241, 0.35)",
  borderGlow: "#6366F1",
  textPrimary: "#FFFFFF",
  textMuted: "#8E90B4",
  textGold: "#FFD700",
  neonCyan: "#06B6D4",
  neonPink: "#EC4899",
  neonGreen: "#10B981",
  neonOrange: "#F97316",
  neonPurple: "#8B5CF6",
  neonBlue: "#3B82F6",
};

export const NUMBER_BLOCK_THEMES: Record<number, NumberBlockTheme> = {
  1: {
    number: 1,
    name: "Uno",
    primary: "#FF3B30",
    secondary: "#FF6B60",
    darkAccent: "#C0120B",
    lightAccent: "rgba(255, 59, 48, 0.25)",
    glowColor: "#FF6B60",
    eyesCount: 1,
    isSquare: true, // 1x1 is square!
    motto: "¡Un solo bloque explorador!",
  },
  2: {
    number: 2,
    name: "Dos",
    primary: "#F97316",
    secondary: "#FB923C",
    darkAccent: "#C2410C",
    lightAccent: "rgba(249, 115, 22, 0.25)",
    glowColor: "#FF9D42",
    eyesCount: 2,
    isSquare: false,
    motto: "¡En parejas es mejor!",
  },
  3: {
    number: 3,
    name: "Tres",
    primary: "#EAB308",
    secondary: "#FACC15",
    darkAccent: "#A16207",
    lightAccent: "rgba(234, 179, 8, 0.25)",
    glowColor: "#FFE156",
    eyesCount: 3,
    isSquare: false,
    motto: "¡Tres en fila, pura diversión!",
  },
  4: {
    number: 4,
    name: "Cuatro",
    primary: "#10B981",
    secondary: "#34D399",
    darkAccent: "#047857",
    lightAccent: "rgba(16, 185, 129, 0.25)",
    glowColor: "#36F0B4",
    eyesCount: 2,
    isSquare: true, // 2x2 = 4!
    motto: "¡Un cuadrado perfecto de 2 x 2!",
  },
  5: {
    number: 5,
    name: "Cinco",
    primary: "#06B6D4",
    secondary: "#38BDF8",
    darkAccent: "#0E7490",
    lightAccent: "rgba(6, 182, 212, 0.25)",
    glowColor: "#38BDF8",
    eyesCount: 2,
    isSquare: false,
    motto: "¡Manos arriba, choca los cinco!",
  },
  6: {
    number: 6,
    name: "Seis",
    primary: "#8B5CF6",
    secondary: "#A78BFA",
    darkAccent: "#6D28D9",
    lightAccent: "rgba(139, 92, 246, 0.25)",
    glowColor: "#C4B5FD",
    eyesCount: 2,
    isSquare: false,
    motto: "¡Doble de tres o tres de dos!",
  },
  7: {
    number: 7,
    name: "Siete",
    primary: "#EC4899",
    secondary: "#F472B6",
    darkAccent: "#BE185D",
    lightAccent: "rgba(236, 72, 153, 0.25)",
    glowColor: "#F472B6",
    eyesCount: 2,
    isSquare: false,
    motto: "¡Los colores del arcoíris!",
  },
  8: {
    number: 8,
    name: "Ocho",
    primary: "#D946EF",
    secondary: "#E879F9",
    darkAccent: "#A21CAF",
    lightAccent: "rgba(217, 70, 239, 0.25)",
    glowColor: "#F0ABFC",
    eyesCount: 2,
    isSquare: false,
    motto: "¡Octobloque con superpoderes!",
  },
  9: {
    number: 9,
    name: "Nueve",
    primary: "#3B82F6",
    secondary: "#60A5FA",
    darkAccent: "#1D4ED8",
    lightAccent: "rgba(59, 130, 246, 0.25)",
    glowColor: "#93C5FD",
    eyesCount: 2,
    isSquare: true, // 3x3 = 9!
    motto: "¡Un gran cuadrado de 3 x 3!",
  },
  10: {
    number: 10,
    name: "Diez",
    primary: "#EF4444",
    secondary: "#F87171",
    darkAccent: "#B91C1C",
    lightAccent: "rgba(239, 68, 68, 0.25)",
    glowColor: "#FCA5A5",
    eyesCount: 2,
    isSquare: false,
    motto: "¡Una decena brillante de bloques!",
  },
  11: {
    number: 11,
    name: "Once",
    primary: "#84CC16",
    secondary: "#A3E635",
    darkAccent: "#4D7C0F",
    lightAccent: "rgba(132, 204, 22, 0.25)",
    glowColor: "#BEF264",
    eyesCount: 2,
    isSquare: false,
    motto: "¡Diez más uno siempre juntos!",
  },
  12: {
    number: 12,
    name: "Doce",
    primary: "#14B8A6",
    secondary: "#2DD4BF",
    darkAccent: "#0F766E",
    lightAccent: "rgba(20, 184, 166, 0.25)",
    glowColor: "#5EEAD4",
    eyesCount: 2,
    isSquare: false,
    motto: "¡Súper transformador de arreglos!",
  },
};

export const getThemeForNumber = (num: number): NumberBlockTheme => {
  if (NUMBER_BLOCK_THEMES[num]) {
    return NUMBER_BLOCK_THEMES[num];
  }
  const baseNum = ((num - 1) % 12) + 1;
  const base = NUMBER_BLOCK_THEMES[baseNum];
  const root = Math.sqrt(num);
  return {
    ...base,
    number: num,
    name: `${num}`,
    isSquare: Number.isInteger(root),
  };
};
