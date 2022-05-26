import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"

export type TUserProfile = {
  name: string
  surname: string
  username: string
  email: string
  password: string
  phoneNumber: string
  isCourier: boolean
}
/**
 * Model description here for TypeScript hints.
 */
export const UserProfileModel = types
  .model("UserProfile")
  .props({
    id:types.optional(types.identifier, ""),
    name: types.optional(types.string, ""),
    surname: types.optional(types.string, ""),
    username: types.optional(types.string,""),
    email: types.optional(types.string, ""),
    phoneNumber: types.optional(types.string, ""),
    password: types.optional(types.string, ""),
    isCourier: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    UpdateUser: flow(function* (user: TUserProfile) {
      self.name = user.name
      self.surname = user.surname
      self.username = user.username
      self.email = user.email
      self.password = user.password
      self.isCourier = user.isCourier
    }),
  }))
  .actions((self) => ({
    getUserProfile: () => {
      return <TUserProfile>{
        name: self.name,
        surname: self.surname,
        username: self.username,
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
