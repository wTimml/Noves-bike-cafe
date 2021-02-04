import React from "react";
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  TextInput,
} from "react-native";
import AddBoxIcon from "react-native-vector-icons/EvilIcons";

const Separator = () => <View style={styles.separator} />;

const cadastroTreino = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.master}>
      <View>
        <TextInput style={styles.textInputTitle}
          placeholder="Inserir título"
        ></TextInput>
      </View>
      <Separator />

      <View>
        <TextInput style={styles.textInputContent}
          placeholder="Inserir treino"
        ></TextInput>
      </View>
    </View>

    <AddBoxIcon
      name="plus"
      size={50}
      color="#fff"
      onPress={() => Alert.alert("ops, algo deu errado")}
    />

    <View style={styles.botaoConfirmar}>
      <Button
        title="CONFIRMAR"
        color="#E56228"
        onPress={() => Alert.alert("ops, algo deu errado")}
      />
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#293a2e",
    alignItems: "center",
  },

  master: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingHorizontal: 60,
    paddingBottom: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
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

  textInputTitle: {
    color:"#000",
    height: 40,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    border:"none",
    borderWidth: 1,
    paddingTop: 10,
    fontSize: 20,
 },

 textInputContent: {
  color:"#000",
  height: 40,
  width: 200,
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  border:"none",
  borderWidth: 1,
  paddingTop: 10,
  fontSize: 17,
},

  botaoConfirmar: {
    backgroundColor: "#E56228",
    padding: 10,
    marginHorizontal: 100,
    borderRadius: 7.5,
    marginTop: 400,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  separator: {
    marginVertical: 1,
    borderBottomColor: "#E56228",
    borderBottomWidth: 2,
  },
});

export default cadastroTreino;
