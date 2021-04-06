
import React from "react";
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text
} from "react-native";

const Separator = () => <View style={styles.separator} />;

const Treinador = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.titulo}>
      <Text style={styles.titulo}>Seja bem vindo treinador!</Text>
    </View>

    <View style={styles.botaotreinador}>
      <Button
        style={styles.botaotreinador}
        title="INICIANTE"
        color="#E56228"
        onPress={() => navigation.navigate("cadastroTreino")}
      />
    </View>

    <Separator />

    <View style={styles.botaotreinador}>
      <Button
        style={styles.botaotreinador}
        title="INTERMEDIÁRIO"
        color="#E56228"
        onPress={() => navigation.navigate("cadastroTreino")}
      />
    </View>
    <Separator />

    <View style={styles.botaotreinador}>
      <Button
        title="AVANÇADO"
        color="#E56228"
        onPress={() => navigation.navigate("cadastroTreino")}
      />
    </View>

    <Separator />

    <View style={styles.botaovoltar}>
      <Button
        title="VOLTAR"
        color="#E56228"
        onPress={() => navigation.navigate("cadastroTreino")}
      />
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#293a2e",
  },

  botaotreinador: {
    backgroundColor: "#E56228",
    padding: 18,
    margin: 25,
    marginHorizontal: 50,
    borderRadius: 7.5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.34,
    shadowRadius: 5.27,

    elevation: 4,
    marginTop: 15,
    borderRadius: 7.5,
    marginTop: 20,
  },

  botaovoltar: {
    backgroundColor: "#E56228",
    padding: 10,
    marginTop: 25,
    marginHorizontal: 110,
    borderRadius: 7.5,
  },

  titulo: {
    textAlign: "center",
    marginVertical: 8,
    alignItems: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 20,
  },

  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  separator: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderBottomColor: "#E56228",
    borderBottomWidth: 1,
  },
});

export default Treinador;
