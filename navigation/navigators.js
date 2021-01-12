import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {createDrawerNavigator} from '@react-navigation/drawer'

import {authContext, AuthContext} from '../context'
import Colors from '../constants/colors'

import {AppLoading} from 'expo'
import * as Font  from 'expo-font';

import {SignInTeste , CreateAccount,SignIn, Home, Search, Details, Search2, Profile, Splash,MapScreens } from './navigationScreens'

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
        
    <AuthStack.Screen name = 'SignIn' component={SignIn} options={{ title: 'Noves Bike',headerTintColor:Colors.primaryColorDark,headerTitleAlign:{alignSelf:'center'}, headerStyle:{backgroundColor:Colors.primaryColor}}}/>
    <AuthStack.Screen name = 'Entrar' component={SignIn} options={{title:'Entrar', headerTintColor:Colors.primaryColorDark, headerStyle:{backgroundColor:Colors.primaryColor}}}/>

  </AuthStack.Navigator>
)

const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} options={{ title: 'NOVES',headerTintColor:Colors.primaryColorDark,headerTitleAlign:{alignSelf:'center'}, headerStyle:{backgroundColor:Colors.primaryColor}}}/>
    <HomeStack.Screen name="Details" component={Details} options={({ route }) => ({title: route.params.name, headerTintColor:Colors.primaryColorDark, headerStyle:{backgroundColor:Colors.primaryColor}})} />
  </HomeStack.Navigator>
)
const SearchStackScreen = () => (
  <SearchStack.Navigator>
    {//<SearchStack.Screen name="Search" component={Search} options={{ title: 'Sign In',headerTintColor:Colors.primaryColorDark,headerTitleAlign:{alignSelf:'center'}, headerStyle:{backgroundColor:Colors.primaryColor}}}/>
   // <SearchStack.Screen name="Search2" component={Search2} options={{ title: 'Sign In',headerTintColor:Colors.primaryColorDark,headerTitleAlign:{alignSelf:'center'}, headerStyle:{backgroundColor:Colors.primaryColor}}}/>
   } 
   <SearchStack.Screen name="MapScreen" component={MapScreens} options={{ title: 'Circuito',headerTintColor:Colors.primaryColorDark,headerTitleAlign:{alignSelf:'center'}, headerStyle:{backgroundColor:Colors.primaryColor}}}/>
   
  </SearchStack.Navigator>
)

const ProfileStack = createStackNavigator();
const ProfileStackScreen= () => (
  <ProfileStack.Navigator>
    {//<ProfileStack.Screen name="Profile" component={Profile} options={{ title: 'Sign In',headerTintColor:Colors.primaryColorDark,headerTitleAlign:{alignSelf:'center'}, headerStyle:{backgroundColor:Colors.primaryColor}}}/>
    }
  </ProfileStack.Navigator>
)

const TabsScreen =() => (
  <Tabs.Navigator>
    <Tabs.Screen name ="Histórico" component={HomeStackScreen}/>
    <Tabs.Screen name ="Iniciar" component={SearchStackScreen}/>
    <Tabs.Screen name ="Treino" component={ProfileStackScreen}/>
  </Tabs.Navigator>
)
const Drawer = createDrawerNavigator();
const DrawerStackScreen = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Home" component={TabsScreen}/>
    <Drawer.Screen name="Profile" component={ProfileStackScreen}/>
  </Drawer.Navigator>
)

const RootStack= createStackNavigator();
const RootStackScreen = ({ userToken }) =>(
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <RootStack.Screen name="App" component={DrawerStackScreen} options ={{animationEnabled: false}}/>
  
    ):(
      <RootStack.Screen name="Auth" component={AuthStackScreen} options ={{animationEnabled: false}}/>
  
    )}
    </RootStack.Navigator>

)
const fetchFonts = () => {
  return  Font.loadAsync({
     'open-sans':require('../assets/fonts/OpenSans-Regular.ttf'),
     'open-sans-bold':require('../assets/fonts/OpenSans-Bold.ttf'),
     'PlutoMedium':require('../assets/fonts/PlutoMedium.otf'),
     'PlutoMediumItalic':require('../assets/fonts/PlutoMedium-Italic.otf')
   })
 }

export default () =>{
  const [isLoading, setIsLoading] = React.useState(true)
  const [userToken, setUserToken] = React.useState(null)

  const authContext = React.useMemo(() => {
    return{
      signIn: () => {
        setIsLoading(false);
        setUserToken('asdf')
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken('asdf')
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null)
      },
  }
  }, [])

  /*----------------seta um tempo na tela de loading (confere se user está logado)---------------------------*/
  if(isLoading){
    return (
        <AppLoading startAsync={fetchFonts} onFinish={() => setIsLoading(false)}/>
    )
  }
  if (isLoading){
    return <Splash/>
  }

  return(
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken}/>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}