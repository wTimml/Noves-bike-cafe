import React from "react";
import {
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
  LogBox,
} from "react-native";
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import haversine from "haversine";

import Colors from "../constants/colors";
import StartComponent from "../components/mapComponents/startComponent";
import LocationPermission from "../components/mapComponents/locationPermission";

import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";

import Icon from "react-native-vector-icons/Feather";
import { ScrollView } from "react-native-gesture-handler";

import Fonts from "../constants/fonts";

const LocationTaskName = "firstTask";

const { width, height } = Dimensions.get("window");
const MapHeight = height * 0.87;

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.02;
const LATITUDE = -25.540794;
const LONGITUDE = -54.5832818;

const iconSize = 18;
const fontRegular = Fonts.fontRegular;

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      mapHeight: MapHeight,
      speed: 0,
      altitude_: 0,
      altitude_Aux: 0,
      altimetria: 0,
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }),

      circuitOn: false,
      marginBottom: 1,
    };
  }

  componentDidMount = async () => {
    await Location.startLocationUpdatesAsync(LocationTaskName, {
      accuracy: Location.Accuracy.Balanced,
      /*            foregroundService:{
                notificationTitle:"Noves Bike",
                notificationBody:"O aplicativo está sendo executado em Background",
                notificationColor:"red",
            },
*/
    });
  };

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  resetCircuit = () => {
    this.setState({
      routeCoordinates: [],
      distanceTravelled: 0,
      circuitOn: false,
    });
  };

  handleCircuit = () => {
    if (this.state.circuitOn === false) {
      this.setState({ circuitOn: true });
    } else {
      this.setState({ circuitOn: false });
    }
  };

  handleMapHeight = () => {
    if (this.state.mapHeight === MapHeight) {
      this.setState({
        mapHeight: MapHeight * 0.1,
      });
    } else {
      this.setState({
        mapHeight: MapHeight,
      });
    }
  };

  calcDistance = (newLatLng) => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  calcAltimetria = () => {
    const { altitude_, altitude_Aux } = this.state;

    let altimetrias = 0;

    if (altitude_Aux === 0) {
      //      console.log("altitude_aux 0")
      this.setState({
        altitude_Aux: altitude_,
      });
    } else if (altitude_ > altitude_Aux) {
      altimetrias = altitude_ - altitude_Aux;

      //         console.log("altitude_ >" + altimetrias)
      this.setState({
        altitude_Aux: altitude_,
      });
    } else if (altitude_Aux > altitude_) {
      this.setState({
        altitude_Aux: altitude_,
      });
      //     console.log("altitude_aux >")
    }
    return altimetrias;
  };

  taskManager = () => {
    TaskManager.defineTask(LocationTaskName, ({ data, error }) => {
      if (error) {
        console.log(error);
        return;
      }
      if (data) {
        const { locations } = data;

        const {
          coordinate,
          routeCoordinates,
          distanceTravelled,
          altimetria,
        } = this.state;
        const { latitude, longitude } = locations[0].coords;
        const { altitude } = locations[0].coords;

        const newCoordinate = {
          latitude,
          longitude,
        };

        LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);

        coordinate.timing(newCoordinate, 1, { useNativeDriver: true }).start();

        if (this.state.circuitOn === true) {
          this.setState({
            latitude,
            longitude,
            routeCoordinates: routeCoordinates.concat([newCoordinate]),
            distanceTravelled:
              distanceTravelled + this.calcDistance(newCoordinate),
            speed: locations[0].coords.speed,
            prevLatLng: newCoordinate,
            altitude_: altitude,
            altimetria: altimetria + this.calcAltimetria(),
          });
        }
      }
    });
  };
  _onMapReady = () => {
    if (this.state.marginBottom === 1) {
      this.setState({ marginBottom: 0 });
    } else {
      this.setState({ marginBottom: 1 });
    }
  };

  render() {
    this.taskManager();

    return (
      <View style={styles.container}>
        <LocationPermission />
        <View style={{ height: this.state.mapHeight, width: width }}>
          {this.state.mapHeight === MapHeight ? (
            <MapView
              style={{ ...styles.map, marginBottom: this.state.marginBottom }}
              provider={PROVIDER_GOOGLE}
              showsUserLocation={true}
              followsUserLocation={true}
              loadingEnabled={false}
              region={this.getMapRegion()}
              showsMyLocationButton={true}
              onMapReady={this._onMapReady}
            >
              <Polyline
                coordinates={this.state.routeCoordinates}
                strokeWidth={3}
                strokeColor={Colors.primaryColor}
                lineCap={"square"}
              />
              {/*<Marker.Animated ref={marker=>{
                                this.marker = marker
                            }} 
                            coordinate={this.state.coordinate}
                            />*/}
            </MapView>
          ) : null}
          {/*quilometragem*/}
          {this.state.mapHeight === MapHeight ? (
            <View style={styles.buttonContainer}>
              <View>
                <TouchableOpacity style={[styles.bubble, styles.button]}>
                  <Text style={styles.bottomBarContent}>
                    {parseFloat(this.state.distanceTravelled).toFixed(2)} km
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
          <View style={styles.buttonContainerRight}>
            <TouchableOpacity
              style={[styles.bubble, styles.button]}
              onPress={() => this.handleMapHeight()}
            >
              <Text style={styles.bottomBarContent}>
                {this.state.mapHeight === MapHeight ? (
                  <Icon name="minimize" size={iconSize} />
                ) : (
                  "Mapa"
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/*cronometro*/}
        <View style={{ flex: 1 }}>
          <ScrollView>
            <StartComponent
              resetCircuit={this.resetCircuit}
              handleCircuit={this.handleCircuit}
              distanceTravelled={this.state.distanceTravelled}
              altimetria={this.state.altimetria}
              speed={this.state.speed}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.primaryColorDark,
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  bubble: {
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 7.5,
  },
  latlng: {
    width: 200,
    alignItems: "stretch",
  },
  button: {
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 0,
  },
  buttonContainerRight: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  bottomBarContent: {
    fontFamily: fontRegular,
  },
});
