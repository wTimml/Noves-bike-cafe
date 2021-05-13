import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { Modalize } from "react-native-modalize";
import Fonts from '../../constants/fonts';

export default function App() {
  const modalizeRef = useRef(null);

  function Modal1() {
    return (
      <Modalize ref={modalizeRef} snapPoint={180}>
        <View style={styles.modal}>
          <Text>CONTEUDO 1</Text>
        </View>
      </Modalize>
    );
  }

  function Modal2() {
    return (
      <Modalize ref={modalizeRef} snapPoint={300}>
        <View style={styles.modal}>
          <Text>CONTEUDO 2</Text>
        </View>
      </Modalize>
    );
  }

  function Modal3() {
    return (
      <Modalize ref={modalizeRef} snapPoint={300}>
        <View style={styles.modal}>
          <Text>CONTEUDO 3</Text>
        </View>
      </Modalize>
    );
  }

  function Modal4() {
    return (
      <Modalize ref={modalizeRef} snapPoint={300}>
        <View style={styles.modal}>
          <Text style={styles.modalText}>AQUECIMENTO</Text>
        </View>

        <View style={styles.modal}>
          <Text style={styles.modalText}>AJUSTAMENTO 01</Text>
        </View>

        <View style={styles.modal}>
          <Text style={styles.modalText}>AJUSTAMENTO 02</Text>
        </View>

        <View style={styles.modal}>
          <Text style={styles.modalText}>AJUSTAMENTO 03</Text>
        </View>
      </Modalize>
    );
  }

  function onOpen() {
    modalizeRef.current?.open();
  }

  return (
    <View style={styles.container}>
      <View style={styles.titulo}>
        <Text style={styles.titulo}>Noves Bike Training</Text>
      </View>
      <TouchableOpacity style={styles.botao} onPress={onOpen}>
        <Text style={styles.botaoText}>TREINO 1</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={onOpen}>
        <Text style={styles.botaoText}>TREINO 2</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={onOpen}>
        <Text style={styles.botaoText}>TREINO 3</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={onOpen}>
        <Text style={styles.botaoText}>TREINO 4</Text>
      </TouchableOpacity>

      <Modal1 />
      <Modal2 />
      <Modal3 />
      <Modal4 />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#293A2E",
    alignItems: "center",
    justifyContent: "center",
  },

  titulo: {
    alignItems: "center", 
    color: "#fff",
    fontSize: 30,
    marginBottom: 15,
    fontFamily: Fonts.fontRegular
    
  },
  modal: {
    height: 120,
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 25,
    alignItems: "center",
    borderRadius: 7.5,
    margin: 15,
    backgroundColor: "#E56228",
  },

  modalText: {
    color: "#fff",
    marginBottom: 50,
    fontWeight: "500",
    fontSize: 17,
  },

  botao: {
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    height: 65,
    backgroundColor: "#E56228",
    fontWeight: "500",
    padding: 15,
    borderRadius: 7.5,
    marginBottom: 45,
    marginTop: 10,
    shadowColor: "#0005",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },

  botaoText: {
    fontWeight: "500",
    fontSize: 20,
    color: "#fff",
    fontWeight: "500",
    fontFamily: Fonts.fontRegular
  },
});
