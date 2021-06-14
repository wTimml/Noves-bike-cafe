import React, { useState } from 'react'
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native'

import Colors from '../constants/colors'
import Fonts from '../constants/fonts'
import * as DocumentPicker from 'expo-document-picker';

const fontRegular = Fonts.fontRegular
const textSize = 16
const FilePicker = () => {

    const _pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        alert(result.uri);
        console.log(result);
      };

return (
    <View >
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.5}
        onPress={_pickDocument}>
        <Text style={styles.buttonText}>Upload File</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    button:{
        backgroundColor:'grey',
        borderRadius:10,
        
    },
    buttonText:{
        color:'white',
        fontFamily:fontRegular,
        fontSize:textSize,
        textAlign:'center',
        padding:20,
        
    }
})

export default FilePicker