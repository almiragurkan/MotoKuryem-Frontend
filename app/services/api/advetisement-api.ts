import { ApiResponse } from "apisauce"
import { Api } from "./api"
import {
  CreateAdvertisementResult, FetchAdvertisementResult,
  GetAdvertisementsResult,
  UpdateAdvertisementResult,
} from "./api.types"
import { getGeneralApiProblem } from "./api-problem"
import { TAdvertisement } from "../../models"

export class AdvertisementApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getAdvertisements(): Promise<GetAdvertisementsResult> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/advertisement/get-all",
      )

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      const advertisements = response.data.rows
      return { kind: "ok", advertisements: advertisements }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async createAdvertisement(adData: TAdvertisement): Promise<CreateAdvertisementResult> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/advertisement/create-ad",
        adData,
      )

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      return { kind: "ok", data: response.data, adData: adData }
    } catch (e) {
      // __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }



  async updateAdvertisement(adData: TAdvertisement): Promise<UpdateAdvertisementResult> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/advertisement/update-ad",
        // fix url
        adData,
      )

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      return { kind: "ok", data: response.data, adData: adData }
    } catch (e) {
      // __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }


  async fetchAdvertisement(): Promise<FetchAdvertisementResult> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.get(
        // fix url
        "/advertisement/get-all",
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



}
