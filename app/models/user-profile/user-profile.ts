import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"

export type TUserProfile = {
  firstName: string
  lastName: string
  userName: string
  email: string
  password: string
  isCourier: boolean
}
/**
 * Model description here for TypeScript hints.
 */
export const UserProfileModel = types
  .model("UserProfile")
  .props({
    firstName: types.optional(types.string, ""),
    lastName: types.optional(types.string, ""),
    userName: types.optional(types.string,"", [undefined, null]),
    email: types.optional(types.string, ""),
    password: types.optional(types.string, "", [undefined, null]),
    isCourier: types.optional(types.boolean, false)
  })
  .actions((self) => ({
    UpdateUser: flow(function* (user: TUserProfile) {
      self.firstName = user.firstName
      self.lastName = user.lastName
      self.userName = user.userName
      self.email = user.email
      self.password = user.password
      self.isCourier = user.isCourier
    }),
  }))
  .actions((self) => ({
    getUserProfile: () => {
      return <TUserProfile>{
        firstName: self.firstName,
        lastName: self.lastName,
        userName: self.userName,
        email: self.email,
        password: self.password,
        isCourier: self.isCourier
      }
    },
  }))

type UserProfileType = Instance<typeof UserProfileModel>

export interface UserProfile extends UserProfileType {
}

type UserProfileSnapshotType = SnapshotOut<typeof UserProfileModel>

export interface UserProfileSnapshot extends UserProfileSnapshotType {
}

export const createUserProfileDefaultModel = () => types.optional(UserProfileModel, {})
