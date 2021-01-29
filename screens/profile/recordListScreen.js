import React from 'react'
import { View } from 'react-native'
import { FlatList} from 'react-native'
import OneColumnGridTile from '../../components/oneColumnGridTile'
import {DATA} from '../../data/data/dummy-data'


const RecordListScreen = (props) => {

        const renderGridItem = (itemData) => {
            
        return (
            <OneColumnGridTile 
            title={itemData.item.title}
            distance={itemData.item.distance}
            time={itemData.item.time}
            date={itemData.item.date}
            onSelect={() => {
                props.navigation.navigate('RecordDetail', {
                    
                        id:itemData.item.id,
                        title:itemData.item.title,
                        distance:itemData.item.distance,
                        time:itemData.item.time,
                        date:itemData.item.date,
                       
                        })
            }}
            />
        )
    }
    return(
        <FlatList data={DATA} renderItem={renderGridItem} numColumns={1}>
            
                
        </FlatList>
    )
}

export default RecordListScreen;