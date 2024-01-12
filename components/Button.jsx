import React from 'react';
import { Text, StyleSheet, Pressable, View, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importieren Sie Ihre bevorzugte Icon-Bibliothek
import * as Icons from '@fluentui/react-native-icons';

const deviceWidth = Dimensions.get('window').width;

export default function Button(props) {
  const {
    onPress,
    title = 'Save',
    size = 'medium',
    design = 'primary',
    iconName = '' // Icon-Name als String
  } = props;

  // Dynamische Stilfunktionen
  const getButtonStyle = () => {
    let buttonWidth = deviceWidth - 40; // Subtract 20 units of margin from each side
    switch (size) {
      case 'large':
        return { ...styles.big, width: buttonWidth };
      case 'medium':
      default:
        return { ...styles.medium, width: buttonWidth };
    }
  };

  const getTextColor = () => {
    switch (design) {
      case 'secondary':
        return '#1868F1';
      case 'tertiary':
        return '#1868F1';
      default:
        return 'white';
    }
  };

  const getDesignStyle = () => {
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

  // Icon-Rendering-Funktion
  const renderIcon = () => {
    if (!iconName) return null;
    
    const IconComponent = Icons[iconName]; // Zugriff auf das spezifische Icon
    if (!IconComponent) return null; // Falls kein Icon gefunden wird

    const iconColor = getTextColor();
    return (
      <IconComponent size={20} color={iconColor} style={styles.icon} />
    );
  };

  const textStyle = {
    ...styles.text,
    color: getTextColor(),
    marginLeft: iconName ? 8 : 0,
  };

  return (
    <Pressable android_ripple={{ color: 'rgba(255, 255, 255, 0.3)' }} style={[styles.button, getButtonStyle(), getDesignStyle()]} onPress={onPress}>
      {renderIcon()}
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  );
}

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
