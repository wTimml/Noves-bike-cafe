import React from "react";
import { View, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { AuthContext } from "../context";
import Colors from "../constants/colors";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import { AppLoading } from "expo";
import * as Font from "expo-font";

import { getUser } from "../utils";

import OptionsSettings from "../components/optionsSettings";

import {
  CreateAccount,
  SignIn,
  Home,
  Details,
  RecordList,
  RecordDetail,
  RegisterProfile,
  Profile,
  Splash,
  MapScreens,
  Training,
  Trainer,
  ChangeTraining,
} from "./navigationScreens";

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerTintColor: Colors.primaryColorDark,
      headerTitleAlign: { alignSelf: "center" },
      headerStyle: { backgroundColor: Colors.primaryColor },
    }}
  >
    <AuthStack.Screen
      name="SignIn"
      component={SignIn}
      options={{ title: "Noves Bike", headerLeft: null }}
    />
    <AuthStack.Screen
      name="CreateAccount"
      component={CreateAccount}
      options={{ title: "Cadastrar" }}
    />
  </AuthStack.Navigator>
);

const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const TrackStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Home"
      component={Home}
      options={{
        title: "NOVES",
        headerTintColor: Colors.primaryColorDark,
        headerTitleAlign: { alignSelf: "center" },
        headerStyle: { backgroundColor: Colors.primaryColor },
      }}
    />
    <HomeStack.Screen
      name="Details"
      component={Details}
      options={({ route }) => ({
        title: route.params.name,
        headerTintColor: Colors.primaryColorDark,
        headerStyle: { backgroundColor: Colors.primaryColor },
      })}
    />
  </HomeStack.Navigator>
);
const TrackStackScreen = () => (
  <TrackStack.Navigator
    screenOptions={{
      headerTintColor: Colors.primaryColorDark,
      headerTitleAlign: { alignSelf: "center" },
      headerStyle: { backgroundColor: Colors.primaryColor },
    }}
  >
    {
      //<SearchStack.Screen name="Search" component={Search} options={{ title: 'Sign In',headerTintColor:Colors.primaryColorDark,headerTitleAlign:{alignSelf:'center'}, headerStyle:{backgroundColor:Colors.primaryColor}}}/>
      // <SearchStack.Screen name="Search2" component={Search2} options={{ title: 'Sign In',headerTintColor:Colors.primaryColorDark,headerTitleAlign:{alignSelf:'center'}, headerStyle:{backgroundColor:Colors.primaryColor}}}/>
    }
    <TrackStack.Screen
      name="MapScreen"
      component={MapScreens}
      options={{ title: "Circuito" }}
    />
  </TrackStack.Navigator>
);

const ProfileStack = createStackNavigator();
const ProfileStackScreen = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    console.log("routeName " + routeName);
    if (routeName === "RegisterProfile") {
      navigation.setOptions({ tabBarVisible: false });
    } else {
      navigation.setOptions({ tabBarVisible: true });
    }
  }, [navigation, route]);

  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerTintColor: Colors.primaryColorDark,
        headerTitleAlign: { alignSelf: "center" },
        headerStyle: { backgroundColor: Colors.primaryColor },
      }}
    >
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Perfil",
          headerRight: () => <OptionsSettings />,
        }}
      />

      <ProfileStack.Screen
        name="RecordList"
        component={RecordList}
        options={{
          title: "Histórico de atividades",
        }}
      />

      <ProfileStack.Screen
        name="RecordDetail"
        component={RecordDetail}
        options={{
          title: "Histórico de atividades",
        }}
      />

      <ProfileStack.Screen
        name="RegisterProfile"
        component={RegisterProfile}
        options={({ route }) => ({
          title: "Cadastro de Perfil",
        })}
      />
    </ProfileStack.Navigator>
  );
};

const TrainingStack = createStackNavigator();
const TrainingStackScreen = () => (
  <TrainingStack.Navigator
    screenOptions={{
      headerTintColor: Colors.primaryColorDark,
      headerTitleAlign: { alignSelf: "center" },
      headerStyle: { backgroundColor: Colors.primaryColor },
    }}
  >
    <TrainingStack.Screen
      name="Treinador"
      component={Trainer}
      options={{ title: "Treinador" }}
    />
    <TrainingStack.Screen
      name="Cadastro Treino"
      component={ChangeTraining}
      options={{ title: "Cadastro Treinos" }}
    />
    <TrainingStack.Screen
      name="Treinos"
      component={Training}
      options={{ title: "Treinos" }}
    />
  </TrainingStack.Navigator>
);

const TabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen
      name="Perfil"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: "Perfil",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
        tabBarBadge: null,
      }}
    />
    <Tabs.Screen
      name="Iniciar"
      component={TrackStackScreen}
      options={{
        tabBarLabel: "Iniciar",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="bike" color={color} size={size} />
        ),
      }}
    />
    <Tabs.Screen
      name="Treino"
      component={TrainingStackScreen}
      options={{
        tabBarLabel: "Treino",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="clipboard-text-outline"
            color={color}
            size={size}
          />
        ),
        tabBarBadge: null,
      }}
    />
  </Tabs.Navigator>
);
const Drawer = createDrawerNavigator();
const DrawerStackScreen = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Home" component={TabsScreen} />
    <Drawer.Screen name="Profile" component={ProfileStackScreen} />
  </Drawer.Navigator>
);

const RootStack = createStackNavigator();

//*     verificar tambem o tipo de usuario que esta logando (treinador ou usuario comum)     * //
const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={DrawerStackScreen}
        options={{ animationEnabled: false }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{ animationEnabled: false }}
      />
    )}
  </RootStack.Navigator>
);
const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("../assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("../assets/fonts/OpenSans-Bold.ttf"),
    PlutoMedium: require("../assets/fonts/PlutoMedium.otf"),
    PlutoMediumItalic: require("../assets/fonts/PlutoMedium-Italic.otf"),
  });
};

export default () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null); //NULL PARA  IR AUTHENTICAÇÃO, SE NAO PULA DIRETO PARA A HOME

  const authContext = React.useMemo(() => {
    return {
      signIn: () => {
        setIsLoading(false);
        setUserToken("userToken");
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken("userToken");
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      },
    };
  }, []);

  /*----------------seta um tempo na tela de loading (confere se user está logado)---------------------------*/
  if (isLoading) {
    getUser().then((user) => {
      user = JSON.parse(user);
      if (user && user.token) setUserToken("userToken");
    });
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setIsLoading(false)}
      />
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
