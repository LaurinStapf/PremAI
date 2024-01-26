import React from 'react';
import { View, TextInput, StyleSheet, Text, Dimensions, ViewStyle } from 'react-native';
import * as Icons from '@fluentui/react-native-icons';

const screenWidth = Dimensions.get('window').width;

interface TextInputProps {
  placeholder: string;
  label: string;
  iconName?: keyof typeof Icons; 
  style?: ViewStyle;
  [key: string]: any;
}

const TextInputField: React.FC<TextInputProps> = ({ 
  placeholder, 
  label, 
  iconName  = null,
  style = {},
  ...props
}) => {
  
  const renderIcon = () => {
    if (!iconName) return null;

    // Type assertion to let TypeScript know that IconComponent is a valid React component
    const IconComponent = Icons[iconName] as React.ComponentType<{ size: number; color: string; style?: ViewStyle }>;
    if (!IconComponent) return null;

    return (
      <View style={[styles.iconContainer]}>
        <IconComponent size={iconSize} color={iconColor} />
      </View>
    );
  };

  return (
    <View style={styles.inputContainer}>
    {renderIcon()}
      <TextInput
        style={styles.inputStyle}
        // Include other TextInput props as needed
      />
      <Text style={styles.labelStyle}>E-Mail</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: screenWidth - 68,// Space between the text and the bottom border
  },
  iconStyle: {
    color: '#1868F1', // Space between the icon and the input field
  },
  inputStyle: {
    flex: 1, // Take up the remaining space in the container
    fontSize: 16, // Size of the input text
    color: '#000',
    marginLeft: 10, // Space between the input text and the icon
    borderBottomWidth: 1,
    borderBottomColor: '#D1D1D1', // Set the color of the bottom border
    paddingBottom: 5, 
  },
  labelStyle: {
    position: 'absolute', // Position it absolutely so that it can be moved around freely
    left: 0, // Align it with the left side of the container
    top: -20, // Distance from the top of the container
    fontSize: 12, // Size of the label text
    color: '#D1D1D1', // Color of the label text
    // Add any other styling you want for the label
  }
});

export default TextInputField;
