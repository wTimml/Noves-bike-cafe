import React from 'react'
import  {
    StyleSheet,
    View,
    Platform,
    Dimensions,
    SafeAreaView,
    Text,
    TouchableOpacity,
    PermissionsAndroid,
    Alert,
    YellowBox,
    LogBox
} from 'react-native'
import MapView, { Marker, AnimatedRegion,Polyline,PROVIDER_GOOGLE }from "react-native-maps"
import haversine from "haversine"

import Colors from '../constants/colors'
import StartComponent from '../components/mapComponents/startComponent'
import LocationPermission from '../components/mapComponents/locationPermission'

import * as TaskManager from 'expo-task-manager'
import * as Location  from 'expo-location'

import Icon from 'react-native-vector-icons/Feather'
import { ScrollView } from 'react-native-gesture-handler'

import Fonts from '../constants/fonts'

const LocationTaskName = 'firstTask'

const {width,height} = Dimensions.get("window")
const MapHeight = height*0.87

const ASPECT_RATIO = width / height

const LATITUDE_DELTA = 0.010;
const LONGITUDE_DELTA = 0.10;
const LATITUDE = -25.540794;
const LONGITUDE = -54.5832818

const iconSize = 18
const fontRegular = Fonts.fontRegular

export default class MapScreen extends React.Component{
    
    

    constructor(props){
        super(props)

        this.state = {
            latitude : LATITUDE,
            longitude : LONGITUDE,
            routeCoordinates: [],
            distanceTravelled: 0,
            prevLatLng: {},
            mapHeight:MapHeight,
            coordinate: new AnimatedRegion({
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: 0,
                longitudeDelta:0
            }),
            
            circuitOn : false
        }
    }

    

    componentDidMount = async () =>  {
        await Location.startLocationUpdatesAsync(LocationTaskName, {
            accuracy: Location.Accuracy.Balanced,
            foregroundService:{
                notificationTitle:"Noves Bike",
                notificationBody:"O aplicativo está sendo executado em Background",
                notificationColor:"red",
            },
        })
    }

    componentWillUnmount(){
        navigator.geolocation.clearWatch(this.watchID)
    }

    getMapRegion = () => ({
        latitude:this.state.latitude,
        longitude:this.state.longitude,
        latitudeDelta:LATITUDE_DELTA,
        longitudeDelta:LONGITUDE_DELTA
    })

    resetCircuit = () => {
        this.setState({
            routeCoordinates:[],
            distanceTravelled: 0,
            circuitOn:false,
        })
    }

    handleCircuit = () => {
        if(this.state.circuitOn === false){
            this.setState({circuitOn:true})
        }
        else {
                this.setState({circuitOn:false})
        }
    }

    handleMapHeight = () => {
        console.log("mapheight"+this.state.mapHeight)

        if(this.state.mapHeight===MapHeight){
            this.setState({
                mapHeight:MapHeight*0.1
            })
        }else{
            this.setState({
                mapHeight:MapHeight
            })
        }
    }

    calcDistance = newLatLng => {
        const { prevLatLng} = this.state;
        return haversine(prevLatLng, newLatLng) || 0;
    }


   taskManager = () =>{
        TaskManager.defineTask(LocationTaskName, ({data, error}) => {
            if(error){
                console.log(error)
                return;
            }
            if(data){
                const {locations} = data;
                console.log("locations ", locations)
                console.log(locations[0].coords.latitude)

                

                const { coordinate, routeCoordinates, distanceTravelled } = this.state;
                const { latitude, longitude } = locations[0].coords
            
                const newCoordinate = {
                    latitude,
                    longitude
                };

                LogBox.ignoreLogs(['Animated: `useNativeDriver`']);

                coordinate.timing(newCoordinate,1,{useNativeDriver: true}).start()

                if(this.state.circuitOn === true){
                    this.setState({
                        latitude,
                        longitude,
                        routeCoordinates: routeCoordinates.concat([newCoordinate]),
                        distanceTravelled: distanceTravelled + this.calcDistance(newCoordinate),
                        prevLatLng: newCoordinate
                    });
                }
          
            }

    
        })
    }
   
    render(){
        this.taskManager()
        
        return(
            <View style={styles.container}>
                <LocationPermission/>
                <View style={{height:this.state.mapHeight, width:width}}>
                   {
                   this.state.mapHeight===MapHeight ?
                    <MapView    style={[styles.map]}
                                provider={PROVIDER_GOOGLE}   
                                showsUserLocation
                                followsUserLocation
                                loadingEnabled
                                region={this.getMapRegion()}>

                            <Polyline coordinates={this.state.routeCoordinates} strokeWidth={3} strokeColor={Colors.primaryColor}/>
                            {/*<Marker.Animated ref={marker=>{
                                this.marker = marker
                            }} 
                            coordinate={this.state.coordinate}
                            />*/}
                    </MapView>
                    :
                    null
}
                    {/*quilometragem*/}
                    {this.state.mapHeight===MapHeight ?
                    <View style={styles.buttonContainer}>

                        <View >
                            <TouchableOpacity style={[styles.bubble, styles.button]}>
                                <Text style={styles.bottomBarContent}>
                                    {parseFloat(this.state.distanceTravelled).toFixed(2)} km
                                </Text>
                            </TouchableOpacity>
                            </View>
                    </View>
                    :
                    null
                    }    
                    <View style={styles.buttonContainerRight}>
                        <TouchableOpacity style={[styles.bubble, styles.button]} onPress={() =>this.handleMapHeight()}>
                            <Text style={styles.bottomBarContent}>
                            {this.state.mapHeight===MapHeight ?
                                <Icon name='minimize' size={iconSize}/>
                                :
                                'Mapa'
                            }
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/*cronometro*/}
                <View style={{flex:1}}>
                    <ScrollView>
                        <StartComponent  resetCircuit={this.resetCircuit} handleCircuit={this.handleCircuit} handleTimer={this.handleTimer} distanceTravelled={this.state.distanceTravelled}/>
                    </ScrollView>
                </View>
            </View>
        )
    }

 }

 
 

const styles = StyleSheet.create({
    container : {
        ...StyleSheet.absoluteFillObject,
        backgroundColor:Colors.primaryColorDark,
        alignItems:"center",
    },
    map:{
        ...StyleSheet.absoluteFillObject
    },
    bubble:{
        backgroundColor: "rgba(255,255,255,0.7)",
        paddingHorizontal:18,
        paddingVertical:12,
        borderRadius:20,
    },
    latlng:{
        width:200,
        alignItems:"stretch"
    },
    button:{
        paddingHorizontal:12,
        alignItems:"center",
        marginHorizontal:10, 
    },
    buttonContainer:{
        flex:1,
        flexDirection:"row",
        marginVertical:20,
        backgroundColor:"transparent",
        position:"absolute",
        bottom:0,
    },
    buttonContainerRight:{
        flex:1,
        flexDirection:"row",
        marginVertical:20,
        backgroundColor:"transparent",
        position:"absolute",
        bottom:0,
        right:0,
    },
    bottomBarContent:{
        fontFamily:fontRegular
    }
})