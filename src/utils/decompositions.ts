export interface SubGridSplit {
  title: string;
  rows: number;
  cols: number;
  themeNumber: number;
}

export interface DecompositionRecipe {
  baseRows: number;
  baseCols: number;
  description: string;
  equationText: string;
  subGrids: SubGridSplit[];
}

export const DECOMPOSITION_DATABASE: Record<string, DecompositionRecipe[]> = {
  "10x10": [
    {
      baseRows: 10,
      baseCols: 10,
      description: "¡4 Cuadrados perfectos de 5x5!",
      equationText: "(5×5) + (5×5) + (5×5) + (5×5) = 25 + 25 + 25 + 25 = 100",
      subGrids: [
        { title: "5 × 5 = 25", rows: 5, cols: 5, themeNumber: 5 },
        { title: "5 × 5 = 25", rows: 5, cols: 5, themeNumber: 5 },
        { title: "5 × 5 = 25", rows: 5, cols: 5, themeNumber: 5 },
        { title: "5 × 5 = 25", rows: 5, cols: 5, themeNumber: 5 },
      ],
    },
    {
      baseRows: 10,
      baseCols: 10,
      description: "¡Cuadrado de 8x8 + Cuadrado de 6x6!",
      equationText: "(8×8) + (6×6) = 64 + 36 = 100",
      subGrids: [
        { title: "8 × 8 = 64", rows: 8, cols: 8, themeNumber: 8 },
        { title: "6 × 6 = 36", rows: 6, cols: 6, themeNumber: 6 },
      ],
    },
    {
      baseRows: 10,
      baseCols: 10,
      description: "¡2 Bloques rectangulares de 5x10!",
      equationText: "(5×10) + (5×10) = 50 + 50 = 100",
      subGrids: [
        { title: "5 × 10 = 50", rows: 5, cols: 10, themeNumber: 5 },
        { title: "5 × 10 = 50", rows: 5, cols: 10, themeNumber: 5 },
      ],
    },
  ],
  "6x6": [
    {
      baseRows: 6,
      baseCols: 6,
      description: "¡4 Cuadrados perfectos de 3x3!",
      equationText: "(3×3) + (3×3) + (3×3) + (3×3) = 9 + 9 + 9 + 9 = 36",
      subGrids: [
        { title: "3 × 3 = 9", rows: 3, cols: 3, themeNumber: 3 },
        { title: "3 × 3 = 9", rows: 3, cols: 3, themeNumber: 3 },
        { title: "3 × 3 = 9", rows: 3, cols: 3, themeNumber: 3 },
        { title: "3 × 3 = 9", rows: 3, cols: 3, themeNumber: 3 },
      ],
    },
    {
      baseRows: 6,
      baseCols: 6,
      description: "¡2 Bloques de 3x6!",
      equationText: "(3×6) + (3×6) = 18 + 18 = 36",
      subGrids: [
        { title: "3 × 6 = 18", rows: 3, cols: 6, themeNumber: 3 },
        { title: "3 × 6 = 18", rows: 3, cols: 6, themeNumber: 3 },
      ],
    },
  ],
  "8x8": [
    {
      baseRows: 8,
      baseCols: 8,
      description: "¡4 Cuadrados de 4x4!",
      equationText: "(4×4) + (4×4) + (4×4) + (4×4) = 16 + 16 + 16 + 16 = 64",
      subGrids: [
        { title: "4 × 4 = 16", rows: 4, cols: 4, themeNumber: 4 },
        { title: "4 × 4 = 16", rows: 4, cols: 4, themeNumber: 4 },
        { title: "4 × 4 = 16", rows: 4, cols: 4, themeNumber: 4 },
        { title: "4 × 4 = 16", rows: 4, cols: 4, themeNumber: 4 },
      ],
    },
    {
      baseRows: 8,
      baseCols: 8,
      description: "¡2 Bloques de 4x8!",
      equationText: "(4×8) + (4×8) = 32 + 32 = 64",
      subGrids: [
        { title: "4 × 8 = 32", rows: 4, cols: 8, themeNumber: 4 },
        { title: "4 × 8 = 32", rows: 4, cols: 8, themeNumber: 4 },
      ],
    },
  ],
  "4x4": [
    {
      baseRows: 4,
      baseCols: 4,
      description: "¡4 Cuadrados de 2x2!",
      equationText: "(2×2) + (2×2) + (2×2) + (2×2) = 4 + 4 + 4 + 4 = 16",
      subGrids: [
        { title: "2 × 2 = 4", rows: 2, cols: 2, themeNumber: 2 },
        { title: "2 × 2 = 4", rows: 2, cols: 2, themeNumber: 2 },
        { title: "2 × 2 = 4", rows: 2, cols: 2, themeNumber: 2 },
        { title: "2 × 2 = 4", rows: 2, cols: 2, themeNumber: 2 },
      ],
    },
    {
      baseRows: 4,
      baseCols: 4,
      description: "¡2 Bloques de 2x4!",
      equationText: "(2×4) + (2×4) = 8 + 8 = 16",
      subGrids: [
        { title: "2 × 4 = 8", rows: 2, cols: 4, themeNumber: 2 },
        { title: "2 × 4 = 8", rows: 2, cols: 4, themeNumber: 2 },
      ],
    },
  ],
};

export const getDecompositions = (rows: number, cols: number): DecompositionRecipe[] => {
  const key = `${rows}x${cols}`;
  if (DECOMPOSITION_DATABASE[key]) {
    return DECOMPOSITION_DATABASE[key];
  }

  // Fallback dynamic split for any other R x C
  const total = rows * cols;
  const halfRows = Math.floor(rows / 2);
  const remRows = rows - halfRows;

  if (halfRows > 0 && remRows > 0) {
    return [
      {
        baseRows: rows,
        baseCols: cols,
        description: `¡Dividido en (${halfRows}×${cols}) + (${remRows}×${cols})!`,
        equationText: `(${halfRows}×${cols}) + (${remRows}×${cols}) = ${halfRows * cols} + ${remRows * cols} = ${total}`,
        subGrids: [
          { title: `${halfRows} × ${cols} = ${halfRows * cols}`, rows: halfRows, cols, themeNumber: halfRows },
          { title: `${remRows} × ${cols} = ${remRows * cols}`, rows: remRows, cols, themeNumber: remRows },
        ],
      },
    ];
  }

  return [
    {
      baseRows: rows,
      baseCols: cols,
      description: "¡Cuadrícula pura sin mezcla!",
      equationText: `${rows} × ${cols} = ${total}`,
      subGrids: [{ title: `${rows} × ${cols} = ${total}`, rows, cols, themeNumber: rows }],
    },
  ];
};
