import React from 'react';
import { TouchableOpacity, Text, Pressable } from 'react-native';
import { Add12Regular } from "@fluentui/react-native-icons";

const Button = ({ style, color, icon, size, text, onPress }) => {
  let buttonStyle;
  let textStyle;
  let iconStyle;

  // Set button style
  if (style === 'filled') {
    buttonStyle = {
      backgroundColor: color,
      padding: 10,
      borderRadius: 5,
    };
    textStyle = {
      color: 'white',
      fontSize: size,
    };
  } else if (style === 'outline') {
    buttonStyle = {
      borderColor: color,
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
    };
    textStyle = {
      color: color,
      fontSize: size,
    };
  }

  // Set icon style
  if (icon) {
    iconStyle = {
      marginRight: 5,
    };
  }

  return (
    <Pressable style={buttonStyle} onPress={onPress}>
      {icon && <Ionicons name={icon} size={size} color={color} style={iconStyle} />}
      <Text style={textStyle}>{text}</Text>
    </Pressable>
  );
};

export default Button;
