import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, useWindowDimensions } from "react-native";
import { NumberBlock } from "./NumberBlock";
import { getThemeForNumber } from "../theme/colors";
import { soundEngine } from "../utils/soundEngine";

interface BlockGridProps {
  rows: number;
  cols: number;
  tableNumber?: number; // Primary theme number
  interactiveCount?: boolean;
  onCompleteCount?: () => void;
  maxHeightOverhead?: number; // Space taken outside BlockGrid by screen headers, tabs, etc.
  showEquationCard?: boolean;
}

export const BlockGrid: React.FC<BlockGridProps> = ({
  rows,
  cols,
  tableNumber,
  interactiveCount = true,
  onCompleteCount,
  maxHeightOverhead = 220,
  showEquationCard = true,
}) => {
  const { width, height } = useWindowDimensions();
  const total = rows * cols;
  const isSquare = rows === cols;
  const mainThemeNumber = tableNumber || rows;
  const theme = getThemeForNumber(mainThemeNumber);

  const [countedIndices, setCountedIndices] = useState<Set<number>>(new Set());
  const [isAutoCounting, setIsAutoCounting] = useState<boolean>(false);

  // Reset counted blocks when dimensions change
  useEffect(() => {
    setCountedIndices(new Set());
    setIsAutoCounting(false);
  }, [rows, cols]);

  // ---------------------------------------------------------------------
  // Dynamic Block Sizing logic to strictly fit screen in both orientations
  // ---------------------------------------------------------------------
  // Extra height used INSIDE BlockGrid (equation card ~50px, col badges ~16px, action btns ~40px)
  const internalOverhead = (showEquationCard ? 52 : 0) + 16 + (interactiveCount ? 40 : 0) + 12;

  // Available horizontal space (leave margin for left badges + screen padding)
  const maxAvailableWidth = Math.min(width - 44, 560);
  const widthBasedBlockSize = Math.floor((maxAvailableWidth - (cols - 1) * 2.5) / cols);

  // Available vertical space for matrix rows
  const maxAvailableHeight = Math.max(90, height - (maxHeightOverhead + internalOverhead));
  const heightBasedBlockSize = Math.floor((maxAvailableHeight - (rows - 1) * 2.5) / rows);

  // Pick the smaller dimension so the entire matrix fits seamlessly without scrolling
  const idealSize = Math.min(widthBasedBlockSize, heightBasedBlockSize);
  const blockSize = Math.max(12, Math.min(idealSize, 48));

  const handleBlockPress = (index: number) => {
    setCountedIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      if (next.size === total) {
        soundEngine.playSuccess();
        if (onCompleteCount) onCompleteCount();
      }
      return next;
    });
  };

  const handleAutoCount = () => {
    if (isAutoCounting) return;
    setIsAutoCounting(true);
    setCountedIndices(new Set());

    let current = 0;
    const interval = setInterval(() => {
      if (current < total) {
        const nextIdx = current;
        soundEngine.playCountTone(nextIdx + 1);
        setCountedIndices((prev) => {
          const updated = new Set(prev);
          updated.add(nextIdx);
          return updated;
        });
        current++;
      } else {
        clearInterval(interval);
        setIsAutoCounting(false);
        soundEngine.playSuccess();
        if (isSquare) {
          soundEngine.playSquareMagic();
        }
        if (onCompleteCount) onCompleteCount();
      }
    }, 140);
  };

  const handleResetCount = () => {
    setCountedIndices(new Set());
  };

  return (
    <View style={styles.container}>
      {/* Equation Banner */}
      {showEquationCard && (
        <View style={[styles.equationCard, { backgroundColor: theme.lightAccent, borderColor: theme.primary }]}>
          <View style={styles.equationRow}>
            <Text style={[styles.factorText, { color: theme.darkAccent }]}>{rows}</Text>
            <Text style={styles.opText}>×</Text>
            <Text style={[styles.factorText, { color: theme.darkAccent }]}>{cols}</Text>
            <Text style={styles.opText}>=</Text>
            <View style={[styles.totalBadge, { backgroundColor: theme.primary }]}>
              <Text style={styles.totalBadgeText}>{total}</Text>
            </View>
          </View>

          <Text style={styles.equationSubtext}>
            {rows} fila{rows > 1 ? "s" : ""} de {cols} bloque{cols > 1 ? "s" : ""}
          </Text>

          {isSquare && (
            <View style={styles.squareBanner}>
              <Text style={styles.squareBannerText}>⭐ ¡FORMACIÓN DE CUADRADO PERFECTO! ⭐</Text>
            </View>
          )}
        </View>
      )}

      {/* Grid Container with Row and Column Indicators */}
      <View style={styles.gridOuterWrapper}>
        {/* Top Column Labels */}
        <View style={[styles.topColLabelsRow, { marginLeft: 18 }]}>
          {Array.from({ length: cols }).map((_, c) => (
            <View key={`col-hdr-${c}`} style={[styles.colBadge, { width: blockSize, marginHorizontal: 1.2 }]}>
              <Text style={styles.colBadgeText}>{c + 1}</Text>
            </View>
          ))}
        </View>

        <View style={styles.gridWithRowLabels}>
          {/* Left Row Labels */}
          <View style={styles.leftRowLabelsCol}>
            {Array.from({ length: rows }).map((_, r) => (
              <View
                key={`row-hdr-${r}`}
                style={[styles.rowBadge, { height: blockSize, marginVertical: 1.2, backgroundColor: theme.secondary }]}
              >
                <Text style={styles.rowBadgeText}>{r + 1}</Text>
              </View>
            ))}
          </View>

          {/* Matrix of NumberBlocks */}
          <View style={[styles.matrixContainer, { borderColor: isSquare ? "#FFD700" : theme.primary }]}>
            {Array.from({ length: rows }).map((_, r) => (
              <View key={`row-${r}`} style={styles.matrixRow}>
                {Array.from({ length: cols }).map((_, c) => {
                  const index = r * cols + c;
                  const isCounted = countedIndices.has(index);

                  return (
                    <NumberBlock
                      key={`block-${r}-${c}`}
                      number={mainThemeNumber}
                      size={blockSize}
                      countIndex={index}
                      isCounted={isCounted}
                      onPress={() => interactiveCount && handleBlockPress(index)}
                      showFace={blockSize >= 26}
                      highlightSquare={isSquare}
                    />
                  );
                })}
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Interactive Controls */}
      {interactiveCount && (
        <View style={styles.controlsRow}>
          <Pressable
            style={[styles.actionBtn, styles.autoCountBtn, isAutoCounting && styles.btnDisabled]}
            onPress={handleAutoCount}
            disabled={isAutoCounting}
          >
            <Text style={styles.actionBtnText}>▶️ Contar en Auto</Text>
          </Pressable>

          {countedIndices.size > 0 && (
            <Pressable style={[styles.actionBtn, styles.resetBtn]} onPress={handleResetCount}>
              <Text style={styles.actionBtnText}>🔄 Reiniciar ({countedIndices.size}/{total})</Text>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 1,
    width: "100%",
  },
  equationCard: {
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: "center",
    marginBottom: 4,
    maxWidth: 360,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  equationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  factorText: {
    fontSize: 18,
    fontWeight: "900",
  },
  opText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#444444",
  },
  totalBadge: {
    paddingHorizontal: 8,
    paddingVertical: 1,
    borderRadius: 8,
  },
  totalBadgeText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },
  equationSubtext: {
    fontSize: 10,
    fontWeight: "600",
    color: "#555555",
    marginTop: 1,
  },
  squareBanner: {
    backgroundColor: "#FFD700",
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
    marginTop: 2,
  },
  squareBannerText: {
    color: "#5C4000",
    fontWeight: "900",
    fontSize: 9,
    textAlign: "center",
  },
  gridOuterWrapper: {
    alignItems: "flex-start",
  },
  topColLabelsRow: {
    flexDirection: "row",
    marginBottom: 1,
  },
  colBadge: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E0E0E0",
    borderRadius: 3,
    paddingVertical: 0.5,
  },
  colBadgeText: {
    fontSize: 8.5,
    fontWeight: "700",
    color: "#444444",
  },
  gridWithRowLabels: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftRowLabelsCol: {
    marginRight: 3,
  },
  rowBadge: {
    width: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  },
  rowBadgeText: {
    fontSize: 8.5,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  matrixContainer: {
    padding: 2,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderWidth: 1.5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  matrixRow: {
    flexDirection: "row",
  },
  controlsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
  },
  actionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 1,
  },
  autoCountBtn: {
    backgroundColor: "#34C759",
  },
  resetBtn: {
    backgroundColor: "#FF9500",
  },
  btnDisabled: {
    opacity: 0.5,
  },
  actionBtnText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 11,
  },
});
