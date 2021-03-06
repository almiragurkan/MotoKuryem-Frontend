import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Text, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamListCourier } from "../../../navigators"
import {
  AdFinishCourier,
  AdSentRequestCourier,
  AdTransferingCourier,
  GradientBackground,
  Header,
  Screen,
} from "../../../components"
import { color, spacing, typography } from "../../../theme"
import { Menu, MenuDivider, MenuItem } from "react-native-material-menu"
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

export const AdvertisementsCourierScreen: FC<StackScreenProps<NavigatorParamListCourier, "advertisementsCourier">> = observer(
  ({ navigation }) => {


    const { authenticationStore } = useStores()

    useEffect(() => {
      (async () => {
        await authenticationStore.fetchUserProfile()
      })()
    })
    const courId = authenticationStore.courier.id


    const [state, setState] = useState("ad-sent-request")
    const [visible, setVisible] = useState(false)
    const hideMenu = () => {
      setVisible(false)
    }
    const showMenu = () => setVisible(true)

    const adSentRequest = () => {
      setState("ad-sent-request")
      setVisible(false)
    }
    const adTransfering = () => {
      setState("ad-transfering")
      setVisible(false)
    }
    const adFinish = () => {
      setState("ad-finish")
      setVisible(false)
    }

    return (

      <View testID="AdvertisementsCourierScreen" style={FULL}>
        <GradientBackground colors={["#ffffff", "#ffffff"]} />
        <Screen style={CONTAINER} backgroundColor={color.transparent}>
          <Header headerTx="advertisementsCourierScreen.title" style={HEADER} titleStyle={HEADER_TITLE}
                  rightIcon={"menu"} onRightPress={showMenu} />
          {
              <View style={{ alignItems: "flex-end", justifyContent: "center" }}>
                <Menu
                  visible={visible}
                  anchor={<Text onPress={showMenu}></Text>}
                  onRequestClose={hideMenu}
                >
                  <MenuItem onPress={adSentRequest}>??stek G??nderilen ??lanlar??m</MenuItem>
                  <MenuDivider />
                  <MenuItem onPress={adTransfering}>Ta????ma A??amas??ndaki ??lanlar??m</MenuItem>
                  <MenuDivider />
                  <MenuItem onPress={adFinish}>Tamamlanan ??lanlar??m</MenuItem>
                </Menu>
              </View>
          }
          {
            state === "ad-sent-request" ?
              <AdSentRequestCourier courierId={courId} navigationprops={navigation} />
              :
              state === "ad-transfering" ?
                <AdTransferingCourier courierId={courId} navigationprops={navigation}/>
                :
                <AdFinishCourier courierId={courId} navigationprops={navigation}/>

          }
        </Screen>
      </View>
    )
  })
