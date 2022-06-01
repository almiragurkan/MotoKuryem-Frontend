import { RatingModel } from "./rating"

test("can be created", () => {
  const instance = RatingModel.create({})

  expect(instance).toBeTruthy()
})
