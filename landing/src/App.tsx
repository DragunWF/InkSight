import { useState } from "react";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import GetStarted from "./components/GetStarted";
import About from "./components/About";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import FloatingScrollButton from "./components/FloatingScrollButton";
import AnimatedBackground from "./components/AnimatedBackground";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      )}

      {!isLoading && (
        <div className="app">
          <CustomCursor />
          <AnimatedBackground />
          <FloatingScrollButton />

          <Hero />
          <Features />
          <HowItWorks />
          <GetStarted />
          <About />
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
