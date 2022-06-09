// import { NavigatorParamListCustomer } from "../../../navigators"
// import React, { FC, useState } from "react"
// import { observer } from "mobx-react-lite"
// import { Dimensions, TextStyle, View, ViewStyle } from "react-native"
// import { StackScreenProps } from "@react-navigation/stack"
// import MapView, { Marker } from "react-native-maps"
// import MapViewDirections from "react-native-maps-directions"
// import getDirections from 'react-native-google-maps-directions'
// import { Header } from "../../../components"
// import { color, spacing, typography } from "../../../theme"
//
//
// const width = Dimensions.get("window").width
// const height = Dimensions.get("window").height
// const ASPECT_RATIO = width / height
// const LATITUDE = 37.783333
// const LONGITUDE = 29.094715
// const LATITUDE_DELTA = 0.0922
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
//
// const GOOGLE_MAPS_APIKEY = "AIzaSyDML6i7Ag4Ri8hfYU3Zj-B4byyATMUDNwc"
//
// const FULL: ViewStyle = { flex: 1 }
// const TEXT: TextStyle = {
//   color: color.palette.white,
//   fontFamily: typography.primary,
// }
// const BOLD: TextStyle = { fontWeight: "bold" }
// const HEADER: TextStyle = {
//   paddingTop: spacing[3],
//   paddingBottom: spacing[4] + spacing[1],
//   paddingHorizontal: 0,
// }
// const HEADER_TITLE: TextStyle = {
//   ...TEXT,
//   ...BOLD,
//   fontSize: 12,
//   lineHeight: 15,
//   textAlign: "center",
//   letterSpacing: 1.5,
// }
// export const LocationScreen: FC<StackScreenProps<NavigatorParamListCustomer, "location">> = observer(function LocationScreen() {
//   const [state, setState] = useState(
//     {
//       coordinates: [
//         {
//           latitude: 37.777135981733736,
//           longitude: 29.038244853435696,
//         },
//         {
//           latitude: 37.784331530724245,
//           longitude: 29.084106955281634,
//         },
//         {
//           latitude: 37.7895968380772,
//           longitude: 29.088147211106214,
//         },
//       ],
//       isMapReady: false,
//     })
//
//   let mapView = null
//
//   const onMapPress = e => {
//     setState({
//       coordinates: [...state.coordinates, e.nativeEvent.coordinate], isMapReady: true,
//     })
//   }
//
//   const handleGetDirections = () => {
//     const data = {
//       source: {
//         latitude: state.coordinates[0].latitude,
//         longitude: state.coordinates[0].longitude,
//       },
//       destination: {
//         latitude: state.coordinates[state.coordinates.length - 1].latitude,
//         longitude: state.coordinates[state.coordinates.length - 1].longitude
//       },
//       params: [
//         {
//           key: "travelmode",
//           value: "driving"        // may be "walking", "bicycling" or "transit" as well
//         },
//         {
//           key: "dir_action",
//           value: "navigate"       // this instantly initializes navigation using the given travel mode
//         }
//       ],
//       waypoints: state.coordinates.slice(1, -1)
//     }
//
//     getDirections(data)
//   }
//
//
//   return (
//     <View style = {FULL}>
//       <Header headerTx="locationScreen.title"
//               rightIcon="back"
//               onLeftPress={handleGetDirections}
//               style={HEADER}
//               titleStyle={HEADER_TITLE} />
//       <MapView
//         initialRegion={{
//           latitude: LATITUDE,
//           longitude: LONGITUDE,
//           latitudeDelta: LATITUDE_DELTA,
//           longitudeDelta: LONGITUDE_DELTA,
//         }}
//         ref={c => (mapView = c)}
//         onPress={onMapPress}
//         style={FULL}
//         onLayout={handleGetDirections}
//       >
//         {state.coordinates.map((coordinate, index) => (
//           <Marker key={`coordinate_${index}`} coordinate={coordinate}/>
//         ))}
//         {state.coordinates.length >= 2 && (
//           <MapViewDirections
//             origin={state.coordinates[0]}
//             waypoints={
//               state.coordinates.length > 2
//                 ? state.coordinates.slice(1, -1)
//                 : []
//             }
//             destination={
//               state.coordinates[state.coordinates.length - 1]
//             }
//             apikey={GOOGLE_MAPS_APIKEY}
//             strokeWidth={3}
//             strokeColor="hotpink"
//             optimizeWaypoints={true}
//             onStart={params => {
//               console.log(
//                 `Started routing between "${params.origin}" and "${
//                   params.destination
//                 }"`,
//               )
//             }}
//             onReady={result => {
//               mapView.fitToCoordinates(result.coordinates, {
//                 edgePadding: {
//                   right: width / 20,
//                   bottom: height / 20,
//                   left: width / 20,
//                   top: height / 20,
//                 },
//               })
//             }}
//             onError={errorMessage => {
//               console.log('GOT AN ERROR');
//             }}
//           />
//         )}
//       </MapView>
//     </View>
//   )
// })



