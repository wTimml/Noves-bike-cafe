import React, { useEffect } from "react";
import { View, Dimensions } from "react-native";
import { FlatList } from "react-native";
import OneColumnGridTile from "../../components/oneColumnGridTile";
import { DATA } from "../../data/data/dummy-data";
import api from '../../services/api'
import {  getUserEmail } from "../../utils";

const { width, height } = Dimensions.get("window");

const RecordListScreen = (props) => {
  const [data_, setData_] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(5)

  useEffect(() => {
    let mounted = true;
    console.log(data_)
    try{
      getUserEmail().then((email) =>
      api
      .get("/users/by-email?email=" + email) //users/by-email?email=lucas@tw.com URL PARA BUSCAR POR EMAIL
      .then((response) => {
        var userId = response.data.id

        try{
          api
          .get("/tracking/by-id/"+userId+"/?page=0&size="+ pageSize)
          .then((response) => { //response.data.content[0]
            if(mounted){
              setData_(response.data.content)
            }
          })
          return () => mounted = false
        }catch(e){
          console.log(e)
        }

      }))

    }catch(e){
      console.log(e)
    }
  },[])


  const renderGridItem = (itemData) => {
    return (
      <OneColumnGridTile
        title={itemData.item.title}
        distance={itemData.item.distance}
        elevation={itemData.item.elevation}
        route={itemData.item.route}
        time={itemData.item.timing}
        date={itemData.item.date}
        averageSpeed={itemData.item.averageSpeed}
        onSelect={() => {
           props.navigation.navigate("RecordDetail", {
            id: itemData.item.id,
            title: itemData.item.title,
            description : itemData.item.description,
            distance: itemData.item.distance,
            ROUTE: itemData.item.route,
            time: itemData.item.timing,
            date: itemData.item.date,
            averageSpeed:itemData.item.averageSpeed
          });
        }}
      />
    );
  };

  return (
    <View style={{height:height}}>

      <FlatList data={data_} renderItem={renderGridItem} numColumns={1}></FlatList>
    </View>
  );
};

export default RecordListScreen;
