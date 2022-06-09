import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Text, TextStyle, View, ViewStyle, TouchableHighlight, TouchableOpacity, ImageStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamListCourier } from "../../../navigators"
import { GradientBackground, Header, Icon, Screen } from "../../../components"
import { color, spacing, typography } from "../../../theme"
import { SwipeListView } from 'react-native-swipe-list-view';
import { useStores } from "../../../models"

const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const FULL: ViewStyle = { flex: 1 }
const CONTAINER1: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const BACKTEXTWHITE: TextStyle = {
  color: '#FFF',
}
const ROWFRONT: ViewStyle = {
  alignItems: 'flex-start',
  padding:10,
  backgroundColor: color.palette.white,
  borderBottomColor: 'black',
  borderBottomWidth: 1,
  flex:1,
  justifyContent: 'center',
  height:150
}
const ROWBACK: ViewStyle = {
  alignItems: 'center',
  backgroundColor: color.palette.white,
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'space-between',
  paddingLeft: 15,
  height:150
}
const BACKRIGHTBTN: ViewStyle = {
  alignItems: 'center',
  bottom: 0,
  justifyContent: 'center',
  position: 'absolute',
  top: 0,
  width: 120,
  height:74,
}
const BACKRIGHTBTNLEFT: ViewStyle = {
  backgroundColor: color.palette.specialBlue2,
  top:0,
  right: 0,
}
const BACKRIGHTBTNRIGHT: ViewStyle = {
  backgroundColor: color.palette.specialBlue,
  top:76,
  right: 0,
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  backgroundColor: color.palette.specialBlue,
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const ICON_STYLE: ImageStyle = {margin: 10, width:40, height:40}
const INNER_TEXT1: TextStyle = { color:color.palette.black, fontSize: 15, ...BOLD, textTransform:"capitalize" }
const INNER_TEXT2: TextStyle = { color:color.palette.lighterGrey, fontSize: 15 }
const INNER_TEXT3: TextStyle = { color:color.palette.lighterGrey, fontSize: 15, textAlign:"right", paddingRight:25}


export const HomeCourierScreen: FC<StackScreenProps<NavigatorParamListCourier, "homeCourier">> = observer(
  ({ navigation }) => {

    const [ads, setAds] = useState([])
    const { advertisementStore } = useStores()


    useEffect(() => {
      async function fetchData() {
        let r = await advertisementStore.getAdvertisements()
        setAds(r)
      }
      fetchData().then((value) => console.log(value))
    }, [])


    const onRequest = (rowKey) => {
      if (rowKey) {
        console.log(rowKey + "İstek yolla");
        advertisementStore.bidOnAdvertisement(rowKey).then((value) => console.log(value))
      }
    };

    const goToLocation = (rowKey) => {
      console.log("key: "+rowKey)
      navigation.navigate("locationCourier", { adId: rowKey })
    };
    const goToDetail = (rowKey) => {
      navigation.navigate("advertisementCourier",{adId: rowKey})
    };

    const renderItem = data => (
      <TouchableHighlight
        onPress={() => goToDetail(data.item.id)}
        style={ROWFRONT}
        underlayColor={color.palette.white}
      >
        <View style={{flexDirection:"row", padding:10, alignItems:"center"}}>
          <Icon style={ICON_STYLE} icon={"circle"}></Icon>
          <View style={{flexDirection:"column", padding:10, flex:1}}>
            <Text style={INNER_TEXT1}>{data.item.header}</Text>
            <Text style={INNER_TEXT2}>Müşteri Puanı: {data.item.customer.user.averageRating}</Text>
            <Text style={INNER_TEXT2}>Eşya: {data.item.productName}</Text>
            <Text style={INNER_TEXT2}>Mesafe: 3 Km</Text>
            <Text style={INNER_TEXT3}>Ücret: {data.item.price} TL</Text>
          </View>
        </View>
      </TouchableHighlight>
    );

    const renderHiddenItem = (data) => (
      <View style={ROWBACK}>
        <TouchableOpacity
          style={[BACKRIGHTBTN, BACKRIGHTBTNRIGHT]}
          onPress={() => goToLocation(data.item.id)}
        >
          <Text style={BACKTEXTWHITE}>Lokasyonu Gör</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[BACKRIGHTBTN, BACKRIGHTBTNLEFT]}
          onPress={() => onRequest(data.item.id)}
        >
          <Text style={BACKTEXTWHITE}>İstek Yolla</Text>
        </TouchableOpacity>
      </View>
    );


    return (

      <View testID="HomeCourierScreen" style={FULL}>
        <GradientBackground colors={["#ffffff", "#ffffff"]} />
        <Screen style={CONTAINER} backgroundColor={color.transparent}>
          <Header headerTx="homeScreen.title" style={HEADER} titleStyle={HEADER_TITLE} />
          <View style={CONTAINER1}>
            {ads?<SwipeListView
              data={ads}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              leftOpenValue={0}
              rightOpenValue={-120}
              previewRowKey={'0'}
              previewOpenValue={-40}
              previewOpenDelay={3000}
            />: <Text>LOADING...</Text>}
          </View>
        </Screen>
      </View>
    )
  })
