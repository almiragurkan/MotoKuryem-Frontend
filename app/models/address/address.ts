import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CustomerModel } from "../authentication-store/authentication-store"
/**
 * Model description here for TypeScript hints.
 */
export type TAddress = {
    id:string,
    address: string,
    addressName: string,
    city: string,
    zipCode: string,
    phoneNumber: string,
    xCoordinate: number,
    yCoordinate: number
}

export const AddressModel = types
  .model("Address")
  .props({
    id: types.optional(types.identifier, "", [null, undefined]),
    address: types.optional(types.string, "", [null, undefined]),
    addressName: types.optional(types.string, "", [null, undefined]),
    city: types.optional(types.string, "", [null, undefined]),
    zipCode: types.optional(types.string, "", [null, undefined]),
    phoneNumber: types.optional(types.string, "", [null, undefined]),
    xCoordinate: types.optional(types.number, 0, [null, undefined]),
    yCoordinate: types.optional(types.number, 0, [null, undefined]),
    user: types.optional(CustomerModel, {}, [null, undefined]),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type AddressType = Instance<typeof AddressModel>
export interface Address extends AddressType {}
type AddressSnapshotType = SnapshotOut<typeof AddressModel>
export interface AddressSnapshot extends AddressSnapshotType {}
export const createAddressDefaultModel = () => types.optional(AddressModel, {})
