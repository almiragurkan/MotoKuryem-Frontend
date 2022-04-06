import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { Text, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import {
  AdFinish,
  AdPendingRequest,
  AdStart,
  AdTransfering,
  GradientBackground,
  Header,
  Screen,
} from "../../components"
import { color, spacing, typography } from "../../theme"
import { Menu, MenuDivider, MenuItem } from "react-native-material-menu"

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

export const AdvertisementsCustomerScreen: FC<StackScreenProps<NavigatorParamList, "advertisementsCustomerScreen">> = observer(
  ({ navigation }) => {

    // const createAdvertisementScreen = () => navigation.navigate("createAdvertisement")

    const [state, setState] = useState("ad-Start")
    const [visible, setVisible] = useState(false)
    const hideMenu = () => {
      setVisible(false)
    }
    const showMenu = () => setVisible(true)

    const adStart = () => {
      setState("ad-Start")
      setVisible(false)
    }
    const adPendingRequest = () => {
      setState("ad-Pending-request")
      setVisible(false)
    }
    const adTransfering = () => {
      setState("ad-Transfering")
      setVisible(false)
    }
    const adFinish = () => {
      setState("ad-Finish")
      setVisible(false)
    }

    return (

      <View testID="AdvertisementsCustomerScreen" style={FULL}>
        <GradientBackground colors={["#ffffff", "#ffffff"]} />
        <Screen style={CONTAINER} backgroundColor={color.transparent}>
          <Header headerTx="advertisementsCustomerScreen.title" style={HEADER} titleStyle={HEADER_TITLE}
                  rightIcon={"menu"} onRightPress={showMenu} />
          {
            visible ?
              <View style={{ alignItems: "flex-end", justifyContent: "flex-end" }}>
                <Menu
                  visible={visible}
                  anchor={<Text onPress={showMenu}></Text>}
                  onRequestClose={hideMenu}
                >
                  <MenuItem onPress={adStart}>Başlangıç Aşamasındaki İlanlarım</MenuItem>
                  <MenuDivider />
                  <MenuItem onPress={adPendingRequest}>Kurye İsteği Bekleyen İlanlarım</MenuItem>
                  <MenuDivider />
                  <MenuItem onPress={adTransfering}>Taşıma Aşamasındaki İlanlarım</MenuItem>
                  <MenuDivider />
                  <MenuItem onPress={adFinish}>Tamamlanan İlanlarım</MenuItem>
                </Menu>
              </View>
              : null
          }
          {
            state === "ad-Start" ?
              <AdStart />
              :
              state === "ad-Pending-request" ?
                <AdPendingRequest />
                :
                state === "ad-Transfering" ?
                  <AdTransfering />
                  :
                  <AdFinish />

          }
        </Screen>
      </View>
    )
  })
