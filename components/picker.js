import React, { useState } from "react";
import {
  AppRegistry,
  SectionList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { MaterialIcons } from "@expo/vector-icons";

export default function ({ style, data, value, onValueChange }) {
  return (
    <View style={style ? style : styles.container}>
      <RNPickerSelect
        onValueChange={onValueChange}
        value={value}
        placeholder={{ label: "Selecione o nível do grupo", color: "#E56228" }}
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
