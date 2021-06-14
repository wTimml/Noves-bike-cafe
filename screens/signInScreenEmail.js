import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  StatusBar,
  ActivityIndicator,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import ButtonMain from "../components/buttonMain";

import Colors from "../constants/colors";
import { Input } from "react-native-elements";


import api from "../services/api";

const SignInScreenEmail = ({ navigation, signInToHome }) => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMesage, setErrorMessage] = useState("");

  async function saveUser(user) {
    try {
      //  let userToParse = JSON.parse(await AsyncStorage.getItem('@ListApp:userToken')) // userToParse.token & userToParse.authType
      await AsyncStorage.setItem("@ListApp:userToken", JSON.stringify(user)); // USER = TOKEN RETORNADO PELO BACKEND PÓS LOGIN
      await AsyncStorage.setItem("@ListApp:userEmail", state.email);

      signInToHome();
    } catch (e) {
      console.log("saveUser " + e);
    }
  }

  async function signIn() {
    if (state.email) {
      setLoading(true);

      try {
        const email = state.email;
        const password = state.password;

        api
          .post("/users/login", { email, password })
          .then((res) => {
            if (res.status === 200) {
              saveUser(res.data, res.status);
            } else {
              setErrorMessage("E-mail e/ou senha incorreto(s)");
            }
          })
          .catch((e) => {
            setLoading(false);
            setErrorMessage("E-mail e/ou senha incorreto(s)");
          });
        //api.get('')

        setLoading(false);
      } catch (e) {
        console.log("catch signIn" + e);
        setLoading(false);
        setErrorMessage("Usuário não existe");
      }
    }
  }

  return (
    <View>
      <StatusBar barStyle="light-content" />
      <View style={styles.inputView}>
        <Text style={{ color: "red", textAlign: "center" }}>
          {" "}
          {errorMesage}
        </Text>

        <Input
          inputContainerStyle={styles.removeBorderBottom}
          style={styles.inputComponent}
          placeholder="E-mail"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => setState({ ...state, email: text })}
        />

        <Input
          inputContainerStyle={styles.removeBorderBottom}
          style={styles.inputComponent}
          placeholder="Senha"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          onChangeText={(text) => setState({ ...state, password: text })}
        />

        <ButtonMain style={{ margin: 10 }} onPress={signIn}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.textBtn}>Entrar</Text>
          )}
        </ButtonMain>
      </View>
      <View style={styles.inputView}>
        <Text style={styles.textLink}>Esqueceu sua senha?</Text>
        <View style={{ flex: 1, flexDirection: "row", marginBottom: 20 }}>
          <Text style={styles.textLink}>Não possui conta?</Text>
          <Text
            onPress={() => navigation.push("CreateAccount")}
            style={{ color: Colors.lightColor }}
          >
            Cadastrar
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  textBtn: {
    color: "#fff",
  },

  removeBorderBottom: {
    borderBottomWidth: 0,
  },

  inputComponent: {
    height: 55,
    borderRadius: 7.5,
    marginHorizontal: 65,
    backgroundColor: Colors.lightColor,
    textAlign: "center",
    marginBottom: 5,
  },

  textLink: {
    color: "#CBB693",
    marginRight: 10,
    marginLeft: 10,
  },
});

export default SignInScreenEmail;
