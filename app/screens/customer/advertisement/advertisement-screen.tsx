import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
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
        </View>
      </Screen>
    </View>
  )
})