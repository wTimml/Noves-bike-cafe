import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import Card from "./cadastroTreino";
import Picker from "../../components/picker";
import { FAB, Button, Paragraph, Dialog } from "react-native-paper";
import data from "../../data.js";

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
  const [atividades, setAtividades] = useState([]);
  const [visible, setVisible] = useState(false);
  const [textDialog, setTextDialog] = useState(false);

  useEffect(() => {
    setAtividades(data.atividades);
  }, []);

  const handleAdd = () => {
    setAtividades([
      ...atividades,
      {
        title: "adicionar titulo",
        description: "adicionar descricao",
      },
    ]);
  };

  const deleteCard = (indexSelected) => {
    setTextDialog("Tem certeza que deseja excluir a atividade?");
    setVisible(true);
    const ativ = atividades.filter((_, index) => index !== indexSelected);
    setAtividades(ativ);
  };

  const onChangeCardEvent = (atividade, indexSelected) => {
    let ativ = [...atividades];
    ativ[indexSelected] = atividade;
    setAtividades(ativ);
  };

  const confirmCard = () => {
    if (!groupTrainingSelected && !groupLevelSelected) {
      setTextDialog(
        "Você precisa selecionar o nível de grupo e o treino para confirmar o cadastro"
      );
      setVisible(true);

      return false;
    }

    const obj = {
      groupLevel: groupLevelSelected,
      groupTraining: groupTrainingSelected,
      activities: [...atividades],
    };
    console.log(obj);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "position" : "height"}
        >
          <ScrollView>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Nível de grupo</Text>

              <Picker
                label="Selecione o nível do grupo"
                style={styles.select}
                data={groupLevel}
                onValueChange={(level) => setGroupLevelSelected(level)}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Treino</Text>
              <Picker
                label="Selecione o treino"
                style={styles.select}
                data={groupTraining}
                onValueChange={(training) => setGroupTrainingSelected(training)}
              />
            </View>

            <Separator />

            <Text style={styles.label}>Atividades</Text>

            {atividades.map((atividade, index) => {
              return (
                <Card
                  key={index}
                  title={atividade.title}
                  description={atividade.description}
                  onDeletePress={() => deleteCard(index)}
                  onValueChange={(atividade) =>
                    onChangeCardEvent(atividade, index)
                  }
                />
              );
            })}

            <TouchableOpacity style={styles.add} onPress={handleAdd}>
              <MaterialIcons name="add" size={30} color="white" />
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>

        <FAB
          style={styles.fab}
          icon="check"
          color="white"
          onPress={confirmCard}
        />

        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Ops...</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{textDialog}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </View>
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
    marginBottom: 20,
  },

  scrollview: {
    flex: 1,
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
  fab: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#009a00",
  },
});

export default Treinador;
