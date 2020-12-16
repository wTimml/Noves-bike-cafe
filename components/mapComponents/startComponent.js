import React, {useState,useRef, useEffect} from 'react'
import { View,StyleSheet ,Text, TouchableOpacity } from 'react-native'

import Colors from '../../constants/colors'

const StartComponent = props =>{

    const [timer, setTimer] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const countRef = useRef(null)

    useEffect(() => {
        const timeOut = setTimeout(() => {
            props.handleTimer(timer)
            console.log("useeffect "+ timer)
        },2000); 
        return() => clearTimeout(timeOut)
        },[])
        

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
        props.handleCircuit()
        props.handleTimer(timer)
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
        props.handleTimer(timer)
        
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
        <View>
            <View>
                <Text>{formatTime()}</Text>
            </View>
            <View>
                {
                !isActive && !isPaused ?
                <TouchableOpacity  activeOpacity={0.6} style={styles.button} onPress={handleStart}>
                        <Text style={styles.buttonText}>Start</Text>
                </TouchableOpacity>
                : ( isPaused ?
                    <TouchableOpacity  activeOpacity={0.6} style={styles.button} onPress={handlePause}>
                            <Text style={styles.buttonText}>Pause</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity  activeOpacity={0.6} style={styles.button} onPress={handleResume}>
                        <Text style={styles.buttonText}>Resume</Text>
                    </TouchableOpacity>
                    
                )    
            }
                    <TouchableOpacity  activeOpacity={0.6} style={styles.button} onPress={handleReset}>
                        <Text style={styles.buttonText}>Reset</Text>
                    </TouchableOpacity>
            
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1
    },  
    button:{
        backgroundColor:Colors.primaryColor,
        borderRadius:40,
        marginBottom:12
        
    },buttonText:{
        color:'white',
        //fontFamily:'open-sans',
        fontSize:18,
        textAlign:'center',
        padding:10
    }
})


export default StartComponent