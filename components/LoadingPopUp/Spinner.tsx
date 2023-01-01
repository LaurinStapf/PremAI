import React, { useRef, useEffect } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const CircularProgress = ({ percent }) => {
  // Verwenden Sie useRef, um die Animated.Value über Rerenders hinweg beizubehalten
  const animation = useRef(new Animated.Value(0)).current;

  // Erstellen Sie den animierten Kreis außerhalb des Renders, um unnötige Re-Definitionen zu vermeiden
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

  const circleRadius = 30; // Radius des Kreises
  const circumference = 2 * Math.PI * circleRadius;
  const strokeWidth = 5; // Die Breite der Linie des Kreises

  useEffect(() => {
    Animated.timing(animation, {
      toValue: percent,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [percent, animation]);

  const strokeDashoffset = animation.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
    extrapolate: 'clamp',
  });

  // Stellen Sie sicher, dass das SVG-Element genügend Platz bietet, indem Sie den Durchmesser plus die Strichstärke berechnen
  const svgDiameter = (circleRadius + strokeWidth) * 2;

  return (
    <View style={styles.container}>
      <Svg width={svgDiameter} height={svgDiameter}>
        <Circle
          stroke="#e6e7e8"
          fill="none"
          cx={circleRadius + strokeWidth}
          cy={circleRadius + strokeWidth}
          r={circleRadius}
          {...{ strokeWidth, strokeDasharray: circumference }}
        />
        <AnimatedCircle
          stroke="#1868F1"
          fill="none"
          cx={circleRadius + strokeWidth}
          cy={circleRadius + strokeWidth}
          r={circleRadius}
          strokeDashoffset={strokeDashoffset}
          {...{
            strokeWidth,
            strokeDasharray: circumference,
            strokeLinecap: 'round',
          }}
        />
      </Svg>
      <Text style={styles.text}>{`${Math.round(percent)}%`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  text: {
    position: 'absolute',
    fontSize: 15,
    marginTop: -10,
  },
});

export default CircularProgress;