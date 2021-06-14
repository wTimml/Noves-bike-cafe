import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import {Alert} from 'react-native';
import { getUser } from '../utils';


const api = axios.create({
    baseURL:'http://192.168.1.40:8090',
    headers:{
        'Content-Type':'application/json',
        Accept:'application/json'  
    },
})

api.interceptors.response.use(
    response => {
        //fazer algo com response data
        return response
    },
    error => {

        console.log("error response use "+error)
        if(
            error.request._hasError === true && 
            error.request._response.includes('connect')
        ){
            Alert.alert(
                'Aviso',
                'Não foi possível conectar aos nossos servidores, sem conexão a internet',
                [ {text: 'OK' } ],
                {cancelable: false },
            )
        }
        if (error.response.status === 401){
            const requestConfig  = error.config

            //Token Expirou

            AsyncStorage.removeItem('@ListApp:userToken')
        }


        return Promise.reject(error)
    },
)
/*
api.interceptors.request.use(
    function (config){

        console.log(JSON.stringify(config))

        return config;
    },
    function(error){
        console.log("error config "+ error)
        return Promise.reject(error)
    }

*/

api.interceptors.request.use(
    config => {
        return getUser()
        .then(user => {
            user = JSON.parse(user)
            if(user && user.token)
                config.headers.Authorization = `${user.authType} ${user.token}`
                return Promise.resolve(config)
        })
        .catch(error => {
            console.log("catch request use config " +error)
            return Promise.resolve(config)
        })
    },
    error => {
        console.log("error config "+ error)
        return Promise.reject(error)
    },
    )

export default api