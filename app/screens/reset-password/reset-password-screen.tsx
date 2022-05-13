import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, TextInput, TextStyle, View, ViewStyle } from "react-native"
import { Button, GradientBackground, Header, Screen, Text } from "../../components"
import { color, spacing, typography } from "../../theme"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamListAuth } from "../../navigators"
import { useStores } from "../../models"

const width = Dimensions.get("window").width

export const ResetPasswordScreen: FC<StackScreenProps<NavigatorParamListAuth, "resetPassword">> = observer(
  ({ navigation }) => {

    const [email, setEmail] = useState("")
    const { authenticationStore } = useStores()
    const goBack = () => navigation.goBack()

    const onReset = async (email: string) => {
      const { result, message } = await authenticationStore.resetPassword(email)
      if (result) {
        alert("Parola resetleme işlemi başarılı")
        navigation.goBack()
      } else {
        alert("İşlem başarısız." + message)
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
                <Text style={STYLE_FORM_LABEL_TEXT}>E-posta</Text>
              </View>
              <View style={STYLE_FORM_INPUT}>
                <TextInput
                  value={email}
                  placeholder={"E-posta"}
                  keyboardType="email-address"
                  autoCorrect={false}
                  autoCapitalize="none"
                  style={FORM_INPUTS_VIEW_STYLE}
                  onChangeText={text => setEmail(text)}
                />
              </View>
            </View>
          </View>
          <View style={STYLE_FORM_FOOTER}>
            <Button
              text={"Şifremi Resetle"}
              style={STYLE_FORM_BTN_RESET}
              textStyle={STYLE_FORM_BTN_RESET_TEXT}
              onPress={() => onReset(email)} />
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
