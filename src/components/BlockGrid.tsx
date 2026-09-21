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

  const colColors = ["#F97316", "#EAB308", "#10B981", "#06B6D4", "#EC4899", "#8B5CF6"];

  return (
    <View style={styles.container}>
      {/* Equation Banner */}
      {showEquationCard && (
        <View style={styles.equationCard}>
          <View style={styles.equationRow}>
            <Text style={[styles.factorText, { color: theme.primary }]}>{rows}</Text>
            <Text style={styles.opText}>×</Text>
            <Text style={[styles.factorText, { color: theme.glowColor || "#38BDF8" }]}>{cols}</Text>
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
        {/* Top Column Labels (1, 2, 3, 4...) */}
        <View style={[styles.topColLabelsRow, { marginLeft: 24 }]}>
          {Array.from({ length: cols }).map((_, c) => {
            const hdrColor = colColors[c % colColors.length];
            return (
              <View key={`col-hdr-${c}`} style={[styles.colBadge, { width: blockSize, marginHorizontal: 1.5 }]}>
                <Text style={[styles.colBadgeText, { color: hdrColor }]}>{c + 1}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.gridWithRowLabels}>
          {/* Left Row Labels (1, 2, 3...) */}
          <View style={styles.leftRowLabelsCol}>
            {Array.from({ length: rows }).map((_, r) => {
              const hdrColor = colColors[r % colColors.length];
              return (
                <View
                  key={`row-hdr-${r}`}
                  style={[styles.rowBadge, { height: blockSize, marginVertical: 1.5 }]}
                >
                  <Text style={[styles.rowBadgeText, { color: hdrColor }]}>{r + 1}</Text>
                </View>
              );
            })}
          </View>

          {/* Matrix of NumberBlocks */}
          <View style={[styles.matrixContainer, { borderColor: isSquare ? "#FFD700" : "rgba(99, 102, 241, 0.4)" }]}>
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
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "rgba(99, 102, 241, 0.4)",
    backgroundColor: "#121433",
    alignItems: "center",
    marginBottom: 6,
    maxWidth: 360,
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  equationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  factorText: {
    fontSize: 20,
    fontWeight: "900",
  },
  opText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#8E90B4",
  },
  totalBadge: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
  },
  totalBadgeText: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "900",
  },
  equationSubtext: {
    fontSize: 11,
    fontWeight: "600",
    color: "#A0A2C7",
    marginTop: 2,
  },
  squareBanner: {
    backgroundColor: "rgba(255, 215, 0, 0.2)",
    borderColor: "#FFD700",
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 4,
  },
  squareBannerText: {
    color: "#FFD700",
    fontWeight: "900",
    fontSize: 10,
    textAlign: "center",
  },
  gridOuterWrapper: {
    alignItems: "flex-start",
  },
  topColLabelsRow: {
    flexDirection: "row",
    marginBottom: 3,
  },
  colBadge: {
    alignItems: "center",
    justifyContent: "center",
  },
  colBadgeText: {
    fontSize: 11,
    fontWeight: "900",
  },
  gridWithRowLabels: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftRowLabelsCol: {
    marginRight: 4,
    width: 20,
  },
  rowBadge: {
    alignItems: "center",
    justifyContent: "center",
  },
  rowBadgeText: {
    fontSize: 11,
    fontWeight: "900",
  },
  matrixContainer: {
    padding: 4,
    borderRadius: 16,
    backgroundColor: "#121433",
    borderWidth: 2,
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  matrixRow: {
    flexDirection: "row",
  },
  controlsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },
  actionBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1.5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  autoCountBtn: {
    backgroundColor: "#10B981",
    borderColor: "#34D399",
    shadowColor: "#10B981",
  },
  resetBtn: {
    backgroundColor: "#F97316",
    borderColor: "#FB923C",
    shadowColor: "#F97316",
  },
  btnDisabled: {
    opacity: 0.5,
  },
  actionBtnText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 12,
  },
});
