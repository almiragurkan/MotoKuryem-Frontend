import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, TextStyle, ViewStyle, ImageStyle, FlatList } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { goBack, NavigatorParamListCustomer } from "../../navigators"
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
  borderRadius: 5,
  marginVertical: spacing[5],
  marginHorizontal: spacing[5],
  paddingHorizontal: spacing[1],
  paddingVertical: spacing[1],
  borderColor: color.palette.lighterGrey,
  alignItems: "center",
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.5,
  shadowRadius: 2,
  elevation: 5,

}
const INNER_VIEW_STYLE: ViewStyle = {
  borderWidth: 2,
  borderRadius: 2,
  marginVertical: spacing[1],
  marginHorizontal: spacing[5],
  paddingVertical: spacing[1],
  borderColor: color.palette.lighterGrey,
}

const ICON_STYLE: ImageStyle = { marginVertical: 10, width: 30, height: 30 }
const PROFILE_ICON_STYLE: ImageStyle = { width: 70, height: 70 }
const PROFILE_INNER_VIEW_STYLE: ViewStyle = { flexDirection: "row" }
const INNER_TEXT1: TextStyle = { color: color.palette.black, ...BOLD, fontSize: 25 }
const INNER_TEXT2: TextStyle = { color: color.palette.black, fontSize: 15 }
const INNER_TEXT3: TextStyle = { marginTop: 10, color: color.palette.black, fontSize: 20 }

export const CommentsAndRateScreen: FC<StackScreenProps<NavigatorParamListCustomer, "commentsAndRate">> = observer(function CommentsAndRateScreen() {
  const DATA = [
    {
      id: "1",
      name: "A**** G****",
      star: 5,
      comment: "Güzel",
    },
    {
      id: "2",
      name: "S**** Y****",
      star: 2,
      comment: "Teslimatım hasar görmüş. Kurye çok sorumsuzdu ve aksiydi. Birdaha bu kuryeyle eşyamı taşıtmam.",
    },
    {
      id: "3",
      name: "E**** T****",
      star: 4,
      comment: "Biraz gecikti",
    },
    {
      id: "4",
      name: "S**** Y****",
      star: 3,
      comment: "Teslimatım hasar görmüş. Kurye çok sorumsuzdu ve aksiydi. Birdaha bu kuryeyle eşyamı taşıtmam.",
    },
    {
      id: "5",
      name: "S**** Y****",
      star: 1,
      comment: "Teslimatım hasar görmüş. Kurye çok sorumsuzdu ve aksiydi. Birdaha bu kuryeyle eşyamı taşıtmam.",
    },
  ]


  const genStar = (starsCount) => {
    var stars = []
    let i = 1
    for (i; i < starsCount+1; i++) {
      stars.push(
        <View key={i}>
          <Icon style={{ width: 20, height: 20 }} icon={"star"}></Icon>
        </View>,
      )
    }
    for (i; i < 6; i++) {
      stars.push(
        <View key={i}>
          <Icon style={{ width: 20, height: 20 }} icon={"starBorder"}></Icon>
        </View>,
      )
    }
    return stars
  }
  return (
    <View testID="CommentsAndRateScreen" style={FULL}>
      <GradientBackground colors={["#ffffff", "#ffffff"]} />
      <Screen style={CONTAINER} backgroundColor={color.transparent}>
        <Header headerTx="commentsAndRateScreen.title" style={HEADER} titleStyle={HEADER_TITLE} leftIcon={"back"}
                onLeftPress={goBack} />
        <View style={PROFILE_VIEW_STYLE}>
          <Icon style={PROFILE_ICON_STYLE} icon={"profile"}></Icon>
          <Text style={INNER_TEXT1}>İsim Soyisim</Text>
          <Text style={INNER_TEXT2}>Müşteri</Text>
          <View style={PROFILE_INNER_VIEW_STYLE}>
            <Icon style={ICON_STYLE} icon={"star"}></Icon>
            <Text style={INNER_TEXT3}>3,6 </Text>
          </View>
        </View>
        <FlatList
          scrollEnabled={true}
          data={[...DATA]}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View style={INNER_VIEW_STYLE}>
              <View style={{
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                borderBottomWidth: 2,
                borderBottomColor: color.palette.lighterGrey,
              }}>
                {genStar(item.star)}
                <Text style={{ color: color.palette.black, fontSize: 15, paddingHorizontal: 5 }}>{item.star}</Text>
                <Text style={{
                  paddingHorizontal: 15,
                  color: color.palette.black,
                  fontSize: 17, ...BOLD,
                }}>{item.name}</Text>
              </View>
              <Text style={{ padding: 10, color: color.palette.black }}>{item.comment}</Text>
            </View>
          )}
        />
      </Screen>
    </View>
  )
})
