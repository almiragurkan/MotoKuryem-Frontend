import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, TextStyle, ViewStyle, TextInput, TouchableOpacity } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { goBack, NavigatorParamList } from "../../navigators"
import { GradientBackground, Header, Icon, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing, typography } from "../../theme"

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
  fontSize: 15,
  lineHeight: 15,
  padding: 10,
  textDecorationLine: "underline",
}
const VIEW: ViewStyle = {
  borderRadius: 2,
  borderWidth: 2,
  borderColor: color.palette.lighterGrey,
  marginVertical: 30,
  marginHorizontal: 25,
  justifyContent: "center",
  alignItems: "center",
  padding: 15,
}
const INNER_VIEW1: ViewStyle = {
  flexDirection: "row",
  borderRadius: 2,
  borderWidth: 2,
  borderColor: color.palette.lighterGrey,
  margin: 10,
  width: 300,
}
const INNER_VIEW2: ViewStyle = {
  borderRadius: 2,
  borderWidth: 2,
  borderColor: color.palette.lighterGrey,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  alignContent: "space-around",
  width: 300,
  margin: 10,
}
const INNER_TEXT: TextStyle = {
  color: color.palette.black,
  fontFamily: typography.primary,
  fontSize: 15,
  paddingVertical: 10,
  justifyContent: "flex-start",
  ...BOLD,
  marginHorizontal: 10,
}
const INNER_TEXT1: TextStyle = {
  color: color.palette.black,
  fontFamily: typography.primary,
  fontSize: 15,
  paddingVertical: 10,
  justifyContent: "flex-start",
  flex: 1,
  paddingLeft: 10,
}
const INPUTS: ViewStyle = {
  backgroundColor: "white",
  padding: spacing[1],
  marginTop: spacing[1],
  paddingHorizontal: spacing[1],
  borderColor: color.palette.lighterGrey,
  borderWidth: 2,
  width: 300,
  height: 200,
  maxHeight: 500,
  margin: 10,
}
const BUTTON_VIEW: ViewStyle = {
  margin: 10,
  width: 300,
  justifyContent: "center",
  alignItems: "center",
}
const BUTTON_STYLE: ViewStyle = {
  backgroundColor: color.palette.specialBlue,
  margin: spacing[2],
  width: 80,
  height: 50,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 5,
}
const BUTTON_TEXT: TextStyle = {
  color: color.palette.white,
}
export const RatingCourierScreen: FC<StackScreenProps<NavigatorParamList, "ratingCourier">> = observer(function RatingCourierScreen() {
  return (
    <View testID="RatingCourierScreen" style={FULL}>
      <GradientBackground colors={["#ffffff", "#ffffff"]} />
      <Screen style={CONTAINER} backgroundColor={color.transparent}>
        <Header headerTx="ratingCourierScreen.title" style={HEADER} titleStyle={HEADER_TITLE} leftIcon={"back"}
                onLeftPress={goBack} />
        <Text style={TITLE_TEXT}>TAMAMLANAN İLANLAR</Text>
        <View style={VIEW}>
          <View style={INNER_VIEW1}>
            <Text style={INNER_TEXT}>Müşteri:</Text>
            <Text style={INNER_TEXT1}>Ayşe GÜRBÜZ</Text>
          </View>
          <View style={INNER_VIEW2}>
            <Icon icon={"starBorder"} />
            <Icon icon={"starBorder"} />
            <Icon icon={"starBorder"} />
            <Icon icon={"starBorder"} />
            <Icon icon={"starBorder"} />
          </View>
          <TextInput
            placeholder="Yorum yazınız..."
            textAlign="left"
            placeholderTextColor={color.palette.lighterGrey}
            style={INPUTS}
            keyboardType="default"
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="next"
            multiline={true}
          />

          <View style={BUTTON_VIEW}>
            <TouchableOpacity style={BUTTON_STYLE}>
              <Text style={BUTTON_TEXT}>MÜŞTERİYİ PUANLA</Text>
            </TouchableOpacity>
          </View>
        </View>

      </Screen>
    </View>
  )
})

