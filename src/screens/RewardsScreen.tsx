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
                { borderColor: char.primary, shadowColor: char.primary },
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
                  <Text style={[styles.charName, { color: char.primary }]}>
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
    backgroundColor: "#090A1C",
  },
  container: {
    paddingBottom: 40,
    alignItems: "center",
    backgroundColor: "#090A1C",
  },
  headerBanner: {
    backgroundColor: "#10122B",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1.5,
    borderBottomColor: "rgba(99, 102, 241, 0.3)",
    marginBottom: 12,
  },
  headerTitle: {
    color: "#FFD700",
    fontSize: 22,
    fontWeight: "900",
  },
  headerSubtitle: {
    color: "#8E90B4",
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
    borderWidth: 2,
    backgroundColor: "#121433",
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
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
    backgroundColor: "rgba(255, 215, 0, 0.2)",
    borderColor: "#FFD700",
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  squareTagText: {
    fontSize: 10,
    fontWeight: "900",
    color: "#FFD700",
  },
  charMotto: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#8E90B4",
    marginTop: 4,
  },
  starsRow: {
    marginTop: 6,
  },
  starsText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FFD700",
  },
});
