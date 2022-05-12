import * as React from "react"
import { SafeAreaView, StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { flatten } from "ramda"

const OUTER_CONTAINER: ViewStyle = {
  flex: 1
}
const CONTAINER: ViewStyle = {
  justifyContent: "center"
}

export interface SpinnerProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  visible: true
  textContent: 'Loading...'
  spinnerTextStyle?: SpinnerProps
}

/**
 * Describe your component here
 */
export const Spinner = observer(function Spinner(props: SpinnerProps) {
  const { style, visible, textContent, spinnerTextStyle } = props
  const styles = flatten([CONTAINER, style, spinnerTextStyle])

  return (
    <SafeAreaView style={OUTER_CONTAINER}>
      <View style={styles.CONTAINER}>
        <Spinner
          // visibility of Overlay Loading Spinner
          visible={visible}
          // Text with the Spinner
          textContent={textContent}
        />
      </View>
    </SafeAreaView>
  )
})
