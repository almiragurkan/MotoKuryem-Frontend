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
  flex: 1,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const TEXT: TextStyle = {
  color: color.palette.black,
  fontFamily: typography.primary,
  ...BOLD,
  fontSize: 15,
  lineHeight: 15,
  padding: 10,
  textDecorationLine: "underline",
}
const CONTAINER1: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const BACKTEXTWHITE: TextStyle = {
  color: "#FFF",
}
const ROWFRONT: ViewStyle = {
  alignItems: "flex-start",
  padding: 10,
  backgroundColor: color.palette.white,
  borderBottomColor: "black",
  borderBottomWidth: 1,
  flex: 1,
  justifyContent: "center",
  height: 150,
}
const ROWBACK: ViewStyle = {
  alignItems: "center",
  backgroundColor: color.palette.white,
  flex: 1,
  flexDirection: "column",
  justifyContent: "space-between",
  paddingLeft: 15,
}
const BACKRIGHTBTN: ViewStyle = {
  alignItems: "center",
  bottom: 0,
  justifyContent: "center",
  position: "absolute",
  top: 0,
  width: 110,
  height: 74,
}
const BACKRIGHTBTNLEFT: ViewStyle = {
  backgroundColor: color.palette.specialBlue2,
  top: 0,
  right: 0,
}
const BACKRIGHTBTNRIGHT: ViewStyle = {
  backgroundColor: color.palette.specialBlue,
  top: 76,
  right: 0,
}
const ICON_STYLE: ImageStyle = { margin: 10, width: 40, height: 40 }
const INNER_TEXT1: TextStyle = { color: color.palette.black, fontSize: 15, ...BOLD, textTransform: "capitalize" }
const INNER_TEXT2: TextStyle = { color: color.palette.lighterGrey, fontSize: 15 }
const INNER_TEXT3: TextStyle = { color: color.palette.lighterGrey, fontSize: 15, textAlign: "right", paddingRight: 25 }


export interface AdTransferingCourierProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  courierId: any
  navigationprops: any
}

/**
 * Describe your component here
 */
export const AdTransferingCourier = observer(function AdTransferingCourier(props: AdTransferingCourierProps) {

  const { courierId, navigationprops } = props


  const { advertisementStore } = useStores()
  const [ads, setAds ] = useState([])

  useEffect(() => {
    async function fetchData() {
      let a = await advertisementStore.getAdvertisementsForCourier(courierId, "ACCEPTED")
      setAds(a)
    }

    fetchData().then((value) => console.log(value))
  }, [])

  const goToDetail = (rowKey) => {
    navigationprops.navigate("advertisementCourier", { adId: rowKey })
  }


  const itemDelivered = (rowKey) => {
    console.log("Ta????ma tamamland??:" + rowKey)
    advertisementStore.setStatusAdvertisement(rowKey, "ITEMDELIVERED").then((value) => console.log(value))
  }

  const locationToCourier = (rowKey) => {
    navigationprops.navigate("locationCourier", { adId: rowKey })
  }

  const onRowDidOpen = rowKey => {
    console.log("This row opened", rowKey)
  }

  const renderItem = data => (
    <TouchableHighlight
      onPress={() => goToDetail(data.item.id)}
      style={ROWFRONT}
      underlayColor={color.palette.white}
    >
      <View style={{ flexDirection: "row", padding: 10, alignItems: "center" }}>
        <Icon style={ICON_STYLE} icon={"circle"}></Icon>
        <View style={{ flexDirection: "column", padding: 10, flex: 1 }}>
          <Text style={INNER_TEXT1}>{data.item.header}</Text>
          <Text style={INNER_TEXT2}>M????teri Puan??: {data.item.customer.user.averageRating}</Text>
          <Text style={INNER_TEXT2}>E??ya: {data.item.productName}</Text>
          <Text style={INNER_TEXT2}>Mesafe: 3 Km</Text>
          <Text style={INNER_TEXT3}>??cret: {data.item.price} TL</Text>
        </View>
      </View>
    </TouchableHighlight>
  )

  const renderHiddenItem = (data) => (
    <View style={ROWBACK}>
      <TouchableOpacity
        style={[BACKRIGHTBTN, BACKRIGHTBTNLEFT]}
        onPress={() => locationToCourier(data.item.id)}
      >
        <Text style={BACKTEXTWHITE}>LOKASYONU G??R</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[BACKRIGHTBTN, BACKRIGHTBTNRIGHT]}
        onPress={() => itemDelivered(data.item.id)}
      >
        <Text style={BACKTEXTWHITE}>TA??IMA TAMAMLANDI</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={CONTAINER}>
      <Text style={TEXT}>TA??IMA A??AMASINDAK?? ??LANLAR</Text>
      <View style={CONTAINER1}>
        {(ads)?<SwipeListView
          data={ads}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={0}
          rightOpenValue={-110}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onRowDidOpen={onRowDidOpen}
        /> : <Text text={"LOADING..."}/>}
      </View>
    </View>
  )
})
