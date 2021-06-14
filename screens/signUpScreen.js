import React, { useState } from "react";
import ButtonOneColumn from "../components/buttonOneColumn";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import { Input } from "react-native-elements";

import Colors from "../constants/colors";
import ButtonMain from "../components/buttonMain";

import api from "../services/api";
import { Button } from "react-native";
import logo from "../assets/logo.png";
import textLOGO from "../assets/textLogo.png";

const SignUpScreen = ({ navigation, signInToHome }) => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [errorMesage, setErrorMessage] = useState("");

  const createAlert = () =>
    Alert.alert("Cadastrado", "Cadastrado com Sucesso!", [
      {
        text: "Prosseguir",
        onPress: () => navigation.push("SignIn"), // PÓS CADASTRO JOGAR PARA TELA DE LOGIN
      },
    ]);

  async function signUp() {
    if (state.email) {
      setLoading(true);

      try {
        const email = state.email;
        const password = state.password;
        const authorities = "USER";

        api
          .post("/users", { email, password, authorities })
          .then((res) => {
            if (res.status === 201) {
              createAlert();
            } else {
              setErrorMessage("Email e/ou senha preenchido incorretamente");
            }
          })
          .catch((e) => {
            setLoading(false);
            setErrorMessage("E-mail ja cadastrado");
          });
        //api.get('')

        setLoading(false);
      } catch (e) {
        console.log("catch signIn" + e);
        setLoading(false);
        setErrorMessage("E-mail ja está em uso");
      }
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputView}>
        <Image source={logo} style={{ width: 300, height: 300 }} />
        <Image
          source={textLOGO}
          style={{ width: 160, height: 60, marginTop: -35, marginBottom: 55 }}
        />
      </View>

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
        <Text style={styles.text}>Senha com 8 caracteres ou mais</Text>

        <ButtonMain style={{ margin: 10 }} onPress={signUp}>
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.textBtn}>Cadastrar</Text>
          )}
        </ButtonMain>
      </View>
      <View style={styles.inputView}>
        <View style={{ flex: 1, flexDirection: "row", marginBottom: 20 }}>
          <Text style={styles.textLink}>Já possui conta?</Text>
          <Text
            onPress={() => navigation.push("SignIn")}
            style={{ color: Colors.lightColor }}
          >
            Entrar
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColorDark,
  },
  inputView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: "#fff",
    fontWeight: "800",
  },
  textBtn: {
    color: "#fff",
  },

  removeBorderBottom: {
    borderBottomWidth: 0,
  },
  inputComponent: {
    height: 55,
    marginHorizontal: 60,
    borderRadius: 7.5,
    backgroundColor: Colors.lightColor,
    marginBottom: 12,
    textAlign: "center",
  },
  textLink: {
    color: "#CBB693",
    marginRight: 10,
    marginLeft: 10,
  },
});

export default SignUpScreen;
