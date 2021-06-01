import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Modal,
  Pressable,
  TextInput,
} from "react-native";

import Colors from "../../constants/colors";
import Fonts from "../../constants/fonts";

import Icon from "react-native-vector-icons/Feather";

import { Input } from "react-native-elements";
import FilePicker from "../../components/filePicker";

const { width, height } = Dimensions.get("window");

const iconSize = 45;
const textSize = 16;
const borderwidth = 0.7;
const fontRegular = Fonts.fontRegular;

const StartComponent = (props) => {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [userAuth, setUserAuth] = useState(false);

  const countRef = useRef(null);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);

    props.handleCircuit();
  };

  const handlePause = () => {
    clearInterval(countRef.current);
    setIsPaused(false);

    props.handleCircuit();
  };
  const handleResume = () => {
    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
    props.handleCircuit();
  };
  const handleReset = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);

    props.handleCircuit();
    props.resetCircuit();

    setTimer(0);
  };
  const formatTime = () => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours}: ${getMinutes} : ${getSeconds}`;
  };

  const handleEnd = () => {
    setModalVisible(!modalVisible);

    const titleToString = title.text;
    const descriptionToString = description.text;
    props.handleStartComponentEndData(
      timer,
      titleToString,
      descriptionToString
    );
    // handleReset();
  };

  return (
    <View style={{ alignItems: "center", width: width }}>
      <View style={styles.borderTop}>
        <Text style={styles.labelText}>Duração</Text>
        <Text style={styles.dataText}>{formatTime()}</Text>
      </View>
      <View style={styles.borderMiddle}>
        <Text style={styles.labelText}>Velocidade</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.dataText}>
            {parseFloat(props.speed).toFixed(2)}{" "}
          </Text>
          <Text style={styles.labelText}>km/h </Text>
        </View>
      </View>
      <View style={styles.borderMiddle}>
        <Text style={styles.labelText}>Velocidade Média</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.dataText}>
            {props.distanceTravelled > 0
              ? parseFloat(props.distanceTravelled / (timer / 3600)).toFixed(2)
              : "0"}{" "}
          </Text>
          <Text style={styles.labelText}>km/h </Text>
        </View>
      </View>
      <View style={styles.borderMiddle}>
        <Text style={styles.labelText}>Distância</Text>
        <Text style={styles.dataText}>
          {parseFloat(props.distanceTravelled).toFixed(2)} km
        </Text>
      </View>
      <View style={styles.borderTop}>
        <Text style={styles.labelText}>Altimetria</Text>
        <Text style={styles.dataText}>
          {parseFloat(props.altimetria).toFixed(1)} m
        </Text>
      </View>

      <View style={styles.buttons}>
        {isActive && !isPaused ? (
          //MODAL para finalizar corrida
          <View stile={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <TextInput
                    style={styles.inputComponent}
                    placeholder="Título"
                    onChangeText={(text) => setTitle({ text })}
                  />

                  <TextInput
                    style={styles.inputComponent}
                    placeholder="Descrição"
                    onChangeText={(text) => setDescription({ text })}
                  />

                  {/* <FilePicker/> */}
                  <View style={{ padding: 10 }}></View>
                  <View style={{ flexDirection: "row" }}>
                    <Pressable
                      style={[styles.buttonModal, styles.buttonClose]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={styles.buttonText}>Voltar</Text>
                    </Pressable>

                    <Pressable
                      style={[styles.buttonModal, styles.buttonClose]}
                      onPress={() => handleEnd()}
                    >
                      <Text style={styles.buttonText}>Salvar</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>

            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.button}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.buttonText}>Finalizar</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {!isActive && !isPaused ? (
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.button}
            onPress={handleStart}
          >
            <Text style={styles.buttonText}>
              <Icon name="play" size={24} />
            </Text>
          </TouchableOpacity>
        ) : isPaused ? (
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.button}
            onPress={handlePause}
          >
            <Text style={styles.buttonText}>
              <Icon name="pause" size={24} />
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.button}
            onPress={handleResume}
          >
            <Text style={styles.buttonText}>Retomar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  button: {
    backgroundColor: Colors.primaryColor,
    borderRadius: 7.5,
    margin: 5,
  },
  buttons: {
    flex: 1,
    bottom: 0,
    paddingTop: 40,
    flexDirection: "row",
  },
  buttonText: {
    color: "white",
    fontFamily: fontRegular,
    fontSize: textSize,
    textAlign: "center",
    padding: 15,
  },
  labelText: {
    color: Colors.lightColor,
    fontFamily: fontRegular,
    fontSize: textSize,
    textAlign: "center",
    paddingVertical: 5,
  },
  dataText: {
    color: Colors.lightColor,
    fontFamily: fontRegular,
    fontSize: iconSize,
    textAlign: "center",
  },
  borderBottom: {
    borderTopColor: Colors.primaryColor,
    borderTopWidth: borderwidth,
    width: "80%",
  },
  borderMiddle: {
    borderBottomColor: Colors.primaryColor,
    borderBottomWidth: borderwidth,
    alignItems: "center",
    width: "80%",
  },
  borderTop: {
    borderBottomColor: Colors.primaryColor,
    borderBottomWidth: borderwidth,
    width: "80%",
  },
  inputComponent: {
    height: 50,
    width: 250,
    borderRadius: 7.5,
    backgroundColor: Colors.lightColor,
    textAlign: "center",
    margin: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    width: 380,
    backgroundColor: "white",
    borderRadius: 7.5,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 4,
    shadowRadius: 4,
    elevation: 10,
  },
  buttonModal: {
    borderRadius: 7.5,
    elevation: 2,
    paddingHorizontal: 5,
    marginHorizontal:10
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: Colors.primaryColor,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    textAlign: "center",
  },
});

export default StartComponent;
