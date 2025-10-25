/**
 * Landing Page Configuration
 * Update these values to customize the landing page content
 */

export const LANDING_CONFIG = {
  app: {
    name: "InkSight",
    tagline: "Turn Your Journal Into AI-Powered Insights",
    description: "Scan, reflect, and grow through your writing",
    fullDescription:
      "InkSight combines OCR technology with AI-powered insights to transform your journaling experience. Whether handwritten or digital, your entries become a source of personal growth and self-discovery.",
  },

  links: {
    github: "https://github.com/DragunWF/InkSight",
    expoProject: "http://bit.ly/476HNcW",
    expoGoIOS: "https://apps.apple.com/app/expo-go/id982107779",
    expoGoAndroid:
      "https://play.google.com/store/apps/details?id=host.exp.exponent",
  },

  qrCode: {
    // This URL is used to generate the QR code
    // Update this with your actual Expo project URL from `npx expo start`
    expoGoUrl: "http://bit.ly/476HNcW",
  },

  contact: {
    linkedin: "marc-plarisan",
    name: "DragunWF",
    github: "DragunWF",
  },

  features: [
    {
      icon: "📸",
      title: "Scan Physical Journals",
      description:
        "Take photos of handwritten entries and let OCR extract the text automatically. Your physical journal becomes digital.",
    },
    {
      icon: "📝",
      title: "Digital Entry Support",
      description:
        "Type or paste your digital journal entries directly. Perfect for on-the-go reflections and quick thoughts.",
    },
    {
      icon: "🤖",
      title: "AI-Powered Insights",
      description:
        "Gemini AI analyzes your entries and provides personalized insights, patterns, and thoughtful reflections.",
    },
    {
      icon: "💬",
      title: "Reflective Chatbot",
      description:
        "Engage in meaningful conversations about your entries. Ask questions, explore deeper, and gain clarity.",
    },
  ],

  steps: [
    {
      number: 1,
      title: "Capture or Type",
      description:
        "Scan handwritten pages with your camera or type your thoughts directly into the app.",
      icon: "✍️",
    },
    {
      number: 2,
      title: "AI Generates Insights",
      description:
        "Our AI analyzes your entry and provides personalized insights, themes, and reflections.",
      icon: "✨",
    },
    {
      number: 3,
      title: "Reflect & Grow",
      description:
        "Chat with AI about your entries, discover patterns, and deepen your self-understanding.",
      icon: "🌱",
    },
  ],

  techStack: [
    "React Native",
    "Expo",
    "TypeScript",
    "SQLite",
    "Gemini API",
    "OCR API",
  ],

  about: {
    title: "A Personal Project",
    content:
      "InkSight started as a passion project to combine journaling with AI technology. It's designed to help people reflect more deeply on their thoughts and experiences. This app is free to use and built with love for the journaling community.",
    note: "This is a personal project and not available on official app stores. Use Expo Go or download the APK to try it out!",
  },
};

export const COLORS = {
  primary: "#5A4FCF",
  background: "#FFFFFF",
  backgroundAlt: "#F8F9FA",
  text: "#1A1A1A",
  textMuted: "#6B7280",
  accent: "#8B5CF6",
  borderLight: "#E5E7EB",
  success: "#10B981",
  warning: "#F59E0B",
};
