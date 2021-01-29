import React from 'react'
import { View } from 'react-native'
import { FlatList,StyleSheet,Text} from 'react-native'

import UserCard from '../../components/userCard'
import ButtonOneColumn from '../../components/buttonOneColumn'

import Colors from '../../constants/colors'



const profileScreen = props =>{

    return(
        <View style={styles.container}>
    
            <UserCard/>

            <View style={styles.buttonsContainer}>
                <ButtonOneColumn onPress={() => props.navigation.push("RecordList")}>Registro de Atividades</ButtonOneColumn>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.primaryColorDark,
    },
    buttonsContainer:{
        alignItems:'center',
        padding:10
    }
})

export default profileScreen