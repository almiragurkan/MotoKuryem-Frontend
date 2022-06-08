import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem"
import {
  LoginResult,
  LogoutResult,
  RegisterResult,
  FetchUserProfileResult,
  UpdateUserResult,
  ResetPasswordResult, ResetPassword2Result, ResetPassword3Result,
} from "./api.types"
import { TUserProfile } from "../../models"

export class AuthenticationApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async register(userData: TUserProfile): Promise<RegisterResult> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/auth/signup",
        userData,
      )

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      return { kind: "ok", data: response.data, userData: userData }
    } catch (e) {
      // __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async updateUser(userData: TUserProfile): Promise<UpdateUserResult> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/auth/update-password-for-user",
        userData,
      )

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }


      return { kind: "ok", data: response.data, userData: userData }
    } catch (e) {
      // __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async login(username: string, password: string): Promise<LoginResult> {
    try {
      __DEV__ && console.log("API login inProcess")
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/auth/signin",
        { username: username, password: password },
      )
      __DEV__ && console.log("API login request completed")

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      // __DEV__ && console.log(response.ok)
      // __DEV__ && console.log(response.data.accessToken)
      return { kind: "ok", token: response.data.accessToken }
    } catch (e) {
      // __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async logout(): Promise<LogoutResult> {
    return { kind: "ok" };
    try {
      const response: ApiResponse<any> = await this.api.apisauce.patch(
        "/logout",
      )

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      return { kind: "ok" }
    } catch (e) {
      // __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async fetchUserProfile(): Promise<FetchUserProfileResult> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/auth/get-user",
      )

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      return { kind: "ok", data: response.data }

    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async resetPassword1(email: string): Promise<ResetPasswordResult> {

    try {
      const response1: ApiResponse<any> = await this.api.apisauce.post(
        "/auth/request-reset-password",
        { email: email }
      )

      if (!response1.ok) {
        const problem = getGeneralApiProblem(response1)
        if (problem) return problem
      }

      if (response1.data.status !== "OK") {
        return { kind: "ok", resetPasswordToken: response1.data }
      }

      return { kind: "fail", resetPasswordToken: response1.data }


    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async resetPassword2(encryptedString:string, code: string): Promise<ResetPassword2Result> {

    try {
      const response2: ApiResponse<any> = await this.api.apisauce.post(
        "/auth/use-reset-password-code",
        { encryptedString: encryptedString, code:code }
      )
      console.log(code)
      console.log(response2.data)

      if (!response2.ok) {
        const problem = getGeneralApiProblem(response2)
        if (problem) return problem
      }

      if (response2.data.status !== "OK") {
        return { kind: "ok", resetPasswordToken: response2.data }
      }

      return { kind: "fail", resetPasswordToken: response2.data }


    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async resetPassword3(encryptedAnswer:string, newPassword: string): Promise<ResetPassword3Result> {

    try {
      const response3: ApiResponse<any> = await this.api.apisauce.post(
        "/auth/reset-password",
        { encryptedAnswer: encryptedAnswer, newPassword:newPassword }
      )
      console.log(newPassword)
      console.log(response3.data)

      if (!response3.ok) {
        const problem = getGeneralApiProblem(response3)
        if (problem) return problem
      }

      if (response3.data.status !== "OK") {
        return { kind: "ok", result: response3.data }
      }

      return { kind: "fail", result: response3.data }


    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

}
