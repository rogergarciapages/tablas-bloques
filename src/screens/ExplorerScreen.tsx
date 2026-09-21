import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Modal,
  SafeAreaView,
} from "react-native";
import { TableSelector } from "../components/TableSelector";
import { BlockGrid } from "../components/BlockGrid";
import { getThemeForNumber } from "../theme/colors";
import { soundEngine } from "../utils/soundEngine";
import { Confetti } from "../components/Confetti";

export const ExplorerScreen: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<number>(4); // Default to table of 4 as in Screenshot 1!
  const [selectedMultiplier, setSelectedMultiplier] = useState<number>(4);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  const theme = getThemeForNumber(selectedTable);
  const totalResult = selectedTable * selectedMultiplier;

  const handleNextChallenge = () => {
    soundEngine.playPop(1.2);
    if (selectedMultiplier < 10) {
      setSelectedMultiplier((prev) => prev + 1);
    } else {
      setSelectedMultiplier(1);
      setSelectedTable((prev) => (prev % 12) + 1);
    }
  };

  const handleCompleteCount = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Header Bar matching Screenshot 1 */}
        <View style={styles.headerBar}>
          <Pressable style={styles.navPillBtn}>
            <Text style={styles.navPillIcon}>‹</Text>
          </Pressable>

          <View style={styles.titleWrapper}>
            <Text style={styles.titleMascot}>🧩</Text>
            <View>
              <Text style={styles.headerTitle}>EXPLORADOR</Text>
              <Text style={styles.headerSubtitle}>DE TABLAS</Text>
            </View>
          </View>

          <Pressable style={styles.navPillBtn}>
            <Text style={styles.navPillHelp}>?</Text>
          </Pressable>
        </View>

        {/* 2-Row Table Selector Pills */}
        <TableSelector selectedTable={selectedTable} onSelectTable={setSelectedTable} />

        {/* Central High-Impact Interactive Matrix */}
        <View style={styles.matrixWrapper}>
          <BlockGrid
            rows={selectedTable}
            cols={selectedMultiplier}
            tableNumber={selectedTable}
            interactiveCount={true}
            onCompleteCount={handleCompleteCount}
            showEquationCard={false}
            maxHeightOverhead={230}
          />
        </View>

        {/* Footer Result Banner & Actions matching Screenshot 1 */}
        <View style={styles.footerContainer}>
          <Text style={styles.resultBannerText}>
            ¡MULTIPLICA: {selectedTable} X {selectedMultiplier} = {totalResult}!
          </Text>

          <View style={styles.footerButtonsRow}>
            <Pressable style={styles.primaryNextBtn} onPress={handleNextChallenge}>
              <Text style={styles.primaryNextText}>SIGUIENTE RETO</Text>
            </Pressable>

            <Pressable style={styles.secondaryLessonBtn} onPress={() => soundEngine.playPop(1.0)}>
              <Text style={styles.secondaryLessonText}>LECCIÓN</Text>
            </Pressable>
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
    backgroundColor: "#090A1C",
  },
  container: {
    flex: 1,
    backgroundColor: "#090A1C",
    justifyContent: "space-between",
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  navPillBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#16183B",
    borderWidth: 1.5,
    borderColor: "rgba(99, 102, 241, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  navPillIcon: {
    color: "#C7C9ED",
    fontSize: 22,
    fontWeight: "900",
    marginTop: -2,
  },
  navPillHelp: {
    color: "#C7C9ED",
    fontSize: 16,
    fontWeight: "900",
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  titleMascot: {
    fontSize: 24,
  },
  headerTitle: {
    color: "#FFD700",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0.5,
    textAlign: "center",
    textShadowColor: "rgba(255, 215, 0, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  headerSubtitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0.5,
    textAlign: "center",
  },
  matrixWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  footerContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 12,
  },
  resultBannerText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
    textAlign: "center",
    textShadowColor: "#3B82F6",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  footerButtonsRow: {
    flexDirection: "row",
    gap: 14,
    width: "100%",
    justifyContent: "center",
  },
  primaryNextBtn: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#60A5FA",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
  },
  primaryNextText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  secondaryLessonBtn: {
    backgroundColor: "#16183B",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "rgba(99, 102, 241, 0.4)",
  },
  secondaryLessonText: {
    color: "#8E90B4",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
});
