import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { getThemeForNumber } from "../theme/colors";
import { soundEngine } from "../utils/soundEngine";

interface TableSelectorProps {
  selectedTable: number;
  onSelectTable: (num: number) => void;
  masteredTables?: number[]; // Array of table numbers that have 3 stars
}

export const TableSelector: React.FC<TableSelectorProps> = ({
  selectedTable,
  onSelectTable,
  masteredTables = [],
}) => {
  const row1 = [1, 2, 3, 4, 5, 6];
  const row2 = [7, 8, 9, 10, 11, 12];

  const renderChip = (num: number) => {
    const theme = getThemeForNumber(num);
    const isSelected = selectedTable === num;
    const isMastered = masteredTables.includes(num);

    return (
      <Pressable
        key={`tab-${num}`}
        style={[
          styles.tableChip,
          isSelected && styles.tableChipSelected,
          isSelected && { borderColor: theme.glowColor || "#3B82F6" },
        ]}
        onPress={() => {
          soundEngine.playPop(0.8 + num * 0.1);
          onSelectTable(num);
        }}
      >
        <Text
          style={[
            styles.chipNumber,
            isSelected ? styles.chipNumberSelected : { color: "#C7C9ED" },
          ]}
        >
          {num}
        </Text>
        {isSelected && (
          <View style={styles.selectedStarBadge}>
            <Text style={{ fontSize: 9 }}>⭐</Text>
          </View>
        )}
        {isMastered && !isSelected && <Text style={styles.crownBadge}>👑</Text>}
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.gridRow}>{row1.map(renderChip)}</View>
      <View style={styles.gridRow}>{row2.map(renderChip)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
    width: "100%",
    paddingHorizontal: 16,
    gap: 8,
  },
  gridRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tableChip: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#16183B",
    borderWidth: 1.5,
    borderColor: "rgba(99, 102, 241, 0.3)",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  tableChipSelected: {
    backgroundColor: "#1D2054",
    borderWidth: 2.5,
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    elevation: 6,
    transform: [{ scale: 1.1 }],
  },
  chipNumber: {
    fontSize: 17,
    fontWeight: "900",
  },
  chipNumberSelected: {
    color: "#FFFFFF",
    textShadowColor: "#3B82F6",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  selectedStarBadge: {
    position: "absolute",
    top: -3,
    right: -2,
    backgroundColor: "#10122B",
    borderRadius: 8,
    padding: 1,
  },
  crownBadge: {
    position: "absolute",
    top: -4,
    right: -3,
    fontSize: 10,
  },
});
