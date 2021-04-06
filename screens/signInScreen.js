import React, { useState } from 'react'
import { View, ScrollView, StyleSheet, TextInput, Image,Text,TouchableOpacity } from 'react-native'


import Icon from 'react-native-vector-icons/MaterialIcons'
import { SocialIcon } from 'react-native-elements'

import Colors from '../constants/colors'
import Fonts from '../constants/fonts'

import SignInScreenEmail from './signInScreenEmail'
import MainButton from '../components/buttonOneColumn'

Icon.loadFont();

export default function SignInScreen ({navigation, signIn}){

    const [byEmail,setByEmail] = useState(false)
    const [isAuthenticated,setIsAuthenticated] = useState(false)
    

    const handleChange = () => {
        setByEmail(
            false
        )
    }

    //Header left condicional para o Usuario voltar às opçoes de cadastro com redes sociais
    React.useLayoutEffect(()=> {
        byEmail ?
        navigation.setOptions({
            headerLeft:() => ( 
            <TouchableOpacity onPress={handleChange}>
                <Icon name="arrow-back" size={30} color={Colors.primaryColorDark} style={{paddingLeft:5}} activeOpacity={0.5}/>
            </TouchableOpacity> )
        })
        :   
        navigation.setOptions({headerLeft:null})
    
    })
    
    return(
        
        <ScrollView style={styles.container}>
            <View style={styles.inputView}>
                <Image source={{uri: 'https://scontent.fbfh3-2.fna.fbcdn.net/v/t1.0-9/68878112_2370529246494639_1536561138970394624_n.png?_nc_cat=103&_nc_sid=09cbfe&_nc_eui2=AeEgrll6zefH68fEb0MiJLArQ1JEYUSYGcRDUkRhRJgZxFP2KCGikb4SJFbyV9nCr8JjsdOfL9W08mmZUiGQxGHb&_nc_ohc=Dg-Ok0DZRVgAX-2jKym&_nc_ht=scontent.fbfh3-2.fna&oh=3fe5757b35e4de95fa5b07aa94875a57&oe=5FAFEF38'}}
        style={{width: 300, height: 300}} />
                <Image source={{uri: 'https://imgur.com/bsZ9uQu.png'}} style={{width: 160, height: 60, marginTop:-35, marginBottom:55}} />
            </View>

            <View>
{
            byEmail
            ?
            <SignInScreenEmail isByEmail={handleChange} navigation={navigation} signInToHome={signIn}/>
            :

            <View style={styles.inputView}  >

                <TouchableOpacity onPress={() => setByEmail(true)} activeOpacity={0.6} style={{
                    backgroundColor:Colors.primaryColor,
                    height:50,
                    width:250,
                    borderRadius:25,
                    marginBottom:12,
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 10,
                        flexDirection:'row',
                }}> 
                    <Icon name="email" size={30} color="#FFF"/>
                    <Text style={{
                        color:'white',
                        //fontFamily:Fonts.fontRegular,
                        fontSize:16,
                        marginLeft:10
                    }}
                    >Entrar Com Email</Text>
                </TouchableOpacity>

                <SocialIcon
                    title='Entrar Com Google'
                    button
                    type='google'
                    style={{width:250}}
                />
                <SocialIcon
                    title='Entrar Com Facebook'
                    button
                    type='facebook'
                    style={{width:250}}
                    onPress={() => signIn()}
                />
            </View>
}
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
        alignItems:"center"
    },
    inputComponent:{
        height:50,
        width:200,
        borderRadius:25,
        backgroundColor:Colors.lightColor,
        marginBottom:12,
        textAlign:'center'
    },
    image:{
        width:'100%',
        height:'100%',
    },
    textLink:{
        color:'#CBB693',
        marginRight:10,
        marginLeft:10
    }
})