import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem"
import {
  CreateRatingCourierResult,
  CreateRatingCustomerResult,
  GetAdvertisementRatingsResult,
  GetCourierRatingsResult,
  GetCustomerRatingsResult,
} from "./api.types"
import { TRatingCourier, TRatingCustomer } from "../../models"

const API_PAGE_SIZE = 1000

export class RatingApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getRatingsForCustomer(API_CUSTOMER_ID:any ): Promise<GetCustomerRatingsResult> {
    const params:any = {take: API_PAGE_SIZE}

    if(API_CUSTOMER_ID.length > 0){
      params.customerId = API_CUSTOMER_ID.toString()
    }

    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/rating/get-all-customer-ratings?",
        params
      )

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const ratingsObj = []
      for(let i=0; i<response.data[0].length; i++){
        ratingsObj.push({"id": i.toString(), "rateCustomer": response.data[0][i], "commentCustomer": response.data[1][i], "rateCourier": 0, "commentCourier": " "})
      }
      const ratings = ratingsObj

      return { kind: "ok", ratings }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getRatingsForCourier(API_COURIER_ID:any): Promise<GetCourierRatingsResult> {
    const params:any = {take: API_PAGE_SIZE}

    if(API_COURIER_ID.length > 0){
      params.courierId = API_COURIER_ID.toString()
    }

    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/rating/get-all-chosenCourier-ratings?",
        params
      )

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const ratingsObj = []
      for(let i=0; i<response.data[0].length; i++){
        ratingsObj.push({"id": i.toString(), "rateCourier": response.data[0][i], "commentCourier": response.data[1][i], "rateCustomer": 0, "commentCustomer": ""})
      }
      const ratings = ratingsObj

      return { kind: "ok", ratings }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getAdvertisementRatings(API_ADVERTISEMENT_ID:any): Promise<GetAdvertisementRatingsResult> {
    const params:any = {take: API_PAGE_SIZE}

    if(API_ADVERTISEMENT_ID.length > 0){
      params.city = API_ADVERTISEMENT_ID.toString()
    }

    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/rating/get-all-advertisement-rating?",
        params
      )

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const ratings = response.data

      return { kind: "ok", ratings }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async createRatingCustomer(ratingData: TRatingCustomer): Promise<CreateRatingCustomerResult> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/rating/update-rate-and-comment-courier",
        ratingData,
      )

      __DEV__ && console.log(response)

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      return { kind: "ok", data: response.data, ratingData: ratingData }
    } catch (e) {
      // __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async createRatingCourier(ratingData: TRatingCourier): Promise<CreateRatingCourierResult> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/rating/update-rate-and-comment-customer",
        ratingData,
      )

      __DEV__ && console.log(response)

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      return { kind: "ok", data: response.data, ratingData: ratingData }
    } catch (e) {
      // __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

}
