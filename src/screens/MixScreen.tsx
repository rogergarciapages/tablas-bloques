import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Animated,
  useWindowDimensions,
} from "react-native";
import { BlockGrid } from "../components/BlockGrid";
import { soundEngine } from "../utils/soundEngine";
import { getThemeForNumber } from "../theme/colors";
import { Confetti } from "../components/Confetti";
import { getDecompositions, DecompositionRecipe } from "../utils/decompositions";
import { shakeManager } from "../utils/shakeSensor";

export const MixScreen: React.FC = () => {
  const { width } = useWindowDimensions();
  const [targetKey, setTargetKey] = useState<string>("10x10");
  const [recipeIndex, setRecipeIndex] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [shakeAnim] = useState(new Animated.Value(0));

  const [rows, cols] = targetKey.split("x").map(Number);
  const recipes = getDecompositions(rows, cols);
  const currentRecipe: DecompositionRecipe = recipes[recipeIndex % recipes.length];

  // Motion Shake listener (Web devicemotion & Native mobile)
  useEffect(() => {
    const unsubscribe = shakeManager.subscribe(() => {
      triggerShakeMix();
    });

    return () => {
      unsubscribe();
    };
  }, [recipeIndex, targetKey]);

  const triggerShakeMix = () => {
    soundEngine.playSquareMagic();
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);

    // Shake animation effect
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 15, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -15, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();

    setRecipeIndex((prev) => prev + 1);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Banner Header */}
        <View style={[styles.headerBanner, { backgroundColor: "#FF2D55" }]}>
          <Text style={styles.headerTitle}>Cóctel de Tablas 🍹</Text>
          <Text style={styles.headerSubtitle}>
            ¡Sacude el móvil o presiona para partir y mezclar bloques!
          </Text>
        </View>

        {/* Target Multiplication Selection Bar */}
        <View style={styles.targetSelectorRow}>
          {["10x10", "8x8", "6x6", "4x4"].map((key) => {
            const [r, c] = key.split("x").map(Number);
            const isSelected = targetKey === key;

            return (
              <Pressable
                key={`mix-target-${key}`}
                style={[
                  styles.targetChip,
                  isSelected && styles.targetChipActive,
                ]}
                onPress={() => {
                  soundEngine.playPop(1.1);
                  setTargetKey(key);
                  setRecipeIndex(0);
                }}
              >
                <Text
                  style={[
                    styles.targetChipText,
                    isSelected && styles.targetChipTextActive,
                  ]}
                >
                  {r}×{c} = {r * c}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Big Shake Button */}
        <Animated.View style={{ transform: [{ translateX: shakeAnim }], width: "94%", alignItems: "center" }}>
          <Pressable style={styles.shakeButton} onPress={triggerShakeMix}>
            <Text style={styles.shakeButtonText}>🍹 ¡SACUDIR CÓCTEL DE MULTIPLICACIÓN! 💥</Text>
          </Pressable>
        </Animated.View>

        {/* Decomposition Summary Card */}
        <View style={styles.recipeCard}>
          <Text style={styles.recipeTitle}>{currentRecipe.description}</Text>
          <Text style={styles.recipeEquation}>{currentRecipe.equationText}</Text>
        </View>

        {/* Sub-Grids Display Area */}
        <View style={styles.subGridsViewport}>
          <View style={styles.subGridsRow}>
            {currentRecipe.subGrids.map((sub, idx) => (
              <View
                key={`subgrid-${idx}-${sub.rows}x${sub.cols}`}
                style={[
                  styles.subGridCard,
                  {
                    borderColor: getThemeForNumber(sub.themeNumber).primary,
                    maxWidth: currentRecipe.subGrids.length > 2 ? "48%" : "96%",
                  },
                ]}
              >
                <Text style={[styles.subGridTitle, { color: getThemeForNumber(sub.themeNumber).darkAccent }]}>
                  {sub.title}
                </Text>
                <BlockGrid
                  rows={sub.rows}
                  cols={sub.cols}
                  tableNumber={sub.themeNumber}
                  interactiveCount={true}
                  showEquationCard={false}
                  maxHeightOverhead={360}
                />
              </View>
            ))}
          </View>
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
    overflow: "hidden",
  },
  headerBanner: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
  },
  headerSubtitle: {
    color: "rgba(255, 255, 255, 0.95)",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
  },
  targetSelectorRow: {
    flexDirection: "row",
    gap: 8,
    marginVertical: 6,
  },
  targetChip: {
    backgroundColor: "#EFEFEF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#DDD",
  },
  targetChipActive: {
    backgroundColor: "#FF2D55",
    borderColor: "#B80E30",
  },
  targetChipText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#444444",
  },
  targetChipTextActive: {
    color: "#FFFFFF",
  },
  shakeButton: {
    backgroundColor: "#FF9500",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginVertical: 4,
    width: "96%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  shakeButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
    textAlign: "center",
  },
  recipeCard: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
    marginVertical: 4,
    alignItems: "center",
    width: "94%",
    borderWidth: 1.5,
    borderColor: "#FF2D55",
  },
  recipeTitle: {
    fontSize: 13,
    fontWeight: "900",
    color: "#FF2D55",
  },
  recipeEquation: {
    fontSize: 12,
    fontWeight: "800",
    color: "#333333",
    marginTop: 2,
  },
  subGridsViewport: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  subGridsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 8,
  },
  subGridCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 6,
    borderWidth: 2,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  subGridTitle: {
    fontSize: 11,
    fontWeight: "900",
    marginBottom: 2,
  },
});
