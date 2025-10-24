import { ReactNode } from "react";
import { StyleSheet, View, Text } from "react-native";

interface TitleProps {
  children: ReactNode;
}

function Title({ children }: TitleProps) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
});

export default Title;
