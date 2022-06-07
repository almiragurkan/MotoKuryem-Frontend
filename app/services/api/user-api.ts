import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem"
import { GetCourierProfileResult, GetCustomerProfileResult } from "./api.types"

const API_PAGE_SIZE = 1000

export class UserApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }


  async getUserWithCustomerId(API_CUSTOMER_ID:any): Promise<GetCustomerProfileResult> {
    const params:any = {take: API_PAGE_SIZE}

    if(API_CUSTOMER_ID.length > 0){
      params.customerId = API_CUSTOMER_ID.toString()
    }

    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/auth/get-customer-user?",
        params
      )

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      const users = response.data

      return { kind: "ok", users }

    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }


  async getUserWithCourierId(API_COURIER_ID:any): Promise<GetCourierProfileResult> {
    const params:any = {take: API_PAGE_SIZE}

    if(API_COURIER_ID.length > 0){
      params.courierId = API_COURIER_ID.toString()
    }

    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/auth/get-courier-user?",
        params
      )

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      console.log(response.data)
      const users = response.data

      return { kind: "ok", users }

    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }


}