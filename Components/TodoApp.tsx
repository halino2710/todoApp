import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, FlatList } from "react-native";
import { TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

type TodoItem = {
  id: string;
  text: string;
};

const TodoApp = () => {
  const [text, setText] = useState<string>("");
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const handlePress = () => {
    if (text !== "") {
      const newTodo = { id: Date.now().toString(), text: text };
      setTodos([...todos, newTodo]);
      setText("");
    }
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
    <View
      style={{
        backgroundColor: "#eee",
        padding: 10,
        margin: 5,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        height: 55,
      }}
    >
      <Text style={{ flex: 1, fontSize: 18 }}>{item.text}</Text>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Text
          style={{
            color: "red",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Delete
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 50,
      }}
    >
      <View
        style={{
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>Todo App</Text>
      </View>
      <View style={{ width: "100%", alignItems: "center" }}>
        <TextInput
          style={{ width: "80%" }}
          mode="outlined"
          label="Add a Todo item"
          placeholder="Type here to add a Todo item"
          right={<TextInput.Affix text="/100" />}
          value={text}
          onChangeText={(text) => {
            setText(text);
          }}
        />
      </View>

      <TouchableOpacity
        style={{ width: "100%", alignItems: "center", marginVertical: 15 }}
        onPress={() => handlePress()}
      >
        <View
          style={{
            backgroundColor: "dodgerblue",
            width: "50%",
            height: 60,
            justifyContent: "center",
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18, textAlign: "center" }}>
            Save
          </Text>
        </View>
      </TouchableOpacity>

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
