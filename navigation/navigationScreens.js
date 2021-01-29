import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

import SignUpScreen from '../screens/signUpScreen'
import SignInScreen from '../screens/signInScreen'
import MapScreen from '../screens/mapScreen'
import ProfileScreen from '../screens/profile/profileScreen'
import RecordDetailScreen from '../screens/profile/recordDetailScreen'
import RecordListScreen from '../screens/profile/recordListScreen'

import Colors from '../constants/colors'


import {AuthContext} from '../context'



/*----------------------------------------*/
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        paddingHorizontal:20,
        paddingVertical:10,
        marginVertical:10,
        borderRadius:5
    }
});

const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
)

export const Home = ({navigation}) => (
    <ScreenContainer>
        <Text>master List Screen</Text>
        <Button title="Example" onPress={() => navigation.push("Details", { name :"Example"})}/>
        <Button title="Example" onPress={() => navigation.push("Details", { name :"Example School"})}/>
        <Button title="Drawer" onPress={() => navigation.toggleDrawer()}/>
    </ScreenContainer>
)

export const Details = ({ route }) => (
    <ScreenContainer>
        <Text>Details Screen</Text>
        {route.params.name && <Text> {route.params.name} </Text>}
    </ScreenContainer>
)

export const MapScreens = ({navigation})=>(
    <ScreenContainer>
        <MapScreen/>
    </ScreenContainer>
) 

export const Search = ({ navigation }) => (
    <ScreenContainer>
        <Text>Search Screen</Text>
        <Button title ="Search 2" onPress={() => navigation.push("Search2")}/>

        {/*-----navigation.navigate -> entrou no details da outra tab -------*/}
        <Button
            title="React Native"
            onPress={() => { navigation.navigate("Home", {
                screen: "Details",
                params: { name:"React Native"}
            })}}
        />
    </ScreenContainer>
)

export const Search2 = () =>(
    <ScreenContainer>
        <Text>Search2 Screen</Text>
    </ScreenContainer>
)

export const Profile= ({navigation}) => {
    const { signOut } = React.useContext(AuthContext);
    return(
        <ProfileScreen navigation={navigation}/>
    )}
export const RecordList = ({navigation,route}) =>{
    return(
        <View style={{backgroundColor:Colors.primaryColorDark}}>
           <RecordListScreen navigation={navigation} route={route}/>
        </View>
    )
}
export const RecordDetail = ({navigation,route}) =>{
    return(
        <RecordDetailScreen  navigation={navigation} route={route} />
    )
}

export const Splash = () => (
    <ScreenContainer>
        <Text>Loading...</Text>
    </ScreenContainer>
)

export const SignInTeste = ({ navigation }) => {
    const { signIn } = React.useContext(AuthContext);

    return(
        <ScreenContainer>
            <Text>Sign In Screen</Text>
            <Button title ="Sign In" onPress={() => signIn()}/>
            <Button 
                title="Create Account" 
                onPress={()=> navigation.push("CreateAccount")}/>
        </ScreenContainer>
    )
}

export const CreateAccount=() => {
    const {signUp} = React.useContext(AuthContext)
    return( 
        <SignUpScreen/>
       )
}

export const SignIn =({navigation}) => {
    const {signIn} = React.useContext(AuthContext)
    return( 
        <SignInScreen signin={()=> signIn()} navigation={navigation}/>    
       )
}


{/*
    <ScreenContainer>
    <Text>Create Account Screen</Text>
    <Button title="Sign Up" onPress={()=> signUp()} />
</ScreenContainer>
*/}













