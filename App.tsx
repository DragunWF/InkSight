import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import NavigationWrapper from "./components/navigation/NavigationWrapper";
import { initDatabase } from "./helpers/storage/coreStorage";

export default function App() {
  // Initialize database on app start
  useEffect(() => {
    initDatabase().catch((error) => {
      console.error("Failed to initialize database:", error);
    });
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <NavigationWrapper />
      <Toast />
    </>
  );
}
