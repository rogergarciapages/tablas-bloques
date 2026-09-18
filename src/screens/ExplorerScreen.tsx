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
  const [selectedTable, setSelectedTable] = useState<number>(2); // Default to table of 2
  const [activeModalMultiplier, setActiveModalMultiplier] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  const theme = getThemeForNumber(selectedTable);

  const handleOpenDetail = (mult: number) => {
    soundEngine.playPop(1.2);
    setActiveModalMultiplier(mult);
  };

  const handleCloseDetail = () => {
    setActiveModalMultiplier(null);
  };

  const handleCompleteCount = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Banner Header */}
        <View style={[styles.headerBanner, { backgroundColor: theme.primary }]}>
          <Text style={styles.headerTitle}>Explorador Visual de Tablas 🌟</Text>
          <Text style={styles.headerSubtitle}>
            {theme.name}: "{theme.motto}"
          </Text>
        </View>

        {/* Table Selector bar */}
        <TableSelector selectedTable={selectedTable} onSelectTable={setSelectedTable} />

        {/* Multiplications Cards List */}
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionHeader}>
            Multiplicaciones de la Tabla del {selectedTable}:
          </Text>

          <View style={styles.cardsGrid}>
            {Array.from({ length: 10 }).map((_, idx) => {
              const multiplier = idx + 1;
              const result = selectedTable * multiplier;
              const isSquare = selectedTable === multiplier;

              return (
                <Pressable
                  key={`mult-card-${multiplier}`}
                  style={[
                    styles.multCard,
                    {
                      backgroundColor: isSquare ? "#FFF9C4" : "#FFFFFF",
                      borderColor: isSquare ? "#FFD700" : theme.primary,
                      borderWidth: isSquare ? 3 : 2,
                    },
                  ]}
                  onPress={() => handleOpenDetail(multiplier)}
                >
                  <View style={styles.cardHeader}>
                    <Text style={[styles.cardEquation, { color: theme.darkAccent }]}>
                      {selectedTable} × {multiplier}
                    </Text>
                    <View style={[styles.cardResultBadge, { backgroundColor: theme.primary }]}>
                      <Text style={styles.cardResultText}>{result}</Text>
                    </View>
                  </View>

                  <Text style={styles.cardDetailSubtext}>
                    {selectedTable} filas de {multiplier} bloques
                  </Text>

                  {/* Mini Visual Preview */}
                  <View style={styles.miniPreviewRow}>
                    {Array.from({ length: Math.min(selectedTable, 4) }).map((_, r) => (
                      <View key={`mini-r-${r}`} style={styles.miniRow}>
                        {Array.from({ length: Math.min(multiplier, 5) }).map((_, c) => (
                          <View
                            key={`mini-c-${c}`}
                            style={[styles.miniDot, { backgroundColor: theme.primary }]}
                          />
                        ))}
                      </View>
                    ))}
                    {(selectedTable > 4 || multiplier > 5) && (
                      <Text style={styles.miniMoreText}>+ bloques</Text>
                    )}
                  </View>

                  {isSquare && (
                    <View style={styles.squareTag}>
                      <Text style={styles.squareTagText}>⭐ ¡Cuadrado! ({selectedTable}×{multiplier})</Text>
                    </View>
                  )}

                  <Text style={styles.tapToExploreText}>👉 Toca para contar</Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>

        {/* Modal Inspector for Full Screen Interactive Grid */}
        {activeModalMultiplier !== null && (
          <Modal animationType="slide" transparent={false} visible={true} onRequestClose={handleCloseDetail}>
            <SafeAreaView style={[styles.modalSafeArea, { backgroundColor: theme.lightAccent }]}>
              <View style={styles.modalHeader}>
                <Pressable style={styles.closeBtn} onPress={handleCloseDetail}>
                  <Text style={styles.closeBtnText}>← Volver</Text>
                </Pressable>

                <Text style={[styles.modalTitle, { color: theme.darkAccent }]}>
                  {selectedTable} × {activeModalMultiplier}
                </Text>
              </View>

              <View style={styles.modalContentWrapper}>
                <BlockGrid
                  rows={selectedTable}
                  cols={activeModalMultiplier}
                  tableNumber={selectedTable}
                  interactiveCount={true}
                  onCompleteCount={handleCompleteCount}
                />
              </View>

              <Confetti active={showConfetti} />
            </SafeAreaView>
          </Modal>
        )}
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
  },
  headerBanner: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
  },
  headerSubtitle: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "800",
    color: "#333333",
    marginHorizontal: 16,
    marginVertical: 8,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  cardsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    justifyContent: "space-between",
  },
  multCard: {
    width: "48%",
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardEquation: {
    fontSize: 17,
    fontWeight: "900",
  },
  cardResultBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  cardResultText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
  },
  cardDetailSubtext: {
    fontSize: 11,
    color: "#666666",
    fontWeight: "600",
    marginTop: 3,
  },
  miniPreviewRow: {
    marginVertical: 6,
    alignItems: "flex-start",
    gap: 2,
  },
  miniRow: {
    flexDirection: "row",
    gap: 2,
  },
  miniDot: {
    width: 7,
    height: 7,
    borderRadius: 2,
  },
  miniMoreText: {
    fontSize: 9,
    color: "#888888",
    fontStyle: "italic",
    marginTop: 1,
  },
  squareTag: {
    backgroundColor: "#FFD700",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginBottom: 4,
  },
  squareTagText: {
    fontSize: 10,
    fontWeight: "900",
    color: "#5C4000",
  },
  tapToExploreText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2196F3",
    marginTop: 2,
  },
  modalSafeArea: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  closeBtn: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  closeBtnText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#333333",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "900",
    marginLeft: 14,
  },
  modalContentWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});
