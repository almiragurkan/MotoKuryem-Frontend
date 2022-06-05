import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem"
import {
  CreateAddressResult, DeleteAddressResult,
  GetAddressesResult,
} from "./api.types"
import { TAddress } from "../../models"

const API_PAGE_SIZE = 1000

export class AddressApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getAddresses(API_CUSTOMER_ID:any ): Promise<GetAddressesResult> {
    const params:any = {take: API_PAGE_SIZE}

    if(API_CUSTOMER_ID.length > 0){
      params.customerId = API_CUSTOMER_ID.toString()
    }

    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "/address/get-all-addresses?",
        params
      )

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const addresses = response.data

      return { kind: "ok", addresses }
    } catch (e) {
      __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async createAddress(adressData: TAddress): Promise<CreateAddressResult> {
    try {
      const response: ApiResponse<any> = await this.api.apisauce.post(
        "/address",
        adressData,
      )

      __DEV__ && console.log(response)

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      return { kind: "ok", data: response.data, addressData: adressData }
    } catch (e) {
      // __DEV__ && console.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async deleteAddress(API_ADDRESS_ID:string): Promise<DeleteAddressResult> {
    const params:any = {take: API_PAGE_SIZE}

    if(API_ADDRESS_ID.length > 0){
      params.addressId = API_ADDRESS_ID.toString()
    }

    try {
      const response: ApiResponse<any> = await this.api.apisauce.delete(
        "/address/delete-address",
        params
      )

      __DEV__ && console.log(response)

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

  // async updateAddress(addressData: TAddress): Promise<UpdateAddressResult> {
  //   try {
  //     const response: ApiResponse<any> = await this.api.apisauce.post(
  //       "/address/update-address",
  //       addressData,
  //     )
  //
  //     if (!response.ok) {
  //       const problem = getGeneralApiProblem(response)
  //       if (problem) return problem
  //     }
  //
  //
  //     return { kind: "ok", data: response.data, addressData: addressData }
  //   } catch (e) {
  //     // __DEV__ && console.log(e.message)
  //     return { kind: "bad-data" }
  //   }
  // }

}
