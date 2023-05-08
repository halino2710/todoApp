import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import TodoApp from "./Components/TodoApp/TodoApp";
import AppAlert from "./Components/Alert";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <TodoApp />
      {/* <AppAlert /> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
