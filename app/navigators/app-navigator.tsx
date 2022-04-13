/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React, { useState } from "react"
import { useColorScheme } from "react-native"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {
  AdvertisementScreen,
  AdvertisementsCustomerScreen,
  LocationScreen,
  LoginScreen,
  CreateAdvertisementScreen,
  HomeScreen,
  ProfileCourierScreen,
  RegistrationScreen,
  ProfileCustomerScreen,
  CommentsAndRateScreen,
  AddressesScreen,
  WalletScreen,
  ChangePasswordScreen,
  SupportScreen,
  RatingCustomerScreen, RatingCourierScreen, AdvertisementsCourierScreen, CouriersSentRequestToAdScreen,
} from "../screens"
import { navigationRef, useBackButtonHandler } from "./navigation-utilities"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { color } from "../theme"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type NavigatorParamListCustomer = {
  advertisement: undefined
  advertisementsCustomer: undefined
  createAdvertisement: undefined
  home: undefined
  location: undefined
  profileCustomer: undefined
  commentsAndRate: undefined
  addresses: undefined
  wallet: undefined
  changePassword: undefined
  support: undefined
  ratingCustomer: undefined
  couriersSentRequestToAd: undefined
  // 🔥 Your screens go here
}
export type NavigatorParamListCourier = {
  advertisement: undefined
  advertisementsCourier: undefined
  home: undefined
  location: undefined
  profileCourier: undefined
  commentsAndRate: undefined
  changePassword: undefined
  wallet: undefined
  support: undefined
  ratingCourier: undefined
  // 🔥 Your screens go here
}
export type NavigatorParamListAuth = {
  login: undefined;
  registration: undefined
  home:undefined
};

const StackAuth = createNativeStackNavigator<NavigatorParamListAuth>()
const AuthStack = () => {
  return (
    <StackAuth.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="login"
    >
      <StackAuth.Screen name="login" component={LoginScreen} />
      <StackAuth.Screen name="registration" component={RegistrationScreen} />
      <StackAuth.Screen name="home" component={HomeScreen} />
    </StackAuth.Navigator>
  )
}


// Documentation: https://reactnavigation.org/docs/stack-navigator/
const StackCustomer = createNativeStackNavigator<NavigatorParamListCustomer>()
const TabCustomer = createBottomTabNavigator()

const HomeStackCustomer = () => {
  return (
    <StackCustomer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="home"
    >
      <StackCustomer.Screen name="advertisement" component={AdvertisementScreen} />
      <StackCustomer.Screen name="advertisementsCustomer" component={AdvertisementsCustomerScreen} />
      <StackCustomer.Screen name="createAdvertisement" component={CreateAdvertisementScreen} />
      <StackCustomer.Screen name="home" component={HomeScreen} />
      <StackCustomer.Screen name="location" component={LocationScreen} />
      <StackCustomer.Screen name="profileCustomer" component={ProfileCustomerScreen} />
      <StackCustomer.Screen name="commentsAndRate" component={CommentsAndRateScreen} />
      <StackCustomer.Screen name="addresses" component={AddressesScreen} />
      <StackCustomer.Screen name="wallet" component={WalletScreen} />
      <StackCustomer.Screen name="changePassword" component={ChangePasswordScreen} />
      <StackCustomer.Screen name="support" component={SupportScreen} />
      <StackCustomer.Screen name="ratingCustomer" component={RatingCustomerScreen} />
      {/** 🔥 Your screens go here */}
    </StackCustomer.Navigator>
  )
}


const AdvetisementStackCustomer = () => {
  return (
    <StackCustomer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="advertisementsCustomer"
    >
      <StackCustomer.Screen name="advertisement" component={AdvertisementScreen} />
      <StackCustomer.Screen name="advertisementsCustomer" component={AdvertisementsCustomerScreen} />
      <StackCustomer.Screen name="createAdvertisement" component={CreateAdvertisementScreen} />
      <StackCustomer.Screen name="home" component={HomeScreen} />
      <StackCustomer.Screen name="location" component={LocationScreen} />
      <StackCustomer.Screen name="profileCustomer" component={ProfileCustomerScreen} />
      <StackCustomer.Screen name="commentsAndRate" component={CommentsAndRateScreen} />
      <StackCustomer.Screen name="addresses" component={AddressesScreen} />
      <StackCustomer.Screen name="wallet" component={WalletScreen} />
      <StackCustomer.Screen name="changePassword" component={ChangePasswordScreen} />
      <StackCustomer.Screen name="support" component={SupportScreen} />
      <StackCustomer.Screen name="ratingCustomer" component={RatingCustomerScreen} />
      <StackCustomer.Screen name="couriersSentRequestToAd" component={CouriersSentRequestToAdScreen} />
      {/** 🔥 Your screens go here */}
    </StackCustomer.Navigator>
  )
}
const ProfileStackCustomer = () => {
  return (
    <StackCustomer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="profileCustomer"
    >
      <StackCustomer.Screen name="advertisement" component={AdvertisementScreen} />
      <StackCustomer.Screen name="advertisementsCustomer" component={AdvertisementsCustomerScreen} />
      <StackCustomer.Screen name="createAdvertisement" component={CreateAdvertisementScreen} />
      <StackCustomer.Screen name="home" component={HomeScreen} />
      <StackCustomer.Screen name="location" component={LocationScreen} />
      <StackCustomer.Screen name="profileCustomer" component={ProfileCustomerScreen} />
      <StackCustomer.Screen name="commentsAndRate" component={CommentsAndRateScreen} />
      <StackCustomer.Screen name="addresses" component={AddressesScreen} />
      <StackCustomer.Screen name="wallet" component={WalletScreen} />
      <StackCustomer.Screen name="changePassword" component={ChangePasswordScreen} />
      <StackCustomer.Screen name="support" component={SupportScreen} />
      <StackCustomer.Screen name="ratingCustomer" component={RatingCustomerScreen} />
      {/** 🔥 Your screens go here */}
    </StackCustomer.Navigator>
  )
}

