import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import {
  AdvertisementModel, AdvertisementSnapshot,
} from "../advertisement/advertisement"
import { withStatus } from "../extensions/with-status"
import { withEnvironment } from "../extensions/with-environment"
import { AdvertisementApi } from "../../services/api/advetisement-api"

/**
 * Model description here for TypeScript hints.
 */

export const AdvertisementStoreModel = types
  .model("AdvertisementStore")
  .props({
    advertisements: types.optional(types.array(AdvertisementModel), []),
  })
  .extend(withStatus)
  .extend(withEnvironment)
  .actions((self) => ({
    saveAdvertisementData: flow(function* (advertisementSnapshots: AdvertisementSnapshot[]) {
      self.advertisements.replace(advertisementSnapshots)
    })
  }))
  .actions((self) => ({
    getAdvertisements: flow (function* () {
      const advertisementApi = new AdvertisementApi(self.environment.api)
      try {
        const result = yield advertisementApi.getAdvertisements()

        if (result.kind === "ok") {
          self.saveAdvertisementData(result.advertisements)
        } else {
          __DEV__ && console.log(result.kind)
        }
      } catch (e) {
        __DEV__ && console.log(e.message)
      }
    })

  }))
  .actions((self) => ({
    getAdvertisementsFilter: flow (function* (cityIds?:any, status?:any) {
      const advertisementApi = new AdvertisementApi(self.environment.api)
      try {
        const result = yield advertisementApi.getAdvertisementsFilter(cityIds, status)
        __DEV__ && console.log(result.advertisements)

        if (result.kind === "ok") {
          self.saveAdvertisementData(result.advertisements)
        } else {
          __DEV__ && console.log(result.kind)
        }
      } catch (e) {
        __DEV__ && console.log(e.message)
      }
    })

  }))
  .actions((self) => ({
    getAdvertisementsForCustomer: flow (function* (customerIds:any, status?:any) {
      const advertisementApi = new AdvertisementApi(self.environment.api)
      try {
        const result = yield advertisementApi.getAdvertisementsForCustomer(customerIds, status)
        __DEV__ && console.log(result.advertisements)

        if (result.kind === "ok") {
          self.saveAdvertisementData(result.advertisements)
        } else {
          __DEV__ && console.log(result.kind)
        }
      } catch (e) {
        __DEV__ && console.log(e.message)
      }
    })
  }))
  .actions((self) => ({
    getAdvertisementsForCourier: flow (function* (courierIds?:any, status?:any) {
      const advertisementApi = new AdvertisementApi(self.environment.api)
      try {
        const result = yield advertisementApi.getAdvertisementsForCourier(courierIds, status)
        __DEV__ && console.log(result.advertisements)

        if (result.kind === "ok") {
          self.saveAdvertisementData(result.advertisements)
        } else {
          __DEV__ && console.log(result.kind)
        }
      } catch (e) {
        __DEV__ && console.log(e.message)
      }
    })
  }))
  .actions((self) => ({
    findAdvertisement: flow(function* (advertisementId: any){
      if (advertisementId===null){
        return null
      }
      for(let i=0; i<self.advertisements.length; i++){
        if (self.advertisements[i].id===advertisementId){
          return self.advertisements[i]
        }
      }
      return null
    })
  }))
type AdvertisementStoreType = Instance<typeof AdvertisementStoreModel>
export interface AdvertisementStore extends AdvertisementStoreType {}
type AdvertisementStoreSnapshotType = SnapshotOut<typeof AdvertisementStoreModel>
export interface AdvertisementStoreSnapshot extends AdvertisementStoreSnapshotType {}
export const createAdvertisementStoreDefaultModel = () => types.optional(AdvertisementStoreModel, {})
