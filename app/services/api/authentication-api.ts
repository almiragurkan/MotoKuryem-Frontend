import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem"
import {
  LoginResult,
  LogoutResult,
  RegisterResult,
  FetchUserProfileResult,
  UpdateUserResult,
  ResetPasswordResult,
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
        "/api/register",
        userData,
      )

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      return { kind: "ok", data: response.data, userData: userData }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async updateUser(userData: TUserProfile): Promise<UpdateUserResult> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/api/user/update",
        userData,
      )

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      return { kind: "ok", data: response.data, userData: userData }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async login(emailAddress: string, password: string): Promise<LoginResult> {
    try {
      __DEV__ && console.log("API login inProcess")
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/api/login_check",
        { username: emailAddress, password: password },
      )
      __DEV__ && console.log("API login request completed")

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      return { kind: "ok", token: response.data.token }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async logout(): Promise<LogoutResult> {
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
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async fetchUserProfile(): Promise<FetchUserProfileResult> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/api/user/me",
      )

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      return { kind: "ok", data: response.data.data }

    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async resetPassword(email: string): Promise<ResetPasswordResult> {
    const tmpMail = { email: email }

    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/api/user/reset-password",
        tmpMail,
      )

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      if (response.data.status !== "OK") {
        return { kind: "ok", result: response.data.data }
      }

      return { kind: "fail", result: response.data.data }

    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
