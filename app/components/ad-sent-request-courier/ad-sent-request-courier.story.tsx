import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { AdSentRequestCourier } from "./ad-sent-request-courier"

storiesOf("AdSentRequestCourier", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <AdSentRequestCourier style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