import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ImageStyle, Text, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamListCustomer } from "../../../navigators"
import { AutoImage as Image, GradientBackground, Header, Screen } from "../../../components"
import { color, spacing, typography } from "../../../theme"
import { useStores } from "../../../models"

const picture = require("./2.png")

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
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const LOGO: ImageStyle = {
  alignSelf: "center",
  marginHorizontal: spacing[5],
  maxWidth: "100%",
  margin:10,
  width:400, height:200
}
const VIEWSTYLE: ViewStyle = { flexDirection: "row" }
const INNER_TEXT1: TextStyle = { margin: 15, ...BOLD, fontSize: 15, color: color.palette.specialBlue }
const INNER_INPUT_TEXT: TextStyle = {
  marginLeft: 15,
  marginTop: 15, ...BOLD,
  fontSize: 15,
  textTransform: "capitalize",
}
const INPUTS_VIEW_STYLE: ViewStyle = {
  borderWidth: 1,
  marginVertical: spacing[2],
  marginHorizontal: spacing[3],
  paddingHorizontal: spacing[1],
  paddingBottom: spacing[2],
  borderColor: color.palette.lightGrey,
}

export const LocationScreen: FC<StackScreenProps<NavigatorParamListCustomer, "location">> = observer(({ route, navigation}) => {
  const goBack = () => navigation.goBack()
  const { advertisementStore } = useStores()
  const { advertisements } = advertisementStore

  const [advertisementDetail, setAdvertiementDetail] = useState(advertisements[0])

  useEffect(() => {
    if (route.params.adId)
      advertisementStore.findAdvertisement(route.params.adId)
        .then(value => setAdvertiementDetail(value))
  }, [advertisementStore])


  return (
    <View testID="LocationScreen" style={FULL}>
      <GradientBackground colors={["#ffffff", "#ffffff"]} />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header
          headerTx={"locationScreen.title"}
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <View style={INPUTS_VIEW_STYLE}>
          <View style={VIEWSTYLE}>
            <Text style={INNER_INPUT_TEXT}>Çıkış Adresi: </Text>
            <Text style={INNER_TEXT1}>{advertisementDetail.addressToGive.address}</Text>
          </View>
          <View style={VIEWSTYLE}>
            <Text style={INNER_INPUT_TEXT}>Telefon: </Text>
            <Text style={INNER_TEXT1}>{advertisementDetail.addressToGive.phoneNumber}</Text>
          </View>
        </View>
        <View style={INPUTS_VIEW_STYLE}>
          <View style={VIEWSTYLE}>
            <Text style={INNER_INPUT_TEXT}>Çıkış Adresi: </Text>
            <Text style={INNER_TEXT1}>{advertisementDetail.addressToTake.address}</Text>
          </View>
          <View style={VIEWSTYLE}>
            <Text style={INNER_INPUT_TEXT}>Telefon: </Text>
            <Text style={INNER_TEXT1}>{advertisementDetail.addressToTake.phoneNumber}</Text>
          </View>
        </View>
        <View>
          <Image source={picture} style={LOGO} />
        </View>

      </Screen>
    </View>

  )
})