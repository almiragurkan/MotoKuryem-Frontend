import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ImageStyle, Text, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamListCourier } from "../../../navigators"
import { AutoImage as Image, GradientBackground, Header, Screen } from "../../../components"

import { color, spacing, typography } from "../../../theme"
import { useStores } from "../../../models"

const picture = require("../../customer/location/2.png")

const FULL: ViewStyle = { flex: 1 }
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
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const LOGO: ImageStyle = {
  alignSelf: "center",
  marginHorizontal: spacing[5],
  maxWidth: "100%",
  margin:10,
  width:400, height:200
}
const VIEWSTYLE: ViewStyle = { flexDirection: "row" }
const INNER_TEXT1: TextStyle = { margin: 15, ...BOLD, fontSize: 15, color: color.palette.specialBlue }
const INNER_INPUT_TEXT: TextStyle = {
  marginLeft: 15,
  marginTop: 15, ...BOLD,
  fontSize: 15,
  textTransform: "capitalize",
}
const INPUTS_VIEW_STYLE: ViewStyle = {
  borderWidth: 1,
  marginVertical: spacing[2],
  marginHorizontal: spacing[3],
  paddingHorizontal: spacing[1],
  paddingBottom: spacing[2],
  borderColor: color.palette.lightGrey,
}

export const LocationCourierScreen: FC<StackScreenProps<NavigatorParamListCourier, "locationCourier">> = observer(({ route, navigation}) => {
  const goBack = () => navigation.goBack()
  const { advertisementStore } = useStores()
  const { advertisements } = advertisementStore

  const [advertisementDetail, setAdvertiementDetail] = useState(advertisements[0])

  useEffect(() => {
    if (route.params.adId)
      advertisementStore.findAdvertisement(route.params.adId)
        .then(value => setAdvertiementDetail(value))
  }, [advertisementStore])


  return (
    <View testID="LocationScreen" style={FULL}>
      <GradientBackground colors={["#ffffff", "#ffffff"]} />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header
          headerTx={"locationScreen.title"}
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <View style={INPUTS_VIEW_STYLE}>
          <View style={VIEWSTYLE}>
            <Text style={INNER_INPUT_TEXT}>Çıkış Adresi: </Text>
            <Text style={INNER_TEXT1}>{advertisementDetail.addressToGive.address}</Text>
          </View>
          <View style={VIEWSTYLE}>
            <Text style={INNER_INPUT_TEXT}>Telefon: </Text>
            <Text style={INNER_TEXT1}>{advertisementDetail.addressToGive.phoneNumber}</Text>
          </View>
        </View>
        <View style={INPUTS_VIEW_STYLE}>
          <View style={VIEWSTYLE}>
            <Text style={INNER_INPUT_TEXT}>Çıkış Adresi: </Text>
            <Text style={INNER_TEXT1}>{advertisementDetail.addressToTake.address}</Text>
          </View>
          <View style={VIEWSTYLE}>
            <Text style={INNER_INPUT_TEXT}>Telefon: </Text>
            <Text style={INNER_TEXT1}>{advertisementDetail.addressToTake.phoneNumber}</Text>
          </View>
        </View>
        <View>
          <Image source={picture} style={LOGO} />
        </View>

      </Screen>
    </View>

  )
})