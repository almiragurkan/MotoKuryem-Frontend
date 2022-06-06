import { ApiResponse } from "apisauce"
import { Api } from "./api"
import {
  CreateAdvertisementResult,
  GetAdvertisementsFilterResult,
  GetAdvertisementsForCourierResult,
  GetAdvertisementsForCustomerResult,
  GetAdvertisementsResult,
  GetBiddingCourierOnAdvertisementResult,
  RemoveCourierOnAdvertisemenResultt, RemoveCourierOnAdvertisementResult,
  SetChosenCourierOnAdvertisementResult,

} from "./api.types"
import { getGeneralApiProblem } from "./api-problem"
import { TAdvertisement } from "../../models"

const API_PAGE_SIZE = 1000

export class AdvertisementApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async createAdvertisement(advertisementData: TAdvertisement): Promise<CreateAdvertisementResult> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/advertisement/create-ad",
        advertisementData,
      )

      // __DEV__ && console.log(response)

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      return { kind: "ok", data: response.data, advertisementData: advertisementData }
    } catch (e) {
      // __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
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

  async getAdvertisementsForCustomer(API_CUSTOMER_ID:any, STATUS:any ): Promise<GetAdvertisementsForCustomerResult> {
    const params:any = {take: API_PAGE_SIZE}

    if(API_CUSTOMER_ID.length > 0){
      params.customerId = API_CUSTOMER_ID.toString()
    }
    if(STATUS.length > 0){
      params.adStatus = STATUS.toString()
    }

    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/advertisement/get-customer-ads?",
        params
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

  async getAdvertisementsForCourier(API_COURIER_ID:any, STATUS:any ): Promise<GetAdvertisementsForCourierResult> {
    const params:any = {take: API_PAGE_SIZE}

    if(API_COURIER_ID.length > 0){
      params.courierId = API_COURIER_ID.toString()
    }
    if(STATUS.length > 0){
      params.adStatus = STATUS.toString()
    }

    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "advertisement/get-chosenCourier-ads?",
        params
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

  async getAdvertisementsFilter(API_CITY_ID:any, STATUS:any ): Promise<GetAdvertisementsFilterResult> {
    const params:any = {take: API_PAGE_SIZE}

    if(API_CITY_ID.length > 0){
      params.city = API_CITY_ID.toString()
    }
    if(STATUS.length > 0){
      params.adStatus = STATUS.toString()
    }

    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/advertisement/get-filtered-all?",
        params
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

  async getBiddingCourierOnAdvertisement(API_ADVERTISEMENT_ID:string ): Promise<GetBiddingCourierOnAdvertisementResult> {
    const params:any = {take: API_PAGE_SIZE}

    if(API_ADVERTISEMENT_ID.length > 0){
      params.advertisementId = API_ADVERTISEMENT_ID.toString()
    }

    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/advertisement/get-bidding-couriers?",
        params
      )

      // __DEV__ && console.log(response.data)

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const result = response.data

      return { kind: "ok", result }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async setChosenCourierOnAdvertisement(API_ADVERTISEMENT_ID:string, API_COURIER_ID:string ): Promise<SetChosenCourierOnAdvertisementResult> {
    const params:any = {take: API_PAGE_SIZE}

    if(API_ADVERTISEMENT_ID.length > 0){
      params.advertisementId = API_ADVERTISEMENT_ID.toString()
    }
    if(API_COURIER_ID.length > 0){
      params.courierId = API_COURIER_ID.toString()
    }

    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/advertisement/set-chosenCourier",
        params
      )

      // __DEV__ && console.log(response.data)

      // the typical ways to die when calling an api
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

  async removeCourierOnAdvertisement(API_ADVERTISEMENT_ID:string, API_COURIER_ID:string ): Promise<RemoveCourierOnAdvertisementResult> {
    const params:any = {take: API_PAGE_SIZE}

    if(API_ADVERTISEMENT_ID.length > 0){
      params.advertisementId = API_ADVERTISEMENT_ID.toString()
    }
    if(API_COURIER_ID.length > 0){
      params.courierId = API_COURIER_ID.toString()
    }

    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/advertisement/remove-courier-from-bidding-couriers-of-the-advertisement",
        params
      )

      // __DEV__ && console.log(response.data)

      // the typical ways to die when calling an api
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

  async setStatus(API_ADVERTISEMENT_ID:string, STATUS:string ): Promise<SetChosenCourierOnAdvertisementResult> {
    const params:any = {take: API_PAGE_SIZE}

    if(API_ADVERTISEMENT_ID.length > 0){
      params.advertisementId = API_ADVERTISEMENT_ID.toString()
    }
    if(STATUS.length > 0){
      params.adStatus = STATUS.toString()
    }

    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/advertisement/set-status",
        params
      )

      // __DEV__ && console.log(response.data)

      // the typical ways to die when calling an api
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

  // async findAdvertisement(API_ADVETISEMENT_ID:any ): Promise<GetAdvertisementResult> {
  //   const params:any = {take: API_PAGE_SIZE}
  //
  //   if(API_ADVETISEMENT_ID.length > 0){
  //     params.advertisementId = API_ADVETISEMENT_ID.toString()
  //   }
  //
  //   try {
  //     // make the api call
  //     const response: ApiResponse<any> = await this.api.apisauce.get(
  //       "/advertisement/get-ad?",
  //       params
  //     )
  //
  //     // the typical ways to die when calling an api
  //     if (!response.ok) {
  //       const problem = getGeneralApiProblem(response)
  //       if (problem) return problem
  //     }
  //
  //     return { kind: "ok", advertisement: response.data }
  //   } catch (e) {
  //     __DEV__ && console.log(e.message)
  //     return { kind: "bad-data" }
  //   }
  // }

}
