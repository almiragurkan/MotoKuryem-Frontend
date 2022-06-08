import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { View, TextStyle, ViewStyle, TextInput, TouchableOpacity } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamListCustomer } from "../../../navigators"
import { GradientBackground, Header, Screen, Text } from "../../../components"
import { color, spacing, typography } from "../../../theme"
import { TRatingCustomer, useStores } from "../../../models"
import { Controller, useForm } from "react-hook-form"
import { AirbnbRating } from 'react-native-ratings';


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
  margin:10,
  width:300,
}
const INNER_VIEW2: ViewStyle = {
  borderRadius: 2,
  borderWidth: 2,
  borderColor: color.palette.lighterGrey,
  justifyContent:"center",
  alignItems:"center",
  flexDirection:"row",
  alignContent:"space-around",
  width:300,
  margin:10
}
const INNER_TEXT: TextStyle = {
  color: color.palette.black,
  fontFamily: typography.primary,
  fontSize: 15,
  paddingVertical: 10,
  justifyContent:"flex-start",
  ...BOLD,
  marginHorizontal:10
}
const INPUTS: ViewStyle = {
  backgroundColor: "white",
  padding: spacing[1],
  marginTop: spacing[1],
  paddingHorizontal: spacing[1],
  borderColor: color.palette.lighterGrey,
  borderWidth: 2,
  width:300,
  height:200,
  maxHeight:500,
  margin:10
}
const BUTTON_VIEW: ViewStyle = {
  margin:10,
  width:300,
  justifyContent:"center",
  alignItems:"center"
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

export const RatingCustomerScreen: FC<StackScreenProps<NavigatorParamListCustomer, "ratingCustomer">> = observer(({ route, navigation }) => {

  const goBack = () => navigation.goBack()
  const { ratingStore } = useStores()
  const onCreate = async (data: TRatingCustomer) => await ratingStore.createRatingCustomer(data)

  const
    {
      control,
      handleSubmit,
      formState: { errors, isSubmitSuccessful },
    } = useForm<TRatingCustomer>()

  useEffect(() => {
    ratingStore.clearStatus()
  }, [])
  useEffect(() => {
    if (isSubmitSuccessful === true)
      navigation.goBack()
  }, [isSubmitSuccessful])


  return (
    <View testID="RatingCustomerScreen" style={FULL}>
      <GradientBackground colors={["#ffffff", "#ffffff"]} />
      <Screen style={CONTAINER} backgroundColor={color.transparent}>
        <Header headerTx="ratingCustomerScreen.title" style={HEADER} titleStyle={HEADER_TITLE} leftIcon={"back"}
                onLeftPress={goBack} />
        <Text style={TITLE_TEXT}>TAMAMLANAN İLANLAR</Text>
        <View style={VIEW}>
          <View style={INNER_VIEW1}>
            <Text style={INNER_TEXT}>Kuryeyi Puanla</Text>
          </View>
          <View style={INPUTS_VIEW_STYLE}>
            <Controller
              control={control}
              render={({ field: {} }) => (<View/>)}
              name="ratingId"
              defaultValue={route.params.ratingId}
            />
          </View>

          <View style={INPUTS_VIEW_STYLE}>
            <Controller
              control={control}
              render={({ field: { onChange} }) => (
                  <View style={INNER_VIEW2}>
                    <AirbnbRating
                      count={5}
                      reviews={["Çok Kötü", "Kötü", "İdare eder", "İyi", "Mükemmel"]}
                      defaultRating={1}
                      size={30}
                      onFinishRating={onChange}
                    />
                  {errors.rateCourier &&
                    <Text style={FORM_INPUTS_ERROR_SMALL_VIEWSTYLES}>{errors.rateCourier.message}</Text>}
                </View>
              )}
              name="rateCourier"
              defaultValue={1}
            />
          </View>

          <View>
            {ratingStore.status === "error" && <Text
              style={FORM_INPUTS_ERROR_VIEWSTYLES}>{"Bir hata ile karşılaşıldı : "}{ratingStore.status}</Text>}
          </View>
          <View style={INPUTS_VIEW_STYLE}>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Yorum boş olamaz!",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={INPUTS_CONTAINER_VIEW_STYLE}>
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Yorum yazınız..."
                    textAlign="left"
                    placeholderTextColor={color.palette.specialBlue}
                    underlineColorAndroid={color.palette.lighterGrey}
                    style={INPUTS}
                    autoCorrect={true}
                    autoCapitalize="words"
                    returnKeyType="next"
                  />
                  {errors.commentCourier &&
                    <Text style={FORM_INPUTS_ERROR_SMALL_VIEWSTYLES}>{errors.commentCourier.message}</Text>}
                </View>
              )}
              name="commentCourier"
              defaultValue=""
            />
          </View>

          <View style={BUTTON_VIEW}>
            <TouchableOpacity style={BUTTON_STYLE} onPress={handleSubmit(onCreate)}>
              <Text style={BUTTON_TEXT}>{ratingStore.status === "pending" ? "Loading ..." : "KURYEYİ PUANLA"}</Text>
            </TouchableOpacity>
          </View>
        </View>

      </Screen>
    </View>
  )
})


