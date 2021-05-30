import React from "react";
import { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function CadastroTreino({ title, description, onDeletePress, onValueChange }) {
  const [textTitle, onChangeTitle] = useState(title);
  const [textDescription, onChangeDescription] = useState(description);

  const handleEditTitle = (value) => {
    onChangeTitle(value);
    onValueChange({ title: textTitle, description: textDescription });
  };
  const handleEditDescription = (value) => {
    onChangeDescription(value);
    onValueChange({ title: textTitle, description: textDescription });
  };

  return (
    <View style={styles.card}>
      <View style={[styles.viewTitle]}>
        <TextInput
          style={[styles.title]}
          value={textTitle}
          onChangeText={(text) => handleEditTitle(text)}
        />

        <TouchableOpacity onPress={onDeletePress}>
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={24}
            color="red"
          />
        </TouchableOpacity>
      </View>
      <TextInput
        style={[styles.description]}
        value={textDescription}
        multiline={true}
        onChangeText={(text) => handleEditDescription(text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    width: "100%",
    backgroundColor: "#fff",
    shadowColor: "#0003",
    shadowOffset: {
      width: 0,
      height: 5,
    },

    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    borderRadius: 7.5,
    marginBottom: 10,
  },

  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "#232323",
    marginBottom: 10,
  },
  description: {
    width: "100%",
    fontSize: 15,
    color: "#232323",
  },

  viewTitle: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
  },
});

export default CadastroTreino;
