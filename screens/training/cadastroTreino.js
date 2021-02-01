import React from "react";
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
} from "react-native";
import AddBoxIcon from "react-native-vector-icons/EvilIcons";

const cadastroTreino = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.master}>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: "#fff",
        }}
      >
        <Text style={styles.title}>AQUECIMENTO</Text>
      </View>

      <View
      style={{
        borderBottomWidth: 1,
        borderColor: "#fff",
      }}>
        <Text style={styles.content}>15 minutos de giros leves</Text>
      </View>
    </View>

    <AddBoxIcon name="plus" size={50} color="#E56228" onPress={() => Alert.alert("")} />

    <View style={styles.botaoConfirmar}>
      <Button
        title="CONFIRMAR"
        color="#E56228"
        onPress={() => Alert.alert("")}
      />
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#293a2e",
    alignItems: "center",
  },

  master: {
    paddingTop: 10,
    paddingHorizontal: 65,
    paddingBottom: 10,
    backgroundColor: "#E56228",
    marginTop: 15,
    borderRadius: 7.5,
    marginTop: 25,
  },

  title: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 20,
  },

  content: {
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10
  },

  botaoConfirmar: {
    backgroundColor: "#E56228",
    borderColor: "#FFF",
    padding: 10,
    marginTop: 25,
    marginHorizontal: 100,
    borderRadius: 7.5,
    marginTop: 400,
  },
});

export default cadastroTreino;
