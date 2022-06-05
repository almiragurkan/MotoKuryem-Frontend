import { GeneralApiProblem } from "./api-problem"
import { Character } from "../../models/character/character"
import { Address, Advertisement, TAddress, TAdvertisement, TUserProfile } from "../../models"
import { Rating } from "../../models/rating/rating"

export interface User {
  id: number
  name: string
}
export interface ApiResponse {
  status: string
  code: number
  message: string
  error: []
}


export type LoginResult = { kind: "ok"; token: string } | GeneralApiProblem;
export type LogoutResult = { kind: "ok" } | GeneralApiProblem;

export type RegisterResult = { kind: "ok"; data: ApiResponse, userData: TUserProfile } | GeneralApiProblem;
export type UpdateUserResult = { kind: "ok"; data: ApiResponse, userData: TUserProfile } | GeneralApiProblem;
export type FetchUserProfileResult = { kind: "ok"; data: any } | GeneralApiProblem;
export type ResetPasswordResult = { kind: "ok" | "fail"; resetPasswordToken: string} | GeneralApiProblem;
export type ResetPassword2Result = { kind: "ok" | "fail"; resetPasswordToken: string} | GeneralApiProblem;
export type ResetPassword3Result = { kind: "ok" | "fail"; result: string} | GeneralApiProblem;

export type GetCustomerProfileResult = { kind: "ok"; users: User[] } | GeneralApiProblem;
export type GetCourierProfileResult = { kind: "ok"; users: User[] } | GeneralApiProblem;


export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem


export type GetAdvertisementsResult = { kind: "ok"; advertisements: Advertisement[] } | GeneralApiProblem
export type GetAdvertisementsForCustomerResult = { kind: "ok"; advertisements: Advertisement[] } | GeneralApiProblem
export type GetAdvertisementsForCourierResult = { kind: "ok"; advertisements: Advertisement[] } | GeneralApiProblem
export type GetAdvertisementsFilterResult = { kind: "ok"; advertisements: Advertisement[] } | GeneralApiProblem
// export type GetAdvertisementResult = { kind: "ok"; advertisement: Advertisement[] } | GeneralApiProblem
export type CreateAdvertisementResult = { kind: "ok"; data: ApiResponse, advertisementData: TAdvertisement } | GeneralApiProblem


export type GetCustomerRatingsResult = { kind: "ok"; ratings: Rating[] } | GeneralApiProblem
export type GetCourierRatingsResult = { kind: "ok"; ratings: Rating[] } | GeneralApiProblem
export type GetAdvertisementRatingsResult = { kind: "ok"; ratings: Rating[] } | GeneralApiProblem

export type GetAddressesResult = { kind: "ok"; addresses: Address[] } | GeneralApiProblem
export type CreateAddressResult = { kind: "ok"; data: ApiResponse, addressData: TAddress } | GeneralApiProblem
export type DeleteAddressResult = { kind: "ok" } | GeneralApiProblem;



// export type CreateAdvertisementResult = { kind: "ok"; data: ApiResponse, adData: TAdvertisement } | GeneralApiProblem;
// export type UpdateAdvertisementResult = { kind: "ok"; data: ApiResponse, adData: TAdvertisement } | GeneralApiProblem;
export type FetchAdvertisementResult = { kind: "ok"; data: any } | GeneralApiProblem;


export type GetCharactersResult = { kind: "ok"; characters: Character[] } | GeneralApiProblem
export type GetCharacterResult = { kind: "ok"; character: Character } | GeneralApiProblem
