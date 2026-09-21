import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
} from "react-native";
import { BlockGrid } from "../components/BlockGrid";
import { soundEngine } from "../utils/soundEngine";
import { getThemeForNumber } from "../theme/colors";
import { Confetti } from "../components/Confetti";
import { TableSelector } from "../components/TableSelector";

interface Question {
  rows: number;
  cols: number;
  answer: number;
  options: number[];
}

export const QuizScreen: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<number>(2);
  const [question, setQuestion] = useState<Question | null>(null);
  const [showHint, setShowHint] = useState<boolean>(true);
  const [stars, setStars] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [feedback, setFeedback] = useState<{ message: string; type: "success" | "error" | null }>({
    message: "",
    type: null,
  });
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  const generateQuestion = useCallback((tableNum: number) => {
    const cols = Math.floor(Math.random() * 10) + 1;
    const answer = tableNum * cols;

    // Generate options including correct answer
    const optsSet = new Set<number>([answer]);
    while (optsSet.size < 4) {
      const offset = (Math.floor(Math.random() * 5) - 2) * tableNum;
      const fake = answer + offset;
      if (fake > 0 && fake !== answer) {
        optsSet.add(fake);
      } else {
        optsSet.add(Math.floor(Math.random() * 100) + 1);
      }
    }

    const options = Array.from(optsSet).sort(() => Math.random() - 0.5);

    setQuestion({
      rows: tableNum,
      cols,
      answer,
      options,
    });
    setFeedback({ message: "", type: null });
  }, []);

  useEffect(() => {
    generateQuestion(selectedTable);
  }, [selectedTable, generateQuestion]);

  const handleSelectOption = (opt: number) => {
    if (!question) return;

    if (opt === question.answer) {
      soundEngine.playSuccess();
      const newStreak = streak + 1;
      const bonusStars = newStreak >= 3 ? 2 : 1;
      setStars((prev) => prev + bonusStars);
      setStreak(newStreak);

      const cheers = [
        "¡SUPER BIEN! ⭐",
        "¡MAGNÍFICO! 🎉",
        "¡ERES UN CRACK DE LAS TABLAS! 🚀",
        "¡RESPUESTA CORRECTA! 🌟",
      ];
      const randomCheer = cheers[Math.floor(Math.random() * cheers.length)];
      setFeedback({ message: randomCheer, type: "success" });
      setShowConfetti(true);

      setTimeout(() => {
        setShowConfetti(false);
        generateQuestion(selectedTable);
      }, 1500);
    } else {
      soundEngine.playError();
      setStreak(0);
      setFeedback({
        message: "¡Casi! Revisa la cuadrícula de bloques abajo para contar 👇",
        type: "error",
      });
      setShowHint(true);
    }
  };

  if (!question) return null;

  const theme = getThemeForNumber(selectedTable);
  const isSquare = question.rows === question.cols;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Banner Header */}
        <View style={styles.headerBanner}>
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Desafío de Tablas 🎯</Text>
            <View style={styles.starsBadge}>
              <Text style={styles.starsBadgeText}>⭐ {stars} Estrellas</Text>
            </View>
          </View>

          {streak > 1 && (
            <View style={styles.streakBadge}>
              <Text style={styles.streakBadgeText}>🔥 ¡Racha de {streak} Aciertos Seguidos!</Text>
            </View>
          )}
        </View>

        {/* Table Selector bar */}
        <TableSelector selectedTable={selectedTable} onSelectTable={setSelectedTable} />

        {/* Question Card */}
        <View style={styles.questionCard}>
          <Text style={styles.questionSubtitle}>¿Cuál es el resultado de...?</Text>
          <View style={styles.questionMainBox}>
            <Text style={[styles.questionEquation, { color: theme.primary }]}>
              {question.rows} × {question.cols} = ?
            </Text>
          </View>

          {isSquare && (
            <View style={styles.squareHintBadge}>
              <Text style={styles.squareHintText}>⭐ ¡Pista! Forma un Cuadrado Perfecto</Text>
            </View>
          )}
        </View>

        {/* Feedback Message */}
        {feedback.type && (
          <View
            style={[
              styles.feedbackBanner,
              { backgroundColor: feedback.type === "success" ? "rgba(16, 185, 129, 0.25)" : "rgba(239, 68, 68, 0.25)", borderColor: feedback.type === "success" ? "#10B981" : "#EF4444" },
            ]}
          >
            <Text
              style={[
                styles.feedbackText,
                { color: feedback.type === "success" ? "#34D399" : "#F87171" },
              ]}
            >
              {feedback.message}
            </Text>
          </View>
        )}

        {/* Options Grid */}
        <View style={styles.optionsGrid}>
          {question.options.map((opt, i) => (
            <Pressable
              key={`opt-${i}`}
              style={[
                styles.optionBtn,
                {
                  borderColor: theme.primary,
                },
              ]}
              onPress={() => handleSelectOption(opt)}
            >
              <Text style={[styles.optionText, { color: "#FFFFFF" }]}>{opt}</Text>
            </Pressable>
          ))}
        </View>

        {/* Hint Toggle Button */}
        <Pressable
          style={styles.hintToggleBtn}
          onPress={() => {
            soundEngine.playPop(0.9);
            setShowHint(!showHint);
          }}
        >
          <Text style={styles.hintToggleText}>
            {showHint ? "👁️ Ocultar Pista Visual de Bloques" : "💡 Mostrar Pista Visual de Bloques"}
          </Text>
        </Pressable>

        {/* Visual Block Hint Grid */}
        {showHint && (
          <View style={styles.hintGridWrapper}>
            <BlockGrid
              rows={question.rows}
              cols={question.cols}
              tableNumber={selectedTable}
              interactiveCount={true}
            />
          </View>
        )}

        <Confetti active={showConfetti} />
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
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: "#10122B",
    borderBottomWidth: 1.5,
    borderBottomColor: "rgba(99, 102, 241, 0.3)",
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    color: "#FFD700",
    fontSize: 22,
    fontWeight: "900",
  },
  starsBadge: {
    backgroundColor: "rgba(99, 102, 241, 0.25)",
    borderWidth: 1.5,
    borderColor: "#6366F1",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  starsBadgeText: {
    color: "#FFD700",
    fontWeight: "900",
    fontSize: 14,
  },
  streakBadge: {
    backgroundColor: "rgba(249, 115, 22, 0.25)",
    borderWidth: 1,
    borderColor: "#F97316",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 6,
    alignSelf: "flex-start",
  },
  streakBadgeText: {
    color: "#F97316",
    fontWeight: "800",
    fontSize: 12,
  },
  questionCard: {
    backgroundColor: "#121433",
    width: "90%",
    borderRadius: 20,
    padding: 16,
    alignItems: "center",
    marginVertical: 10,
    borderWidth: 1.5,
    borderColor: "rgba(99, 102, 241, 0.35)",
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  questionSubtitle: {
    fontSize: 14,
    color: "#8E90B4",
    fontWeight: "700",
  },
  questionMainBox: {
    marginVertical: 8,
  },
  questionEquation: {
    fontSize: 34,
    fontWeight: "900",
  },
  squareHintBadge: {
    backgroundColor: "rgba(255, 215, 0, 0.2)",
    borderColor: "#FFD700",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  squareHintText: {
    color: "#FFD700",
    fontWeight: "800",
    fontSize: 12,
  },
  feedbackBanner: {
    width: "90%",
    padding: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    marginBottom: 10,
    alignItems: "center",
  },
  feedbackText: {
    fontSize: 14,
    fontWeight: "900",
    textAlign: "center",
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "90%",
    gap: 12,
    justifyContent: "space-between",
    marginVertical: 10,
  },
  optionBtn: {
    width: "47%",
    paddingVertical: 18,
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: "#16183B",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  optionText: {
    fontSize: 26,
    fontWeight: "900",
  },
  hintToggleBtn: {
    backgroundColor: "#121433",
    borderWidth: 1.5,
    borderColor: "#06B6D4",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginVertical: 10,
  },
  hintToggleText: {
    color: "#06B6D4",
    fontWeight: "900",
    fontSize: 13,
  },
  hintGridWrapper: {
    width: "100%",
    alignItems: "center",
  },
});
