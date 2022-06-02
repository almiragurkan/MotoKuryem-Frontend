import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { withStatus } from "../extensions/with-status"
import { withEnvironment } from "../extensions/with-environment"
import { UserModel, UserSnapshot } from "../user/user"
import { UserApi } from "../../services/api"

/**
 * Model description here for TypeScript hints.
 */
export const UserStoreModel = types
  .model("UserStore")
  .props({
    users: types.optional(types.array(UserModel), []),
  })
  .extend(withStatus)
  .extend(withEnvironment)
  .actions((self) => ({
    saveUserData: flow(function* (userSnapshots: UserSnapshot[]) {
      self.users.replace(userSnapshots)
    })
  }))
  .actions((self) => ({
    getUserWithCustomerId: flow (function* (customerId:any) {
      const userApi = new UserApi(self.environment.api)
      try {
        const result = yield userApi.getUserWithCustomerId(customerId)
        __DEV__ && console.log(result.users)

        if (result.kind === "ok") {
          self.saveUserData(result.users)

        } else {
          __DEV__ && console.log(result.kind)
        }
      } catch (e) {
        __DEV__ && console.log(e.message)
      }
    })
  }))
  .actions((self) => ({
    getUserWithCourierId: flow (function* (courierId:any) {
      const userApi = new UserApi(self.environment.api)
      try {
        const result = yield userApi.getUserWithCourierId(courierId)
        __DEV__ && console.log(result.users)

        if (result.kind === "ok") {
          self.saveUserData(result.users)

        } else {
          __DEV__ && console.log(result.kind)
        }
      } catch (e) {
        __DEV__ && console.log(e.message)
      }
    })
  }))

type UserStoreType = Instance<typeof UserStoreModel>
export interface UserStore extends UserStoreType {}
type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
export const createUserStoreDefaultModel = () => types.optional(UserStoreModel, {})
