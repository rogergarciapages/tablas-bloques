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
  const tables = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Elige una Tabla para Explorar 🎨</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {tables.map((num) => {
          const theme = getThemeForNumber(num);
          const isSelected = selectedTable === num;
          const isMastered = masteredTables.includes(num);

          return (
            <Pressable
              key={`tab-${num}`}
              style={[
                styles.tableChip,
                {
                  backgroundColor: isSelected ? theme.primary : theme.lightAccent,
                  borderColor: theme.darkAccent,
                  borderWidth: isSelected ? 3 : 1.5,
                  transform: [{ scale: isSelected ? 1.06 : 1.0 }],
                },
              ]}
              onPress={() => {
                soundEngine.playPop(0.8 + num * 0.1);
                onSelectTable(num);
              }}
            >
              <Text
                style={[
                  styles.chipNumber,
                  { color: isSelected ? "#FFFFFF" : theme.darkAccent },
                ]}
              >
                Tabla {num}
              </Text>
              {isMastered && <Text style={styles.crownBadge}>👑</Text>}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: "100%",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#333333",
    marginLeft: 16,
    marginBottom: 8,
  },
  scrollContent: {
    paddingHorizontal: 12,
    gap: 8,
    alignItems: "center",
  },
  tableChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  chipNumber: {
    fontSize: 15,
    fontWeight: "900",
  },
  crownBadge: {
    fontSize: 14,
  },
});
