import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, ImageStyle, TextInput, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamListAuth } from "../../navigators"
import { AutoImage as Image, Button, Checkbox, GradientBackground, Header, Screen, Text } from "../../components"
import { color, spacing, typography } from "../../theme"
import { Controller, useForm } from "react-hook-form"
import { TUserProfile, useStores } from "../../models"

const motoKuryemLogo = require("../login/motokuryem-logo.png")

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
const LOGO: ImageStyle = {
  alignSelf: "center",
  marginVertical: spacing[5],
  marginHorizontal: spacing[5],
  width: 80,
  height: 70,
  borderWidth:4,
  borderColor:color.palette.specialBlue
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
  marginTop: 10,
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
const ISCOURIER_TEXT_STYLE: TextStyle = {
  ...BOLD,
  fontSize: 13,
  textAlign: "center",
  color:color.palette.lightGrey
}
const BUTTON_STYLE: ViewStyle = {
  marginVertical: spacing[3],
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
const FORM_INPUTS_ERROR_SMALL_VIEWSTYLES: TextStyle = {
  textAlign: "left",
  marginTop: 4,
  color: color.palette.angry,
}


export const RegistrationScreen: FC<StackScreenProps<NavigatorParamListAuth, "registration">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack()
    const { authenticationStore } = useStores()
    const onRegister = async (data: TUserProfile) => await authenticationStore.register(data)

    const
      {
        control,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
      } = useForm<TUserProfile>()

    useEffect(() => {
      authenticationStore.clearStatus()
    }, [])
    useEffect(() => {
      if (isSubmitSuccessful === true)
        navigation.goBack()
    }, [isSubmitSuccessful])

  console.log(authenticationStore.isAuthenticated,"TEST5")

    return (
      <View testID="RegistrationScreen" style={FULL}>
        <GradientBackground colors={["#ffffff", "#ffffff"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Header
            headerTx={"registrationScreen.title"}
            leftIcon="back"
            onLeftPress={goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          <Image source={motoKuryemLogo} style={LOGO} />

          <View>
            {authenticationStore.status === "error" && <Text
              style={FORM_INPUTS_ERROR_VIEWSTYLES}>{"Bir hata ile kar????la????ld?? : "}{authenticationStore.error}</Text>}
          </View>

          <View style={INPUTS_VIEW_STYLE}>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "??sim bo?? olamaz!",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
            <View style={INPUTS_CONTAINER_VIEW_STYLE}>
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="??sim"
                textAlign="left"
                placeholderTextColor={color.palette.specialBlue}
                underlineColorAndroid={color.palette.lighterGrey}
                style={FORM_INPUTS_VIEWSTYLE}
                autoCorrect={true}
                autoCapitalize="words"
                returnKeyType="next"
              />
              {errors.name &&
                <Text style={FORM_INPUTS_ERROR_SMALL_VIEWSTYLES}>{errors.name.message}</Text>}
            </View>
              )}
              name="name"
              defaultValue=""
            />
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Soyisim bo?? olamaz!",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={INPUTS_CONTAINER_VIEW_STYLE}>
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Soyisim"
                textAlign="left"
                placeholderTextColor={color.palette.specialBlue}
                underlineColorAndroid={color.palette.lighterGrey}
                style={FORM_INPUTS_VIEWSTYLE}
                autoCorrect={true}
                autoCapitalize="words"
                returnKeyType="next"
              />
                  {errors.surname &&
                    <Text style={FORM_INPUTS_ERROR_SMALL_VIEWSTYLES}>{errors.surname.message}</Text>}
                </View>
              )}
              name="surname"
              defaultValue=""
            />
            <Controller
              control={control}
              rules={{
                required: {
                  value: false,
                  message: "Kullan??c?? ad?? bo?? olamaz!",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (

                <View style={INPUTS_CONTAINER_VIEW_STYLE}>
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Kullan??c?? Ad??"
                textAlign="left"
                placeholderTextColor={color.palette.specialBlue}
                underlineColorAndroid={color.palette.lighterGrey}
                style={FORM_INPUTS_VIEWSTYLE}
                autoCorrect={true}
                autoCapitalize="words"
                returnKeyType="next"
              />
                  {errors.username &&
                    <Text style={FORM_INPUTS_ERROR_SMALL_VIEWSTYLES}>{errors.username.message}</Text>}

                </View>
              )}
              name="username"
              defaultValue=""
            />
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Telefon numaras?? bo?? olamaz!",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={INPUTS_CONTAINER_VIEW_STYLE}>
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Telefon numaras??"
                    textAlign="left"
                    placeholderTextColor={color.palette.specialBlue}
                    underlineColorAndroid={color.palette.lighterGrey}
                    style={FORM_INPUTS_VIEWSTYLE}
                    keyboardType="default"
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType="next"
                  />
                  {errors.phoneNumber && <Text style={FORM_INPUTS_ERROR_SMALL_VIEWSTYLES}>{errors.phoneNumber.message}</Text>}
                </View>
              )}
              name="phoneNumber"
              defaultValue=""
            />
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "e-posta adresi bo?? olamaz!",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={INPUTS_CONTAINER_VIEW_STYLE}>
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="E-posta"
                textAlign="left"
                placeholderTextColor={color.palette.specialBlue}
                underlineColorAndroid={color.palette.lighterGrey}
                style={FORM_INPUTS_VIEWSTYLE}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
              />
                  {errors.email && <Text style={FORM_INPUTS_ERROR_SMALL_VIEWSTYLES}>{errors.email.message}</Text>}
                </View>
              )}
              name="email"
              defaultValue=""
            />

            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "??ifre bo?? olamaz",
                },
                minLength: 6,
              }}
              render={({ field: { onChange, onBlur, value } }) => (

                <View style={INPUTS_CONTAINER_VIEW_STYLE}>
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="??ifre"
                textAlign="left"
                placeholderTextColor={color.palette.specialBlue}
                underlineColorAndroid={color.palette.lighterGrey}
                style={FORM_INPUTS_VIEWSTYLE}
                keyboardType="default"
                secureTextEntry={true}
                returnKeyType="next"
              />{errors.password &&
                  <Text style={FORM_INPUTS_ERROR_SMALL_VIEWSTYLES}>{errors.password.message}</Text>}
                </View>
              )}
              name="password"
              defaultValue=""
            />

            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "??ifre bo?? olamaz",
                },
                minLength: 6,
              }}
              render={({ field: { onChange, onBlur, value } }) => (

                <View style={INPUTS_CONTAINER_VIEW_STYLE}>
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="??ifre Tekrar"
                    textAlign="left"
                    placeholderTextColor={color.palette.specialBlue}
                    underlineColorAndroid={color.palette.lighterGrey}
                    style={FORM_INPUTS_VIEWSTYLE}
                    keyboardType="default"
                    secureTextEntry={true}
                    returnKeyType="next"
                  />{errors.password &&
                  <Text style={FORM_INPUTS_ERROR_SMALL_VIEWSTYLES}>{errors.password.message}</Text>}
                </View>
              )}
              name="passwordAgain"
              defaultValue=""
            />


            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
            <View style={INPUTS_CONTAINER_VIEW_STYLE}>
              <Checkbox style={ISCOURIER_TEXT_STYLE} text="Kurye iseniz kutucu??u i??aretleyin" value={value} onToggle={onChange}/>
            </View>
              )}
              name="isCourier"
              defaultValue={false}
            />

            <Button style={BUTTON_STYLE} onPress={handleSubmit(onRegister)}>
              <Text
                style={BUTTON_TEXT_STYLE}>{authenticationStore.status === "pending" ? "Loading ..." : "KAYDOL"}</Text>
            </Button>
          </View>
        </Screen>
      </View>

    )
  })
