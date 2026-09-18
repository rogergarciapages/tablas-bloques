import React, { useEffect, useState } from "react";
import { View, StyleSheet, Animated, useWindowDimensions } from "react-native";

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  size: number;
  animY: Animated.Value;
  animRot: Animated.Value;
}

const COLORS = ["#FF3B30", "#FF9500", "#FFCC00", "#34C759", "#30B0C7", "#AF52DE", "#E040FB"];

export const Confetti: React.FC<{ active: boolean }> = ({ active }) => {
  const { width, height } = useWindowDimensions();
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (!active) {
      setPieces([]);
      return;
    }

    const newPieces: ConfettiPiece[] = Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      x: Math.random() * width,
      color: COLORS[i % COLORS.length],
      size: Math.random() * 10 + 8,
      animY: new Animated.Value(-20),
      animRot: new Animated.Value(0),
    }));

    setPieces(newPieces);

    newPieces.forEach((p) => {
      const duration = 1800 + Math.random() * 1200;
      Animated.parallel([
        Animated.timing(p.animY, {
          toValue: height + 50,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(p.animRot, {
          toValue: 360,
          duration,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, [active, width, height]);

  if (!active || pieces.length === 0) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {pieces.map((p) => {
        const spin = p.animRot.interpolate({
          inputRange: [0, 360],
          outputRange: ["0deg", "360deg"],
        });

        return (
          <Animated.View
            key={`confetti-${p.id}`}
            style={[
              styles.piece,
              {
                left: p.x,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                transform: [{ translateY: p.animY }, { rotate: spin }],
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  piece: {
    position: "absolute",
    top: 0,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
});
