import React from 'react';
import {View, Text, StyleSheet,TouchableOpacity, Alert} from 'react-native'
import Colors from '../constants/colors'

const MainButton = props => {
    return(
        <TouchableOpacity  activeOpacity={0.6}onPress={props.onPress}>
            <View style={{...styles.button, ...props.style}} >
                <Text style={styles.buttonText}>
                    {props.children}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({  
    button:{
        backgroundColor:Colors.primaryColor,
        height:40,
        width:120,
        borderRadius:25
        
    },
    buttonText:{
        color:'black',
        //fontFamily:'open-sans',
        fontSize:18,
        textAlign:'center',
        marginTop:8
    }
})

export default MainButton;