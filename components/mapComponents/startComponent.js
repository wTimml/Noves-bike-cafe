import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Modal,
  Pressable,
} from "react-native";

import Colors from "../../constants/colors";
import Fonts from "../../constants/fonts";

import Icon from "react-native-vector-icons/Feather";

import { Input } from "react-native-elements";
import FilePicker from "../../components/filePicker";

const { width, height } = Dimensions.get("window");

const iconSize = 50;
const textSize = 18;
const borderwidth = 0.7;
const fontRegular = Fonts.fontRegular;

const StartComponent = (props) => {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [title, setTitle] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

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

  return (
    <View style={{ alignItems: "center" }}>
      <View style={styles.borderTop}>
        <Text style={styles.labelText}>Duração:</Text>
        <Text style={styles.dataText}>{formatTime()}</Text>
      </View>
      <View style={styles.borderMiddle}>
        <Text style={styles.labelText}>Velocidade:</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.dataText}>
            {parseFloat(props.speed).toFixed(2)}{" "}
          </Text>
          <Text style={styles.labelText}>km/h </Text>
        </View>
      </View>
      <View style={styles.borderMiddle}>
        <Text style={styles.labelText}>Velocidade Média:</Text>
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
        <Text style={styles.labelText}>Distância:</Text>
        <Text style={styles.dataText}>
          {parseFloat(props.distanceTravelled).toFixed(2)} km
        </Text>
      </View>
      <View style={styles.borderTop}>
        <Text style={styles.labelText}>Altimetria:</Text>
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
                  <Input
                    style={styles.inputComponent}
                    placeholder="Título"
                    onChangeText={(text) => setTitle({ text })}
                  />
                  {/* <FilePicker/> */}
                  <View style={{ padding: 10 }}></View>
                  <View style={{ flexDirection: "row" }}>
                    <Pressable
                      style={[styles.buttonModal, styles.buttonClose]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={styles.buttonText}>Cancelar</Text>
                    </Pressable>
                    <View style={{ width: width / 3.5 }}></View>
                    <Pressable
                      style={[styles.buttonModal, styles.buttonClose]}
                      onPress={() => setModalVisible(!modalVisible)}
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
              <Text style={styles.buttonText}>Finish</Text>
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
              <Icon name="play" size={iconSize} />
            </Text>
          </TouchableOpacity>
        ) : isPaused ? (
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.button}
            onPress={handlePause}
          >
            <Text style={styles.buttonText}>
              <Icon name="pause" size={iconSize} />
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.button}
            onPress={handleResume}
          >
            <Text style={styles.buttonText}>Resume</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    padding: 20,
  },
  labelText: {
    color: Colors.lightColor,
    fontFamily: fontRegular,
    fontSize: textSize,
    textAlign: "center",
    paddingTop: 20,
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
    width: width / 2,
  },
  borderMiddle: {
    borderBottomColor: Colors.primaryColor,
    borderBottomWidth: borderwidth,
    alignItems: "center",
    width: width,
  },
  borderTop: {
    borderBottomColor: Colors.primaryColor,
    borderBottomWidth: borderwidth,
    width: width,
  },
  inputComponent: {
    height: 50,
    width: 200,
    borderRadius: 15,
    backgroundColor: Colors.lightColor,
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: width,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonModal: {
    borderRadius: 7.5,
    elevation: 2,
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
    marginBottom: 15,
    textAlign: "center",
  },
});

export default StartComponent;
