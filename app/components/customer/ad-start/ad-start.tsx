import * as React from "react"
import { ImageStyle, StyleProp, TextStyle, TouchableHighlight, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../../theme"
import { Text } from "../../text/text"
import { useEffect } from "react"
import { Icon } from "../../icon/icon"
import { SwipeListView } from "react-native-swipe-list-view"
import { Button } from "../../button/button"
import { useStores } from "../../../models"


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
const CONTAINER_VIEW: ViewStyle = {flexDirection:"row", alignItems:"flex-end", justifyContent:"flex-end", marginTop:spacing[1]}
const CREATE_ADVERTISEMENT_BTN_TEXT: TextStyle = {
  marginTop: 0,
  fontWeight: "bold",
  fontSize:30
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
  justifyContent: 'center',
  paddingLeft: 15,
}
const BACKRIGHTBTN: ViewStyle = {
  alignItems: 'center',
  bottom: 0,
  justifyContent: 'center',
  position: 'absolute',
  top: 0,
  width: 100,
  height:50,
}
const BACKRIGHTBTNRIGHT: ViewStyle = {
  backgroundColor: color.palette.specialBlue,
  top:52,
  right: 0,
}
const ICON_STYLE: ImageStyle = {margin: 10, width:40, height:40}
const INNER_TEXT1: TextStyle = { color:color.palette.black, fontSize: 15, ...BOLD, textTransform:"capitalize" }
const INNER_TEXT2: TextStyle = { color:color.palette.lighterGrey, fontSize: 15 }
const INNER_TEXT3: TextStyle = { color:color.palette.lighterGrey, fontSize: 15, textAlign:"right", paddingRight:25}

export interface AdStartProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  onPressCreateAd?: any
  customerId: any
  navigationprops: any
}

export const AdStart = observer(function AdStart(props: AdStartProps) {
  const { onPressCreateAd, customerId, navigationprops } = props

  const { advertisementStore } = useStores()
  const { advertisements } = advertisementStore

  useEffect(() => {
    async function fetchData() {
      await advertisementStore.getAdvertisementsForCustomer(customerId,"WAITINGFOROFFER")
    }
    fetchData().then((value) => console.log(value))
  }, [])


  const goToEdit = (rowKey) => {
    navigationprops.navigate("createAdvertisement",{adId: rowKey})
  };
  const goToDetail = (rowKey) => {
    navigationprops.navigate("advertisementScreen",{adId: rowKey})
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
          <Text style={INNER_TEXT2}>Müşteri Puanı: 3,2</Text>
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
        onPress={() => goToEdit(data.item.id)}
      >
        <Text style={BACKTEXTWHITE}>Düzenle</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={CONTAINER}>
      <Text style={TEXT}>BAŞLANGIÇ AŞAMASINDAKİ İLANLAR</Text>
      <View style={CONTAINER1}>
        <SwipeListView
          data={advertisements}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={0}
          rightOpenValue={-100}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
        />
      </View>
      <View style={CONTAINER_VIEW}>
        <Button style={{borderRadius:100, marginHorizontal:10, marginVertical:10, width:60, height:60}}>
          <Text style={CREATE_ADVERTISEMENT_BTN_TEXT} onPress={onPressCreateAd}>+</Text>
        </Button>
      </View>
    </View>
  )
})
