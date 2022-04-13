import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ImageStyle, TextInput, Text, TextStyle, View, ViewStyle, TouchableOpacity } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamListAuth } from "../../navigators"
import { AutoImage as Image, Button, GradientBackground, Header, Screen } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing, typography } from "../../theme"

const motoKuryemLogo = require("./motokuryem-logo.png")
const motoKuryemText = require("./motokuryem-text.png")

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
  backgroundColor: color.palette.specialBlue
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const LOGO: ImageStyle = {
  alignSelf: "center",
  marginHorizontal: spacing[5],
  maxWidth: "100%",
  width: 200,
  height: 175,
}
const TEXT_LOGO: ImageStyle = {
  alignSelf: "center",
  marginTop: spacing[9],
  marginHorizontal: spacing[5],
  maxWidth: "100%",
  width: 200,
  height: 40,
}
const INPUTS_VIEW_STYLE: ViewStyle = {
  paddingHorizontal: spacing[4],
  paddingVertical: spacing[2],
  marginTop: 70,
}

const INPUT_USERNAME: ViewStyle = {
  backgroundColor: "white",
  height: 40,
  padding: spacing[1],
  marginTop: spacing[1],
  borderRadius: 15,
}
const BUTTON_TEXT_STYLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 14,
  textAlign: "center",
  letterSpacing: 1.5,
}
const BUTTON_STYLE: ViewStyle = {
  marginVertical: spacing[1],
  marginHorizontal: spacing[6],
  paddingVertical: spacing[1],
  paddingHorizontal: spacing[0],
  backgroundColor: color.palette.specialBlue,
  height: 40,
  borderRadius: 15,
}
const INPUTS_CONTAINER_VIEW: ViewStyle = {
  flexDirection: "column",
  paddingBottom: 20,
  marginHorizontal: 40,
}
const FORGOT_PASS_BTN: ViewStyle = {
  alignItems:"center"
}
const FORGOT_PASS_BTN_TEXT: TextStyle = {
  marginTop: 0,
  fontWeight: "bold",
  textDecorationLine: "underline",
  color:color.palette.lightBlue,

}
const REGISTER_CONTAINER_VIEW: ViewStyle = {flexDirection:"row", alignItems:"center", justifyContent:"center", marginTop:spacing[8]}
const REGISTER_TEXT: TextStyle = {
  marginTop: 0,
  fontWeight: "bold",
}
const REGISTER_BTN_TEXT: TextStyle = {
  marginTop: 0,
  fontWeight: "bold",
}


export const LoginScreen: FC<StackScreenProps<NavigatorParamListAuth, "login">> = observer(
  ({ navigation }) => {
    const homeScreen = () => navigation.navigate("home")
    const registrationScreen = () => navigation.navigate("registration")

    return (
      <View testID="LoginScreen" style={FULL}>
        <GradientBackground colors={["#ffffff", "#ffffff"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Header headerTx="loginScreen.title" style={HEADER} titleStyle={HEADER_TITLE} />
          <Image source={motoKuryemText} style={TEXT_LOGO} />
          <Image source={motoKuryemLogo} style={LOGO} />
          <View style={INPUTS_VIEW_STYLE}>
            <View style={INPUTS_CONTAINER_VIEW}>
              <TextInput
                placeholder="E-posta"
                textAlign="center"
                placeholderTextColor={color.palette.lighterGrey}
                underlineColorAndroid={color.palette.lighterGrey}
                style={INPUT_USERNAME}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
              />
            </View>
            <View style={INPUTS_CONTAINER_VIEW}>
              <TextInput
                placeholder="Şifre"
                textAlign="center"
                placeholderTextColor={color.palette.lighterGrey}
                underlineColorAndroid={color.palette.lighterGrey}
                style={INPUT_USERNAME}
                keyboardType="numeric"
                secureTextEntry={true}
                returnKeyType="done"
              />
            </View>
            <Button style={BUTTON_STYLE} onPress={homeScreen}>
              <Text style={BUTTON_TEXT_STYLE}>Giriş</Text>
            </Button>
            <TouchableOpacity style={FORGOT_PASS_BTN}>
              <Text style={FORGOT_PASS_BTN_TEXT}>{"Şifremi Unuttum"}</Text>
            </TouchableOpacity>
            <View style={REGISTER_CONTAINER_VIEW}>
              <Text style={REGISTER_TEXT}>Hesabınız yok mu?</Text>
              <Button>
                <Text style={REGISTER_BTN_TEXT} onPress={registrationScreen}>Kaydol</Text>
              </Button>
            </View>
          </View>

        </Screen>
      </View>
    )
  })
