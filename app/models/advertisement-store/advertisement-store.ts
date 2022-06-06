import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import {
  AdvertisementModel, AdvertisementSnapshot, TAdvertisement,
} from "../advertisement/advertisement"
import { withStatus } from "../extensions/with-status"
import { withEnvironment } from "../extensions/with-environment"
import { AdvertisementApi } from "../../services/api/advetisement-api"
import { CreateAdvertisementResult } from "../../services/api"
import { UserProfileModel } from "../user-profile/user-profile"

/**
 * Model description here for TypeScript hints.
 */
export const CourierModel1 = types.model("Courier").props({
  id: types.optional(types.identifier, "", [null, undefined]),
  user: types.optional(UserProfileModel, {}, [null, undefined]),
})

export const AdvertisementStoreModel = types
  .model("AdvertisementStore")
  .props({
    advertisements: types.optional(types.array(AdvertisementModel), []),
    couriers: types.optional(types.array(CourierModel1), [], [null, undefined])
  })
  .extend(withStatus)
  .extend(withEnvironment)
  .actions((self) => ({
    saveAdvertisementData: flow(function* (advertisementSnapshots: AdvertisementSnapshot[]) {
      self.advertisements.replace(advertisementSnapshots)
    }),
    saveCourierData: flow(function* (couriers) {
      self.couriers.replace(couriers)
    })
  }))
  .actions((self) => ({
    createAdvertisement: flow(function* (advertisementData: TAdvertisement) {
      self.setStatus("pending")
      const advertisementApi = new AdvertisementApi(self.environment.api)
      const result: CreateAdvertisementResult = yield advertisementApi.createAdvertisement(advertisementData)
      self.setStatus("done")
      __DEV__&&console.log("İlan oluşturma işlemi gerçekleştiriliyor...")
      // __DEV__&&console.log(result.kind)
      // __DEV__&&console.log(result)


      if (result.kind === "ok") {
        // __DEV__&&console.log(result.data)
        // __DEV__&&console.log(result.userData)
        __DEV__&&console.log("İlan oluşturma işlemi başarılı")
        return { result: "ok", message: "İlan oluşturma işlemi başarılı" }
      } else {
        self.setStatus("error")
        __DEV__&&console.log("İlan oluşturma işlemi gerçekleştirilemedi")
        return { result: "fail", message: "İlan oluşturma işlemi gerçekleştirilemedi" }
      }
    }),
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
        // __DEV__ && console.log(result.advertisements)

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
        // __DEV__ && console.log(result.advertisements)

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
  .actions((self) => ({
    getBiddingCourierOnAdvertisement: flow (function* (advertisementId:string) {
      const advertisementApi = new AdvertisementApi(self.environment.api)
      try {
        const result = yield advertisementApi.getBiddingCourierOnAdvertisement(advertisementId)

        // __DEV__ && console.log(result)

        if (result.kind === "ok") {
          return self.saveCourierData(result.result)
        } else {
          __DEV__ && console.log(result.kind)
          return null
        }
      } catch (e) {
        __DEV__ && console.log(e.message)
        return null
      }
    })
  }))
  .actions((self) => ({
    setChosenCourierOnAdvertisement: flow (function* (advertisementId:string, courierId:string, adStatus:string) {
      const advertisementApi = new AdvertisementApi(self.environment.api)
      try {
        const result = yield advertisementApi.setChosenCourierOnAdvertisement(advertisementId, courierId)

        __DEV__ && console.log(result)

        if (result.kind === "ok") {
          const result = yield advertisementApi.setStatus(advertisementId, adStatus)
          if (result.kind === "ok") {
            return null
          } else {
            __DEV__ && console.log(result.kind)
            return null
          }
        } else {
          __DEV__ && console.log(result.kind)
          return null
        }
      } catch (e) {
        __DEV__ && console.log(e.message)
        return null
      }
    })
  }))
  .actions((self) => ({
    removeCourierOnAdvertisement: flow (function* (advertisementId:string, courierId:string) {
      const advertisementApi = new AdvertisementApi(self.environment.api)
      try {
        const result = yield advertisementApi.setChosenCourierOnAdvertisement(advertisementId, courierId)

        __DEV__ && console.log(result)

        if (result.kind === "ok") {
          return null
        } else {
          __DEV__ && console.log(result.kind)
          return null
        }
      } catch (e) {
        __DEV__ && console.log(e.message)
        return null
      }
    })
  }))

type AdvertisementStoreType = Instance<typeof AdvertisementStoreModel>
export interface AdvertisementStore extends AdvertisementStoreType {}
type AdvertisementStoreSnapshotType = SnapshotOut<typeof AdvertisementStoreModel>
export interface AdvertisementStoreSnapshot extends AdvertisementStoreSnapshotType {}
export const createAdvertisementStoreDefaultModel = () => types.optional(AdvertisementStoreModel, {})
