import { Button, StyleSheet, View, Alert } from "react-native";
import React from "react";

const AppAlert = () => {
  const createTwoButtonAlert = () =>
    Alert.alert("Invalid input", "Input must be a at least one word long", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  return (
    <View style={styles.container}>
      <Button title={"2-Button Alert"} onPress={createTwoButtonAlert} />
    </View>
  );
};

export default AppAlert;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
});
