import React from 'react';
import {
    StyleSheet,
    Button,
    View,
    SafeAreaView,
    Text,
    Alert

} from 'react-native';
import { color } from 'react-native-reanimated';

const Separator = () => (
    <View style={styles.separator} />
);


const Treinador = ({navigation}) => (
    <SafeAreaView style={styles.container}>

        <View style={styles.titulo}>
            <Text style={styles.titulo}>Seja bem vindo treinador!</Text>
        </View>


        <View style={styles.botaotreinador}>

            <Button style={styles.botaotreinador}
                title="INICIANTE"
                color="black"
                onPress={()=> navigation.push("Cadastro Treino")}
            />
        </View>
        <Separator />
        <View style={styles.botaotreinador}>

            <Button style={styles.botaotreinador}
                title="INTERMEDIÁRIO"
                color="black"
                onPress={() => Alert.alert('')}
            />
        </View>
        <Separator />
        <View style={styles.botaotreinador}>

            <Button
                title="AVANÇADO"
                color="black"
                onPress={() => Alert.alert('')}
            />
        </View>
        <Separator />
        <View style={styles.botaovoltar}>
            <Button
                title="VOLTAR"
                color="white"
                onPress={() => Alert.alert('')}
            />
        </View>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#293a2e"
    },
    
    botaotreinador: {
        backgroundColor: "#fff",
        padding: 20,
        margin: 20,
        borderRadius: 7.5
    },

    botaovoltar: {
        backgroundColor: '#E56228',
        borderColor: '#FFF',
        padding: 10,
        marginTop: 25,
        marginHorizontal: 100,
        borderRadius: 7.5
    },

    titulo: {
        textAlign: 'center',
        marginVertical: 8,
        alignItems: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom:20

    },

    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    separator: {
        marginVertical: 10,
        borderBottomColor: '#E56228',
        borderBottomWidth: 0.7
    }
});

export default Treinador;

// import React, { useState } from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     SafeAreaView,
//     StatusBar,  
//     Button
// } from 'react-native';


// const Treinador = () => {
//     return (
//         <SafeAreaView style={styles.container}>
//             <StatusBar backgroundColor="#293A2E" />
//             <Text>Tarefas</Text>
//         </SafeAreaView>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#293A2E"
//     }
// });

// export default Treinador;