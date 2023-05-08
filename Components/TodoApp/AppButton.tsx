import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const AppButton = ({ handlePress }: any) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => handlePress()}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>ADD</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginVertical: 15,
  },

  button: {
    backgroundColor: "dodgerblue",
    width: "50%",
    height: 50,
    justifyContent: "center",
    borderRadius: 15,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
});
