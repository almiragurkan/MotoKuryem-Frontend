import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CourierModel } from "../authentication-store/authentication-store"
import { RatingModel } from "../rating/rating"
import { AddressModel } from "../address/address"

export type TAdvertisement = {
    adDate: string
    price: number
    adStatus: string
    header: string
    productName: string
    productWeight: string
    addressToTake: string
    addressToGive: string
    rating: string
}

// export const RatingModel = types.model("Rating").props({
//   id: types.optional(types.identifier, "", [null, undefined]),
//   rateCourier: types.optional(types.number, 1, [null, undefined]),
//   commentCourier: types.optional(types.string, "", [null, undefined]),
//   rateCustomer: types.optional(types.number, 1, [null, undefined]),
//   commentCustomer: types.optional(types.string, "", [null, undefined]),
// })

// export const AddressModel = types.model("Address").props({
//   id: types.optional(types.identifier, "", [null, undefined]),
//   address: types.optional(types.string, "", [null, undefined]),
//   city: types.optional(types.string, "", [null, undefined]),
//   zipCode: types.optional(types.string, "", [null, undefined]),
//   phoneNumber: types.optional(types.string, "", [null, undefined]),
//   xCoordinate: types.optional(types.number, 0, [null, undefined]),
//   yCoordinate: types.optional(types.number, 0, [null, undefined]),
// })
/**
 * Model description here for TypeScript hints.
 */



export const UserModel2 = types.model("UserModel2").props({
    id: types.optional(types.identifier, "", [null, undefined]),
    averageRating: types.optional(types.number, 0, [null, undefined]),
})
export const CustomerModel2 = types.model("CustomerModel2").props({
    id: types.optional(types.identifier, "", [null, undefined]),
    user: types.optional(UserModel2, {}, [null, undefined]),
})

export const AdvertisementModel = types
  .model("Advertisement")
  .props({
    id: types.optional(types.identifier, "", [null, undefined]),
    adDate: types.optional(types.string, "", [null, undefined]),
    price: types.optional(types.number, 1, [null, undefined]),
    adStatus: types.optional(types.string, "", [null, undefined]),
    header: types.optional(types.string, "", [null, undefined]),
    productName: types.optional(types.string, "", [null, undefined]),
    productWeight: types.optional(types.string, "", [null, undefined]),
    chosenCourier: types.optional(CourierModel, {}, [null, undefined]),
    customer: types.optional(CustomerModel2, {}, [null, undefined]),
    addressToTake: types.optional(AddressModel, {}, [null, undefined]),
    addressToGive: types.optional(AddressModel, {}, [null, undefined]),
    rating: types.optional(RatingModel, {}, [null, undefined]),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type AdvertisementType = Instance<typeof AdvertisementModel>

export interface Advertisement extends AdvertisementType {
}

type AdvertisementSnapshotType = SnapshotOut<typeof AdvertisementModel>

export interface AdvertisementSnapshot extends AdvertisementSnapshotType {
}

export const createAdvertisementDefaultModel = () => types.optional(AdvertisementModel, {})
