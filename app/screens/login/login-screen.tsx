import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { Controller, useForm } from "react-hook-form"
import { ImageStyle, TextInput, Text, TextStyle, View, ViewStyle, TouchableOpacity, ActivityIndicator } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamListAuth } from "../../navigators"
import { AutoImage as Image, Button, GradientBackground, Header, Screen } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing, typography } from "../../theme"
import { useStores } from "../../models"

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
  borderColor:color.palette.lightGrey,
  borderWidth:1,
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
  alignItems: "center",
}
const FORGOT_PASS_BTN_TEXT: TextStyle = {
  marginTop: 0,
  fontWeight: "bold",
  textDecorationLine: "underline",
  color: color.palette.lightBlue,

}
const REGISTER_CONTAINER_VIEW: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginTop: spacing[8],
}
const REGISTER_TEXT: TextStyle = {
  marginTop: 0,
  fontWeight: "bold",
}
const REGISTER_BTN_TEXT: TextStyle = {
  marginTop: 0,
  fontWeight: "bold",
}
const FORM_ERROR_SMALL_TEXT: TextStyle = {
  textAlign: "center",
  marginTop: 4,
  color: color.palette.angry,
}
const LOADING_EFFECT: ViewStyle = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: `rgba(0, 0, 0, 0.6)`,
}

type FormData = {
  userName: string;
  password: string;
};


export const LoginScreen: FC<StackScreenProps<NavigatorParamListAuth, "login">> = observer(
  ({ navigation }) => {
    const registrationScreen = () => navigation.navigate("registration")

    const { authenticationStore } = useStores()

    const {
      control, handleSubmit, formState: { errors },
    } = useForm<FormData>()

    useEffect(() => {
      if (authenticationStore.isAuthenticated === true){
        if(authenticationStore.isCourier === true){
          navigation.navigate("homeCourier")
        }else if(authenticationStore.isCourier === false){
          navigation.navigate("home")
        }
      }
    }, [])
    const onLogin = async (data) => await authenticationStore.login(data.userName, data.password, authenticationStore.rememberMe)

    return (
      <View testID="LoginScreen" style={FULL}>
        <GradientBackground colors={["#ffffff", "#ffffff"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Header headerTx="loginScreen.title" style={HEADER} titleStyle={HEADER_TITLE} />
          <Image source={motoKuryemText} style={TEXT_LOGO} />
          <Image source={motoKuryemLogo} style={LOGO} />
          <View style={INPUTS_VIEW_STYLE}>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Kullanıcı adı boş olamaz!",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={INPUTS_CONTAINER_VIEW}>
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Kullanıcı adı"
                    textAlign="center"
                    placeholderTextColor={color.palette.lighterGrey}
                    underlineColorAndroid={color.transparent}
                    style={INPUT_USERNAME}
                    keyboardType="default"
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType="next"
                  />
                  {errors.userName && <Text style={FORM_ERROR_SMALL_TEXT}>{errors.userName.message}</Text>}
                </View>
              )}
              name="userName"
              defaultValue=""
            />

            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Şifre boş olamaz",
                },
                minLength: 6
              }}
              render={({ field: { onChange, onBlur, value } }) => (

                <View style={INPUTS_CONTAINER_VIEW}>
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Parola"
                    textAlign="center"
                    placeholderTextColor={color.palette.lighterGrey}
                    underlineColorAndroid={color.transparent}
                    style={INPUT_USERNAME}
                    keyboardType="default"
                    secureTextEntry={true}
                    returnKeyType="done"
                  />
                  {errors.password && <Text style={FORM_ERROR_SMALL_TEXT}>{errors.password.message}</Text>}
                </View>
              )}
              name="password"
              defaultValue=""
            />

            <Button style={BUTTON_STYLE} onPress={handleSubmit(onLogin)}>
              <Text style={BUTTON_TEXT_STYLE}>{authenticationStore.status === "pending" ? "Loading ..." : "Giriş"}</Text>
            </Button>
            <TouchableOpacity style={FORGOT_PASS_BTN} onPress={() => navigation.navigate("resetPassword")}>
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
        { authenticationStore.status === "pending" &&
          <View style={LOADING_EFFECT}><ActivityIndicator size="large" /></View> }
      </View>
    )
  })
