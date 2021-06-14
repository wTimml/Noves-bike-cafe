import React, { useState } from 'react';
import { View, Button } from 'react-native';
import {} from 'react-native';


function FinishTrackingScreen ({navigation}){

    const [state,setState]= useState({
        title:'',
        description:'',
        picture:'',
    })

    return(
        <ScrollView style={styles.container}>

            <View style={styles.inputView}>
                <Input style={styles.inputComponent}
                    placeholder="Titulo da corrida"
                    autoCorrect={true}
                    onChangeText={text => setState({...state, title:text})}
                    />

                <Input style={styles.inputComponent} 
                    placeholder="Descrição"
                    autoCorrect={true}
                    onChangeText={text => setState({...state, description:text})}
                    />
                <Input style={styles.inputComponent} 
                    placeholder="Imagem"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={text => setState({...state, picture:text})}
                    />
                    

                <View style={{flexDirection:'row'}}>
                    <Button title="Excluir corrida"/>
                    
                    <ButtonMain style={{margin:10}} onPress={() => signUp()}>
                    
                        {loading ?(
                            <ActivityIndicator size="small" color="#FFF"/>
                        ):(
                            <Text>Confirmar</Text>
                        )
                        }
                    </ButtonMain>
                </View>
                </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.primaryColorDark,
    }
})

export default FinishTrackingScreen;

