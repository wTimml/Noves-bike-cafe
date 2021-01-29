import React from 'react'
import { View,StyleSheet, TextInput,Text } from 'react-native'

import ButtonMain from '../components/buttonMain'

import Colors from '../constants/colors'


const SignInScreenEmail =({navigation},props) =>{

    return(
        <View >
            <View style={styles.inputView}>
                <TextInput style={styles.inputComponent} placeholder="usuario"/>
                <TextInput style={styles.inputComponent} placeholder="senha"/>
            </View>
            <View style={styles.inputView}>
                <Text style={styles.textLink}>Esqueceu sua senha?</Text>
                <ButtonMain style={{margin:10}}>Entrar</ButtonMain>
                <View style={{flex:1,flexDirection:'row', marginBottom:20}}>
                    <Text style={styles.textLink}>Não possui conta?</Text>
                    <Text  onPress={() => navigation.push("CreateAccount")} style={{color:Colors.lightColor}} >Cadastrar</Text>
                </View>    

            </View>
            <Text onPress={props.isByEmail} style={{paddingLeft:40,fontSize:18, color:Colors.lightColor}}> {'<<'} Voltar</Text>
            
        </View>
    )
}

const styles = StyleSheet.create({  
    inputView:{
        flex:1,
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        
    },
    inputComponent:{
        height:50,
        width:200,
        borderRadius:25,
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

export default SignInScreenEmail