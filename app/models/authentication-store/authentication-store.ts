import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import {
  FetchUserProfileResult,
  LoginResult,
  LogoutResult,
  RegisterResult, ResetPassword2Result,
  ResetPasswordResult,
} from "../../services/api"

import { withStatus } from "../extensions/with-status"
import { withEnvironment } from "../extensions/with-environment"
import { TUserProfile } from "../user-profile/user-profile"
import Moment from "moment"
import { AuthenticationApi } from "../../services/api/authentication-api"


export const CourierModel = types.model("Courier").props({
  id: types.optional(types.identifier, "", [null, undefined]),
})
export const CustomerModel = types.model("Customer").props({
  id: types.optional(types.identifier, "", [null, undefined]),
})

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    name: types.optional(types.string, ""),
    surname: types.optional(types.string, ""),
    username: types.optional(types.string, ""),
    email: types.optional(types.string, ""),
    password: types.optional(types.string, ""),
    phoneNumber: types.optional(types.string, ""),
    customer: types.optional(CustomerModel, {}, [null, undefined]),
    courier: types.optional(CourierModel, {}, [null, undefined]),
    token: types.optional(types.string, ""),
    resetPasswordToken: types.optional(types.string, ""),
    isAuthenticated: types.optional(types.boolean, false),
    isCourier: types.optional(types.boolean, false),
    error: types.optional(types.string, ""),
    userRefresh: types.optional(types.number, 0, [undefined, null]),
    averageRating: types.optional(types.number, 0, [undefined, null]),
    rememberMe: types.optional(types.boolean, false, [undefined, null]),
    lastLogin: types.optional(types.Date, new Date(), [undefined, null]),
  })
  .extend(withEnvironment)
  .extend(withStatus)
  .actions((self) => ({
    setLastLogin: function(loginDate: Date) {
      self.lastLogin = loginDate
    },
  }))
  .actions((self) => ({
    setError: flow(function* (value: string) {
      self.error = value
    }),
    setRememberMe: flow(function* (rememberMe: boolean) {
      self.rememberMe = rememberMe
    }),
    removePassword: flow(function* () {
      self.password = ""
    }),
  }))
  .actions((self) => ({
    setUserRefresh: function() {
      if (self.userRefresh > 1000)
        self.userRefresh = 0

      self.userRefresh += 1
    },
  }))
  .actions((self) => ({
    setAuthenticated: function(value) {
      self.isAuthenticated = value
    },
  }))
  .actions((self) => ({
    clearStatus: flow(function* () {
      self.setError("")
      self.setStatus("idle")
    }),
    setToken: flow(function* (token: string) {
      self.token = token
    }),
    setResetPasswordToken: flow(function* (resetPasswordToken: string) {
      self.resetPasswordToken = resetPasswordToken
    }),
  }))
  .actions((self) => ({
    saveUserData: flow(function* (userData: TUserProfile) {
      self.name = userData.name
      self.surname = userData.surname
      self.username = userData.username
      self.isCourier = userData.isCourier
      self.email = userData.email
      self.averageRating = userData.averageRating
    }),

    getUserData: () => {
      Moment.locale("en")

      return <TUserProfile>{
        name: self.name,
        surname: self.surname,
        username: self.username,
        email: self.email,
        password: self.password,
        isCourier: self.isCourier,
        averageRating: self.averageRating
      }
    },
  }))
  .actions((self) => ({
    register: flow(function* (userData: TUserProfile) {
      self.setStatus("pending")
      const authenticationApi = new AuthenticationApi(self.environment.api)
      const result: RegisterResult = yield authenticationApi.register(userData)
      self.setAuthenticated(false)
      self.setStatus("done")
      __DEV__&&console.log("Kayıt işlemi gerçekleştiriliyor...")
      // __DEV__&&console.log(result.kind)
      // __DEV__&&console.log(result)


      if (result.kind === "ok") {
         // __DEV__&&console.log(result.data)
         // __DEV__&&console.log(result.userData)
          self.saveUserData(result.userData)
          __DEV__&&console.log("Kayıt işlemi başarılı")
          return { result: "ok", message: "Kayıt işlemi başarılı" }
      } else {
        self.setStatus("error")
        self.setAuthenticated(false)
        self.setError(result.kind)
        __DEV__&&console.log("Kayıt işlemi gerçekleştirilemedi")
        return { result: "fail", message: "Kayıt işlemi gerçekleştirilemedi" }
      }
    }),
  }))
  .actions((self) => ({
    updateUser: flow(function* (userData: TUserProfile) {
      self.setStatus("pending")

      const authenticationApi = new AuthenticationApi(self.environment.api)
      const result: RegisterResult = yield authenticationApi.updateUser(userData)

      __DEV__ && console.log(result)

      if (result.kind === "ok") {
          self.setStatus("done")
          self.saveUserData(result.userData)
      } else {
        self.setStatus("error")
        self.setError(result.kind)
      }
    }),
  }))
  .actions((self) => ({
    fetchUserProfile: flow(function* () {
      self.setStatus("pending")

      const authenticationApi = new AuthenticationApi(self.environment.api)
      const result: FetchUserProfileResult = yield authenticationApi.fetchUserProfile()
      if (result.kind === "ok") {
        self.name = result.data.name
        self.surname = result.data.surname
        self.email = result.data.email
        self.isCourier = result.data.isCourier
        self.username = result.data.username
        self.phoneNumber = result.data.phoneNumber
        self.customer = result.data.customer
        self.courier = result.data.courier
        self.averageRating = result.data.averageRating
        return { result: true, message: "User updated" }
      } else {
        self.setStatus("error")
        // __DEV__ && console.log(result.kind)
        return { result: false, message: "User info fetch failed. Reason :" + result.kind }
      }
    }),
  }))
  .actions((self) => ({
    login: flow(function* (username: string, password: string, savePass?: boolean) {
      if (username === "" || password === "") {
        self.status = "error"
        self.isAuthenticated = false
        return { result: false, message: "User name or password is missing" }
      }
      self.status = "pending"
      const authenticationApi = new AuthenticationApi(self.environment.api)
      const result: LoginResult = yield authenticationApi.login(
        username,
        password,
      )
      self.status = "done"

      if (result.kind === "ok") {
        self.isAuthenticated = true
        self.token = result.token
        self.environment.api.setAuthorizationHeader(result.token)
        __DEV__ && console.log("Giriş başarılı")
        if (savePass) {
          self.password = password
          self.username = username
        }
        __DEV__ && console.log(result.kind)

        self.lastLogin = new Date()

        return { result: true, message: "Login success", isAuthenticated: self.isAuthenticated, isCourier:self.isCourier }
      } else {
        self.status = "error"
        self.isAuthenticated = false
        return { result: false, message: result.kind, isAuthenticated: self.isAuthenticated, isCourier:self.isCourier }
      }
    }),
  }))
  .actions((self) => ({
    logout: flow(function* () {
      self.setStatus("pending")
      const authenticationApi = new AuthenticationApi(self.environment.api)
      const result: LogoutResult = yield authenticationApi.logout()
      self.setStatus("done")
      yield self.removePassword()
      __DEV__ && console.log("Çıkış yapılıyor...")

      if (result.kind === "ok") {
        self.setAuthenticated(false)
        __DEV__ && console.log("Çıkış başarılı")
      } else {
        self.setStatus("error")
        self.setAuthenticated(false)
        __DEV__ && console.log(result.kind)
      }
    }),
  }))
  .actions((self) => ({
    resetPassword1: flow(function* (email: string) {
      self.setStatus("pending")

      const authenticationApi = new AuthenticationApi(self.environment.api)
      const response1: ResetPasswordResult = yield authenticationApi.resetPassword1(email)
      self.setStatus("done")


      console.log("response1 kind:" + response1.kind)


      if (response1.kind === "ok") {
        self.resetPasswordToken = response1.resetPasswordToken
        console.log("response2 Token: " + self.resetPasswordToken)
        return Promise.resolve({ result: true, message: "başarılı" })
      } else {
        self.setStatus("error")
        // __DEV__ && console.log(response.kind)
        return Promise.resolve({ result: false, message: "" })
      }
    }),
  }))
  .actions((self) => ({
    resetPassword2: flow(function* (code: string) {
      self.setStatus("pending")

      const authenticationApi = new AuthenticationApi(self.environment.api)
      const response2: ResetPassword2Result = yield authenticationApi.resetPassword2(self.resetPasswordToken, code)
      self.setStatus("done")


      console.log("response2 kind:" + response2.kind)


      if (response2.kind === "ok") {
        self.resetPasswordToken = response2.resetPasswordToken
        console.log("response2 Token: " + self.resetPasswordToken)
        return Promise.resolve({ result: true, message: "başarılı" })
      } else {
        self.setStatus("error")
        // __DEV__ && console.log(response.kind)
        return Promise.resolve({ result: false, message: "" })
      }
    }),
  }))

  .actions((self) => ({
    resetPassword3: flow(function* (newPassword: string) {
      self.setStatus("pending")

      const authenticationApi = new AuthenticationApi(self.environment.api)
      const response3: ResetPassword2Result = yield authenticationApi.resetPassword3(self.resetPasswordToken, newPassword)
      self.setStatus("done")

      console.log("response3 kind:" + response3.kind)

      if (response3.kind === "ok") {
        console.log("response3 result: " + response3)
        return Promise.resolve({ result: true, message: "başarılı" })
      } else {
        self.setStatus("error")
        // __DEV__ && console.log(response.kind)
        return Promise.resolve({ result: false, message: "" })
      }
    }),
  }))




type AuthenticationStoreType = Instance<typeof AuthenticationStoreModel>;

export interface AuthenticationStore extends AuthenticationStoreType {
}

type AuthenticationStoreSnapshotType = SnapshotOut<typeof AuthenticationStoreModel>;

export interface AuthenticationStoreSnapshot
  extends AuthenticationStoreSnapshotType {
}

export const createAuthenticationStoreDefaultModel = () =>
  types.optional(AuthenticationStoreModel, {})
