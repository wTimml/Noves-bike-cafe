import React, {useState} from 'react'
import { View, ScrollView, StyleSheet, Text, ActivityIndicator } from 'react-native'
import { Input } from 'react-native-elements'

import Colors from '../../../constants/colors'
import ButtonMain from '../../../components/buttonMain'

import {getUserEmail} from '../../../utils'

import {CommonActions} from "@react-navigation/native"

import api from '../../../services/api'
function SignUpScreen({navigation}) {

    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
        firstName:'',
        lastName:'',
        picture:''
    });
    
    const [errorMesage, setErrorMessage] = useState("");


    const createAlert = () => {
        navigation.dispatch(
            CommonActions.reset({
                index:0,
                routes:[
                    { name:"Profile" },
                ]
            })
        )
       
    }

     async function signUp(){
        if(state.firstName){

        setLoading(true)

        

        try{
            const firstName = state.firstName
            const lastName = state.lastName
            const picture = state.picture
            api
                .post('/profile/', { firstName, lastName, picture }) 
                .then(res => {
                    if(res.status === 200){ 
                        setErrorMessage("")
                        createAlert()
                        console.log(res.data)
                    }else{ 
                        setErrorMessage("Email e/ou senha preenchido incorretamente")

                    }
                })
                .catch(e => {
                    setLoading(false)
                    setErrorMessage("Erro no servidor")
                    
                })
                

                setLoading(false)
            
 
            }catch(e){
                console.log("catch signIn" +e)
                setLoading(false)
                setErrorMessage("Email ja está em uso")
            }}
    }


    return(
        <ScrollView style={styles.container}>

            <View style={styles.inputView}>
            
                <Text style={{color:'red', textAlign:'center'}}> {errorMesage}</Text>

                <Input style={styles.inputComponent}
                    placeholder="Nome"
                    autoCorrect={false}
                    onChangeText={text => setState({...state, firstName:text})}
                    />

                <Input style={styles.inputComponent} 
                    placeholder="Sobrenome"
                    autoCorrect={false}
                    onChangeText={text => setState({...state, lastName:text})}
                    />
                <Input style={styles.inputComponent} 
                    placeholder="Foto de perfil"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={text => setState({...state, picture:text})}
                    />
                    

                <ButtonMain style={{margin:10}} onPress={() => signUp()}>
                
                    {loading ?(
                        <ActivityIndicator size="small" color="#FFF"/>
                    ):(
                        <Text>Confirmar</Text>
                    )
                    }
                </ButtonMain>
                </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({  
    container:{
        flex:1,
        backgroundColor:Colors.primaryColorDark,
    },
    inputView:{
        flex:1,
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        
    },
    inputComponent:{
        height:50,
        width:200,
        borderRadius:15,
        backgroundColor:Colors.lightColor,
        marginBottom:12,
        textAlign:'center'
    },
    textLink:{
        color:'#CBB693',
        marginRight:10,
        marginLeft:10
    }
})

export default SignUpScreen;