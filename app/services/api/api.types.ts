import { GeneralApiProblem } from "./api-problem"
import { Character } from "../../models/character/character"
import { TUserProfile } from "../../models"

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
export type ResetPasswordResult = { kind: "ok" | "fail"; result: any} | GeneralApiProblem;

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type GetCharactersResult = { kind: "ok"; characters: Character[] } | GeneralApiProblem
export type GetCharacterResult = { kind: "ok"; character: Character } | GeneralApiProblem
