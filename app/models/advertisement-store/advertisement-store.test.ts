import { AdvertisementStoreModel } from "./advertisement-store"

test("can be created", () => {
  const instance = AdvertisementStoreModel.create({})

  expect(instance).toBeTruthy()
})
