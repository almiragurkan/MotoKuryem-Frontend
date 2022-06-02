import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, TextInput, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamListCustomer } from "../../../navigators"
import { Button, GradientBackground, Header, Screen, Text } from "../../../components"
import { color, spacing, typography } from "../../../theme"
import { TUserProfile, useStores } from "../../../models"
import { Controller, useForm } from "react-hook-form"

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
  flexDirection: "column",
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
const FORM_INPUTS_ERROR_VIEWSTYLES: TextStyle = {
  textAlign: "center",
  paddingVertical: 7,
  marginTop: 4,
  marginBottom: 15,
  color: color.palette.angry,
  backgroundColor: color.palette.white,
}
const FORM_INPUTS_ERROR_SMALL_VIEW_STYLES: TextStyle = {
  textAlign: "left",
  marginTop: 4,
  color: color.palette.angry,
}


export const ChangePasswordScreen: FC<StackScreenProps<NavigatorParamListCustomer, "changePassword">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack()

    const [saving, setSaving] = useState(false)
    const [success, setSuccess] = useState(false)

    const { authenticationStore } = useStores()
    const onUserUpdate = async (data: TUserProfile) => {
      setSaving(true)
      authenticationStore.updateUser(data).then(() => {
        setSaving(false)
        setSuccess(true)
      })
    }

    const
      {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm<TUserProfile>({
        defaultValues: authenticationStore.getUserData(),
      })

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
          {authenticationStore.status === "error" &&
            <Text style={FORM_INPUTS_ERROR_VIEWSTYLES}>{authenticationStore.error}</Text>}
          <View style={INPUTS_VIEW_STYLE}>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Şifre boş olamaz!",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
            <View style={INPUTS_CONTAINER_VIEW_STYLE}>
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Yeni Şifre"
                textAlign="left"
                placeholderTextColor={color.palette.specialBlue}
                underlineColorAndroid={color.palette.lighterGrey}
                style={FORM_INPUTS_VIEWSTYLE}
                keyboardType="default"
                secureTextEntry={true}
                returnKeyType="next"
              />
              {errors.password &&
                <Text style={FORM_INPUTS_ERROR_SMALL_VIEW_STYLES}>{errors.password.message}</Text>}
            </View>
              )}
              name="password"
            />
            <Button style={BUTTON_STYLE} onPress={handleSubmit(onUserUpdate)}>
              <Text
                style={BUTTON_TEXT_STYLE}>{saving ? "Güncelleniyor" : "ŞİFRE DEĞİŞTİR"}</Text>
            </Button>
            {success ?
              <View>
                <Text style={FORM_INPUTS_ERROR_SMALL_VIEW_STYLES}>Şifre Değiştirildi</Text>
              </View>
              :
              null
            }
          </View>
        </Screen>
      </View>

    )
  })