import RecordListScreen from "./recordListScreen"
import React from 'react'
import {Text,View, StyleSheet, Dimensions, ScrollView} from 'react-native'

import Colors from '../../constants/colors'
import Fonts from '../../constants/fonts'

import MapView, { Polyline } from "react-native-maps"

const {width,height} = Dimensions.get("window")

const fontRegular = Fonts.fontRegular
const textSize = 18
const iconSize = 50
const borderwidth = 1.5

const coordinate=[
    {
  latitude: -25.3566955,
  longitude: -57.5995611,
},
 {
  latitude: -25.34990775062222,
  longitude: -57.60963456543024,
},
 {
  latitude: -25.349179803635284,
  longitude: -57.60950948041769,
},
 
 {
  latitude: -25.349178314377706,
  longitude: -57.609509030196485,
 }
];

//Busca o ponto médio do circuito para latitudeDelta e longitudeDelta 
function getRegionForCoordinates(points) {
    // points should be an array of { latitude: X, longitude: Y }
    let minX, maxX, minY, maxY;
  
    // init first point
    ((point) => {
      minX = point.latitude;
      maxX = point.latitude;
      minY = point.longitude;
      maxY = point.longitude;
    })(points[0]);
  
    // calculate rect
    points.map((point) => {
      minX = Math.min(minX, point.latitude);
      maxX = Math.max(maxX, point.latitude);
      minY = Math.min(minY, point.longitude);
      maxY = Math.max(maxY, point.longitude);
    });
  
    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    const deltaX = (maxX - minX);
    const deltaY = (maxY - minY);
  
    return {
      latitude: midX,
      longitude: midY,
      latitudeDelta: deltaX,
      longitudeDelta: deltaY
    };
  }

const RecordDetailScreen = ({route}) =>{

    /*
            <Text style={{fontSize:50}}>{title}</Text>
            <Text style={{fontSize:50}}>{distance}</Text>
            <Text style={{fontSize:50}}>{time}</Text>
            <Text style={{fontSize:50}}>{date}</Text>
*/
    const {title,distance,time,date} = route.params;

 
    
    return(
        <ScrollView style={{backgroundColor:Colors.primaryColorDark}}>
            <View style={styles.mapContainer} >
                <MapView style={{height:250}}  initialRegion={getRegionForCoordinates(coordinate)}> 
                    <Polyline coordinates={coordinate}  strokeWidth={3} strokeColor={Colors.primaryColor} />
                </MapView>
            </View>
            
            
            <View style={styles.borderBottom}>
                <Text style={styles.title}>{title}</Text>
            </View>

            <View style={styles.inLineData}>
                <View style={styles.borderBottomRight}>
                    <Text style={styles.labelText}>Duração:</Text>
                    <Text style={styles.dataText}>{time}</Text>
                </View>
                <View style={styles.borderBottom}>
                    <Text style={styles.labelText}>Data:</Text>
                    <Text style={styles.dataText}>{date}</Text>
                </View>
            </View>

            <View style={styles.inLineData}>
                <View style={styles.borderBottomRight}>
                    <Text style={styles.labelText}>Velocidade Média:</Text>
                    <View style={{flexDirection:"row", alignItems:'center'}}>
                        <Text style={styles.dataText}>{/*      props.distanceTravelled > 0
                            ? parseFloat(props.distanceTravelled / (timer/3600)).toFixed(2)
                            : "0"
    */}</Text>
                        <Text style={styles.dataText}>0 km/h </Text>
                    </View>
                </View>
                <View style={styles.borderBottom}>
                    <Text style={styles.labelText}>Distância:</Text>
                    <Text style={styles.dataText}>{parseFloat(distance).toFixed(2)} km</Text>
                </View>
            </View>

            <View style={styles.inLineData}>
                <View style={styles.borderBottom}>
                    <Text style={styles.labelText}>Altimetria:</Text>
                    <Text style={styles.dataText}>00 m</Text>
                </View>
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mapContainer:{
        shadowColor:'orange',
        shadowOpacity:0.26,
        shadowOffset:{width:0, height:2},
        shadowRadius:10,
        elevation:3,
        borderColor:Colors.primaryColor,
        borderWidth:1
    },
    title:{
        color:Colors.lightColor,
        fontFamily:fontRegular,
        fontSize:iconSize,
        paddingTop:20,
    },
    labelText:{
        color:Colors.lightColor,
        fontFamily:fontRegular,
        fontSize:textSize,
        paddingTop:20,
    },
    dataText:{
        color:Colors.lightColor,
        fontFamily:fontRegular,
        fontSize:textSize,
    },
    borderBottomRight:{
        flex:1,
        borderBottomColor:Colors.primaryColor,
        borderRightColor:Colors.primaryColor,
        borderWidth:borderwidth,
        alignItems:'center',
    },
    borderBottom:{
        flex:1,
        borderBottomColor:Colors.primaryColor,
        borderWidth:borderwidth,
        alignItems:'center',
    },
    inLineData:{
        flexDirection:'row',
    }
})
export default RecordDetailScreen;