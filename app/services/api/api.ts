import { ApisauceInstance, create } from "apisauce"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig


  setAuthorizationHeader = (newToken?: string) => {
    if (newToken) {
      this.apisauce.setHeader("Authorization", `Bearer ${newToken}`)
    } else {
      this.apisauce.deleteHeader("Authorization")
    }
  }

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: "http://130.61.28.235:3000",
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer ",
      },
    })

    // this.apisauce.addRequestTransform(request => {
    //   __DEV__ && console.log(request.baseURL, request.url, "Authorization :", request.headers.Authorization)
    // })
    //
    // this.apisauce.addResponseTransform(response => {
    //   __DEV__ && console.log(response.data)
    // })

  }
}