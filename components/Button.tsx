import React from 'react';
import { Text, StyleSheet, View, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import your preferred icon library
import * as Icons from '@fluentui/react-native-icons';
import { TouchableRipple } from 'react-native-paper';

const deviceWidth = Dimensions.get('window').width;

// Define the type for the Button props
type ButtonProps = {
  onPress: () => void;
  onLongPress?: () => void;
  title?: string;
  size?: 'small' | 'medium' | 'large';
  design?: 'primary' | 'secondary' | 'tertiary';
  iconName?: keyof typeof Icons;
  style?: object; // You should replace 'object' with a more specific style type if possible
};

const Button: React.FC<ButtonProps> = ({
  onPress,
  onLongPress,
  title = 'Save',
  size = 'medium',
  design = 'primary',
  iconName = '',
  style = {},
}) => {
  // Dynamic style functions
  const getButtonStyle = (): object => { // Replace 'object' with a specific type for styles
    let buttonWidth = deviceWidth - 68; // Subtract 20 units of margin from each side
    switch (size) {
      case 'large':
        return { ...styles.big, width: buttonWidth };
      case 'medium':
      default:
        return { ...styles.medium, width: buttonWidth };
    }
  };

  const getTextColor = (): string => {
    switch (design) {
      case 'secondary':
        return '#1868F1';
      case 'tertiary':
        return '#1868F1';
      default:
        return 'white';
    }
  };

  const getDesignStyle = (): object => { // Replace 'object' with a specific type for styles
    switch (design) {
      case 'secondary':
        return styles.outline;
      case 'tertiary':
        return styles.textOnlyDesign;
      case 'primary':
      default:
        return {};
    }
  };

  // Icon rendering function
  const renderIcon = () => {
    if (!iconName) return null;
    
    const IconComponent = Icons[iconName]; // Access the specific icon
    if (!IconComponent) return null; // If no icon is found

    const iconColor = getTextColor();
    return (
      <IconComponent size={24} color={iconColor} style={styles.icon} />
    );
  };

  const textStyle = {
    ...styles.text,
    color: getTextColor(),
    marginLeft: iconName ? 8 : 0,
  };

  return (
    <TouchableRipple borderless={true} style={[styles.button, getButtonStyle(), getDesignStyle(), style]} rippleColor="rgba(255, 255, 255, .32)" onPress={onPress} onLongPress={onLongPress}>
      <>
        {renderIcon()}
        <Text style={textStyle}>{title}</Text>
      </>
    </TouchableRipple>
  );
};


const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    display: 'flex',
    borderRadius: 8,
    padding: 8,
  },
  medium: {
    height: 40,
    backgroundColor: '#1868F1',
  },
  big: {
    height: 52,
    backgroundColor: '#1868F1',
  },
  text: {
    fontSize: 13,
  },
  icon: {
    gap: 8, // Abstand zwischen Icon und Text
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#1868F1',
  },
  textOnlyDesign: {
    backgroundColor: 'transparent',
  },
});

export default Button;