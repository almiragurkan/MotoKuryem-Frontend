import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { RatingModel, RatingSnapshot } from "../rating/rating"
import { withStatus } from "../extensions/with-status"
import { withEnvironment } from "../extensions/with-environment"
import { RatingApi } from "../../services/api/rating-api"

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
type RatingStoreType = Instance<typeof RatingStoreModel>
export interface RatingStore extends RatingStoreType {}
type RatingStoreSnapshotType = SnapshotOut<typeof RatingStoreModel>
export interface RatingStoreSnapshot extends RatingStoreSnapshotType {}
export const createRatingStoreDefaultModel = () => types.optional(RatingStoreModel, {})
