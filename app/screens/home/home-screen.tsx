import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { Text, TextStyle, View, ViewStyle, TouchableHighlight, TouchableOpacity } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { GradientBackground, Header, Screen } from "../../components"
import { color, spacing, typography } from "../../theme"
import { SwipeListView } from 'react-native-swipe-list-view';

const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const FULL: ViewStyle = { flex: 1 }
const CONTAINER1: ViewStyle = {
    backgroundColor: color.palette.white,
    flex: 1,
  }
const BACKTEXTWHITE: TextStyle = {
  color: '#FFF',
}
const ROWFRONT: ViewStyle = {
  alignItems: 'center',
  backgroundColor: color.palette.white,
  borderBottomColor: 'black',
  borderBottomWidth: 1,
  height: 50,
  justifyContent: 'center',

}
const ROWBACK: ViewStyle = {
  alignItems: 'center',
  backgroundColor: color.palette.white,
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingLeft: 15,
}
const BACKRIGHTBTN: ViewStyle = {
  alignItems: 'center',
  bottom: 0,
  justifyContent: 'center',
  position: 'absolute',
  top: 0,
  width: 75,}
const BACKRIGHTBTNLEFT: ViewStyle = {
  backgroundColor: color.palette.specialBlue2,
  right: 75,
}
const BACKRIGHTBTNRIGHT: ViewStyle = {
  backgroundColor: color.palette.specialBlue,
  right: 0,
}
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


export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "home">> = observer(
  ({ navigation }) => {

    const [listData, setListData] = useState(
      Array(20)
        .fill('')
        .map((_, i) => ({ key: `${i}`, text: `#${i}` }))
    );

    const closeRow = (rowMap, rowKey) => {
      if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
      }
    };

    const deleteRow = (rowMap, rowKey) => {
      closeRow(rowMap, rowKey);
      const newData = [...listData];
      const prevIndex = listData.findIndex(item => item.key === rowKey);
      newData.splice(prevIndex, 1);
      setListData(newData);
    };

    const onRowDidOpen = rowKey => {
      console.log('This row opened', rowKey);
    };

    const renderItem = data => (
      <TouchableHighlight
        onPress={() => console.log('You touched me')}
        style={ROWFRONT}
        underlayColor={color.palette.white}
      >
        <View>
          <Text>İLAN {data.item.text}</Text>
        </View>
      </TouchableHighlight>
    );

    const renderHiddenItem = (data, rowMap) => (
      <View style={ROWBACK}>
        <TouchableOpacity
          style={[BACKRIGHTBTN, BACKRIGHTBTNLEFT]}
          onPress={() => closeRow(rowMap, data.item.key)}
        >
          <Text style={BACKTEXTWHITE}>İstek Yolla</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[BACKRIGHTBTN, BACKRIGHTBTNRIGHT]}
          onPress={() => deleteRow(rowMap, data.item.key)}
        >
          <Text style={BACKTEXTWHITE}>Lokasyonu Gör</Text>
        </TouchableOpacity>
      </View>
    );


    return (

      <View testID="HomeScreen" style={FULL}>
        <GradientBackground colors={["#ffffff", "#ffffff"]} />
        <Screen style={CONTAINER} backgroundColor={color.transparent}>
          <Header headerTx="homeScreen.title" style={HEADER} titleStyle={HEADER_TITLE} />
          <View style={CONTAINER1}>
            <SwipeListView
              data={listData}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              rightOpenValue={-150}
              previewRowKey={'0'}
              previewOpenValue={-40}
              previewOpenDelay={3000}
              onRowDidOpen={onRowDidOpen}
            />
          </View>
        </Screen>
      </View>
    )
  })
