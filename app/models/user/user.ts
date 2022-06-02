import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CustomerModel } from "../authentication-store/authentication-store"

/**
 * Model description here for TypeScript hints.
 */
export const UserModel = types
  .model("User")
  .props({
    id:types.optional(types.identifier, ""),
    name: types.optional(types.string, ""),
    surname: types.optional(types.string, ""),
    username: types.optional(types.string,""),
    email: types.optional(types.string, ""),
    phoneNumber: types.optional(types.string, ""),
    password: types.optional(types.string, ""),
    isCourier: types.optional(types.boolean, false),
    averageRating: types.optional(types.number, 0, [undefined, null]),
    customer: types.optional(CustomerModel, {}, [null, undefined]),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type UserType = Instance<typeof UserModel>
export interface User extends UserType {}
type UserSnapshotType = SnapshotOut<typeof UserModel>
export interface UserSnapshot extends UserSnapshotType {}
export const createUserDefaultModel = () => types.optional(UserModel, {})
