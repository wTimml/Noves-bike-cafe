import React from 'react'
import ButtonOneColumn from '../components/buttonOneColumn'
import { View, ScrollView, StyleSheet, TextInput, Dimensions } from 'react-native'

import { SocialIcon } from 'react-native-elements'

import Colors from '../constants/colors'
import ButtonMain from '../components/buttonMain'


import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi  } from 'react-native-textinput-effects';


export default function SignUpScreen (){

    console.log(form)
    const [form, setForm] = React.useState({
        Email:'',
        Password:''
    });

    return(
        <ScrollView style={{backgroundColor:Colors.primaryColorDark}}>
           <View  style={styles.container}>
                <View style={styles.inputView}>
          
                <Fumi
                    label={'Email'}
                    iconClass={FontAwesomeIcon}
                    iconName={'envelope'}
                    iconColor={'#f95a25'}
                    iconSize={20}
                    iconWidth={40}
                    inputPadding={16}
                    
                    name="Email"
                    onChange={(text)=> {setForm({...form, Email:text})}}
                />
                <Fumi
                    label={'Senha'}
                    iconClass={FontAwesomeIcon}
                    iconName={'lock'}
                    iconColor={'#f95a25'}
                    iconSize={25}
                    iconWidth={40}
                    inputPadding={16}
                    
                    name="Password"
                    onChange={(text)=> {setForm({...form, Password:text})}}
                />
                </View>
                <View style={styles.inputView,{alignItems:"center"}}>
            
                    <ButtonMain >Cadastrar</ButtonMain>
        
                </View>
            </View>
        </ScrollView>
    )
    }

const styles = StyleSheet.create({  
    container:{
        flex:1,
        justifyContent: 'center',
        marginBottom: 15,
    },
    inputView:{
        padding:20,
    },
    inputComponent:{
        height:50,
        borderRadius:25,
        backgroundColor:Colors.lightColor,
        marginBottom:12,
        textAlign:'center'
    },

})