import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../../storybook/views"
import { color } from "../../../theme"
import { CouriersSendAdRequest } from "./couriers-send-ad-request"

storiesOf("CouriersSendAdRequest", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <CouriersSendAdRequest style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
