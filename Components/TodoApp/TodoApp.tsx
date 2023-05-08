import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import AppText from "./AppText";
import AppButton from "./AppButton";

type TodoItem = {
  id: string;
  text: string;
};

const TodoApp = () => {
  const [text, setText] = useState<string>("");
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const createButtonAlert = () =>
    Alert.alert("Invalid input", "Input must be a at least one word long", [
      { text: "OK" },
    ]);

  const handlePress = () => {
    if (text !== "") {
      const newTodo = { id: Date.now().toString(), text: text };
      setTodos([...todos, newTodo]);
      setText("");
    } else return createButtonAlert();
  };

  const handleDelete = (id: any) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const storedTodos = await AsyncStorage.getItem("@todos");
        if (storedTodos !== null) {
          setTodos(JSON.parse(storedTodos));
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadTodos();
  }, []);

  useEffect(() => {
    const saveTodos = async () => {
      try {
        await AsyncStorage.setItem("@todos", JSON.stringify(todos));
      } catch (error) {
        console.log(error);
      }
    };
    saveTodos();
  }, [todos]);

  const renderTodoItem = ({ item }: any) => (
    <View style={styles.flatListItemContainer}>
      <Text style={styles.flatListItems}>{item.text}</Text>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <MaterialIcons name="delete" size={30} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Todo App</Text>
      </View>

      <AppText text={text} setText={setText} />

      <AppButton handlePress={handlePress} />

      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default TodoApp;

const styles = StyleSheet.create({
  flatListItemContainer: {
    backgroundColor: "#eee",
    padding: 10,
    margin: 5,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    height: 55,
  },

  flatListItems: { flex: 1, fontSize: 18 },

  mainContainer: {
    flex: 1,
    paddingTop: 50,
  },

  headerContainer: {
    alignItems: "center",
    marginVertical: 20,
  },

  header: { fontSize: 30, fontWeight: "bold" },
});
