import "dotenv/config";

export default {
  expo: {
    name: "spotsy",
    slug: "spotsy",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/images/spotsy-logo.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      apiKey: process.env.apiKey,
      authDomain: process.env.authDomain,
      projectId: process.env.projectId,
      storageBucket: process.env.storageBucket,
      messagingSenderId: process.env.messagingSenderId,
      appId: process.env.appId,
      measurementId: process.env.measurementId,
      GOOGLE_PLACES_API_KEY: process.env.GOOGLE_PLACES_API_KEY,
      spotsyCredentials: process.env.spotsyCredentials,
      STRIPE_PUBLISHABLE_TEST_KEY: process.env.STRIPE_PUBLISHABLE_TEST_KEY,
      STRIPE_SECRET_TEST_KEY: process.env.STRIPE_SECRET_TEST_KEY,
      STRIPE_CREATE_PAYMENT_SHEET_FIREBASE_CLOUD_FUNCTION_URL:
        process.env.STRIPE_CREATE_PAYMENT_SHEET_FIREBASE_CLOUD_FUNCTION_URL,
    },
  },
};
