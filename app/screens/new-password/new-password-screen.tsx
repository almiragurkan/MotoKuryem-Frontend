import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, TextInput, TextStyle, View, ViewStyle } from "react-native"
import { Button, GradientBackground, Header, Screen, Text } from "../../components"
import { color, spacing, typography } from "../../theme"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamListAuth } from "../../navigators"
import { useStores } from "../../models"

const width = Dimensions.get("window").width

export const NewPasswordScreen: FC<StackScreenProps<NavigatorParamListAuth, "newPassword">> = observer(
  ({ navigation }) => {

    const [password, setPassword] = useState("")
    const { authenticationStore } = useStores()
    const goBack = () => navigation.goBack()

    const onReset = async (newPassword: string) => {
      const { result, message } = await authenticationStore.resetPassword3(newPassword)
      if (result) {
        alert("Yeni şifre oluşturuldu")
        navigation.navigate("login")
      } else {
        alert("İşlem başarısız." + message)
        navigation.navigate("login")
        // TODO: Try again procedure will be implement
      }

    }


    return (
      <View testID="userProfileScreen" style={FULL}>
        <GradientBackground colors={["#ffffff", "#ffffff"]} />
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <Header
            headerText="Şifremi Unuttum"
            leftIcon="back"
            onLeftPress={goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          <View style={STYLE_FORM}>
            <View style={STYLE_FORM_ROW}>
              <View style={STYLE_FORM_LABEL}>
                <Text style={STYLE_FORM_LABEL_TEXT}>Yeni Şifre</Text>
              </View>
              <View style={STYLE_FORM_INPUT}>
                <TextInput
                  value={password}
                  placeholder={"Yeni şifre giriniz..."}
                  keyboardType="default"
                  autoCorrect={false}
                  autoCapitalize="none"
                  style={FORM_INPUTS_VIEW_STYLE}
                  onChangeText={text => setPassword(text)}
                />
              </View>
            </View>
          </View>
          <View style={STYLE_FORM_FOOTER}>
            <Button
              text={"Şifremi Resetle"}
              style={STYLE_FORM_BTN_RESET}
              textStyle={STYLE_FORM_BTN_RESET_TEXT}
              onPress={() => onReset(password)} />
          </View>

        </Screen>
      </View>
    )
  })

const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }

const FULL: ViewStyle = {
  flex: 1,
}

const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}

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

const FORM_INPUTS_VIEW_STYLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  backgroundColor: "white",
  color: color.palette.lightBlue,
  height: 40,
  borderRadius: 7,
  width: width * 0.65,
  paddingHorizontal: 5,
  borderColor:color.palette.lightGrey,
  borderWidth:1,
}


const STYLE_FORM_LABEL_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  justifyContent: "center",
  color: color.palette.specialBlue,
  fontSize: 16,
  textAlign: "left",
  letterSpacing: 1.5,
  width: width * 0.30,
  paddingBottom: spacing[2]
}

const STYLE_FORM: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "center",
}

const STYLE_FORM_ROW: ViewStyle = {
  flexDirection: "column",
  justifyContent: "center",
}

const STYLE_FORM_INPUT: ViewStyle = {}
const STYLE_FORM_LABEL: ViewStyle = {
  justifyContent: "center",
}

const STYLE_FORM_FOOTER: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-around",
}

const STYLE_FORM_BTN_RESET: ViewStyle = {
  backgroundColor: color.palette.specialBlue,
  borderRadius: 25,
  width: 175,
  height: 45,
}

const STYLE_FORM_BTN_RESET_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
}
