import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Text, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Button, GradientBackground, Header, Screen } from "../../components"
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
const CONTAINER_VIEW: ViewStyle = {flexDirection:"row", alignItems:"flex-end", justifyContent:"flex-end", marginTop:spacing[8]}
const CREATE_ADVERTISEMENT_BTN_TEXT: TextStyle = {
  marginTop: 0,
  fontWeight: "bold",
  fontSize:30
}


export const AdvertisementsCustomerScreen: FC<StackScreenProps<NavigatorParamList, "advertisements">> = observer(
  ({ navigation }) => {

    const createAdvertisementScreen = () => navigation.navigate("createAdvertisement")


    return (

      <View testID="AdvertisementCustomerScreen" style={FULL}>
        <GradientBackground colors={["#ffffff", "#ffffff"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Header headerTx="advertisementsCustomerScreen.title" style={HEADER} titleStyle={HEADER_TITLE} />
          <View>
            <View>
              <Text>İlanım1</Text>
            </View>
            <View>
              <Text>__________________________________________________________</Text>
            </View>
            <View>
              <Text>İlanım2</Text>
            </View>
            <View>
              <Text>__________________________________________________________</Text>
            </View><View>
            <Text>İlanım3</Text>
          </View>
            <View>
              <Text>__________________________________________________________</Text>
            </View><View>
            <Text>İlanım4</Text>
          </View>
            <View>
              <Text>__________________________________________________________</Text>
            </View><View>
            <Text>İlanım5</Text>
          </View>
            <View>
              <Text>__________________________________________________________</Text>
            </View><View>
            <Text>İlanım6</Text>
          </View>
            <View>
              <Text>__________________________________________________________</Text>
            </View>
          </View>


        </Screen>
        <View style={CONTAINER_VIEW}>
          <Button style={{borderRadius:100, marginHorizontal:10, marginVertical:10, width:60, height:60}}>
            <Text style={CREATE_ADVERTISEMENT_BTN_TEXT} onPress={createAdvertisementScreen}>+</Text>
          </Button>
        </View>
      </View>
    )
  })
