import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, TextStyle, ViewStyle, TouchableOpacity } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { goBack, NavigatorParamListCourier } from "../../../navigators"
import { GradientBackground, Header, Icon, Screen, Text } from "../../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing, typography } from "../../../theme"

const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
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
const TITLE_TEXT: TextStyle = {
  color: color.palette.black,
  fontFamily: typography.primary,
  ...BOLD,
  fontSize: 20,
  lineHeight: 15,
  paddingTop:20,
  paddingBottom:10
}
const INNER_TEXT: TextStyle = {
  color: color.palette.black,
  fontFamily: typography.primary,
  fontSize: 25,
  marginVertical:10,
  paddingVertical:10,
  paddingHorizontal:80
}
const BUTTON_TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
  fontSize: 15,
  margin:5,
}
export const WalletCourierScreen: FC<StackScreenProps<NavigatorParamListCourier, "walletCourier">> = observer(function WalletCourierScreen() {
  return (
    <View testID="WalletCourierScreen" style={FULL}>
      <GradientBackground colors={["#ffffff", "#ffffff"]} />
      <Screen style={CONTAINER} backgroundColor={color.transparent}>
        <Header headerTx="walletScreen.title" style={HEADER} titleStyle={HEADER_TITLE} leftIcon={"back"} onLeftPress={goBack} />
        <View style={{borderRadius:2, borderWidth:2, borderColor:color.palette.lighterGrey, marginVertical:75, marginHorizontal:25, justifyContent:"center", alignItems:"center", padding:15}}>
          <Text style={TITLE_TEXT}>C??ZDANIM</Text>
          <Icon icon={"wallet"}></Icon>
          <View style={{borderRadius:2, borderWidth:2, borderColor:color.palette.lighterGrey, marginVertical:30}}>
            <Text style={INNER_TEXT}>0 ???</Text>
          </View>
          <TouchableOpacity style={{borderRadius:10, borderWidth:2, borderColor:color.palette.lighterGrey, marginVertical:5, backgroundColor:color.palette.lightGrey}}>
            <Text style={BUTTON_TEXT}>T??m Paray?? Banka Hesab??ma Aktar</Text>
          </TouchableOpacity>

        </View>

      </Screen>
    </View>
  )
})

