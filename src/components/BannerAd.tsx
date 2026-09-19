import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

// Google AdMob Standard Test Banner Unit IDs for Android & iOS
export const ADMOB_BANNER_TEST_ID =
  Platform.OS === "ios"
    ? "ca-app-pub-3940256099942544/2934735716"
    : "ca-app-pub-3940256099942544/6300978111";

interface BannerAdProps {
  adUnitId?: string;
}

export const BannerAd: React.FC<BannerAdProps> = ({ adUnitId }) => {
  const bannerId = adUnitId || ADMOB_BANNER_TEST_ID;

  // On native Android/iOS mobile build, dynamically load Google Mobile Ads if available
  let GoogleBannerComponent: any = null;
  if (Platform.OS !== "web") {
    try {
      const GoogleMobileAds = require("react-native-google-mobile-ads");
      GoogleBannerComponent = GoogleMobileAds.BannerAd;
    } catch (e) {}
  }

  if (GoogleBannerComponent) {
    return (
      <View style={styles.nativeAdContainer}>
        <GoogleBannerComponent
          unitId={bannerId}
          size={"ANCHORED_ADAPTIVE_BANNER"}
          requestOptions={{ requestNonPersonalizedAdsOnly: true }}
        />
      </View>
    );
  }

  // Web Browser / Fallback Google AdMob Banner Display
  return (
    <View style={styles.container}>
      <View style={styles.adWrapper}>
        <View style={styles.adBadge}>
          <Text style={styles.adBadgeText}>ANUNCIO DE GOOGLE</Text>
        </View>

        <Text style={styles.adTitle} numberOfLines={1}>
          🎁 ¡App 100% GRATIS para Aprender Jugando!
        </Text>

        <View style={styles.freeTag}>
          <Text style={styles.freeTagText}>100% GRATIS</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  nativeAdContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    width: "100%",
  },
  adWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F8FAFC",
    width: "98%",
    maxWidth: 500,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  adBadge: {
    backgroundColor: "#64748B",
    paddingHorizontal: 5,
    paddingVertical: 1.5,
    borderRadius: 4,
  },
  adBadgeText: {
    color: "#FFFFFF",
    fontSize: 8.5,
    fontWeight: "800",
  },
  adTitle: {
    flex: 1,
    fontSize: 11,
    fontWeight: "700",
    color: "#334155",
    marginHorizontal: 8,
    textAlign: "center",
  },
  freeTag: {
    backgroundColor: "#22C55E",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  freeTagText: {
    color: "#FFFFFF",
    fontSize: 9.5,
    fontWeight: "900",
  },
});
