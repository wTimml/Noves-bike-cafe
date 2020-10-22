import React from 'react'
import ButtonOneColumn from '../components/buttonOneColumn'
import { View, ScrollView, StyleSheet, TextInput, Image,Text } from 'react-native'

import { SocialIcon } from 'react-native-elements'

import Colors from '../constants/colors'
import ButtonMain from '../components/buttonMain'


export default function SignInScreen (){
    return(
        <ScrollView style={styles.container}>
            <View style={styles.inputView}>
                <Image source={{uri: 'https://scontent.fbfh3-2.fna.fbcdn.net/v/t1.0-9/68878112_2370529246494639_1536561138970394624_n.png?_nc_cat=103&_nc_sid=09cbfe&_nc_eui2=AeEgrll6zefH68fEb0MiJLArQ1JEYUSYGcRDUkRhRJgZxFP2KCGikb4SJFbyV9nCr8JjsdOfL9W08mmZUiGQxGHb&_nc_ohc=Dg-Ok0DZRVgAX-2jKym&_nc_ht=scontent.fbfh3-2.fna&oh=3fe5757b35e4de95fa5b07aa94875a57&oe=5FAFEF38'}}
        style={{width: 300, height: 300}} />
                <Image source={{uri: 'https://imgur.com/bsZ9uQu.png'}} style={{width: 180, height: 70, marginTop:-35, marginBottom:15}} />
            </View>

            <View style={styles.inputView}>
                <TextInput style={styles.inputComponent} placeholder="usuario"/>
                <TextInput style={styles.inputComponent} placeholder="senha"/>
            </View>
            <View style={styles.inputView}>
                <Text style={styles.textLink}>Esqueceu sua senha?</Text>
                <ButtonMain style={{margin:10}}>Entrar</ButtonMain>
                <View style={{flex:1,flexDirection:'row', marginBottom:20}}>
                    <Text style={styles.textLink}>Não possui conta?</Text>
                    <Text style={{color:Colors.lightColor}}>Cadastrar</Text>
                </View>    
            </View>
            <View style={styles.inputView} >
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
                />
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