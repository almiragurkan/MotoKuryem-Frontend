import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { RatingModel, RatingSnapshot, TRatingCourier, TRatingCustomer } from "../rating/rating"
import { withStatus } from "../extensions/with-status"
import { withEnvironment } from "../extensions/with-environment"
import { RatingApi } from "../../services/api/rating-api"
import {
  CreateRatingCourierResult,
  CreateRatingCustomerResult,
} from "../../services/api"

/**
 * Model description here for TypeScript hints.
 */
export const RatingStoreModel = types
  .model("RatingStore")
  .props({
    ratings: types.optional(types.array(RatingModel), []),
  })
  .extend(withStatus)
  .extend(withEnvironment)
  .actions((self) => ({
    clearStatus: flow(function* () {
      self.setStatus("idle")
    })
  }))
  .actions((self) => ({
    saveRatings: flow(function* (ratingSnapshots: RatingSnapshot[]) {
      self.ratings.replace(ratingSnapshots)
    })
  }))
  .actions((self) => ({
    getRatingsForCustomer: flow (function* (customerId:any) {
      const ratingApi = new RatingApi(self.environment.api)
      try {
        const result = yield ratingApi.getRatingsForCustomer(customerId)

        if (result.kind === "ok") {
          self.saveRatings(result.ratings)
        } else {
          __DEV__ && console.log(result.kind)
        }
      } catch (e) {
        __DEV__ && console.log(e.message)
      }
    })
  }))
  .actions((self) => ({
  getRatingsForCourier: flow (function* (courierId:any) {
    const ratingApi = new RatingApi(self.environment.api)
    try {
      const result = yield ratingApi.getRatingsForCourier(courierId)

      if (result.kind === "ok") {
        self.saveRatings(result.ratings)
      } else {
        __DEV__ && console.log(result.kind)
      }
    } catch (e) {
      __DEV__ && console.log(e.message)
    }
  })
}))
  .actions((self) => ({
    getAdvertisementRatings: flow (function* (advertisementId:any) {
      const ratingApi = new RatingApi(self.environment.api)
      try {
        const result = yield ratingApi.getAdvertisementRatings(advertisementId)

        if (result.kind === "ok") {
          self.saveRatings(result.ratings)
        } else {
          __DEV__ && console.log(result.kind)
        }
      } catch (e) {
        __DEV__ && console.log(e.message)
      }
    })
  }))
  .actions((self) => ({
    createRatingCustomer: flow(function* (ratingData: TRatingCustomer) {
      self.setStatus("pending")
      const ratingApi = new RatingApi(self.environment.api)
      const result: CreateRatingCustomerResult = yield ratingApi.createRatingCustomer(ratingData)
      self.setStatus("done")
      __DEV__&&console.log("Rating oluşturma işlemi gerçekleştiriliyor...")
      // __DEV__&&console.log(result.kind)
      // __DEV__&&console.log(result)


      if (result.kind === "ok") {
        // __DEV__&&console.log(result.data)
        // __DEV__&&console.log(result.userData)
        __DEV__&&console.log("Rating oluşturma işlemi başarılı")
        return { result: "ok", message: "Rating oluşturma işlemi başarılı" }
      } else {
        self.setStatus("error")
        __DEV__&&console.log("Rating oluşturma işlemi gerçekleştirilemedi")
        return { result: "fail", message: "Rating oluşturma işlemi gerçekleştirilemedi" }
      }
    }),
  }))
  .actions((self) => ({
    createRatingCourier: flow(function* (ratingData: TRatingCourier) {
      self.setStatus("pending")
      const ratingApi = new RatingApi(self.environment.api)
      const result: CreateRatingCourierResult = yield ratingApi.createRatingCourier(ratingData)
      self.setStatus("done")
      __DEV__&&console.log("Rating oluşturma işlemi gerçekleştiriliyor...")
      // __DEV__&&console.log(result.kind)
      // __DEV__&&console.log(result)


      if (result.kind === "ok") {
        // __DEV__&&console.log(result.data)
        // __DEV__&&console.log(result.userData)
        __DEV__&&console.log("Rating oluşturma işlemi başarılı")
        return { result: "ok", message: "Rating oluşturma işlemi başarılı" }
      } else {
        self.setStatus("error")
        __DEV__&&console.log("Rating oluşturma işlemi gerçekleştirilemedi")
        return { result: "fail", message: "Rating oluşturma işlemi gerçekleştirilemedi" }
      }
    }),
  }))
type RatingStoreType = Instance<typeof RatingStoreModel>
export interface RatingStore extends RatingStoreType {}
type RatingStoreSnapshotType = SnapshotOut<typeof RatingStoreModel>
export interface RatingStoreSnapshot extends RatingStoreSnapshotType {}
export const createRatingStoreDefaultModel = () => types.optional(RatingStoreModel, {})
