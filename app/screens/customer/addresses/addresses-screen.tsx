import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { View, TextStyle, ViewStyle, TouchableOpacity, FlatList } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { goBack, NavigatorParamListCustomer } from "../../../navigators"
import { GradientBackground, Header, Screen, Text } from "../../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing, typography } from "../../../theme"
import { useStores } from "../../../models"

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
const INNER_VIEW_STYLE: ViewStyle = {
  borderWidth: 2,
  borderRadius: 2,
  marginVertical: spacing[1],
  marginHorizontal: spacing[0],
  paddingHorizontal: spacing[1],
  paddingVertical: spacing[1],
  borderColor: color.palette.lighterGrey,
  alignItems: "flex-start",
  flexDirection: "column",
}
const BUTTON_VIEW: ViewStyle = { flex: 0.1, justifyContent: "flex-end", alignItems: "center"}
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
const TITLE_TEXT: TextStyle = {
  color: color.palette.black,
  fontFamily: typography.primary,
  ...BOLD,
  fontSize: 15,
  lineHeight: 15,
  paddingTop:50,
  paddingLeft:30,
  paddingBottom:10
}

export const AddressesScreen: FC<StackScreenProps<NavigatorParamListCustomer, "addresses">> = observer(function AddressesScreen() {

  const { authenticationStore } = useStores()

  useEffect(() => {
    (async () => {
      await authenticationStore.fetchUserProfile()
    })()
  })

  const { addressStore } = useStores()
  const { addresses } = addressStore


  useEffect(() => {
    async function fetchData() {
      await addressStore.getAddresses(authenticationStore.customer.id)
    }
    fetchData().then((value) => console.log(value))
  }, [])


  // const DATA = [
  //   {
  //     id: "1",
  //     name: "ev",
  //     addresses: "Kötekli Mah. 311.Sokak No:17 Balarısı Apt",
  //     checked: false
  //   },
  //   {
  //     id: "2",
  //     name: "ev1",
  //     addresses: "Kötekli Mah. 311.Sokak No:17 Balarısı Apt",
  //     checked: false
  //   },
  //   {
  //     id: "3",
  //     name: "iş",
  //     addresses: "Kötekli Mah. 311.Sokak No:17 Balarısı Apt",
  //     checked: false
  //   },
  //   {
  //     id: "4",
  //     name: "iş yeri",
  //     addresses: "Kötekli Mah. 311.Sokak No:17 Balarısı Apt",
  //     checked: false
  //   },
  // ]

  return (
    <View testID="AddressesScreen" style={FULL}>
      <GradientBackground colors={["#ffffff", "#ffffff"]} />
      <Screen style={CONTAINER} backgroundColor={color.transparent}>
        <Header headerTx="addressesScreen.title" style={HEADER} titleStyle={HEADER_TITLE} leftIcon={"back"} onLeftPress={goBack} />
        <Text style={TITLE_TEXT}>Kayıtlı Adresler</Text>
        <View style={{flex:1}}>
          <View style={{borderRadius:2, borderWidth:2, borderColor:color.palette.lighterGrey, padding:10, marginHorizontal:25, marginBottom:25}}>
            <FlatList
              scrollEnabled={true}
              data={[...addresses]}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <View style={INNER_VIEW_STYLE}>
                  <Text style={{
                    paddingHorizontal: 15,
                    color: color.palette.black,
                    fontSize: 17, ...BOLD,
                    textTransform:"capitalize"
                  }}>{item.addressName}:</Text>
                  <Text style={{ padding: 10, color: color.palette.black }}>{item.address}</Text>
                </View>
              )}
            />
          </View>

        </View>

        <View style={BUTTON_VIEW}>
          <TouchableOpacity style={BUTTON_STYLE}>
            <Text style={BUTTON_TEXT}>ADRES EKLE</Text>
          </TouchableOpacity>
        </View>
      </Screen>
    </View>
  )
})
