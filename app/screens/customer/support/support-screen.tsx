import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamListCustomer } from "../../../navigators"
import { GradientBackground, Header, Screen, Text } from "../../../components"
import { color, spacing, typography } from "../../../theme"

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
const INNER_TEXT1: TextStyle = {
  padding: 10,
  flexDirection: "row",
  color: color.palette.black,
  textDecorationLine: "underline", ...BOLD,
}
const INNER_TEXT2: TextStyle = {
  padding: 5,
  color: color.palette.black,
  ...BOLD }
const INNER_TEXT3: TextStyle = {
  padding: 5,
  color: color.palette.black }
const INNER_TEXT4: TextStyle = {
  padding: 5,
  borderBottomWidth: 2,
  borderBottomColor: color.palette.lighterGrey,
  color: color.palette.black,
}
const INNER_TEXT5: TextStyle = {
  padding: 10,
  borderBottomWidth: 2,
  borderBottomColor: color.palette.lighterGrey,
  color: color.palette.black,
}
const INNER_TEXT6: TextStyle = {
  padding: 10,
  color: color.palette.black }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const INNER_VIEW_STYLE: ViewStyle = {
  borderWidth: 2,
  borderRadius: 2,
  marginVertical: spacing[8],
  marginHorizontal: spacing[5],
  paddingVertical: spacing[1],
  borderColor: color.palette.lighterGrey,
}

export const SupportScreen: FC<StackScreenProps<NavigatorParamListCustomer, "support">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack()

    return (
      <View testID="SupportScreen" style={FULL}>
        <GradientBackground colors={["#ffffff", "#ffffff"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Header
            headerTx={"supportScreen.title"}
            leftIcon="back"
            onLeftPress={goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          <View style={INNER_VIEW_STYLE}>
            <Text style={INNER_TEXT1}>Hakkımızda</Text>
            <Text style={INNER_TEXT2}>İletişim Bilgileri</Text>
            <Text style={INNER_TEXT3}>e-posta: almiraagurkan@gmail.com</Text>
            <Text style={INNER_TEXT4}>e-posta: senemyalin@hotmail.com</Text>
            <Text style={INNER_TEXT5}>Müşteri Kişisel Verilerinin Korunması Politikası</Text>
            <Text style={INNER_TEXT5}>Müşteri Kişisel Aydınlatma Metni</Text>
            <Text style={INNER_TEXT5}>Gizlilik Politikası</Text>
            <Text style={INNER_TEXT6}>Kullanım Koşulları</Text>
          </View>
        </Screen>
      </View>

    )
  })

