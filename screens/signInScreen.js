import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import { SocialIcon } from "react-native-elements";

import Colors from "../constants/colors";
import Fonts from "../constants/fonts";

import SignInScreenEmail from "./signInScreenEmail";
import MainButton from "../components/buttonOneColumn";
import logoBikeCafe from "../logos/logoBikeCafe.png";

Icon.loadFont();

export default function SignInScreen({ navigation, signIn }) {
  const [byEmail, setByEmail] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleChange = () => {
    setByEmail(false);
  };

  //Header left condicional para o Usuario voltar às opçoes de cadastro com redes sociais
  React.useLayoutEffect(() => {
    byEmail
      ? navigation.setOptions({
          headerLeft: () => (
            <TouchableOpacity onPress={handleChange}>
              <Icon
                name="arrow-back"
                size={30}
                color={Colors.primaryColorDark}
                style={{ paddingLeft: 5 }}
                activeOpacity={0.5}
              />
            </TouchableOpacity>
          ),
        })
      : navigation.setOptions({ headerLeft: null });
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputView}>
        <Image source={logoBikeCafe} style={{ width: 350, height: 300 }} />
      </View>

      <View>
        {byEmail ? (
          <SignInScreenEmail
            isByEmail={handleChange}
            navigation={navigation}
            signInToHome={signIn}
          />
        ) : (
          <View style={styles.inputView}>
            <TouchableOpacity
              onPress={() => setByEmail(true)}
              activeOpacity={0.6}
              style={{
                backgroundColor: Colors.primaryColor,
                height: 55,
                width: 270,
                borderRadius: 7.5,
                marginBottom: 10,
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                margin: 10,
                flexDirection: "row",
              }}
            >
              <Icon name="email" size={30} color="#FFF" />
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  marginLeft: 10,
                }}
              >
                Entrar com E-mail
              </Text>
            </TouchableOpacity>

            <SocialIcon
              title="Entrar com Google"
              button
              type="google"
              style={{ width: 270, height: 55, borderRadius: 7.5 }}
            />
            <SocialIcon
              title="Entrar com Facebook"
              button
              type="facebook"
              style={{ width: 270, height: 55, borderRadius: 7.5 }}
              onPress={() => signIn()}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

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
  inputComponent: {
    height: 50,
    width: 200,
    borderRadius: 25,
    backgroundColor: Colors.lightColor,
    marginBottom: 12,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textLink: {
    color: "#CBB693",
    marginRight: 10,
    marginLeft: 10,
  },
});
