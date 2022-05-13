import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import {
  FetchUserProfileResult,
  LoginResult,
  LogoutResult,
  RegisterResult,
  ResetPasswordResult,
} from "../../services/api"

import { withStatus } from "../extensions/with-status"
import { withEnvironment } from "../extensions/with-environment"
import { TUserProfile } from "../user-profile/user-profile"
import Moment from "moment"
import { AuthenticationApi } from "../../services/api/authentication-api"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    firstName: types.optional(types.string, ""),
    lastName: types.optional(types.string, ""),
    userName: types.optional(types.string, "", [undefined, null]),
    email: types.optional(types.string, ""),
    password: types.optional(types.string, "", [undefined, null]),
    token: types.optional(types.string, ""),
    isAuthenticated: types.optional(types.boolean, false),
    error: types.optional(types.string, ""),
    userRefresh: types.optional(types.number, 0, [undefined, null]),
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
  }))
  .actions((self) => ({
    saveUserData: flow(function* (userData: TUserProfile) {
      self.firstName = userData.firstName
      self.lastName = userData.lastName
      self.userName = userData.userName
      self.email = userData.email
    }),

    getUserData: () => {
      Moment.locale("en")

      return <TUserProfile>{
        firstName: self.firstName,
        lastName: self.lastName,
        userName: self.userName,
        email: self.email,
        password: self.password,
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

      if (result.kind === "ok") {
        if (result.data.status === "OK") {
          self.saveUserData(result.userData)
          return { result: "ok", message: "Kayıt işlemi başarılı. Lütfen e-posta doğrulaması yapınız!" }
        } else {
          self.setStatus("error")
          self.setError(result.data.error.toString())
        }
      } else {
        self.setStatus("error")
        self.setAuthenticated(false)
        self.setError(result.kind)
      }
      return { result: "fail", message: "Kayıt işlemi gerçekleştirilemedi" }
    }),
  }))
  .actions((self) => ({
    updateUser: flow(function* (userData: TUserProfile) {
      self.setStatus("pending")

      const authenticationApi = new AuthenticationApi(self.environment.api)
      const result: RegisterResult = yield authenticationApi.updateUser(userData)

      if (result.kind === "ok") {
        if (result.data.status === "OK") {
          self.setStatus("done")
          self.saveUserData(result.userData)
        } else {
          self.setStatus("error")
          self.setError(result.data.error.toString())
        }
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
        self.firstName = result.data.firstname
        self.lastName = result.data.lastname
        self.email = result.data.email
        self.userName = result.data.userName
        return { result: true, message: "User updated" }
      } else {
        self.setStatus("error")
        __DEV__ && console.log(result.kind)
        return { result: false, message: "User info fetch failed. Reason :" + result.kind }
      }
    }),
  }))
  .actions((self) => ({
    login: flow(function* (userName: string, password: string, savePass?: boolean) {
      if (userName === "" || password === "") {
        self.status = "error"
        self.isAuthenticated = false
        return { result: false, message: "User name or password is missing" }
      }
      self.status = "pending"
      const authenticationApi = new AuthenticationApi(self.environment.api)
      const result: LoginResult = yield authenticationApi.login(
        userName,
        password,
      )
      self.status = "done"

      if (result.kind === "ok") {
        self.isAuthenticated = true
        self.token = result.token
        self.environment.api.setAuthorizationHeader(result.token)

        if (savePass) {
          self.password = password
          self.userName = userName
        }

        self.lastLogin = new Date()
        return { result: true, message: "Login success" }
      } else {
        self.status = "error"
        self.isAuthenticated = false
        __DEV__ && console.log(result)
        return { result: false, message: result.kind }
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


      if (result.kind === "ok") {
        self.setAuthenticated(false)
      } else {
        self.setStatus("error")
        self.setAuthenticated(false)
        __DEV__ && console.log(result.kind)
      }
    }),
  }))
  .actions((self) => ({
    resetPassword: flow(function* (email: string) {
      self.setStatus("pending")

      const authenticationApi = new AuthenticationApi(self.environment.api)
      const response: ResetPasswordResult = yield authenticationApi.resetPassword(email)
      self.setStatus("done")

      if (response.kind !== "ok") {
        return Promise.resolve({ result: true, message: "başarılı" })
      } else {
        self.setStatus("error")
        __DEV__ && console.log(response.kind)
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
