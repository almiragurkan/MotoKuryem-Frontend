import { Instance, SnapshotOut, types } from "mobx-state-tree"

export type TAdvertisement = {
    price: number
    addressToGiveId: string
    addressToTakeId: string
    productName: string
    productWeight: number
}


export const AddressModel = types.model("Address").props({
    id: types.maybe(types.number),
    address: types.maybe(types.string),
    city: types.maybe(types.string),
    zipCode: types.maybe(types.string),
    xCoordinate: types.maybe(types.string),
    yCoordinate: types.maybe(types.string),
    advertisementId: types.maybe(types.string),
})
/**
 * Model description here for TypeScript hints.
 */
export const AdvertisementModel = types
  .model("Advertisement")
  .props({
    id: types.identifierNumber,
    adStatus: types.maybe(types.string),
    price: types.maybe(types.number),
    addressToGiveId: types.optional(AddressModel, {}, [null, undefined]),
    addressToTakeId: types.optional(AddressModel, {}, [null, undefined]),
    productName: types.maybe(types.number),
    productWeight: types.maybe(types.number),
    ratingId: types.maybe(types.string),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type AdvertisementType = Instance<typeof AdvertisementModel>
export interface Advertisement extends AdvertisementType {}
type AdvertisementSnapshotType = SnapshotOut<typeof AdvertisementModel>
export interface AdvertisementSnapshot extends AdvertisementSnapshotType {}
export const createAdvertisementDefaultModel = () => types.optional(AdvertisementModel, {})
