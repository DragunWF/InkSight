import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import GetStarted from "./components/GetStarted";
import About from "./components/About";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Hero />
      <Features />
      <HowItWorks />
      <GetStarted />
      <About />
      <Footer />
    </div>
  );
}

export default App;
