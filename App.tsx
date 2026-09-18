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
import { QuizScreen } from "./src/screens/QuizScreen";
import { RewardsScreen } from "./src/screens/RewardsScreen";
import { soundEngine } from "./src/utils/soundEngine";

type TabName = "explorer" | "builder" | "quiz" | "rewards";

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
      <StatusBar barStyle="dark-content" />

      {/* Main Screen Content */}
      <View style={styles.screenContainer}>{renderActiveScreen()}</View>

      {/* Bottom Navigation Tab Bar */}
      <View style={styles.tabBar}>
        <Pressable
          style={[styles.tabItem, activeTab === "explorer" && styles.tabItemActive]}
          onPress={() => handleTabChange("explorer")}
        >
          <Text style={styles.tabIcon}>🎨</Text>
          <Text
            style={[styles.tabLabel, activeTab === "explorer" && styles.tabLabelActive]}
          >
            Tablas
          </Text>
        </Pressable>

        <Pressable
          style={[styles.tabItem, activeTab === "builder" && styles.tabItemActive]}
          onPress={() => handleTabChange("builder")}
        >
          <Text style={styles.tabIcon}>🛠️</Text>
          <Text
            style={[styles.tabLabel, activeTab === "builder" && styles.tabLabelActive]}
          >
            Constructor
          </Text>
        </Pressable>

        <Pressable
          style={[styles.tabItem, activeTab === "quiz" && styles.tabItemActive]}
          onPress={() => handleTabChange("quiz")}
        >
          <Text style={styles.tabIcon}>🎯</Text>
          <Text
            style={[styles.tabLabel, activeTab === "quiz" && styles.tabLabelActive]}
          >
            Desafío
          </Text>
        </Pressable>

        <Pressable
          style={[styles.tabItem, activeTab === "rewards" && styles.tabItemActive]}
          onPress={() => handleTabChange("rewards")}
        >
          <Text style={styles.tabIcon}>🏆</Text>
          <Text
            style={[styles.tabLabel, activeTab === "rewards" && styles.tabLabelActive]}
          >
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
    backgroundColor: "#F5F7FA",
  },
  screenContainer: {
    flex: 1,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 8,
    justifyContent: "space-around",
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
  },
  tabItemActive: {
    backgroundColor: "#FFE082",
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#666666",
  },
  tabLabelActive: {
    color: "#333333",
    fontWeight: "900",
  },
});