const StackCourier = createNativeStackNavigator<NavigatorParamListCourier>()
const TabCourier = createBottomTabNavigator()

const HomeStackCourier = () => {
  return (
    <StackCourier.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="home"
    >
      <StackCourier.Screen name="advertisement" component={AdvertisementScreen} />
      <StackCourier.Screen name="advertisementsCourier" component={AdvertisementsCourierScreen} />
      <StackCourier.Screen name="home" component={HomeScreen} />
      <StackCourier.Screen name="location" component={LocationScreen} />
      <StackCourier.Screen name="profileCourier" component={ProfileCourierScreen} />
      <StackCourier.Screen name="commentsAndRate" component={CommentsAndRateScreen} />
      <StackCourier.Screen name="wallet" component={WalletScreen} />
      <StackCourier.Screen name="changePassword" component={ChangePasswordScreen} />
      <StackCourier.Screen name="support" component={SupportScreen} />
      <StackCourier.Screen name="ratingCourier" component={RatingCourierScreen} />
      {/** 🔥 Your screens go here */}
    </StackCourier.Navigator>
  )
}


const AdvetisementStackCourier = () => {
  return (
    <StackCourier.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="advertisementsCourier"
    >
      <StackCourier.Screen name="advertisement" component={AdvertisementScreen} />
      <StackCourier.Screen name="advertisementsCourier" component={AdvertisementsCourierScreen} />
      <StackCourier.Screen name="home" component={HomeScreen} />
      <StackCourier.Screen name="location" component={LocationScreen} />
      <StackCourier.Screen name="profileCourier" component={ProfileCourierScreen} />
      <StackCourier.Screen name="commentsAndRate" component={CommentsAndRateScreen} />
      <StackCourier.Screen name="wallet" component={WalletScreen} />
      <StackCourier.Screen name="changePassword" component={ChangePasswordScreen} />
      <StackCourier.Screen name="support" component={SupportScreen} />
      <StackCourier.Screen name="ratingCourier" component={RatingCourierScreen} />
      {/** 🔥 Your screens go here */}
    </StackCourier.Navigator>
  )
}
const ProfileStackCourier = () => {
  return (
    <StackCourier.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="profileCourier"
    >
      <StackCourier.Screen name="advertisement" component={AdvertisementScreen} />
      <StackCourier.Screen name="advertisementsCourier" component={AdvertisementsCourierScreen} />
      <StackCourier.Screen name="home" component={HomeScreen} />
      <StackCourier.Screen name="location" component={LocationScreen} />
      <StackCourier.Screen name="profileCourier" component={ProfileCourierScreen} />
      <StackCourier.Screen name="commentsAndRate" component={CommentsAndRateScreen} />
      <StackCourier.Screen name="wallet" component={WalletScreen} />
      <StackCourier.Screen name="changePassword" component={ChangePasswordScreen} />
      <StackCourier.Screen name="support" component={SupportScreen} />
      <StackCourier.Screen name="ratingCourier" component={RatingCourierScreen} />
      {/** 🔥 Your screens go here */}
    </StackCourier.Navigator>
  )
}

const CustomerNavigator = () => {
  return (
    <TabCustomer.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: color.palette.specialBlue,
      }}
      initialRouteName="home">
      <TabCustomer.Screen
        name="HomeStack"
        component={HomeStackCustomer}
        options={{
          tabBarLabel: "Anasayfa",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="square" color={color} size={size} />
          ),
        }}
      />
      <TabCustomer.Screen
        name="AdvertisementStack"
        component={AdvetisementStackCustomer}
        options={{
          tabBarLabel: "İlanlarım",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="square" color={color} size={size} />
          ),
        }}
      />
      <TabCustomer.Screen
        name="ProfileStack"
        component={ProfileStackCustomer}
        options={{
          tabBarLabel: "Profil",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="square" color={color} size={size} />
          ),
        }}
      />
    </TabCustomer.Navigator>
  )
}

const CourierNavigator = () => {
  return(
      <TabCourier.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: color.palette.specialBlue,
        }}
        initialRouteName="home">
        <TabCourier.Screen
          name="HomeStack"
          component={HomeStackCourier}
          options={{
            tabBarLabel: "Anasayfa",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="square" color={color} size={size} />
            ),
          }}
        />
        <TabCourier.Screen
          name="AdvertisementStack"
          component={AdvetisementStackCourier}
          options={{
            tabBarLabel: "İlanlarım",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="square" color={color} size={size} />
            ),
          }}
        />
        <TabCourier.Screen
          name="ProfileStack"
          component={ProfileStackCourier}
          options={{
            tabBarLabel: "Profil",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="square" color={color} size={size} />
            ),
          }}
        />
      </TabCourier.Navigator>
    )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {
}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme()
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [isCourier, setIsCourier] = useState(true)

  useBackButtonHandler(canExit)
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      {isAuthenticated ?
          isCourier ? <CourierNavigator/> : <CustomerNavigator/>
        : <AuthStack />}
    </NavigationContainer>
  )
}

AppNavigator.displayName = "AppNavigator"

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
