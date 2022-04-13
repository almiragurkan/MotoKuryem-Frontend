import React, { FC, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { Text, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamListCustomer } from "../../navigators"
import { GradientBackground, Header, Screen } from "../../components"
import { color, spacing, typography } from "../../theme"
import { TagSelect } from "react-native-tag-select"

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
const ITEM_CONTAINER: ViewStyle = { justifyContent: "center", margin: 5 }
const ITEM: TextStyle = {
  borderWidth: 2,
  borderColor: color.palette.specialBlue,
  backgroundColor: color.palette.white,
}
const LABEL: TextStyle = {
  color: color.palette.specialBlue,
}
const ITEM_SELECTED: TextStyle = {
  backgroundColor: color.palette.specialBlue,
}
const LABEL_SELECTED: TextStyle = {
  color: color.palette.white,
}
const INNER_TEXT: TextStyle = { margin: 15, ...BOLD, fontSize: 15 }
const INNER_INPUT_TEXT: TextStyle = { marginLeft: 15, marginTop: 15, ...BOLD, fontSize: 15 }
const INNER_TEXT1: TextStyle = { color: color.palette.angry }
const INNER_TEXT2: TextStyle = { color: color.palette.lighterGrey, marginTop: 15, marginRight: 15, fontSize: 15 }
const INNER_VIEW: ViewStyle = { marginLeft: 15, marginBottom: 10 }
const INNER_VIEW2: ViewStyle = { flex: 1, flexDirection: "row", justifyContent: "flex-end" }
const INPUTS_VIEW_STYLE: ViewStyle = {
  borderWidth: 1,
  marginVertical: spacing[2],
  marginHorizontal: spacing[3],
  paddingHorizontal: spacing[1],
  paddingBottom: spacing[2],
  borderColor: color.palette.lightGrey,
}
const INPUTS: ViewStyle = {
  backgroundColor: "white",
  height: 40,
  padding: spacing[1],
  marginTop: spacing[1],
  marginHorizontal: spacing[3],
  paddingHorizontal: spacing[1],
  borderColor: color.palette.lightGrey,
  borderWidth: 1,
}
const INPUTS1: ViewStyle = {
  backgroundColor: "white",
  height: 35,
  padding: spacing[3],
  marginRight: spacing[3],
  borderColor: color.palette.lightGrey,
  borderWidth: 1,
}
const BUTTON_VIEW: ViewStyle = { flex: 1, justifyContent: "center", alignItems: "center" }
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


export const CreateAdvertisementScreen: FC<StackScreenProps<NavigatorParamListCustomer, "createAdvertisement">> = observer(({ navigation }) => {

  const goBack = () => navigation.goBack()

  const [stateDate, setStateDate] = useState([])
  const [stateWeight, setStateWeight] = useState([])

  const dates = [
    {
      id: "1",
      label: "En Kısa Zamanda",
    },
    {
      id: "2",
      label: "Benim Seçeceğim Zamanda",
    },
  ]
  const weights = [
    {
      id: "1",
      label: "0-2 KG",
    },
    {
      id: "2",
      label: "2-5 KG",
    },
    {
      id: "3",
      label: "5-10 KG",
    },
    {
      id: "4",
      label: "10-15 KG",
    },
    {
      id: "5",
      label: "15-20 KG",
    },
  ]


  const displaySelectedItems = (sItems) => {
    let tmp = ""
    for (let i = 0; i < sItems.length; i++) {
      tmp += sItems[i].label
    }
    return tmp
  }


  const refDate = useRef<TagSelect>(null)
  const refWeight = useRef<TagSelect>(null)

  return (

    <View testID="CreateAdvertisementScreen" style={FULL}>
      <GradientBackground colors={["#ffffff", "#ffffff"]} />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header headerTx="createAdvertisementScreen.title" style={HEADER} titleStyle={HEADER_TITLE} onLeftPress={goBack}
                leftIcon={"back"} />
        <View>
          <Text style={INNER_TEXT}>Ne zaman alınmalı?</Text>
          <TagSelect
            data={dates}
            max={1}
            ref={refDate}
            onMaxError={() => {/*
              Alert.alert('Uyarı', 'Sadece birini seçebilirsiniz'); */
            }}
            itemStyle={ITEM}
            itemLabelStyle={LABEL}
            itemStyleSelected={ITEM_SELECTED}
            itemLabelStyleSelected={LABEL_SELECTED}
            containerStyle={ITEM_CONTAINER}
            onItemPress={() => {
              setStateDate(refDate.current.itemsSelected)
            }}
          />
          <View style={INNER_VIEW}>{stateDate.length < 1 ?
            <Text style={INNER_TEXT1}>
              Zaman seçimi yapılmadı.
            </Text>
            :
            <Text>{displaySelectedItems(stateDate)}</Text>

          }</View>

          <Text style={INNER_TEXT}>Yaklaşık ağırlık</Text>
          <TagSelect
            data={weights}
            max={1}
            ref={refWeight}
            onMaxError={() => {/*
              Alert.alert('Uyarı', 'Sadece birini seçebilirsiniz'); */
            }}
            itemStyle={ITEM}
            itemLabelStyle={LABEL}
            itemStyleSelected={ITEM_SELECTED}
            itemLabelStyleSelected={LABEL_SELECTED}
            containerStyle={ITEM_CONTAINER}
            onItemPress={() => {
              setStateWeight(refWeight.current.itemsSelected)
            }}
          />
          <View style={INNER_VIEW}>{stateWeight.length < 1 ?
            <Text style={INNER_TEXT1}>
              Kilogram seçimi yapılmadı.
            </Text>
            :
            <Text>{displaySelectedItems(stateWeight)}</Text>
          }
          </View>
          <Text style={INNER_INPUT_TEXT}>Eşya:</Text>
          <TextInput
            placeholder="Eşya ismi giriniz"
            textAlign="left"
            placeholderTextColor={color.palette.lighterGrey}
            style={INPUTS}
            keyboardType="default"
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="next"
          />
          <View style={INPUTS_VIEW_STYLE}>
            <Text style={INNER_INPUT_TEXT}>Çıkış Adresi</Text>
            <TextInput
              placeholder="Adres giriniz"
              textAlign="left"
              placeholderTextColor={color.palette.lighterGrey}
              style={INPUTS}
              keyboardType="default"
              autoCorrect={false}
              returnKeyType="done"
            />
            <Text style={INNER_INPUT_TEXT}>Telefon:</Text>
            <TextInput
              placeholder="(5___)___ __ __"
              textAlign="left"
              placeholderTextColor={color.palette.lighterGrey}
              style={INPUTS}
              keyboardType="numeric"
              autoCorrect={false}
              returnKeyType="done"
            />
          </View>
          <View style={INPUTS_VIEW_STYLE}>
            <Text style={INNER_INPUT_TEXT}>Varış Adresi</Text>
            <TextInput
              placeholder="Adres giriniz"
              textAlign="left"
              placeholderTextColor={color.palette.lighterGrey}
              style={INPUTS}
              keyboardType="default"
              autoCorrect={false}
              returnKeyType="done"
            />
            <Text style={INNER_INPUT_TEXT}>Telefon:</Text>
            <TextInput
              placeholder="(5___)___ __ __"
              textAlign="left"
              placeholderTextColor={color.palette.lighterGrey}
              style={INPUTS}
              keyboardType="numeric"
              autoCorrect={false}
              returnKeyType="done"
            />
          </View>
          <View style={INNER_VIEW2}>
            <Text style={INNER_TEXT}>Önerilen minimum tutar: </Text>
            <Text style={INNER_TEXT2}>23 TL</Text>
          </View>
          <View style={INNER_VIEW2}>
            <Text style={INNER_TEXT}>Vermek istediğiniz ücret:</Text>
            <TextInput
              placeholder=""
              textAlign="left"
              placeholderTextColor={color.palette.lighterGrey}
              underlineColorAndroid={color.palette.lighterGrey}
              style={INPUTS1}
              keyboardType="default"
              autoCorrect={false}
              returnKeyType="done"
            />
          </View>
          <View style={BUTTON_VIEW}>
            <TouchableOpacity style={BUTTON_STYLE}>
              <Text style={BUTTON_TEXT}>YAYINLA</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Screen>
    </View>
  )
})
