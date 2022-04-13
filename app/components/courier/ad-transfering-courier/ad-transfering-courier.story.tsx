import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../../storybook/views"
import { color } from "../../../theme"
import { AdTransferingCourier } from "./ad-transfering-courier"

storiesOf("AdTransferingCourier", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <AdTransferingCourier style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
