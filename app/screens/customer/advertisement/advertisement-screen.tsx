import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Text, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { goBack, NavigatorParamListCustomer } from "../../../navigators"
import { GradientBackground, Header, Screen } from "../../../components"
import { color, spacing, typography } from "../../../theme"
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const FULL: ViewStyle = { flex: 1 }
const CONTAINER1: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
  padding:15
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
const INNER_TEXT: TextStyle = { margin: 15, ...BOLD, fontSize: 15 }
const INNER_TEXT1: TextStyle = { color:color.palette.black, fontSize: 15, ...BOLD }

export const AdvertisementScreen: FC<StackScreenProps<NavigatorParamListCustomer, "advertisement">> = observer(function AdvertisementScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <View testID="AdvertisementScreen" style={FULL}>
      <GradientBackground colors={["#ffffff", "#ffffff"]} />
      <Screen style={CONTAINER} backgroundColor={color.transparent}>
        <Header headerTx="advertisementScreen.title" leftIcon={"back"} onLeftPress={goBack} style={HEADER} titleStyle={HEADER_TITLE} />
        <View style={CONTAINER1}>
              <Text style={INNER_TEXT1}>İLAN İSMİ</Text>
          <Text style={INNER_TEXT}>Ne zaman alınmalı?</Text>
          <Text style={INNER_TEXT}>En Kısa Sürede</Text>
          <Text style={INNER_TEXT}>Yaklaşık ağırlık</Text>
          <Text style={INNER_TEXT}>2-5 KG</Text>
          <Text style={INNER_TEXT}>Eşya</Text>
          <Text style={INNER_TEXT}>Kağıt</Text>
          <Text style={INNER_TEXT}>Çıkış Adresi</Text>
          <Text style={INNER_TEXT}>Kötekli mah. 311. Sokak no:17</Text>
          <Text style={INNER_TEXT}>Varış Adresi</Text>
          <Text style={INNER_TEXT}>Kötekli mah. 317. Sokak no:11</Text>
          <Text style={INNER_TEXT}>Ücret</Text>
          <Text style={INNER_TEXT}>50 TL</Text>

        </View>
      </Screen>
    </View>
  )
})