import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../text/text"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

export interface AdTransferingProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const AdTransfering = observer(function AdTransfering(props: AdTransferingProps) {
  const { style } = props
  const styles = Object.assign({}, CONTAINER, style)

  return (
    <View style={styles}>
      <Text style={TEXT}>Hello</Text>
    </View>
  )
})
