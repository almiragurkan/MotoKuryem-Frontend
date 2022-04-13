import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { Text, TextStyle, View, ViewStyle, TouchableHighlight, TouchableOpacity, ImageStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamListCustomer } from "../../navigators"
import { GradientBackground, Header, Icon, Screen } from "../../components"
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
  alignItems: 'flex-start',
  padding:10,
  backgroundColor: color.palette.white,
  borderBottomColor: 'black',
  borderBottomWidth: 1,
  flex:1,
  justifyContent: 'center',
  height:102
}
const ROWBACK: ViewStyle = {
  alignItems: 'center',
  backgroundColor: color.palette.white,
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'space-between',
  paddingLeft: 15,
}
const BACKRIGHTBTN: ViewStyle = {
  alignItems: 'center',
  bottom: 0,
  justifyContent: 'center',
  position: 'absolute',
  top: 0,
  width: 100,
  height:50,
}
const BACKRIGHTBTNLEFT: ViewStyle = {
  backgroundColor: color.palette.specialBlue2,
  top:0,
  right: 0,
}
const BACKRIGHTBTNRIGHT: ViewStyle = {
  backgroundColor: color.palette.specialBlue,
  top:52,
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
const ICON_STYLE: ImageStyle = {margin: 10, width:40, height:40}
const INNER_TEXT1: TextStyle = { color:color.palette.black, fontSize: 15, ...BOLD }
const INNER_TEXT2: TextStyle = { color:color.palette.lighterGrey, fontSize: 15 }
const INNER_TEXT3: TextStyle = { color:color.palette.lighterGrey, fontSize: 15, textAlign:"right", paddingRight:25}


export const HomeScreen: FC<StackScreenProps<NavigatorParamListCustomer, "home">> = observer(
  ({ navigation }) => {

    const [listData,] = useState(
      Array(20)
        .fill('')
        .map((_, i) => ({ key: `${i}`, text: `#${i}` }))
    );

    const closeRow = (rowMap, rowKey) => {
      if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
      }
    };

    /* const deleteRow = (rowMap, rowKey) => {
      closeRow(rowMap, rowKey);
      const newData = [...listData];
      const prevIndex = listData.findIndex(item => item.key === rowKey);
      newData.splice(prevIndex, 1);
      setListData(newData);
    }; */

    const onRowDidOpen = rowKey => {
      console.log('This row opened', rowKey);
    };

    const renderItem = data => (
      <TouchableHighlight
        onPress={() => console.log('You touched me')}
        style={ROWFRONT}
        underlayColor={color.palette.white}
      >
        <View style={{flexDirection:"row", padding:10, alignItems:"center"}}>
            <Icon style={ICON_STYLE} icon={"circle"}></Icon>
          <View style={{flexDirection:"column", padding:10, flex:1}}>
            <Text style={INNER_TEXT1}>İLAN {data.item.text}</Text>
            <Text style={INNER_TEXT2}>Eşya: Kağıt</Text>
            <Text style={INNER_TEXT2}>Mesafe: 3 Km</Text>
            <Text style={INNER_TEXT3}>Ücret: 23 TL</Text>
          </View>
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
          onPress={() => navigation.navigate("location")}
          // onPress={() => deleteRow(rowMap, data.item.key)}
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
              leftOpenValue={0}
              rightOpenValue={-100}
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
