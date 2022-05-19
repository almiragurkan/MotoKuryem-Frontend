import { AdvertisementModel } from "./advertisement"

test("can be created", () => {
  const instance = AdvertisementModel.create({})

  expect(instance).toBeTruthy()
})
