import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CharacterStoreModel } from "../character-store/character-store"
import { AuthenticationStoreModel } from "../authentication-store/authentication-store"
import { AdvertisementStoreModel } from "../advertisement-store/advertisement-store"
import { RatingStoreModel } from "../rating-store/rating-store"
import { AddressStoreModel } from "../address-store/address-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  characterStore: types.optional(CharacterStoreModel, {} as any),
  authenticationStore: types.optional(AuthenticationStoreModel, {} as any),
  advertisementStore: types.optional(AdvertisementStoreModel, {} as any),
  ratingStore: types.optional(RatingStoreModel, {} as any),
  addressStore: types.optional(AddressStoreModel, {} as any),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
