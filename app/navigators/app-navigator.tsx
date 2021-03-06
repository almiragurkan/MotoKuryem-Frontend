/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React, { useContext, useState } from "react"
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
  RatingCustomerScreen,
  RatingCourierScreen,
  AdvertisementsCourierScreen,
  CouriersSentRequestToAdScreen,
  AdvertisementCourierScreen,
  HomeCourierScreen,
  LocationCourierScreen,
  CommentsAndRateCourierScreen,
  WalletCourierScreen,
  ChangePasswordCourierScreen,
  SupportCourierScreen,
  ResetPasswordScreen, CodeVerificationScreen, NewPasswordScreen, CreateAddressScreen,
} from "../screens"
import { navigationRef } from "./navigation-utilities"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { color } from "../theme"
import { Icon } from "../components"
import { useStores } from "../models"
import { MyContext } from "../models/my-context/my-context"

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
  advertisementScreen: { adId }
  advertisementsCustomer: undefined
  createAdvertisement: { adId? }
  home: undefined
  location: { adId }
  profileCustomer: undefined
  commentsAndRate: undefined
  addresses: undefined
  wallet: undefined
  changePassword: undefined
  support: undefined
  ratingCustomer: { ratingId? }
  couriersSentRequestToAd: { adId? }
  resetPassword: undefined
  createAddress: undefined
  // ???? Your screens go here
}
export type NavigatorParamListCourier = {
  advertisementCourier: { adId }
  advertisementsCourier: undefined
  homeCourier: undefined
  locationCourier: { adId }
  profileCourier: undefined
  commentsAndRateCourier: undefined
  changePasswordCourier: undefined
  walletCourier: undefined
  supportCourier: undefined
  ratingCourier: { ratingId? }
  resetPassword: undefined
  // ???? Your screens go here
}
export type NavigatorParamListAuth = {
  login: undefined
  registration: undefined
  resetPassword: undefined
  codeVerification: undefined
  newPassword: undefined
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
      <StackAuth.Screen name="resetPassword" component={ResetPasswordScreen} />
      <StackAuth.Screen name="codeVerification" component={CodeVerificationScreen} />
      <StackAuth.Screen name="newPassword" component={NewPasswordScreen} />
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
      <StackCustomer.Screen name="advertisementScreen" component={AdvertisementScreen} />
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
      <StackCustomer.Screen name="resetPassword" component={ResetPasswordScreen} />
      <StackCustomer.Screen name="createAddress" component={CreateAddressScreen} />
      {/** ???? Your screens go here */}
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
      <StackCustomer.Screen name="advertisementScreen" component={AdvertisementScreen} />
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
      <StackCustomer.Screen name="resetPassword" component={ResetPasswordScreen} />
      {/** ???? Your screens go here */}
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
      <StackCustomer.Screen name="advertisementScreen" component={AdvertisementScreen} />
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
      <StackCustomer.Screen name="resetPassword" component={ResetPasswordScreen} />
      {/** ???? Your screens go here */}
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
      initialRouteName="homeCourier"
    >
      <StackCourier.Screen name="advertisementCourier" component={AdvertisementCourierScreen} />
      <StackCourier.Screen name="advertisementsCourier" component={AdvertisementsCourierScreen} />
      <StackCourier.Screen name="homeCourier" component={HomeCourierScreen} />
      <StackCourier.Screen name="locationCourier" component={LocationCourierScreen} />
      <StackCourier.Screen name="profileCourier" component={ProfileCourierScreen} />
      <StackCourier.Screen name="commentsAndRateCourier" component={CommentsAndRateCourierScreen} />
      <StackCourier.Screen name="walletCourier" component={WalletCourierScreen} />
      <StackCourier.Screen name="changePasswordCourier" component={ChangePasswordCourierScreen} />
      <StackCourier.Screen name="supportCourier" component={SupportCourierScreen} />
      <StackCourier.Screen name="ratingCourier" component={RatingCourierScreen} />
      <StackCourier.Screen name="resetPassword" component={ResetPasswordScreen} />
      {/** ???? Your screens go here */}
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
      <StackCourier.Screen name="advertisementCourier" component={AdvertisementCourierScreen} />
      <StackCourier.Screen name="advertisementsCourier" component={AdvertisementsCourierScreen} />
      <StackCourier.Screen name="homeCourier" component={HomeCourierScreen} />
      <StackCourier.Screen name="locationCourier" component={LocationCourierScreen} />
      <StackCourier.Screen name="profileCourier" component={ProfileCourierScreen} />
      <StackCourier.Screen name="commentsAndRateCourier" component={CommentsAndRateCourierScreen} />
      <StackCourier.Screen name="walletCourier" component={WalletCourierScreen} />
      <StackCourier.Screen name="changePasswordCourier" component={ChangePasswordCourierScreen} />
      <StackCourier.Screen name="supportCourier" component={SupportCourierScreen} />
      <StackCourier.Screen name="ratingCourier" component={RatingCourierScreen} />
      <StackCourier.Screen name="resetPassword" component={ResetPasswordScreen} />
      {/** ???? Your screens go here */}
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
      <StackCourier.Screen name="advertisementCourier" component={AdvertisementCourierScreen} />
      <StackCourier.Screen name="advertisementsCourier" component={AdvertisementsCourierScreen} />
      <StackCourier.Screen name="homeCourier" component={HomeCourierScreen} />
      <StackCourier.Screen name="locationCourier" component={LocationCourierScreen} />
      <StackCourier.Screen name="profileCourier" component={ProfileCourierScreen} />
      <StackCourier.Screen name="commentsAndRateCourier" component={CommentsAndRateCourierScreen} />
      <StackCourier.Screen name="walletCourier" component={WalletCourierScreen} />
      <StackCourier.Screen name="changePasswordCourier" component={ChangePasswordCourierScreen} />
      <StackCourier.Screen name="supportCourier" component={SupportCourierScreen} />
      <StackCourier.Screen name="ratingCourier" component={RatingCourierScreen} />
      <StackCourier.Screen name="resetPassword" component={ResetPasswordScreen} />
      {/** ???? Your screens go here */}
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
          tabBarStyle: { height: 57 },
          tabBarLabelStyle: { fontSize: 15, marginBottom: 10 },
          tabBarIcon: ({ color, size }) => (
            <Icon icon="homeTabBar" style={{ width: 20, height: 20, marginTop: 5 }} />
          ),
        }}
      />
      <TabCustomer.Screen
        name="AdvertisementStack"
        component={AdvetisementStackCustomer}
        options={{
          tabBarLabel: "??lanlar??m",
          tabBarStyle: { height: 57 },
          tabBarLabelStyle: { fontSize: 15, marginBottom: 10 },
          tabBarIcon: ({ color, size }) => (
            <Icon icon="homeTabBar" style={{ width: 20, height: 20, marginTop: 5 }} />
          ),
        }}
      />
      <TabCustomer.Screen
        name="ProfileStack"
        component={ProfileStackCustomer}
        options={{
          tabBarLabel: "Profil",
          tabBarStyle: { height: 57 },
          tabBarLabelStyle: { fontSize: 15, marginBottom: 10 },
          tabBarIcon: ({ color, size }) => (
            <Icon icon="profileTabBar" style={{ width: 25, height: 25, marginTop: 5 }} />
          ),
        }}
      />
    </TabCustomer.Navigator>
  )
}

