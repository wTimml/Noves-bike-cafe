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
// import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";




function CadastroTreino(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [treinos, setTreinos] = useState([]);
  const [id, setId] = useState(0);
  function handleKeyPressEnter(event) {
    console.log(event.nativeEvent.key)
}

  function handleSubmit(event) {
    console.log("Botão Submit Pressionado!");
    console.log(title);
    console.log(content);

    const novoTreino = {
      title: "",
      content: "",
      treinos: [],
      id: id,
    };

    console.log(novoTreino);

    setId(id + 1);

    setTreinos([...treinos, novoTreino]);

    event.preventDefault();
  }
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
    console.log(e.target.value);
  };
  const handleChangeContent = (e) => {
    setContent(e);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.master}>
        <View style={styles.title}>
          <TextInput
            style={[styles.textInputTitle]}
            placeholder="Inserir título"
            
          />
        </View>

        <View style={styles.content}>
          <TextInput
            style={[styles.textInputContent]}
            placeholder="Inserir treino"
            onChangeText={text => handleChangeContent(text)}
            onSubmitEditing={handleKeyPressEnter}
            value={content}
          />
        </View>

        <View style={styles.btnAcao}>
          <TouchableOpacity
            style={{
              borderRadius: 10,
            }}
            onPress={() => Alert.alert("Tem certeza que deseja confirmar?")}
          >
            <Text style={[styles.textButton, { backgroundColor: "green" }]}>
              CONFIRMAR
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Alert.alert("Tem certeza que deseja excluir?")}
          >
            <Text style={[styles.textButton, { backgroundColor: "red" }]}>
              EXCLUIR
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => Alert.alert("Deseja abrir nova aba de treino?")}
        style={{
          marginTop: 15,
        }}
      >
        <MaterialIcons name="add-circle-outline" size={35} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const width = Math.round(Dimensions.get("window").width);
const height = Math.round(Dimensions.get("window").height);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#293a2e",
    alignItems: "center",
  },

  master: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    width: width - 40,
    backgroundColor: "#fff",
    shadowColor: "#0003",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    marginTop: 15,
    borderRadius: 7.5,
    marginTop: 25,
  },

  title: {
    borderBottomWidth: 1,
    width: "90%",
    borderColor: "#0003",
  },

  content: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 10,
  },

  textInputTitle: {
    color: "#000",
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },

  textInputContent: {
    color: "#000",
    fontSize: 17,
  },

  btnAcao: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 40,
    flexDirection: "row",
  },

  textButton: {
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: "flex-start",
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 0.5,
    marginRight: 5,
  },
});

export default CadastroTreino;
