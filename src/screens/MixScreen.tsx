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
  const [score, setScore] = useState<number>(2450);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [shakeAnim] = useState(new Animated.Value(0));

  const [rows, cols] = targetKey.split("x").map(Number);
  const recipes = getDecompositions(rows, cols);
  const currentRecipe: DecompositionRecipe = recipes[recipeIndex % recipes.length];

  useEffect(() => {
    const unsubscribe = shakeManager.subscribe(() => {
      triggerShakeMix();
    });
    return () => unsubscribe();
  }, [recipeIndex, targetKey]);

  const triggerShakeMix = () => {
    soundEngine.playSquareMagic();
    setShowConfetti(true);
    setScore((prev) => prev + 150);
    setTimeout(() => setShowConfetti(false), 2000);

    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 15, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -15, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();

    setRecipeIndex((prev) => prev + 1);
  };

  const subColors = ["#06B6D4", "#10B981", "#F97316", "#EC4899"];
  const badges = ["BOOM!", "ZAP!", "¡Genial!", "BOOM!"];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Header matching Screenshot 2 */}
        <View style={styles.headerRow}>
          <Text style={styles.soundIcon}>🔊</Text>
          <Text style={styles.titleText}>Cóctel <Text style={{ color: "#06B6D4" }}>de Tablas</Text></Text>
          <Text style={styles.gearIcon}>⚙️</Text>
        </View>

        {/* Score & Time Badges matching Screenshot 2 */}
        <View style={styles.statsRow}>
          <View style={styles.scorePill}>
            <Text style={styles.statLabel}>Score</Text>
            <Text style={styles.statValueCyan}>{score} <Text style={styles.statUnit}>pts</Text></Text>
          </View>

          <View style={styles.timePill}>
            <Text style={styles.statLabel}>Time</Text>
            <Text style={styles.statValuePink}>01:48</Text>
          </View>
        </View>

        {/* Octopus Mascot & Speech Bubble */}
        <View style={styles.mascotRow}>
          <Text style={styles.mascotIcon}>🐙</Text>
          <View style={styles.speechBubble}>
            <Text style={styles.speechTitle}>¡Genial! ¡Se dividen!</Text>
            <Text style={styles.speechEq}>{currentRecipe.equationText}</Text>
          </View>
        </View>

        {/* Sub-Grids Display Area matching Screenshot 2 */}
        <Animated.View
          style={[
            styles.subGridsViewport,
            { transform: [{ translateX: shakeAnim }] },
          ]}
        >
          <View style={styles.subGridsGrid}>
            {currentRecipe.subGrids.map((sub, idx) => {
              const borderCol = subColors[idx % subColors.length];
              const badgeText = badges[idx % badges.length];

              return (
                <View
                  key={`subgrid-${idx}-${sub.rows}x${sub.cols}`}
                  style={[
                    styles.subGridCard,
                    { borderColor: borderCol, shadowColor: borderCol },
                  ]}
                >
                  <View style={[styles.badgeTag, { backgroundColor: borderCol }]}>
                    <Text style={styles.badgeTagText}>{badgeText}</Text>
                  </View>
                  <BlockGrid
                    rows={sub.rows}
                    cols={sub.cols}
                    tableNumber={sub.themeNumber}
                    interactiveCount={true}
                    showEquationCard={false}
                    maxHeightOverhead={410}
                  />
                </View>
              );
            })}
          </View>
        </Animated.View>

        {/* Math Operation Buttons matching Screenshot 2 */}
        <View style={styles.operationsRow}>
          <Pressable style={[styles.opCircle, { borderColor: "#10B981" }]}>
            <Text style={[styles.opSymbol, { color: "#10B981" }]}>×</Text>
          </Pressable>
          <Pressable style={[styles.opCircle, { borderColor: "#06B6D4" }]}>
            <Text style={[styles.opSymbol, { color: "#06B6D4" }]}>÷</Text>
          </Pressable>
          <Pressable style={[styles.opCircle, { borderColor: "#EC4899" }]}>
            <Text style={[styles.opSymbol, { color: "#EC4899" }]}>+</Text>
          </Pressable>
          <Pressable style={[styles.opCircle, { borderColor: "#EAB308" }]}>
            <Text style={[styles.opSymbol, { color: "#EAB308" }]}>=</Text>
          </Pressable>
        </View>

        {/* Bottom Shake Action Bar matching Screenshot 2 */}
        <View style={styles.bottomBarRow}>
          <Pressable style={styles.numPill}><Text style={styles.numPillText}>1</Text></Pressable>
          <Pressable style={styles.numPill}><Text style={styles.numPillText}>2</Text></Pressable>

          <Pressable style={styles.goBtn} onPress={triggerShakeMix}>
            <Text style={styles.goBtnText}>🍹 GO!</Text>
          </Pressable>

          <Pressable style={styles.numPill}><Text style={styles.numPillText}>4</Text></Pressable>
          <Pressable style={styles.numPill}><Text style={styles.numPillText}>5</Text></Pressable>
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
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  soundIcon: { fontSize: 18, color: "#EC4899" },
  gearIcon: { fontSize: 18, color: "#06B6D4" },
  titleText: {
    fontSize: 22,
    fontWeight: "900",
    color: "#EC4899",
    letterSpacing: 0.5,
    textShadowColor: "rgba(236, 72, 153, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  statsRow: {
    flexDirection: "row",
    gap: 20,
    marginVertical: 4,
  },
  scorePill: {
    borderWidth: 2,
    borderColor: "#06B6D4",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 3,
    alignItems: "center",
    backgroundColor: "#0E102E",
    shadowColor: "#06B6D4",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 6,
  },
  timePill: {
    borderWidth: 2,
    borderColor: "#EC4899",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 3,
    alignItems: "center",
    backgroundColor: "#0E102E",
    shadowColor: "#EC4899",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 6,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#8E90B4",
  },
  statValueCyan: {
    fontSize: 15,
    fontWeight: "900",
    color: "#FFFFFF",
  },
  statValuePink: {
    fontSize: 15,
    fontWeight: "900",
    color: "#EC4899",
  },
  statUnit: {
    fontSize: 11,
    color: "#06B6D4",
  },
  mascotRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 2,
  },
  mascotIcon: {
    fontSize: 28,
  },
  speechBubble: {
    backgroundColor: "#16183B",
    borderWidth: 1.5,
    borderColor: "#8B5CF6",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  speechTitle: {
    color: "#A78BFA",
    fontSize: 11,
    fontWeight: "900",
  },
  speechEq: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },
  subGridsViewport: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  subGridsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 8,
  },
  subGridCard: {
    backgroundColor: "#121433",
    borderRadius: 16,
    padding: 6,
    borderWidth: 2,
    alignItems: "center",
    position: "relative",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 6,
  },
  badgeTag: {
    position: "absolute",
    top: -10,
    right: 6,
    paddingHorizontal: 8,
    paddingVertical: 1,
    borderRadius: 8,
    zIndex: 10,
  },
  badgeTagText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "900",
  },
  operationsRow: {
    flexDirection: "row",
    gap: 14,
    marginVertical: 4,
  },
  opCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    backgroundColor: "#121433",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  opSymbol: {
    fontSize: 22,
    fontWeight: "900",
  },
  bottomBarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
  },
  numPill: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#84CC16",
    backgroundColor: "#121433",
    alignItems: "center",
    justifyContent: "center",
  },
  numPillText: {
    color: "#A3E635",
    fontWeight: "900",
    fontSize: 13,
  },
  goBtn: {
    backgroundColor: "#06B6D4",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#38BDF8",
    shadowColor: "#06B6D4",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 6,
  },
  goBtnText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 15,
  },
});
