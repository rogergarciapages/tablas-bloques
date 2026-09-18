export interface NumberBlockTheme {
  number: number;
  name: string;
  primary: string;
  secondary: string;
  darkAccent: string;
  lightAccent: string;
  eyesCount: number;
  isSquare: boolean;
  motto: string;
}

export const NUMBER_BLOCK_THEMES: Record<number, NumberBlockTheme> = {
  1: {
    number: 1,
    name: "Uno",
    primary: "#FF3B30",
    secondary: "#FF6B60",
    darkAccent: "#C0120B",
    lightAccent: "#FFD5D2",
    eyesCount: 1,
    isSquare: true, // 1x1 is square!
    motto: "¡Un solo bloque explorador!",
  },
  2: {
    number: 2,
    name: "Dos",
    primary: "#FF9500",
    secondary: "#FFAA33",
    darkAccent: "#C67300",
    lightAccent: "#FFE9CC",
    eyesCount: 2,
    isSquare: false,
    motto: "¡En parejas es mejor!",
  },
  3: {
    number: 3,
    name: "Tres",
    primary: "#FFCC00",
    secondary: "#FFE066",
    darkAccent: "#C49A00",
    lightAccent: "#FFF5CC",
    eyesCount: 3,
    isSquare: false,
    motto: "¡Tres en fila, pura diversión!",
  },
  4: {
    number: 4,
    name: "Cuatro",
    primary: "#34C759",
    secondary: "#66D982",
    darkAccent: "#1F8A38",
    lightAccent: "#D6F5DE",
    eyesCount: 2,
    isSquare: true, // 2x2 = 4!
    motto: "¡Un cuadrado perfecto de 2 x 2!",
  },
  5: {
    number: 5,
    name: "Cinco",
    primary: "#30B0C7",
    secondary: "#5CE1E6",
    darkAccent: "#1A7383",
    lightAccent: "#D6F4F8",
    eyesCount: 2,
    isSquare: false,
    motto: "¡Manos arriba, choca los cinco!",
  },
  6: {
    number: 6,
    name: "Seis",
    primary: "#AF52DE",
    secondary: "#C97BF5",
    darkAccent: "#7929A3",
    lightAccent: "#F0D7FA",
    eyesCount: 2,
    isSquare: false,
    motto: "¡Doble de tres o tres de dos!",
  },
  7: {
    number: 7,
    name: "Siete",
    primary: "#FF2D55",
    secondary: "#FF6482",
    darkAccent: "#B80E30",
    lightAccent: "#FFD5DD",
    eyesCount: 2,
    isSquare: false,
    motto: "¡Los colores del arcoíris!",
  },
  8: {
    number: 8,
    name: "Ocho",
    primary: "#E040FB",
    secondary: "#EA80FC",
    darkAccent: "#9C00C7",
    lightAccent: "#F9D5FF",
    eyesCount: 2,
    isSquare: false,
    motto: "¡Octobloque con superpoderes!",
  },
  9: {
    number: 9,
    name: "Nueve",
    primary: "#607D8B",
    secondary: "#90A4AE",
    darkAccent: "#37474F",
    lightAccent: "#CFD8DC",
    eyesCount: 2,
    isSquare: true, // 3x3 = 9!
    motto: "¡Un gran cuadrado de 3 x 3!",
  },
  10: {
    number: 10,
    name: "Diez",
    primary: "#E53935",
    secondary: "#FFCDD2",
    darkAccent: "#B71C1C",
    lightAccent: "#FFEBEE",
    eyesCount: 2,
    isSquare: false,
    motto: "¡Una decena brillante de bloques!",
  },
  11: {
    number: 11,
    name: "Once",
    primary: "#8BC34A",
    secondary: "#AED581",
    darkAccent: "#558B2F",
    lightAccent: "#DCEDC8",
    eyesCount: 2,
    isSquare: false,
    motto: "¡Diez más uno siempre juntos!",
  },
  12: {
    number: 12,
    name: "Doce",
    primary: "#00BCD4",
    secondary: "#4DD0E1",
    darkAccent: "#00838F",
    lightAccent: "#B2EBF2",
    eyesCount: 2,
    isSquare: false,
    motto: "¡Súper transformador de arreglos!",
  },
};

export const getThemeForNumber = (num: number): NumberBlockTheme => {
  if (NUMBER_BLOCK_THEMES[num]) {
    return NUMBER_BLOCK_THEMES[num];
  }
  // Fallback formula for higher numbers
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
