import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, TextInput, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamListCustomer } from "../../../navigators"
import { Button, GradientBackground, Header, Screen, Text } from "../../../components"
import { color, spacing, typography } from "../../../theme"

const width = Dimensions.get("window").width
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
const INPUTS_CONTAINER_VIEW_STYLE: ViewStyle = {
  flexDirection: "row",
  justifyContent: "flex-start",
  paddingBottom: 7,
  marginHorizontal: 1,
  marginVertical:spacing[2],
  alignItems:"center",
}
const INPUTS_VIEW_STYLE: ViewStyle = {
  alignItems:"center",
  justifyContent: "center",
  marginTop: 75,
}
const FORM_INPUTS_VIEWSTYLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  backgroundColor: "white",
  color: color.palette.specialBlue,
  height: 45,
  borderRadius: 7,
  width: width * 0.85,
  paddingHorizontal: 5,
  borderColor:color.palette.lightGrey,
  borderWidth:1,
}
const BUTTON_TEXT_STYLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  textAlign: "center",
  letterSpacing: 1.5,
}
const BUTTON_STYLE: ViewStyle = {
  marginVertical: spacing[8],
  marginHorizontal: 40,
  paddingVertical: spacing[2],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.specialBlue,
  height: 40,
  borderRadius: 15,
}
export const ChangePasswordScreen: FC<StackScreenProps<NavigatorParamListCustomer, "changePassword">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack()

    return (
      <View testID="ChangePasswordScreen" style={FULL}>
        <GradientBackground colors={["#ffffff", "#ffffff"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Header
            headerTx={"changePasswordScreen.title"}
            leftIcon="back"
            onLeftPress={goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          <View style={INPUTS_VIEW_STYLE}>
            <View style={INPUTS_CONTAINER_VIEW_STYLE}>
              <TextInput
                placeholder="Eski Şifre"
                textAlign="left"
                placeholderTextColor={color.palette.specialBlue}
                underlineColorAndroid={color.palette.lighterGrey}
                style={FORM_INPUTS_VIEWSTYLE}
                keyboardType="numeric"
                secureTextEntry={true}
                returnKeyType="next"
              />
            </View>
            <View style={INPUTS_CONTAINER_VIEW_STYLE}>
              <TextInput
                placeholder="Yeni Şifre"
                textAlign="left"
                placeholderTextColor={color.palette.specialBlue}
                underlineColorAndroid={color.palette.lighterGrey}
                style={FORM_INPUTS_VIEWSTYLE}
                keyboardType="numeric"
                secureTextEntry={true}
                returnKeyType="next"
              />
            </View>
            <View style={INPUTS_CONTAINER_VIEW_STYLE}>
              <TextInput
                placeholder="Yeni Şifre Tekrar"
                textAlign="left"
                placeholderTextColor={color.palette.specialBlue}
                underlineColorAndroid={color.palette.lighterGrey}
                style={FORM_INPUTS_VIEWSTYLE}
                keyboardType="numeric"
                secureTextEntry={true}
                returnKeyType="done"
              />
            </View>
            <Button style={BUTTON_STYLE} onPress={goBack}>
              <Text
                style={BUTTON_TEXT_STYLE}>ŞİFRE DEĞİŞTİR</Text>
            </Button>
          </View>


        </Screen>
      </View>

    )
  })