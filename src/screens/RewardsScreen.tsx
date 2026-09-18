import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
} from "react-native";
import { NUMBER_BLOCK_THEMES } from "../theme/colors";
import { NumberBlock } from "../components/NumberBlock";
import { soundEngine } from "../utils/soundEngine";

export const RewardsScreen: React.FC = () => {
  const characters = Object.values(NUMBER_BLOCK_THEMES);

  const handlePressCharacter = (num: number) => {
    soundEngine.playSquareMagic();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header Banner */}
        <View style={styles.headerBanner}>
          <Text style={styles.headerTitle}>Álbum de Personajes y Logros 🏆</Text>
          <Text style={styles.headerSubtitle}>
            ¡Conoce a todos los personajes Bloque y sus poderes de multiplicación!
          </Text>
        </View>

        {/* Characters Grid */}
        <View style={styles.charactersGrid}>
          {characters.map((char) => (
            <Pressable
              key={`rewards-char-${char.number}`}
              style={[
                styles.charCard,
                { backgroundColor: char.lightAccent, borderColor: char.primary },
              ]}
              onPress={() => handlePressCharacter(char.number)}
            >
              {/* Character Avatar Icon */}
              <View style={styles.avatarContainer}>
                <NumberBlock
                  number={char.number}
                  size={58}
                  showFace={true}
                  showNumberBadge={true}
                />
              </View>

              {/* Character Specs */}
              <View style={styles.charInfo}>
                <View style={styles.charHeaderRow}>
                  <Text style={[styles.charName, { color: char.darkAccent }]}>
                    {char.name} ({char.number})
                  </Text>
                  {char.isSquare && (
                    <View style={styles.squareTag}>
                      <Text style={styles.squareTagText}>⏹️ Cuadrado</Text>
                    </View>
                  )}
                </View>

                <Text style={styles.charMotto}>"{char.motto}"</Text>

                {/* Stars earned for this table */}
                <View style={styles.starsRow}>
                  <Text style={styles.starsText}>⭐ ⭐ ⭐ Tabla Máster</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  container: {
    paddingBottom: 40,
    alignItems: "center",
  },
  headerBanner: {
    backgroundColor: "#AF52DE",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 12,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
  },
  headerSubtitle: {
    color: "rgba(255, 255, 255, 0.95)",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 2,
  },
  charactersGrid: {
    width: "92%",
    gap: 12,
  },
  charCard: {
    borderRadius: 20,
    padding: 14,
    borderWidth: 2.5,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  charInfo: {
    flex: 1,
  },
  charHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  charName: {
    fontSize: 18,
    fontWeight: "900",
  },
  squareTag: {
    backgroundColor: "#FFD700",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  squareTagText: {
    fontSize: 10,
    fontWeight: "900",
    color: "#5C4000",
  },
  charMotto: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#444444",
    marginTop: 4,
  },
  starsRow: {
    marginTop: 6,
  },
  starsText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FF9500",
  },
});
