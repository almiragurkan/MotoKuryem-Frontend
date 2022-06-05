import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, TextInput, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamListCustomer } from "../../../navigators"
import { Button, GradientBackground, Header, Screen, Text } from "../../../components"
import { color, spacing, typography } from "../../../theme"
import { Controller, useForm } from "react-hook-form"
import { TAddress, useStores } from "../../../models"

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
export const CreateAddressScreen: FC<StackScreenProps<NavigatorParamListCustomer, "createAddress">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack()
    const { addressStore } = useStores()
    const onCreate = async (data: TAddress) => await addressStore.createAddress(data)

    const
      {
        control,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
      } = useForm<TAddress>()

    useEffect(() => {
      addressStore.clearStatus()
    }, [])
    useEffect(() => {
      if (isSubmitSuccessful === true)
        navigation.goBack()
    }, [isSubmitSuccessful])



    return (
      <View testID="AddressScreen" style={FULL}>
        <GradientBackground colors={["#ffffff", "#ffffff"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Header
            headerTx={"createAddressScreen.title"}
            leftIcon="back"
            onLeftPress={goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />

          <View>
            {addressStore.status === "error" && <Text
              style={FORM_INPUTS_ERROR_VIEWSTYLES}>{"Bir hata ile karşılaşıldı : "}{addressStore.status}</Text>}
          </View>

          <View style={INPUTS_VIEW_STYLE}>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Adres ismi boş olamaz!",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={INPUTS_CONTAINER_VIEW_STYLE}>
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Adres İsmi"
                    textAlign="left"
                    placeholderTextColor={color.palette.specialBlue}
                    underlineColorAndroid={color.palette.lighterGrey}
                    style={FORM_INPUTS_VIEWSTYLE}
                    autoCorrect={true}
                    autoCapitalize="words"
                    returnKeyType="next"
                  />
                  {errors.addressName &&
                    <Text style={FORM_INPUTS_ERROR_SMALL_VIEWSTYLES}>{errors.addressName.message}</Text>}
                </View>
              )}
              name="addressName"
              defaultValue=""
            />
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Şehir boş olamaz!",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={INPUTS_CONTAINER_VIEW_STYLE}>
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Şehir"
                    textAlign="left"
                    placeholderTextColor={color.palette.specialBlue}
                    underlineColorAndroid={color.palette.lighterGrey}
                    style={FORM_INPUTS_VIEWSTYLE}
                    autoCorrect={true}
                    autoCapitalize="words"
                    returnKeyType="next"
                  />
                  {errors.city &&
                    <Text style={FORM_INPUTS_ERROR_SMALL_VIEWSTYLES}>{errors.city.message}</Text>}
                </View>
              )}
              name="city"
              defaultValue=""
            />
            <Controller
              control={control}
              rules={{
                required: {
                  value: false,
                  message: "Adres boş olamaz!",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (

                <View style={INPUTS_CONTAINER_VIEW_STYLE}>
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Adres"
                    textAlign="left"
                    placeholderTextColor={color.palette.specialBlue}
                    underlineColorAndroid={color.palette.lighterGrey}
                    style={FORM_INPUTS_VIEWSTYLE}
                    autoCorrect={true}
                    autoCapitalize="words"
                    returnKeyType="next"
                  />
                  {errors.address &&
                    <Text style={FORM_INPUTS_ERROR_SMALL_VIEWSTYLES}>{errors.address.message}</Text>}

                </View>
              )}
              name="address"
              defaultValue=""
            />
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Posta kodu boş olamaz!",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={INPUTS_CONTAINER_VIEW_STYLE}>
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Posta Kodu"
                    textAlign="left"
                    placeholderTextColor={color.palette.specialBlue}
                    underlineColorAndroid={color.palette.lighterGrey}
                    style={FORM_INPUTS_VIEWSTYLE}
                    keyboardType="email-address"
                    autoCorrect={false}
                    autoCapitalize="none"
                    returnKeyType="next"
                  />
                  {errors.zipCode && <Text style={FORM_INPUTS_ERROR_SMALL_VIEWSTYLES}>{errors.zipCode.message}</Text>}
                </View>
              )}
              name="zipCode"
              defaultValue=""
            />
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Telefon numarası boş olamaz!",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={INPUTS_CONTAINER_VIEW_STYLE}>
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Telefon numarası"
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
                  message: "xCoordinate",
                },
                minLength: 6,
              }}
              render={({ field: { onChange, onBlur, value } }) => (

                <View style={INPUTS_CONTAINER_VIEW_STYLE}>
                  {errors.xCoordinate &&
                  <Text style={FORM_INPUTS_ERROR_SMALL_VIEWSTYLES}>{errors.xCoordinate.message}</Text>}
                </View>
              )}
              name="xCoordinate"
              defaultValue={0}
            />

            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "yCoordinate boş olamaz",
                },
                minLength: 6,
              }}
              render={({ field: { onChange, onBlur, value } }) => (

                <View style={INPUTS_CONTAINER_VIEW_STYLE}>
                  {errors.yCoordinate &&
                  <Text style={FORM_INPUTS_ERROR_SMALL_VIEWSTYLES}>{errors.yCoordinate.message}</Text>}
                </View>
              )}
              name="yCoordinate"
              defaultValue={0}
            />
            <Button style={BUTTON_STYLE} onPress={handleSubmit(onCreate)}>
              <Text
                style={BUTTON_TEXT_STYLE}>{addressStore.status === "pending" ? "Loading ..." : "ADRES EKLE"}</Text>
            </Button>
          </View>
        </Screen>
      </View>

    )
  })
