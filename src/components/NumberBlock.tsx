import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Animated } from "react-native";
import { getThemeForNumber } from "../theme/colors";
import { soundEngine } from "../utils/soundEngine";

interface NumberBlockProps {
  number: number; // Theme number (e.g., table number)
  size?: number;
  countIndex?: number; // 0-indexed position in grid (0, 1, 2... total-1)
  isCounted?: boolean;
  onPress?: () => void;
  showFace?: boolean;
  showNumberBadge?: boolean;
  highlightSquare?: boolean;
}

export const NumberBlock: React.FC<NumberBlockProps> = ({
  number,
  size = 44,
  countIndex,
  isCounted = false,
  onPress,
  showFace = true,
  highlightSquare = false,
}) => {
  const theme = getThemeForNumber(number);
  const [scale] = useState(new Animated.Value(1));

  const displayNum = countIndex !== undefined ? countIndex + 1 : number;
  const isThreeDigits = displayNum >= 100;
  const isTwoDigits = displayNum >= 10 && displayNum < 100;

  const handlePress = () => {
    soundEngine.playCountTone(displayNum);

    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.82,
        duration: 70,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1.0,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    if (onPress) {
      onPress();
    }
  };

  const eyeSize = Math.max(5, Math.floor(size * 0.17));
  const pupilSize = Math.max(2, Math.floor(eyeSize * 0.45));

  const badgeSizeWidth = isThreeDigits
    ? Math.max(20, Math.floor(size * 0.74))
    : Math.max(16, Math.floor(size * 0.62));

  const badgeSizeHeight = Math.max(16, Math.floor(size * 0.62));

  const fontSize = isThreeDigits
    ? Math.max(8, Math.floor(size * 0.26))
    : isTwoDigits
    ? Math.max(9, Math.floor(size * 0.32))
    : Math.max(11, Math.floor(size * 0.42));

  return (
    <Pressable onPress={handlePress}>
      <Animated.View
        style={[
          styles.container,
          {
            width: size,
            height: size,
            backgroundColor: isCounted ? "#FFD700" : theme.primary,
            borderColor: isCounted
              ? "#FFE082"
              : highlightSquare
              ? theme.glowColor || "#38BDF8"
              : "rgba(255, 255, 255, 0.25)",
            transform: [{ scale }],
          },
          (isCounted || highlightSquare) && {
            shadowColor: isCounted ? "#FFD700" : theme.glowColor || "#38BDF8",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.9,
            shadowRadius: 8,
            elevation: 8,
          },
        ]}
      >
        {/* Top Glossy Curved Shine Highlight */}
        <View style={[styles.shine, { width: size * 0.76, height: size * 0.2 }]} />

        {/* Small Cute Face at the Top */}
        {showFace && size >= 28 && (
          <View style={styles.faceContainer}>
            <View style={styles.eyesRow}>
              {theme.eyesCount === 1 ? (
                <View style={[styles.eye, { width: eyeSize * 1.2, height: eyeSize * 1.2, borderRadius: eyeSize * 0.6 }]}>
                  <View style={[styles.pupil, { width: pupilSize * 1.1, height: pupilSize * 1.1, borderRadius: pupilSize * 0.55 }]} />
                </View>
              ) : (
                <>
                  <View style={[styles.eye, { width: eyeSize, height: eyeSize, borderRadius: eyeSize / 2 }]}>
                    <View style={[styles.pupil, { width: pupilSize, height: pupilSize, borderRadius: pupilSize / 2 }]} />
                  </View>
                  <View style={[styles.eye, { width: eyeSize, height: eyeSize, borderRadius: eyeSize / 2 }]}>
                    <View style={[styles.pupil, { width: pupilSize, height: pupilSize, borderRadius: pupilSize / 2 }]} />
                  </View>
                </>
              )}
            </View>
          </View>
        )}

        {/* Central Number Circle Badge - ALWAYS GUARANTEED TO BE VISIBLE */}
        <View
          style={[
            styles.numberBadge,
            {
              width: badgeSizeWidth,
              height: badgeSizeHeight,
              borderRadius: badgeSizeHeight / 2,
              backgroundColor: isCounted ? "#EF4444" : "#FFFFFF",
              borderColor: isCounted ? "#FFFFFF" : "rgba(0, 0, 0, 0.15)",
            },
          ]}
        >
          <Text
            style={[
              styles.numberText,
              {
                fontSize,
                color: isCounted ? "#FFFFFF" : "#0F172A",
              },
            ]}
          >
            {displayNum}
          </Text>
        </View>

        {/* Star / Sparkle overlay when counted or square */}
        {isCounted && (
          <View style={styles.starOverlay}>
            <Text style={{ fontSize: Math.max(7, Math.floor(size * 0.22)) }}>⭐</Text>
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    margin: 1.5,
    borderWidth: 1.5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },
  shine: {
    position: "absolute",
    top: 2,
    backgroundColor: "rgba(255, 255, 255, 0.35)",
    borderRadius: 4,
  },
  faceContainer: {
    position: "absolute",
    top: 3,
    alignItems: "center",
  },
  eyesRow: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
  eye: {
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#0F172A",
  },
  pupil: {
    backgroundColor: "#0F172A",
  },
  numberBadge: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
    marginTop: 2,
  },
  numberText: {
    fontWeight: "900",
    textAlign: "center",
    paddingHorizontal: 1,
  },
  starOverlay: {
    position: "absolute",
    top: 1,
    right: 2,
  },
});
