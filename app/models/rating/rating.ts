import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export type TRatingCustomer = {
    ratingId:string,
    rateCourier: number,
    commentCourier: string,
}
export type TRatingCourier = {
    ratingId:string,
    rateCustomer: number,
    commentCustomer: string,
}


export const RatingModel = types
  .model("Rating")
  .props({
    id: types.optional(types.string, "", [null, undefined]),
    rateCourier: types.optional(types.number, 0, [null, undefined]),
    commentCourier: types.optional(types.string, "", [null, undefined]),
    rateCustomer: types.optional(types.number, 0, [null, undefined]),
    commentCustomer: types.optional(types.string, "", [null, undefined]),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type RatingType = Instance<typeof RatingModel>

export interface Rating extends RatingType {
}

type RatingSnapshotType = SnapshotOut<typeof RatingModel>

export interface RatingSnapshot extends RatingSnapshotType {
}

export const createRatingDefaultModel = () => types.optional(RatingModel, {})
