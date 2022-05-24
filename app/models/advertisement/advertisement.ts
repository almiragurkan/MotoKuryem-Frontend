import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const CourierModel = types.model("Customer").props({
  id: types.optional(types.identifier, "", [null, undefined]),
})
export const CustomerModel = types.model("Customer").props({
  id: types.optional(types.identifier, "", [null, undefined]),
})

export const RatingModel = types.model("Rating").props({
  id: types.optional(types.identifier, "", [null, undefined]),
  rateCourier: types.optional(types.number, 1, [null, undefined]),
  commentCourier: types.optional(types.string, "", [null, undefined]),
  rateCustomer: types.optional(types.number, 1, [null, undefined]),
  commentCustomer: types.optional(types.string, "", [null, undefined]),
})

export const AddressModel = types.model("Address").props({
  id: types.optional(types.identifier, "", [null, undefined]),
  address: types.optional(types.string, "", [null, undefined]),
  city: types.optional(types.string, "", [null, undefined]),
  zipCode: types.optional(types.string, "", [null, undefined]),
  xCoordinate: types.optional(types.string, "", [null, undefined]),
  yCoordinate: types.optional(types.string, "", [null, undefined]),
  advertisementId: types.optional(types.string, "", [null, undefined]),
})
/**
 * Model description here for TypeScript hints.
 */
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
    customer: types.optional(CustomerModel, {}, [null, undefined]),
    addressToTakeId: types.optional(AddressModel, {}, [null, undefined]),
    addressToGiveId: types.optional(AddressModel, {}, [null, undefined]),
    ratingId: types.optional(RatingModel, {}, [null, undefined]),
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