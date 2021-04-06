import React, {useState} from 'react'
import ButtonOneColumn from '../components/buttonOneColumn'
import { View, ScrollView, StyleSheet, Text, ActivityIndicator,Image, Alert } from 'react-native'
import { Input } from 'react-native-elements'

import Colors from '../constants/colors'
import ButtonMain from '../components/buttonMain'

import api from '../services/api'
import { Button } from 'react-native'

const SignUpScreen= ({navigation,signInToHome})=> {

    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
        email:'',
        password:''
    });
    
    const [errorMesage, setErrorMessage] = useState("");


    const createAlert = () => 
    Alert.alert(
        'Cadastrado',
        'Cadastrado com Sucesso!',
    [
        {
            text: 'Prosseguir', onPress:() =>  navigation.push('SignIn') // PÓS CADASTRO JOGAR PARA TELA DE LOGIN
        }
    ]
    )

     async function signUp(){

        if(state.email){

        setLoading(true)

        

        try{
            const email=state.email
            const password=state.password
            const authorities = 'USER'

            api
                .post('/users', { email, password, authorities }) 
                .then(res => {
                    if(res.status === 201){ 
                        createAlert()
                    }else{ 
                        setErrorMessage("Email e/ou senha preenchido incorretamente")
                    }
                })
                .catch(e => {
                    setLoading(false)
                    setErrorMessage("Email ja cadastrado")
                })
                //api.get('')
                

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
                <Image source={{uri: 'https://scontent.fbfh3-2.fna.fbcdn.net/v/t1.0-9/68878112_2370529246494639_1536561138970394624_n.png?_nc_cat=103&_nc_sid=09cbfe&_nc_eui2=AeEgrll6zefH68fEb0MiJLArQ1JEYUSYGcRDUkRhRJgZxFP2KCGikb4SJFbyV9nCr8JjsdOfL9W08mmZUiGQxGHb&_nc_ohc=Dg-Ok0DZRVgAX-2jKym&_nc_ht=scontent.fbfh3-2.fna&oh=3fe5757b35e4de95fa5b07aa94875a57&oe=5FAFEF38'}}
                    style={{width: 300, height: 300}} />
                <Image source={{uri: 'https://imgur.com/bsZ9uQu.png'}} style={{width: 160, height: 60, marginTop:-35, marginBottom:55}} />
            </View>

            <View style={styles.inputView}>
            
                <Text style={{color:'red', textAlign:'center'}}> {errorMesage}</Text>

                <Input style={styles.inputComponent}
                    placeholder="email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={text => setState({...state, email:text})}
                    />

                <Input style={styles.inputComponent} 
                    placeholder="senha"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    onChangeText={text => setState({...state, password:text})}
                    />
                    <Text>Senha com 8 caracteres ou mais</Text>

                <ButtonMain style={{margin:10}} onPress={signUp}>
                
                    {loading ?(
                        <ActivityIndicator size="small" color="#FFF"/>
                    ):(
                        <Text>Cadastrar</Text>
                    )
                    }
                </ButtonMain>
                </View>
            <View style={styles.inputView}>
                <View style={{flex:1,flexDirection:'row', marginBottom:20}}>
                    <Text style={styles.textLink}>Já possui conta?</Text>
                    <Text onPress={() => navigation.push("SignIn")} style={{color:Colors.lightColor}}>Entrar</Text>
                </View>    

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