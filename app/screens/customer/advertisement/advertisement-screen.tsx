import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Text, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamListCustomer } from "../../../navigators"
import { GradientBackground, Header, Screen } from "../../../components"
import { color, spacing, typography } from "../../../theme"
import { useStores } from "../../../models"
import moment from "moment"

const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const FULL: ViewStyle = { flex: 1 }
const VIEWSTYLE: ViewStyle = { flexDirection:"row" }
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
const INNER_TEXT: TextStyle = { margin: 15, ...BOLD, fontSize: 15 }
const INNER_TEXT1: TextStyle = { margin: 15, ...BOLD, fontSize: 15, color:color.palette.specialBlue }
const INNER_INPUT_TEXT: TextStyle = { marginLeft: 15, marginTop: 15, ...BOLD, fontSize: 15, textTransform:"capitalize" }
const INNER_INPUT_TEXT1: TextStyle = { marginLeft: 15, marginTop: 15, ...BOLD, fontSize: 25, textTransform:"capitalize" }
const INNER_TEXT2: TextStyle = { color: color.palette.specialBlue, marginTop: 15, marginRight: 15, fontSize: 15, ...BOLD }
const INNER_VIEW2: ViewStyle = { flex: 1, flexDirection: "row", justifyContent: "flex-end" }
const INPUTS_VIEW_STYLE: ViewStyle = {
  borderWidth: 1,
  marginVertical: spacing[2],
  marginHorizontal: spacing[3],
  paddingHorizontal: spacing[1],
  paddingBottom: spacing[2],
  borderColor: color.palette.lightGrey,
}


export const AdvertisementScreen: FC<StackScreenProps<NavigatorParamListCustomer, "advertisementScreen">> = observer(({ route, navigation }) => {

  const goBack = () => navigation.goBack()

  const { advertisementStore } = useStores()
  const { advertisements } = advertisementStore

  const [advertisementDetail, setAdvertisementDetail] = useState(advertisements[0])

  useEffect(()=>{
    if(route.params.adId)
      advertisementStore.findAdvertisement(route.params.adId)
        .then(value => setAdvertisementDetail(value))
  },[advertisementStore])


  return (

    <View testID="AdvertisementScreen" style={FULL}>
      <GradientBackground colors={["#ffffff", "#ffffff"]} />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header headerTx="AdvertisementScreen.title" style={HEADER} titleStyle={HEADER_TITLE} onLeftPress={goBack}
                leftIcon={"back"} />
        <View>
          <Text style={INNER_INPUT_TEXT1}>{advertisementDetail.header}</Text>
          <View style={VIEWSTYLE}>
            <Text style={INNER_TEXT}>Ne zaman al??nmal???: </Text>
            <Text style={INNER_TEXT1}>{moment(advertisementDetail.adDate).format('MMMM Do YYYY, h:mm')}</Text>
          </View>
          <View style={VIEWSTYLE}>
         <Text style={INNER_TEXT}>Yakla????k a????rl??k: </Text>
          <Text style={INNER_TEXT1}>{advertisementDetail.productWeight}</Text>
          </View>
          <View style={VIEWSTYLE}>
          <Text style={INNER_INPUT_TEXT}>E??ya: </Text>
          <Text style={INNER_TEXT1}>{advertisementDetail.productName}</Text>
          </View>
          <View style={INPUTS_VIEW_STYLE}>
            <View style={VIEWSTYLE}>
            <Text style={INNER_INPUT_TEXT}>????k???? Adresi: </Text>
            <Text style={INNER_TEXT1}>{advertisementDetail.addressToTake.address}</Text>
            </View>
            <View style={VIEWSTYLE}>
            <Text style={INNER_INPUT_TEXT}>Telefon: </Text>
            <Text style={INNER_TEXT1}>{advertisementDetail.addressToTake.phoneNumber}</Text>
            </View>
          </View>
          <View style={INPUTS_VIEW_STYLE}>
            <View style={VIEWSTYLE}>
              <Text style={INNER_INPUT_TEXT}>Var???? Adresi: </Text>
              <Text style={INNER_TEXT1}>{advertisementDetail.addressToGive.address}</Text>
            </View>
            <View style={VIEWSTYLE}>
              <Text style={INNER_INPUT_TEXT}>Telefon: </Text>
              <Text style={INNER_TEXT1}>{advertisementDetail.addressToGive.phoneNumber}</Text>
            </View>
          </View>
          <View style={INNER_VIEW2}>
            <Text style={INNER_TEXT}>??cret: </Text>
            <Text style={INNER_TEXT2}>{advertisementDetail.price} TL</Text>
          </View>
        </View>
      </Screen>
    </View>
  )
})
