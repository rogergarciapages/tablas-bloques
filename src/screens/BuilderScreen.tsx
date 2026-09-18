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
          <View style={[styles.statusPill, { backgroundColor: isSquare ? "#FFD700" : "rgba(255, 255, 255, 0.25)" }]}>
            <Text style={[styles.statusText, { color: isSquare ? "#5C4000" : "#FFFFFF" }]}>
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
                <Text style={[styles.stepValText, { color: theme.darkAccent }]}>{rows}</Text>
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
                <Text style={[styles.stepValText, { color: theme.darkAccent }]}>{cols}</Text>
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
    backgroundColor: "#F5F7FA",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    overflow: "hidden",
  },
  headerBanner: {
    backgroundColor: "#FF9500",
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },
  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "800",
  },
  controlPanel: {
    backgroundColor: "#FFFFFF",
    width: "96%",
    maxWidth: 520,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginVertical: 4,
    alignItems: "center",
    gap: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
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
    backgroundColor: "#F8F9FA",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1.2,
    gap: 6,
  },
  stepperLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#555555",
  },
  stepperBtnsGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  stepBtn: {
    backgroundColor: "#34C759",
    width: 24,
    height: 24,
    borderRadius: 12,
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
    fontSize: 16,
    fontWeight: "900",
    minWidth: 16,
    textAlign: "center",
  },
  multOpSymbol: {
    fontSize: 18,
    fontWeight: "900",
    color: "#333333",
  },
  presetsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  presetsLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#666666",
  },
  presetChip: {
    backgroundColor: "#EFEFEF",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  presetChipActive: {
    backgroundColor: "#FFD700",
    borderColor: "#FF9500",
  },
  presetChipText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#444444",
  },
  presetChipTextActive: {
    color: "#5C4000",
  },
  gridViewport: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
