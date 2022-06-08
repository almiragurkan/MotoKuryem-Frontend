import * as React from "react"
import { ImageStyle, StyleProp, TextStyle, TouchableHighlight, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../../theme"
import { Text } from "../../text/text"
import { useEffect, useState } from "react"
import { Icon } from "../../icon/icon"
import { SwipeListView } from "react-native-swipe-list-view"
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
const SUB_TEXT: TextStyle = {
  color: color.palette.specialBlue,
  fontFamily: typography.primary,
  ...BOLD,
  fontSize: 15,
  lineHeight: 15,
  padding:10,
  textTransform:"capitalize"
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
  height:102
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
  height:50,
}
const BACKRIGHTBTNLEFT: ViewStyle = {
  backgroundColor: color.palette.specialBlue2,
  top:0,
  right: 0,
}
const BACKRIGHTBTNRIGHT: ViewStyle = {
  backgroundColor: color.palette.specialBlue,
  top:52,
  right: 0,
}
const ICON_STYLE: ImageStyle = {margin: 10, width:60, height:60}
const INNER_TEXT1: TextStyle = { color:color.palette.black, fontSize: 15, ...BOLD, textTransform:"capitalize" }
const INNER_TEXT2: TextStyle = { color:color.palette.lighterGrey, fontSize: 15 }

export interface CouriersSendAdRequestProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  navigationprops: any
  adId: any

}

/**
 * Describe your component here
 */
export const CouriersSendAdRequest = observer(function CouriersSendAdRequest(props: CouriersSendAdRequestProps) {

  const { navigationprops, adId } = props


  const { advertisementStore } = useStores()
  const { advertisements, couriers } = advertisementStore

  const [advertisementDetail, setAdvertiementDetail] = useState(advertisements[0])


  useEffect(() => {
    if (adId)
      advertisementStore.findAdvertisement(adId)
        .then(value => setAdvertiementDetail(value))
  }, [advertisementStore])

  useEffect(() => {
    if (adId)
  advertisementStore.getBiddingCourierOnAdvertisement(adId).then((value) => console.log(value))
  }, [advertisementStore])

  const onReject = (rowKey) => {
    if (rowKey) {
      console.log(rowKey + "Reddet");
    }
  };

  const onConfirm = (rowKey) => {
    if (rowKey) {
      console.log( rowKey + "Onayla");
      advertisementStore.setChosenCourierOnAdvertisement(adId, rowKey).then((value) => console.log(value))
    }
  };


  const renderItem = data => (
    <TouchableHighlight
      style={ROWFRONT}
      underlayColor={color.palette.white}
    >
      <View style={{flexDirection:"row", padding:10, alignItems:"center"}}>
        <Icon style={ICON_STYLE} icon={"profile"}></Icon>
        <View style={{flexDirection:"column", padding:10, flex:1}}>
          <Text style={INNER_TEXT1}>{data.item.user.name} {data.item.user.surname}</Text>
          <Text style={INNER_TEXT2}>Puan: {data.item.user.averageRating}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data) => (
    <View style={ROWBACK}>
      <TouchableOpacity
        style={[BACKRIGHTBTN, BACKRIGHTBTNLEFT]}
        onPress={() => onConfirm(data.item.id)}
      >
        <Text style={BACKTEXTWHITE}>ONAYLA</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[BACKRIGHTBTN, BACKRIGHTBTNRIGHT]}
        onPress={() => onReject(data.item.id)}
      >
        <Text style={BACKTEXTWHITE}>REDDET</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={CONTAINER}>
      <Text style={TEXT}>İLAN İÇİN İSTEK GÖNDEREN KURYELER</Text>
      <Text style={SUB_TEXT}>İlan Adı: {advertisementDetail.header}</Text>
      <View style={CONTAINER1}>
        <SwipeListView
          data={couriers}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={0}
          rightOpenValue={-100}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
        />
      </View>
    </View>
  )
})