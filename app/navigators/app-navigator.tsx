/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React from "react"
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
  RatingCustomerScreen, RatingCourierScreen,
} from "../screens"
import { navigationRef, useBackButtonHandler } from "./navigation-utilities"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
export type NavigatorParamList = {
  welcome: undefined
  demo: undefined
  demoList: undefined
  advertisement: undefined
  advertisementsCustomer: undefined
  advertisementsCourier: undefined
  createAdvertisement: undefined
  home: undefined
  location: undefined
  login: undefined
  profileCourier: undefined
  profileCustomer: undefined
  registration: undefined
  commentsAndRate: undefined
  addresses: undefined
  wallet: undefined
  changePassword: undefined
  support: undefined
  ratingCustomer: undefined
  ratingCourier: undefined
  // 🔥 Your screens go here
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<NavigatorParamList>()
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="home"
    >
      <Stack.Screen name="advertisement" component={AdvertisementScreen} />
      <Stack.Screen name="advertisementsCustomer" component={AdvertisementsCustomerScreen} />
      <Stack.Screen name="advertisementsCourier" component={AdvertisementsCustomerScreen} />
      <Stack.Screen name="createAdvertisement" component={CreateAdvertisementScreen} />
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="location" component={LocationScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="profileCourier" component={ProfileCourierScreen} />
      <Stack.Screen name="profileCustomer" component={ProfileCustomerScreen} />
      <Stack.Screen name="registration" component={RegistrationScreen} />
      <Stack.Screen name="commentsAndRate" component={CommentsAndRateScreen} />
      <Stack.Screen name="addresses" component={AddressesScreen} />
      <Stack.Screen name="wallet" component={WalletScreen} />
      <Stack.Screen name="changePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="support" component={SupportScreen} />
      <Stack.Screen name="ratingCustomer" component={RatingCustomerScreen} />
      <Stack.Screen name="ratingCourier" component={RatingCourierScreen} />
      {/** 🔥 Your screens go here */}
    </Stack.Navigator>
  )
}


const AdvetisementStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="advertisementsCustomer"
    >
      <Stack.Screen name="advertisement" component={AdvertisementScreen} />
      <Stack.Screen name="advertisementsCustomer" component={AdvertisementsCustomerScreen} />
      <Stack.Screen name="advertisementsCourier" component={AdvertisementsCustomerScreen} />
      <Stack.Screen name="createAdvertisement" component={CreateAdvertisementScreen} />
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="location" component={LocationScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="profileCourier" component={ProfileCourierScreen} />
      <Stack.Screen name="profileCustomer" component={ProfileCustomerScreen} />
      <Stack.Screen name="registration" component={RegistrationScreen} />
      <Stack.Screen name="commentsAndRate" component={CommentsAndRateScreen} />
      <Stack.Screen name="addresses" component={AddressesScreen} />
      <Stack.Screen name="wallet" component={WalletScreen} />
      <Stack.Screen name="changePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="support" component={SupportScreen} />
      <Stack.Screen name="ratingCustomer" component={RatingCustomerScreen} />
      <Stack.Screen name="ratingCourier" component={RatingCourierScreen} />
      {/** 🔥 Your screens go here */}
    </Stack.Navigator>
  )
}
const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="profileCustomer"
    >
      <Stack.Screen name="advertisement" component={AdvertisementScreen} />
      <Stack.Screen name="advertisementsCustomer" component={AdvertisementsCustomerScreen} />
      <Stack.Screen name="advertisementsCourier" component={AdvertisementsCustomerScreen} />
      <Stack.Screen name="createAdvertisement" component={CreateAdvertisementScreen} />
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="location" component={LocationScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="profileCourier" component={ProfileCourierScreen} />
      <Stack.Screen name="profileCustomer" component={ProfileCustomerScreen} />
      <Stack.Screen name="registration" component={RegistrationScreen} />
      <Stack.Screen name="commentsAndRate" component={CommentsAndRateScreen} />
      <Stack.Screen name="addresses" component={AddressesScreen} />
      <Stack.Screen name="wallet" component={WalletScreen} />
      <Stack.Screen name="changePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="support" component={SupportScreen} />
      <Stack.Screen name="ratingCustomer" component={RatingCustomerScreen} />
      <Stack.Screen name="ratingCourier" component={RatingCourierScreen} />
      {/** 🔥 Your screens go here */}
    </Stack.Navigator>
  )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme()
  useBackButtonHandler(canExit)
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor:color.palette.specialBlue
        }}
        initialRouteName="home">
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarLabel: 'Anasayfa',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="square" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="AdvertisementStack"
          component={AdvetisementStack}
          options={{
            tabBarLabel: 'İlanlarım',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="square" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="ProfileStack"
          component={ProfileStack}
          options={{
            tabBarLabel: 'Profil',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="square"  color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
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
