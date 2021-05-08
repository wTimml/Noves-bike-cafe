import React, { useState } from "react";
import { StyleSheet, Button, View, SafeAreaView, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import Card from "./cadastroTreino";
import Picker from "../../components/picker";

const Separator = () => <View style={styles.separator} />;

const Treinador = () => {
  const [groupLevel, setGroupLevel] = useState([
    { label: "Iniciante", value: "Iniciante" },
    { label: "Intermediário", value: "Intermediário" },
    { label: "Avançado", value: "Avançado" },
  ]);
  const [groupTraining, setGroupTraining] = useState([
    { label: "Treino 1", value: "Treino 1" },
    { label: "Treino 2", value: "Treino 2" },
    { label: "Treino 3", value: "Treino 3" },
    { label: "Treino 4", value: "Treino 4" },
  ]);

  const [groupLevelSelected, setGroupLevelSelected] = useState(null);
  const [groupTrainingSelected, setGroupTrainingSelected] = useState(null);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nível de grupo</Text>

          <Picker
            style={styles.select}
            data={groupLevel}
            onValueChange={(level) => setGroupLevelSelected(level)}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Treino</Text>
          <Picker
            style={styles.select}
            data={groupTraining}
            onValueChange={(training) => setGroupTrainingSelected(training)}
          />
        </View>

        <Separator />

        <Text style={styles.label}>Atividades</Text>

        <Card title="Título" description="Descrição" />

        <TouchableOpacity
          style={styles.add}
          onPress={() =>
            alert(
              `Level: ${groupLevelSelected}, training: ${groupTrainingSelected}`
            )
          }
        >
          <MaterialIcons name="add" size={30} color="white" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "flex-start",
    backgroundColor: "#293a2e",
    paddingVertical: 30,
  },

  formGroup: {
    marginBottom: 30,
  },

  add: {
    alignSelf: "center",
    padding: 10,
  },

  select: {
    backgroundColor: "#E56228",
    borderRadius: 7.5,
    height: 46,
    paddingHorizontal: 15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.34,
    shadowRadius: 5.27,
    elevation: 4,
    borderRadius: 7.5,
    justifyContent: "center",
  },

  label: {
    color: "#fff",
    marginBottom: 8,
    fontSize: 15,
  },

  separator: {
    marginBottom: 30,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
  },
});

export default Treinador;
