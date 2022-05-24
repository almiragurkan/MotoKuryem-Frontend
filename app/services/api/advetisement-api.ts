import { ApiResponse } from "apisauce"
import { Api } from "./api"
import {
  GetAdvertisementsResult,

} from "./api.types"
import { getGeneralApiProblem } from "./api-problem"


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
      const advertisements = response.data

      return { kind: "ok", advertisements }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
