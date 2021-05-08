import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Alert,
  TextInput,
  Dimensions,
  Text,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function CadastroTreino({ title, description }) {
  return (
    <View style={styles.card}>
      <View style={[styles.viewTitle]}>
        <Text style={[styles.title]}>{title}</Text>
        <TouchableOpacity
          onPress={() => Alert.alert("Tem certeza que deseja excluir?")}
        >
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={24}
            color="red"
          />
        </TouchableOpacity>
      </View>
      <Text style={[styles.description]}>{description}</Text>
    </View>
  );
}

const width = Math.round(Dimensions.get("window").width);
const height = Math.round(Dimensions.get("window").height);

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
