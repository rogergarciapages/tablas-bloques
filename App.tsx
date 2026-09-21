import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { ExplorerScreen } from "./src/screens/ExplorerScreen";
import { BuilderScreen } from "./src/screens/BuilderScreen";
import { MixScreen } from "./src/screens/MixScreen";
import { QuizScreen } from "./src/screens/QuizScreen";
import { RewardsScreen } from "./src/screens/RewardsScreen";
import { BannerAd } from "./src/components/BannerAd";
import { soundEngine } from "./src/utils/soundEngine";

type TabName = "explorer" | "builder" | "mix" | "quiz" | "rewards";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabName>("explorer");

  const handleTabChange = (tab: TabName) => {
    soundEngine.playPop(1.1);
    setActiveTab(tab);
  };

  const renderActiveScreen = () => {
    switch (activeTab) {
      case "explorer":
        return <ExplorerScreen />;
      case "builder":
        return <BuilderScreen />;
      case "mix":
        return <MixScreen />;
      case "quiz":
        return <QuizScreen />;
      case "rewards":
        return <RewardsScreen />;
      default:
        return <ExplorerScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#090A1C" />

      {/* Main Screen Content */}
      <View style={styles.screenContainer}>{renderActiveScreen()}</View>

      {/* Always-Present Non-Invasive Bottom Banner Ad */}
      <BannerAd />

      {/* Bottom Navigation Tab Bar */}
      <View style={styles.tabBar}>
        <Pressable
          style={[styles.tabItem, activeTab === "explorer" && styles.tabItemActive]}
          onPress={() => handleTabChange("explorer")}
        >
          <Text style={styles.tabIcon}>🎨</Text>
          <Text style={[styles.tabLabel, activeTab === "explorer" && styles.tabLabelActive]}>
            Tablas
          </Text>
        </Pressable>

        <Pressable
          style={[styles.tabItem, activeTab === "builder" && styles.tabItemActive]}
          onPress={() => handleTabChange("builder")}
        >
          <Text style={styles.tabIcon}>🛠️</Text>
          <Text style={[styles.tabLabel, activeTab === "builder" && styles.tabLabelActive]}>
            Constructor
          </Text>
        </Pressable>

        <Pressable
          style={[styles.tabItem, activeTab === "mix" && styles.tabItemActive]}
          onPress={() => handleTabChange("mix")}
        >
          <Text style={styles.tabIcon}>🍹</Text>
          <Text style={[styles.tabLabel, activeTab === "mix" && styles.tabLabelActive]}>
            Cóctel
          </Text>
        </Pressable>

        <Pressable
          style={[styles.tabItem, activeTab === "quiz" && styles.tabItemActive]}
          onPress={() => handleTabChange("quiz")}
        >
          <Text style={styles.tabIcon}>🎯</Text>
          <Text style={[styles.tabLabel, activeTab === "quiz" && styles.tabLabelActive]}>
            Desafío
          </Text>
        </Pressable>

        <Pressable
          style={[styles.tabItem, activeTab === "rewards" && styles.tabItemActive]}
          onPress={() => handleTabChange("rewards")}
        >
          <Text style={styles.tabIcon}>🏆</Text>
          <Text style={[styles.tabLabel, activeTab === "rewards" && styles.tabLabelActive]}>
            Logros
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#090A1C",
  },
  screenContainer: {
    flex: 1,
    backgroundColor: "#090A1C",
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#10122B",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderTopWidth: 1.5,
    borderTopColor: "rgba(99, 102, 241, 0.4)",
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 12,
    justifyContent: "space-around",
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  tabItemActive: {
    backgroundColor: "rgba(99, 102, 241, 0.25)",
    borderWidth: 1,
    borderColor: "#6366F1",
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
  },
  tabIcon: {
    fontSize: 19,
    marginBottom: 2,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#8E90B4",
  },
  tabLabelActive: {
    color: "#FFD700",
    fontWeight: "900",
  },
});
