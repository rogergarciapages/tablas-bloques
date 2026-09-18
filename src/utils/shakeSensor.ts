import { Platform } from "react-native";

type ShakeCallback = () => void;

class MotionShakeManager {
  private listener: ShakeCallback | null = null;
  private lastShakeTime: number = 0;
  private nativeSubscription: any = null;

  public subscribe(onShake: ShakeCallback): () => void {
    this.listener = onShake;
    this.lastShakeTime = Date.now();

    // 1. Web Browser Motion Handling (HTML5 devicemotion)
    if ((Platform.OS as string) === "web") {
      if (typeof window !== "undefined" && "addEventListener" in window) {
        const handleDeviceMotion = (event: DeviceMotionEvent) => {
          const acc = event.accelerationIncludingGravity;
          if (acc) {
            const x = acc.x || 0;
            const y = acc.y || 0;
            const z = acc.z || 0;
            const totalAcc = Math.sqrt(x * x + y * y + z * z);
            const now = Date.now();

            if (totalAcc > 16 && now - this.lastShakeTime > 1200) {
              this.lastShakeTime = now;
              if (this.listener) this.listener();
            }
          }
        };

        try {
          window.addEventListener("devicemotion", handleDeviceMotion, true);
        } catch (e) {}

        return () => {
          try {
            window.removeEventListener("devicemotion", handleDeviceMotion, true);
          } catch (e) {}
        };
      }
      return () => {};
    }

    // 2. Native Mobile Motion Handling (Expo Sensors for iOS / Android)
    if ((Platform.OS as string) !== "web") {
      try {
        // Dynamically load expo-sensors on native only
        const { Accelerometer } = require("expo-sensors");
        if (Accelerometer && typeof Accelerometer.addListener === "function") {
          this.nativeSubscription = Accelerometer.addListener((data: { x: number; y: number; z: number }) => {
            const { x, y, z } = data;
            const totalAcc = Math.sqrt(x * x + y * y + z * z);
            const now = Date.now();

            if (totalAcc > 2.2 && now - this.lastShakeTime > 1200) {
              this.lastShakeTime = now;
              if (this.listener) this.listener();
            }
          });
          Accelerometer.setUpdateInterval && Accelerometer.setUpdateInterval(150);
        }
      } catch (e) {}

      return () => {
        if (this.nativeSubscription && typeof this.nativeSubscription.remove === "function") {
          this.nativeSubscription.remove();
        }
      };
    }

    return () => {};
  }
}

export const shakeManager = new MotionShakeManager();
