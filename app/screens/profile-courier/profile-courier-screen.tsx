import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, TextStyle, ViewStyle, ImageStyle, TouchableOpacity } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamListCourier } from "../../navigators"
import { GradientBackground, Header, Icon, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing, typography } from "../../theme"

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
const PROFILE_VIEW_STYLE: ViewStyle = {
  borderWidth: 2,
  borderRadius:5,
  marginVertical: spacing[5],
  marginHorizontal: spacing[4],
  paddingHorizontal: spacing[1],
  paddingVertical: spacing[2],
  borderColor: color.palette.lighterGrey,
  alignItems:"center",
  shadowColor: '#000000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.5,
  shadowRadius: 2,
  elevation: 5

}
const INNER_VIEW_STYLE: ViewStyle = {
  borderWidth: 2,
  borderRadius:5,
  marginVertical: spacing[1],
  marginHorizontal: spacing[2],
  paddingHorizontal: spacing[1],
  paddingVertical: spacing[1],
  borderColor: color.palette.lighterGrey,
  alignItems:"center",
  flexDirection:"row"
}
const BUTTON_VIEW: ViewStyle = { flex: 1, justifyContent: "center", alignItems: "center" }
const BUTTON_STYLE: ViewStyle = {
  backgroundColor: color.palette.specialBlue,
  margin: spacing[5],
  width: 80,
  height: 50,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 5,
}
const BUTTON_TEXT: TextStyle = {
  color: color.palette.white,
}

const ICON_STYLE: ImageStyle = {margin: 10, width:30, height:30}
const ICON_STYLE1: ImageStyle = {margin: 10, width:25, height:25}
const PROFILE_ICON_STYLE: ImageStyle = { width:120, height:120}
const PROFILE_INNER_VIEW_STYLE: ViewStyle = {flexDirection:"row"}
const INNER_TEXT1: TextStyle = { color:color.palette.black, ...BOLD, fontSize: 25 }
const INNER_TEXT2: TextStyle = { color:color.palette.black, fontSize: 15 }
const INNER_TEXT3: TextStyle = { marginTop:10, color:color.palette.black, marginLeft: 15, fontSize: 20 }

export const ProfileCourierScreen: FC<StackScreenProps<NavigatorParamListCourier, "profileCourier">> = observer(({ navigation }) => {

  return (
    <View testID="ProfileCourierScreen" style={FULL}>
      <GradientBackground colors={["#ffffff", "#ffffff"]} />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header headerTx="profileScreen.title" style={HEADER} titleStyle={HEADER_TITLE} />
        <View style={PROFILE_VIEW_STYLE}>
          <Icon style={PROFILE_ICON_STYLE} icon={"profile"}></Icon>
          <Text style={INNER_TEXT1}>İsim Soyisim</Text>
          <Text style={INNER_TEXT2}>Kurye</Text>
          <View style={PROFILE_INNER_VIEW_STYLE}>
            <Icon style={ICON_STYLE} icon={"gmail"}></Icon>
            <Text style={INNER_TEXT3}>isimsoyisim@gmail.com</Text>
          </View>
          <View style={PROFILE_INNER_VIEW_STYLE}>
            <Icon style={ICON_STYLE} icon={"phone"}></Icon>
            <Text style={INNER_TEXT3}>+90(533)333 33 33</Text>
          </View>
        </View>
        <TouchableOpacity style={INNER_VIEW_STYLE} onPress={()=>navigation.navigate("commentsAndRate")}>
          <Icon style={ICON_STYLE1} icon={"comment"}></Icon>
          <Text style={INNER_TEXT2}>Yorumlar ve Puanlar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={INNER_VIEW_STYLE} onPress={()=>navigation.navigate("wallet")}>
          <Icon style={ICON_STYLE1} icon={"wallet"}></Icon>
          <Text style={INNER_TEXT2}>Cüzdanım</Text>
        </TouchableOpacity>
        <TouchableOpacity style={INNER_VIEW_STYLE} onPress={()=>navigation.navigate("changePassword")}>
          <Icon style={ICON_STYLE1} icon={"lock"}></Icon>
          <Text style={INNER_TEXT2}>Şifreyi Değiştir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={INNER_VIEW_STYLE} onPress={()=>navigation.navigate("support")}>
          <Icon style={ICON_STYLE1} icon={"support"}></Icon>
          <Text style={INNER_TEXT2}>Destek</Text>
        </TouchableOpacity>
        <View style={BUTTON_VIEW}>
          <TouchableOpacity style={BUTTON_STYLE}>
            <Text style={BUTTON_TEXT}>ÇIKIŞ YAP</Text>
          </TouchableOpacity>
        </View>
    </Screen>
    </View>
  )
})
