import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { MaterialIcons } from "@expo/vector-icons";

export default function ({ style, data, value, onValueChange, label }) {

  return (
    <View style={style ? style : styles.container}>
      <RNPickerSelect
        style={{inputAndroid:{color:'black'}}}
        onValueChange={onValueChange}
        value={value}
        placeholder={{ label, color: "#E56228" }}
        useNativeAndroidPickerStyle={false}
        Icon={() => (
          <MaterialIcons name="keyboard-arrow-down" size={24} color="white" />
        )}
        items={data}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  pickerText: {
    color: "#fff",
    fontSize: 14,
  },
});
