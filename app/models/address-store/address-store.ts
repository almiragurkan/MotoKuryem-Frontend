import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { AddressModel, AddressSnapshot } from "../address/address"
import { AddressApi } from "../../services/api"
import { withStatus } from "../extensions/with-status"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Model description here for TypeScript hints.
 */
export const AddressStoreModel = types
  .model("AddressStore")
  .props({
    addresses: types.optional(types.array(AddressModel), [])
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .extend(withStatus)
  .extend(withEnvironment)
  .actions((self) => ({
    saveAddresses: flow(function* (addressSnapshots: AddressSnapshot[]) {
      self.addresses.replace(addressSnapshots)
    })
  }))
  .actions((self) => ({
    getAddresses: flow (function* (customerId:any) {
      const addressApi = new AddressApi(self.environment.api)
      try {
        const result = yield addressApi.getAddresses(customerId)

        if (result.kind === "ok") {
          self.saveAddresses(result.addresses)
        } else {
          __DEV__ && console.log(result.kind)
        }
      } catch (e) {
        __DEV__ && console.log(e.message)
      }
    })
  }))
type AddressStoreType = Instance<typeof AddressStoreModel>
export interface AddressStore extends AddressStoreType {}
type AddressStoreSnapshotType = SnapshotOut<typeof AddressStoreModel>
export interface AddressStoreSnapshot extends AddressStoreSnapshotType {}
export const createAddressStoreDefaultModel = () => types.optional(AddressStoreModel, {})
