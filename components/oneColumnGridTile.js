import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform,TouchableNativeFeedback} from 'react-native'
import Font from '../constants/fonts'
import Colors from '../constants/colors'



const OneColumnGridTile = props => {

    let TouchableCmp = TouchableOpacity;
    if(Platform.OS === 'android' && Platform.Version >= 21){
        TouchableCmp = TouchableNativeFeedback
    }
        return (
            <View style={styles.gridItem}>
                <TouchableCmp style={{flex:1}} onPress={props.onSelect}>
                    <View style={{ ...styles.container, ...{backgroundColor:Colors.primaryColor}}}>
                        <View style={styles.subContainer}>
                           <Text style={styles.title}  numberOfLines={2}>{props.title}</Text>
                            <Text style={styles.subTitle}>{props.date}</Text>
                        </View>
                        <View style={styles.subContainer}>
                            <Text style={styles.subTitle}>{props.distance}</Text>
                            <Text style={styles.subTitle}>{props.time}</Text>
                        </View>
                    </View>
                </TouchableCmp>
            </View>
        )
    }

    const styles = StyleSheet.create({
        gridItem:{
            flex:1,
            margin:15,
            height:70,
            borderRadius:10,
            overflow:'hidden'
        },
        container:{
            flex:1,
            borderRadius:10,
            shadowColor:'black',
            shadowOpacity:0.26,
            shadowOffset:{width:0, height:2},
            shadowRadius:10,
            elevation:3,
            padding:15,
        },
        title:{
            fontFamily:Font.fontRegular,
            fontSize:22
        },
        subTitle:{
            fontFamily:Font.fontRegular,
            fontSize:15,
        },
        subContainer:{
            flexDirection:'row',   
            justifyContent:'space-around',
            alignItems:'center'
        }
    })

export default OneColumnGridTile;