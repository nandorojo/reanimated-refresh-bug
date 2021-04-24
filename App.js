import * as React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

/**
 * reanimated 2 scope issue
 *
 * Try passing pressedState to <Shape />
 *
 * Once you add that in, the derived value no longer updates.
 *
 * Updating the scoped variables around it seems to break the mutation of a shared value
 */

function Shape({ extraState, pressed }) {
  const opacity = useDerivedValue(() => (pressed.value ? 0.5 : 1));

  const style = useAnimatedStyle(() => ({
    opacity: withTiming(opacity.value),
  }));

  return <Animated.View style={[styles.shape, style]} />;
}

export default function App() {
  const pressed = useSharedValue(false);
  const [pressedState, setPressed] = React.useState(false);

  const onPressIn = () => {
    pressed.value = true;
    setPressed(true);
  };
  const onPressOut = () => {
    pressed.value = false;
    setPressed(false);
  };

  return (
    <Pressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={styles.container}
    >
      <Shape pressed={pressed} extraState={pressedState} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "cyan",
    padding: 8,
  },
  shape: {
    height: 200,
    width: 200,
    backgroundColor: "black",
    borderRadius: 16,
  },
});
