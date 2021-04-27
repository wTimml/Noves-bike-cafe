import React, { useEffect, useState } from "react";
import { View, Button } from "react-native";
import { StyleSheet } from "react-native";

import UserCard from "../../components/userCard";
import ButtonOneColumn from "../../components/buttonOneColumn";

import Colors from "../../constants/colors";

import { getUser, getUserEmail } from "../../utils";

import api from "../../services/api";

function profileScreen({ navigation }) {
  const [userEmail, setUserEmail] = useState(
    getUserEmail().then((email) => {
      setUserEmail(email);
    })
  );
  const [userId, setUserId] = useState("");
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  //refresh screen when navigate back

  //DAR GET NO PERFIL, SE NAO ESTIVER CADASTRADO O PERFIL JOGAR PARA CADASTRO DE PERFIL

  useEffect(() => {
    try {
      const getUserData = getUser();
      return getUserData;
    } catch (e) {
      console.log("profileScreen getUserError: " + e);
    }
  }, [navigation, userEmail]); // when userEmail change re render

  const getUser = () => {
    if (userEmail.indexOf("@") > -1) {
      //solve problem when userEmail its not defined yet
      api
        .get("/users/by-email?email=" + userEmail) //users/by-email?email=lucas@tw.com URL PARA BUSCAR POR EMAIL
        .then((response) => {
          setUserId(response.data.id);
          if (response.data.firstName === null) {
            navigation.navigate("RegisterProfile");
          } else {
            setState({
              firstName: response.data.firstName,
              lastName: response.data.lastName,
              email: response.data.email,
            });
          }
        });
    }
  };

  return (
    <View style={styles.container}>
      <UserCard
        email={state.email}
        firstName={state.firstName}
        lastName={state.lastName}
      />

      <View style={styles.buttonsContainer}>
        <ButtonOneColumn onPress={() => navigation.push("RecordList")}>
          Histórico de Atividades
        </ButtonOneColumn>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColorDark,
  },
  buttonsContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
});

export default profileScreen;
