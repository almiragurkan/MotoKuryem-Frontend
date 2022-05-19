import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { TAdvertisement } from "../advertisement/advertisement"
import { withStatus } from "../extensions/with-status"
import { withEnvironment } from "../extensions/with-environment"
import { AdvertisementApi } from "../../services/api/advetisement-api"
import {
  CreateAdvertisementResult, FetchAdvertisementResult,
} from "../../services/api"
import Moment from "moment"

/**
 * Model description here for TypeScript hints.
 */



export const AdvertisementStoreModel = types
  .model("AdvertisementStore")
  .props({
    id: types.identifierNumber,
    adStatus: types.maybe(types.string),
    price: types.maybe(types.number),
    addressToGiveId: types.maybe(types.string),
    addressToTakeId: types.maybe(types.string),
    productName: types.maybe(types.string),
    productWeight: types.maybe(types.number),
    ratingId: types.maybe(types.string),
  })
  .extend(withStatus)
  .extend(withEnvironment)
  .actions((self) => ({
    saveAdvetisementData: flow(function* (adData: TAdvertisement) {
      self.price = adData.price
      self.addressToGiveId = adData.addressToGiveId
      self.addressToTakeId = adData.addressToTakeId
      self.productName = adData.productName
      self.productWeight = adData.productWeight
    }),

    getAdvertisementData: () => {
      Moment.locale("en")

      return <TAdvertisement>{
        price: self.price,
        addressToGiveId: self.addressToGiveId,
        addressToTakeId: self.addressToTakeId,
        productName: self.productName,
        productWeight: self.productWeight,
      }
    },
  }))
  .actions((self) => ({
    createAdvertisement: flow(function* (adData: TAdvertisement) {
      self.setStatus("pending")
      const advetisementApi = new AdvertisementApi(self.environment.api)
      const result: CreateAdvertisementResult = yield advetisementApi.createAdvertisement(adData)
      self.setStatus("done")
      __DEV__&&console.log("İlan ekleniyor...")

      if (result.kind === "ok") {
        if (result.data.status === "OK") {
          self.saveAdvetisementData(result.adData)
          __DEV__&&console.log("İlan ekleme başarılı")
          return { result: "ok", message: "İlan ekleme başarılı" }
        } else {
          self.setStatus("error")
        }
      } else {
        self.setStatus("error")
      }
      __DEV__&&console.log(result.kind)
      __DEV__&&console.log("İlan ekleme gerçekleştirilemedi")
      return { result: "fail", message: "İlan ekleme gerçekleştirilemedi" }
    }),
  }))
  .actions((self) => ({
    updateAdvertisement: flow(function* (adData: TAdvertisement) {
      self.setStatus("pending")

      const advertisementApi = new AdvertisementApi(self.environment.api)
      const result: CreateAdvertisementResult = yield advertisementApi.updateAdvertisement(adData)

      if (result.kind === "ok") {
        if (result.data.status === "OK") {
          self.setStatus("done")
          self.saveAdvetisementData(result.adData)
        } else {
          self.setStatus("error")
        }
      } else {
        self.setStatus("error")
      }
    }),
  }))
  .actions((self) => ({
    fetchAdvertisement: flow(function* () {
      self.setStatus("pending")

      const advertisementApi = new AdvertisementApi(self.environment.api)
      const result: FetchAdvertisementResult = yield advertisementApi.fetchAdvertisement()


      if (result.kind === "ok") {
        self.price = result.data.price
        self.addressToGiveId = result.data.addressToGiveId
        self.addressToTakeId = result.data.addressToTakeId
        self.productName = result.data.productName
        self.productWeight = result.data.productWeight
        return { result: true, message: "Advertisement updated" }
      } else {
        self.setStatus("error")
        // __DEV__ && console.log(result.kind)
        return { result: false, message: "Advertisement info fetch failed. Reason :" + result.kind }
      }
    }),
  }))
type AdvertisementStoreType = Instance<typeof AdvertisementStoreModel>
export interface AdvertisementStore extends AdvertisementStoreType {}
type AdvertisementStoreSnapshotType = SnapshotOut<typeof AdvertisementStoreModel>
export interface AdvertisementStoreSnapshot extends AdvertisementStoreSnapshotType {}
export const createAdvertisementStoreDefaultModel = () => types.optional(AdvertisementStoreModel, {})
