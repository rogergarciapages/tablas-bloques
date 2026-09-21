import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from "react-native";
import { BlockGrid } from "../components/BlockGrid";
import { soundEngine } from "../utils/soundEngine";
import { getThemeForNumber } from "../theme/colors";
import { Confetti } from "../components/Confetti";

export const BuilderScreen: React.FC = () => {
  const [rows, setRows] = useState<number>(3);
  const [cols, setCols] = useState<number>(3);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  const isSquare = rows === cols;
  const total = rows * cols;
  const theme = getThemeForNumber(rows);

  const updateRows = (delta: number) => {
    const next = Math.max(1, Math.min(10, rows + delta));
    if (next !== rows) {
      soundEngine.playPop(0.9 + next * 0.1);
      setRows(next);
      if (next === cols) {
        soundEngine.playSquareMagic();
      }
    }
  };

  const updateCols = (delta: number) => {
    const next = Math.max(1, Math.min(10, cols + delta));
    if (next !== cols) {
      soundEngine.playPop(0.9 + next * 0.1);
      setCols(next);
      if (next === rows) {
        soundEngine.playSquareMagic();
      }
    }
  };

  const setPresetSquare = (size: number) => {
    soundEngine.playSquareMagic();
    setRows(size);
    setCols(size);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header Banner */}
        <View style={styles.headerBanner}>
          <Text style={styles.headerTitle}>Constructor de Bloques 🛠️</Text>
          <View style={[styles.statusPill, { backgroundColor: isSquare ? "#FFD700" : "rgba(99, 102, 241, 0.25)" }]}>
            <Text style={[styles.statusText, { color: isSquare ? "#0F172A" : "#FFFFFF" }]}>
              {isSquare ? `⭐ Cuadrado: ${total} Bloques` : `📐 Rectángulo: ${total} Bloques`}
            </Text>
          </View>
        </View>

        {/* Top Control Panel (Steppers & Presets) */}
        <View style={styles.controlPanel}>
          {/* Row & Column Stepper Controls */}
          <View style={styles.steppersRow}>
            {/* Rows Stepper */}
            <View style={[styles.stepperBox, { borderColor: theme.primary }]}>
              <Text style={styles.stepperLabel}>Filas</Text>
              <View style={styles.stepperBtnsGroup}>
                <Pressable style={styles.stepBtn} onPress={() => updateRows(-1)}>
                  <Text style={styles.stepBtnText}>-</Text>
                </Pressable>
                <Text style={[styles.stepValText, { color: theme.primary }]}>{rows}</Text>
                <Pressable style={styles.stepBtn} onPress={() => updateRows(1)}>
                  <Text style={styles.stepBtnText}>+</Text>
                </Pressable>
              </View>
            </View>

            <Text style={styles.multOpSymbol}>×</Text>

            {/* Cols Stepper */}
            <View style={[styles.stepperBox, { borderColor: theme.primary }]}>
              <Text style={styles.stepperLabel}>Columnas</Text>
              <View style={styles.stepperBtnsGroup}>
                <Pressable style={styles.stepBtn} onPress={() => updateCols(-1)}>
                  <Text style={styles.stepBtnText}>-</Text>
                </Pressable>
                <Text style={[styles.stepValText, { color: theme.primary }]}>{cols}</Text>
                <Pressable style={styles.stepBtn} onPress={() => updateCols(1)}>
                  <Text style={styles.stepBtnText}>+</Text>
                </Pressable>
              </View>
            </View>
          </View>

          {/* Preset Buttons Bar */}
          <View style={styles.presetsRow}>
            <Text style={styles.presetsLabel}>Cuadrados:</Text>
            {[2, 3, 4, 5, 6].map((size) => (
              <Pressable
                key={`sq-btn-${size}`}
                style={[
                  styles.presetChip,
                  rows === size && cols === size && styles.presetChipActive,
                ]}
                onPress={() => setPresetSquare(size)}
              >
                <Text
                  style={[
                    styles.presetChipText,
                    rows === size && cols === size && styles.presetChipTextActive,
                  ]}
                >
                  {size}×{size}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Live Block Grid Component (Centered without Scroll) */}
        <View style={styles.gridViewport}>
          <BlockGrid
            rows={rows}
            cols={cols}
            tableNumber={rows}
            interactiveCount={true}
            maxHeightOverhead={170}
            onCompleteCount={() => {
              setShowConfetti(true);
              setTimeout(() => setShowConfetti(false), 2000);
            }}
          />
        </View>

        <Confetti active={showConfetti} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#090A1C",
  },
  container: {
    flex: 1,
    backgroundColor: "#090A1C",
    alignItems: "center",
    justifyContent: "flex-start",
    overflow: "hidden",
  },
  headerBanner: {
    backgroundColor: "#10122B",
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1.5,
    borderBottomColor: "rgba(99, 102, 241, 0.3)",
  },
  headerTitle: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: "900",
  },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "900",
  },
  controlPanel: {
    backgroundColor: "#121433",
    width: "96%",
    maxWidth: 520,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 6,
    alignItems: "center",
    gap: 6,
    borderWidth: 1.5,
    borderColor: "rgba(99, 102, 241, 0.35)",
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  steppersRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  stepperBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1C3D",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1.5,
    gap: 6,
  },
  stepperLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#8E90B4",
  },
  stepperBtnsGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  stepBtn: {
    backgroundColor: "#10B981",
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  stepBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
    lineHeight: 18,
  },
  stepValText: {
    fontSize: 17,
    fontWeight: "900",
    minWidth: 18,
    textAlign: "center",
  },
  multOpSymbol: {
    fontSize: 18,
    fontWeight: "900",
    color: "#8E90B4",
  },
  presetsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  presetsLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#8E90B4",
  },
  presetChip: {
    backgroundColor: "#16183B",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "rgba(99, 102, 241, 0.3)",
  },
  presetChipActive: {
    backgroundColor: "#1D2054",
    borderColor: "#FFD700",
  },
  presetChipText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#8E90B4",
  },
  presetChipTextActive: {
    color: "#FFD700",
    fontWeight: "900",
  },
  gridViewport: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
