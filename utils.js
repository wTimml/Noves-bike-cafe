import AsyncStorage from '@react-native-async-storage/async-storage'

export async function  getUser (){
    try{
        return await AsyncStorage.getItem('@ListApp:userToken')
    }catch(e){
        throw e
    }
}

export async function getUserEmail(){
    try{
        return await AsyncStorage.getItem('@ListApp:userEmail')  
    }catch(e){
        throw e
    }
}

export async function storeUser(){
    try{
        return await AsyncStorage.setItem('@ListApp:userToken', JSON.stringify(userToken));
    }catch(e){
        throw e
    }
}

async function delUser() {
    await AsyncStorage.removeItem('@ListApp:userToken')
    await AsyncStorage.removeItem('@ListApp:userEmail')  
}
export async function deleteUser(){
    try{
        
        return delUser()
    }catch(e){
        throw e
    }
}
