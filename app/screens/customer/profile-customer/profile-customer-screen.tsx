import React, { FC, useContext, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { View, TextStyle, ViewStyle, ImageStyle, TouchableOpacity } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamListCustomer } from "../../../navigators"
import { GradientBackground, Header, Icon, Screen, Text } from "../../../components"
import { color, spacing, typography } from "../../../theme"
import { useStores } from "../../../models"
import { MyContext } from "../../../models/my-context/my-context"

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
const INNER_TEXT1: TextStyle = { color:color.palette.black, ...BOLD, fontSize: 25, textTransform:"capitalize"}
const INNER_TEXT2: TextStyle = { color:color.palette.black, fontSize: 15 }
const INNER_TEXT3: TextStyle = { marginTop:10, color:color.palette.black, marginLeft: 15, fontSize: 20 }

export const ProfileCustomerScreen: FC<StackScreenProps<NavigatorParamListCustomer, "profileCustomer">> = observer(({ navigation }) => {

  const { authenticationStore,advertisementStore } = useStores()
  const myContext = useContext(MyContext) as any

  useEffect(() => {
    (async () => {
      await authenticationStore.fetchUserProfile()
    })()
  })

  const onLogout = () => {
    authenticationStore.logout().then(
      () => {
        authenticationStore.setToken("")
        authenticationStore.setAuthenticated(false)
        advertisementStore.saveAdvertisementData([]);
        advertisementStore.getAdvertisementsForCustomer
        myContext.setValue({isAuthenticated:false, isCourier:false})
      },
    )
  }

  const fullName = authenticationStore.name + " " + authenticationStore.surname

  return (
    <View testID="ProfileCustomerScreen" style={FULL}>
      <GradientBackground colors={["#ffffff", "#ffffff"]} />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header headerTx="profileScreen.title" style={HEADER} titleStyle={HEADER_TITLE} />
        <View style={PROFILE_VIEW_STYLE}>
          <Icon style={PROFILE_ICON_STYLE} icon={"profile"}></Icon>
          <Text style={INNER_TEXT1}>{fullName}</Text>
          <Text style={INNER_TEXT2}>{authenticationStore.isCourier ? "Kurye" : "M????teri"}</Text>
          <View style={PROFILE_INNER_VIEW_STYLE}>
            <Icon style={ICON_STYLE} icon={"gmail"}></Icon>
            <Text style={INNER_TEXT3}>{authenticationStore.email}</Text>
          </View>
          <View style={PROFILE_INNER_VIEW_STYLE}>
            <Icon style={ICON_STYLE} icon={"phone"}></Icon>
            <Text style={INNER_TEXT3}>{authenticationStore.phoneNumber}</Text>
          </View>
        </View>
        <TouchableOpacity style={INNER_VIEW_STYLE} onPress={()=>navigation.navigate("commentsAndRate")}>
          <Icon style={ICON_STYLE1} icon={"comment"}/>
          <Text style={INNER_TEXT2}>Yorumlar ve Puanlar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={INNER_VIEW_STYLE} onPress={()=>navigation.navigate("addresses")}>
          <Icon style={ICON_STYLE1} icon={"location"}/>
          <Text style={INNER_TEXT2}>Adreslerim</Text>
        </TouchableOpacity>
        <TouchableOpacity style={INNER_VIEW_STYLE} onPress={()=>navigation.navigate("wallet")}>
          <Icon style={ICON_STYLE1} icon={"wallet"}/>
          <Text style={INNER_TEXT2}>C??zdan??m</Text>
        </TouchableOpacity>
        <TouchableOpacity style={INNER_VIEW_STYLE} onPress={()=>navigation.navigate("changePassword")}>
          <Icon style={ICON_STYLE1} icon={"lock"}/>
          <Text style={INNER_TEXT2}>??ifreyi De??i??tir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={INNER_VIEW_STYLE} onPress={()=>navigation.navigate("support")}>
          <Icon style={ICON_STYLE1} icon={"support"}/>
          <Text style={INNER_TEXT2}>Destek</Text>
        </TouchableOpacity>
        <View style={BUTTON_VIEW}>
          <TouchableOpacity style={BUTTON_STYLE} onPress={onLogout}>
            <Text style={BUTTON_TEXT}>??IKI?? YAP</Text>
          </TouchableOpacity>
        </View>
      </Screen>
    </View>
  )
})
