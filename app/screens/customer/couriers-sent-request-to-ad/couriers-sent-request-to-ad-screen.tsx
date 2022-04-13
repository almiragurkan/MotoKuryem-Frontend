import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { goBack, NavigatorParamListCustomer } from "../../../navigators"
import {
  CouriersSendAdRequest,
  GradientBackground,
  Header,
  Screen,
} from "../../../components"
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

export const CouriersSentRequestToAdScreen: FC<StackScreenProps<NavigatorParamListCustomer, "couriersSentRequestToAd">> = observer(({ navigation }) => {

  const couriersRatingScreen = () => navigation.navigate("commentsAndRate")

    return (

      <View testID="CouriersSentRequestToAdScreen" style={FULL}>
        <GradientBackground colors={["#ffffff", "#ffffff"]} />
        <Screen style={CONTAINER} backgroundColor={color.transparent}>
          <Header headerTx="advertisementsCustomerScreen.title" style={HEADER} titleStyle={HEADER_TITLE}
                  leftIcon={"back"} onLeftPress={goBack} />
          <CouriersSendAdRequest couriersRating={()=>couriersRatingScreen()}/>
        </Screen>
      </View>
    )
  })
