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

  // The sequential number displayed on this block (1, 2, 3... total)
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

  // Responsive sizing calculations
  const eyeSize = Math.max(5, Math.floor(size * 0.16));
  const pupilSize = Math.max(2, Math.floor(eyeSize * 0.45));

  const badgeSizeWidth = isThreeDigits
    ? Math.max(20, Math.floor(size * 0.74))
    : Math.max(16, Math.floor(size * 0.58));

  const badgeSizeHeight = Math.max(16, Math.floor(size * 0.58));

  const fontSize = isThreeDigits
    ? Math.max(8, Math.floor(size * 0.26))
    : isTwoDigits
    ? Math.max(9, Math.floor(size * 0.31))
    : Math.max(10, Math.floor(size * 0.36));

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
              ? "#FF9500"
              : highlightSquare
              ? "#FFD700"
              : theme.darkAccent,
            borderWidth: isCounted || highlightSquare ? 2 : 1,
            transform: [{ scale }],
          },
        ]}
      >
        {/* Top Shine Highlight */}
        <View style={[styles.shine, { width: size * 0.7, height: size * 0.16 }]} />

        {/* Small Cute Face at the Top if block size is sufficient */}
        {showFace && size >= 30 && (
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
              backgroundColor: isCounted ? "#FF3B30" : "#FFFFFF",
              borderColor: isCounted ? "#FFFFFF" : theme.darkAccent,
            },
          ]}
        >
          <Text
            style={[
              styles.numberText,
              {
                fontSize,
                color: isCounted ? "#FFFFFF" : "#1A1A1A",
              },
            ]}
          >
            {displayNum}
          </Text>
        </View>

        {/* Star glow when counted */}
        {isCounted && (
          <View style={styles.starOverlay}>
            <Text style={{ fontSize: Math.max(7, Math.floor(size * 0.2)) }}>⭐</Text>
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    margin: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 1.5,
    elevation: 2,
  },
  shine: {
    position: "absolute",
    top: 1.5,
    backgroundColor: "rgba(255, 255, 255, 0.45)",
    borderRadius: 3,
  },
  faceContainer: {
    position: "absolute",
    top: 2,
    alignItems: "center",
  },
  eyesRow: {
    flexDirection: "row",
    gap: 1.5,
    alignItems: "center",
  },
  eye: {
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.8,
    borderColor: "#222222",
  },
  pupil: {
    backgroundColor: "#111111",
  },
  numberBadge: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 1,
    elevation: 1,
  },
  numberText: {
    fontWeight: "900",
    textAlign: "center",
    paddingHorizontal: 1,
  },
  starOverlay: {
    position: "absolute",
    top: 0.5,
    right: 1,
  },
});
