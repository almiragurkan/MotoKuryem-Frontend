import { RatingStoreModel } from "./rating-store"

test("can be created", () => {
  const instance = RatingStoreModel.create({})

  expect(instance).toBeTruthy()
})
