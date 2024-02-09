import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View, StyleSheet } from 'react-native';

const Loader02 = () => {
  const rotation = useRef(new Animated.Value(0)).current;  // Initial value for rotation: 0

  // Run the rotation animation
  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,        // Rotate to 360 degrees represented by '1'
        duration: 1000,    // One full rotation in one second
        easing: Easing.linear,
        useNativeDriver: true,  // Use native driver for better performance
      })
    ).start();
  }, [rotation]);

  // Map the rotation value to a degree for the rotate animation
  const spin = rotation.interpolate({
    inputRange: [0, 1],   // Input range from 0 to 1
    outputRange: ['0deg', '360deg'],  // Rotation from 0 to 360 degrees
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.loader02, { transform: [{ rotateZ: spin }] }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  loader02: {
    width: 25,
    height: 25,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderTopColor: '#1868F1',
    borderRightColor: '#BDD3FB',
    borderBottomColor: '#BDD3FB',
    borderLeftColor: '#BDD3FB',
    borderRadius: 28,  // Half of width/height to make it circular
  },
});

export default Loader02;
