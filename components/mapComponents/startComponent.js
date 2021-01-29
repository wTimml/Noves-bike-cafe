import React, {useState,useRef, useEffect} from 'react'
import { View,StyleSheet ,Text, TouchableOpacity,Dimensions } from 'react-native'

import Colors from '../../constants/colors'
import Fonts from '../../constants/fonts'

import Icon from 'react-native-vector-icons/Feather'
import { ScrollView } from 'react-native-gesture-handler'


const {width,height} = Dimensions.get("window")

const iconSize = 50
const textSize = 18
const borderwidth = 0.7
const fontRegular = Fonts.fontRegular

const StartComponent = props =>{

    const [timer, setTimer] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(false)

    const countRef = useRef(null)

    const handleStart= () => {
        setIsActive(true)
        setIsPaused(true)
        countRef.current = setInterval(() => {
            setTimer((timer) => timer+1)
        }, 1000)

        props.handleCircuit()
    }

    const handlePause= () => {
        clearInterval(countRef.current)
        setIsPaused(false)

        console.log( props.distanceTravelled )
        console.log( props.distanceTravelled / (timer/3600))

        props.handleCircuit()
    }
    const handleResume= () => {
        setIsPaused(true)
        countRef.current = setInterval(()=>{
            setTimer((timer) => timer +1)
        }, 1000)
        props.handleCircuit()
    }
    const handleReset= () => {
        clearInterval(countRef.current)
        setIsActive(false)
        setIsPaused(false)

        props.handleCircuit()
        props.resetCircuit()

        
        setTimer(0)
    }
    const formatTime =() => {
        const getSeconds = `0${(timer % 60)}`.slice(-2)  
        const minutes = `${Math.floor(timer / 60)}`
        const getMinutes = `0${minutes % 60}`.slice(-2)
        const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

        return `${getHours}: ${getMinutes} : ${getSeconds}`
    }

    return(
        <View style={{alignItems:'center'}} >
           {
                    isActive  ?
                    <View>
                    <TouchableOpacity  activeOpacity={0.6} style={styles.button} onPress={handleReset}>
                        <Text style={styles.buttonText}>Finish</Text>
                    </TouchableOpacity>
                    </View>
                    :null
            }
            <View style={styles.borderTop}>
                <Text style={styles.labelText}>Duração:</Text>
                <Text style={styles.dataText}>{formatTime()}</Text>
            </View>
            <View style={styles.borderMiddle}>
                <Text style={styles.labelText}>Velocidade:</Text>
                <View style={{flexDirection:"row", alignItems:'center'}}>
                    <Text style={styles.dataText}>{parseFloat(props.speed).toFixed(2)} </Text>
                    <Text style={styles.labelText}>km/h </Text>
                </View>
            </View>
            <View style={styles.borderMiddle}>
                <Text style={styles.labelText}>Velocidade Média:</Text>
                <View style={{flexDirection:"row", alignItems:'center'}}>
                    <Text style={styles.dataText}>{
                        props.distanceTravelled > 0
                        ? parseFloat(props.distanceTravelled / (timer/3600)).toFixed(2)
                        : "0"

                    } </Text>
                    <Text style={styles.labelText}>km/h </Text>
                </View>
            </View>
            <View style={styles.borderMiddle}>
                <Text style={styles.labelText}>Distância:</Text>
                <Text style={styles.dataText}>{parseFloat(props.distanceTravelled).toFixed(2)} km</Text>
            </View>
            <View style={styles.borderTop}>
                <Text style={styles.labelText}>Altimetria:</Text>
                <Text style={styles.dataText}>{parseFloat(props.altimetria).toFixed(1)} m</Text>
            </View>



            <View style={styles.buttons} >
            
                {
                !isActive && !isPaused ?
                <TouchableOpacity  activeOpacity={0.6} style={styles.button} onPress={handleStart}>
                        <Text style={styles.buttonText}><Icon name='play' size={iconSize}/></Text>
                </TouchableOpacity>
                : ( isPaused ?
                    <TouchableOpacity  activeOpacity={0.6} style={styles.button} onPress={handlePause}>
                            <Text style={styles.buttonText}><Icon name='pause' size={iconSize}/></Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity  activeOpacity={0.6} style={styles.button} onPress={handleResume}>
                        <Text style={styles.buttonText}>Resume</Text>
                    </TouchableOpacity>
                    
                )    
            }
            
             </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
    },  
    button:{
        backgroundColor:Colors.primaryColor,
        borderRadius:100,
    },
    buttons:{
        bottom:0,
        paddingTop:40,
        flexDirection:'row',
    },
    buttonText:{
        color:'white',
        fontFamily:fontRegular,
        fontSize:textSize,
        textAlign:'center',
        padding:20,
        
    },
    labelText:{
        color:Colors.lightColor,
        fontFamily:fontRegular,
        fontSize:textSize,
        textAlign:'center',
        paddingTop:20,
        
    },
    dataText:{
        color:Colors.lightColor,
        fontFamily:fontRegular,
        fontSize:iconSize,
        textAlign:'center',
    },
    borderBottom:{
        borderTopColor:Colors.primaryColor,
        borderTopWidth:borderwidth,
        width: width/2
    },
    borderMiddle:{
        borderBottomColor:Colors.primaryColor,
        borderBottomWidth:borderwidth,
        alignItems:'center',
        width: width
    },
    borderTop:{
        borderBottomColor:Colors.primaryColor,
        borderBottomWidth:borderwidth,
        width:width
    }
})


export default StartComponent