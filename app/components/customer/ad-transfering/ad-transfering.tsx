import * as React from "react"
import { ImageStyle, StyleProp, TextStyle, TouchableHighlight, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../../theme"
import { Text } from "../../text/text"
import { useContext, useEffect, useState } from "react"
import { Icon } from "../../icon/icon"
import { SwipeListView } from "react-native-swipe-list-view"
import { useStores } from "../../../models"
import { MyContext } from "../../../models/my-context/my-context"

const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  flex:1
}
const BOLD: TextStyle = { fontWeight: "bold" }
const TEXT: TextStyle = {
  color: color.palette.black,
  fontFamily: typography.primary,
  ...BOLD,
  fontSize: 15,
  lineHeight: 15,
  padding:10,
  textDecorationLine:"underline"
}
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
}
const BACKRIGHTBTN: ViewStyle = {
  alignItems: 'center',
  bottom: 0,
  justifyContent: 'center',
  position: 'absolute',
  top: 0,
  width: 100,
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
const ICON_STYLE: ImageStyle = {margin: 10, width:40, height:40}
const INNER_TEXT1: TextStyle = { color:color.palette.black, fontSize: 15, ...BOLD, textTransform:"capitalize" }
const INNER_TEXT2: TextStyle = { color:color.palette.lighterGrey, fontSize: 15 }
const INNER_TEXT3: TextStyle = { color:color.palette.lighterGrey, fontSize: 15, textAlign:"right", paddingRight:25}


export interface AdTransferingProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  customerId: any
  navigationprops: any
}

/**
 * Describe your component here
 */
export const AdTransfering = observer(function AdTransfering(props: AdTransferingProps) {
  const myContext= useContext(MyContext);
  const { customerId, navigationprops} = props

  const { advertisementStore } = useStores()
  const [ads,setAds]=useState([]);
  useEffect(() => {
    async function fetchData() {
      let a=await advertisementStore.getAdvertisementsForCustomer(customerId,"ACCEPTED", myContext.token)
      setAds(a);
    }
    fetchData().then((value) => console.log(value))
  }, [])
  const locationToCustomer = (rowKey) => {
    __DEV__ && console.log(rowKey)
  };

  const goToDetail = (rowKey) => {
    navigationprops.navigate("advertisementScreen",{adId: rowKey})
  };


  const confirmPayment = (rowKey) => {
    console.log("Ödemeyi Onayla:" + rowKey)
    advertisementStore.setStatusAdvertisement(rowKey, "TRANSACTIONAPPROVED").then((value) => console.log(value))
  }

  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
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
          <Text style={INNER_TEXT2}>Eşya: {data.item.productName}</Text>
          <Text style={INNER_TEXT2}>Mesafe: 3 Km</Text>
          <Text style={INNER_TEXT3}>Ücret: {data.item.price} TL</Text>
        </View>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={ROWBACK}>
      <TouchableOpacity
        style={[BACKRIGHTBTN, BACKRIGHTBTNLEFT]}
        onPress={() => locationToCustomer(data.item.key)}
      >
        <Text style={BACKTEXTWHITE}>KURYEM NEREDE?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[BACKRIGHTBTN, BACKRIGHTBTNRIGHT]}
        onPress={() => confirmPayment(data.item.id)}
      >
        <Text style={BACKTEXTWHITE}>ÖDEMEYİ ONAYLA</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={CONTAINER}>
      <Text style={TEXT}>TAŞIMA AŞAMASINDAKİ İLANLAR</Text>
      <View style={CONTAINER1}>
        {ads?<SwipeListView
          data={ads}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={0}
          rightOpenValue={-100}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onRowDidOpen={onRowDidOpen}
        />:<Text text={"..."}/> }
      </View>
    </View>
  )
})
