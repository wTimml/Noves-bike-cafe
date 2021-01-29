import React from 'react'
import { Text } from 'react-native';
import {TouchableOpacity, Platform,TouchableNativeFeedback,Image,StyleSheet,View} from 'react-native'
import Font from '../constants/fonts'
import Colors from '../constants/colors'


const userCard = (props) =>{ 
    let TouchableCmp = TouchableOpacity;
    if(Platform.OS === 'android' && Platform.Version >= 21){
        TouchableCmp = TouchableNativeFeedback
    }
    
    return(
    <TouchableCmp >
        <View style={{...styles.container, ...props.style}}>
            <View style={{padding:5}}>
                <Image  style={styles.imageContainer} source={require("../logos/default-profile-icon.png")} /> 
            </View>
            
            <View style={styles.textContainer}>
                <Text style={styles.title}>Lucas Timm</Text>
                <Text style={styles.subTitle}>Lucas@Timm.com</Text>
            </View>

        </View>
    </TouchableCmp>
)
}
const styles = StyleSheet.create({
    container:{
       flexDirection:'row',
       shadowColor:'black',
       shadowOpacity:0.26,
       shadowOffset:{width:0, height:2},
       shadowRadius:10,
       elevation:3,
       height:110,
       backgroundColor:Colors.primaryColorDark
    },
    textContainer:{
        justifyContent:'center',
        alignItems:'center'
    },
    imageContainer:{
        height:100,
        width:100,
        borderRadius:25
    },
    title:{
        fontFamily:Font.fontRegular,
        fontSize:26,
        color:'#fff'
    },
    subTitle:{
        fontFamily:Font.fontRegular,
        fontSize:18,
        color:'gray',
        padding:10,
        paddingLeft:20
    }
    
})

export default userCard;