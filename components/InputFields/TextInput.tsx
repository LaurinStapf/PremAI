import React from 'react';
import * as ReactN from 'react-native';
import * as Icons from '@fluentui/react-native-icons';

const screenWidth = ReactN.Dimensions.get('window').width;

interface TextInputProps {
  placeholder: string;
  label: string;
  iconName?: keyof typeof Icons; 
  style?: ReactN.ViewStyle;
  [key: string]: any;
}

const TextInput: React.FC<TextInputProps> = ({ 
  placeholder, 
  label, 
  iconName  = null,
  style = {},
  ...props
}) => {
  
  const renderIcon = () => {
    if (!iconName) return null;

    // Type assertion to let TypeScript know that IconComponent is a valid React component
    const IconComponent = Icons[iconName] as React.ComponentType<{ size: number; color: string; style?: ReactN.ViewStyle }>;
    if (!IconComponent) return null;

    return (
        <IconComponent size={24} color="#1868F1" />
    );
  };

  return (
    <ReactN.View style={[styles.inputContainer, style]}>
    {renderIcon()}
      <ReactN.TextInput
        style={styles.inputStyle}
        placeholder={placeholder}
        // Include other TextInput props as needed
      />
      <ReactN.Text style={styles.labelStyle}>{label}</ReactN.Text>
    </ReactN.View>
  );
};

const styles = ReactN.StyleSheet.create({
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
    left: 35, // Align it with the left side of the container
    top: -20, // Distance from the top of the container
    fontSize: 12, // Size of the label text
    color: '#D1D1D1',
 // Color of the label text
    // Add any other styling you want for the label
  }
});

export default TextInput;
