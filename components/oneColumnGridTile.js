import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from "react-native";
import Font from "../constants/fonts";
import Colors from "../constants/colors";

const formatTime =(time) => {

  const getSeconds = `0${(time % 60)}`.slice(-2)  
  const minutes = `${Math.floor(time / 60)}`
  const getMinutes = `0${minutes % 60}`.slice(-2)
  const getHours = `0${Math.floor(time / 3600)}`.slice(-2)

  return `${getHours}: ${getMinutes} : ${getSeconds}`
}

const OneColumnGridTile = (props) => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  const { distance } = props


  return (
    <View style={styles.gridItem}>
      <TouchableCmp style={{ flex: 1 }} onPress={props.onSelect}>
        <View
          style={{
            ...styles.container,
            ...{ backgroundColor: Colors.primaryColor },
          }}
        >
          <View style={styles.subContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {props.title}
            </Text>
            <Text style={styles.subTitle}>{parseFloat(distance).toFixed(2)} km/h</Text>
          </View>
          
          <View style={styles.subContainer}>
            <Text style={styles.title}>{props.date}</Text>
            <Text style={styles.subTitle}>{formatTime(props.time)}</Text>
          </View>
          
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 12,
    height: 75,
    borderRadius: 7.5,
    overflow: "hidden",
  },
  container: {
    flex: 1,
    borderRadius: 7.5,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 15,
    justifyContent: "space-around",
    flexDirection:'row'
  },
  title: {
    fontFamily: Font.fontRegular,
    fontSize: 22,
    color: "#fff",
    paddingBottom:5
  },
  subTitle: {
    fontFamily: Font.fontRegular,
    fontSize: 15,
    color: "#fff",
  },
  subContainer: {
    flexDirection: "column",
    alignContent:'center',
    alignItems:'center',
    
  },
});

export default OneColumnGridTile;