const CourierNavigator = () => {
  return (
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
          tabBarStyle: { height: 57 },
          tabBarLabelStyle: { fontSize: 15, marginBottom: 10 },
          tabBarIcon: ({ color, size }) => (
            <Icon icon="homeTabBar" style={{ width: 20, height: 20, marginTop: 5 }} />
          ),
        }}
      />
      <TabCourier.Screen
        name="AdvertisementStack"
        component={AdvetisementStackCourier}
        options={{
          tabBarLabel: "??lanlar??m",
          tabBarStyle: { height: 57 },
          tabBarLabelStyle: { fontSize: 15, marginBottom: 10 },
          tabBarIcon: ({ color, size }) => (
            <Icon icon="homeTabBar" style={{ width: 20, height: 20, marginTop: 5 }} />
          ),
        }}
      />
      <TabCourier.Screen
        name="ProfileStack"
        component={ProfileStackCourier}
        options={{
          tabBarLabel: "Profil",
          tabBarStyle: { height: 57 },
          tabBarLabelStyle: { fontSize: 15, marginBottom: 10 },
          tabBarIcon: ({ color, size }) => (
            <Icon icon="profileTabBar" style={{ width: 25, height: 25, marginTop: 5 }} />
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
  const myContext = useContext(MyContext)
  const { authenticationStore } = useStores()
  const [isLogged, setIsLogged] = useState(false)
  const [isLogging, setIsLogging] = useState(false)
  const lastLoginTime = Math.abs((new Date().getTime() - authenticationStore.lastLogin.getTime()) / 1000)

  if (lastLoginTime > 3600) {
    authenticationStore.setAuthenticated(false)
  } else {
    authenticationStore.environment.api.setAuthorizationHeader(authenticationStore.token)
  }

  if (authenticationStore.rememberMe && !isLogging && !isLogged) {
    setIsLogging(true)
    try {
      authenticationStore.login(authenticationStore.email, authenticationStore.password)
        .then(
          (value) => {
            authenticationStore.setAuthenticated(value.result)
            setIsLogged(value.result)
            setIsLogging(false)
          },
        )
    } catch (e) {
      __DEV__ && console.log("Auto login fail. ", e.message)
    }
  }

  if (authenticationStore.rememberMe && authenticationStore.email && authenticationStore.password && !isLogged) return null

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      {myContext.isAuthenticated ?
        myContext.isCourier ? <CourierNavigator /> : <CustomerNavigator />
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
