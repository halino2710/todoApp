import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";

const AppText = ({ text, setText }: any) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        mode="outlined"
        label="Add a Todo item"
        placeholder="Type here to add an item"
        right={<TextInput.Affix text="/100" />}
        value={text}
        onChangeText={(text) => {
          setText(text);
        }}
      />
    </View>
  );
};

export default AppText;

const styles = StyleSheet.create({
  container: { width: "100%", alignItems: "center" },
  textInput: { width: "80%" },
});
