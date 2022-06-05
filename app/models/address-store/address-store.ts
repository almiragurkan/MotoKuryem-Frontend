import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { AddressModel, AddressSnapshot, TAddress } from "../address/address"
import { AddressApi, CreateAddressResult, DeleteAddressResult } from "../../services/api"
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
    clearStatus: flow(function* () {
      self.setStatus("idle")
    })
  }))
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
  .actions((self) => ({
    createAddress: flow(function* (addressData: TAddress) {
      self.setStatus("pending")
      const addressApi = new AddressApi(self.environment.api)
      const result: CreateAddressResult = yield addressApi.createAddress(addressData)
      self.setStatus("done")
      __DEV__&&console.log("Adres oluşturma işlemi gerçekleştiriliyor...")
      // __DEV__&&console.log(result.kind)
      // __DEV__&&console.log(result)


      if (result.kind === "ok") {
        // __DEV__&&console.log(result.data)
        // __DEV__&&console.log(result.userData)
        __DEV__&&console.log("Adres oluşturma işlemi başarılı")
        return { result: "ok", message: "Adres oluşturma işlemi başarılı" }
      } else {
        self.setStatus("error")
        __DEV__&&console.log("Adres oluşturma işlemi gerçekleştirilemedi")
        return { result: "fail", message: "Adres oluşturma işlemi gerçekleştirilemedi" }
      }
    }),
  }))
  .actions((self) => ({
    deleteAddress: flow(function* (addressId: string) {
      self.setStatus("pending")
      const addressApi = new AddressApi(self.environment.api)
      const result: DeleteAddressResult = yield addressApi.deleteAddress(addressId)
      self.setStatus("done")
      __DEV__&&console.log("Adres silme işlemi gerçekleştiriliyor...")
      __DEV__&&console.log(result.kind)
       __DEV__&&console.log(result)



      if (result.kind === "ok") {
        // __DEV__&&console.log(result.data)
        // __DEV__&&console.log(result.userData)
        __DEV__&&console.log("Adres silme işlemi başarılı")
        return { result: "ok", message: "Adres silme işlemi başarılı" }
      } else {
        self.setStatus("error")
        __DEV__&&console.log("Adres silme işlemi gerçekleştirilemedi")
        return { result: "fail", message: "Adres silme işlemi gerçekleştirilemedi" }
      }
    }),
  }))
type AddressStoreType = Instance<typeof AddressStoreModel>
export interface AddressStore extends AddressStoreType {}
type AddressStoreSnapshotType = SnapshotOut<typeof AddressStoreModel>
export interface AddressStoreSnapshot extends AddressStoreSnapshotType {}
export const createAddressStoreDefaultModel = () => types.optional(AddressStoreModel, {})
