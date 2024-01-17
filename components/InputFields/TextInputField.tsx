import React from 'react';
import { View, TextInput, StyleSheet, Text, Dimensions } from 'react-native';
import * as Icons from '@fluentui/react-native-icons';

const screenWidth = Dimensions.get('window').width;

interface CustomTextInputProps {
  placeholder: string;
  label: string;
  iconName?: keyof typeof Icons; // Unterstützt nur die vorhandenen Schlüssel des Icons-Pakets
  availableIcons?: (keyof typeof Icons)[]; // Liste der verfügbaren Icons
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({ placeholder, label, iconName, availableIcons = [] }) => {
  const IconComponent = iconName ? Icons[iconName] : null;

    const renderIcon = ({ iconName, styles }: IconProps) => {
        if (!iconName) return null;

        const IconComponent = Icons[iconName];
        if (!IconComponent) return null;

        return (
            <View style={[styles.iconContainer]}>
                <IconComponent style={styles.icon} />
            </View>
        );
    };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.inputContainer}>
        {renderIcon()}
        <TextInput style={styles.input} placeholder={placeholder} />
      </View>
      <View style={styles.underline} />
    </View>
  );
};

CustomTextInput.defaultProps = {
  availableIcons: Object.keys(Icons) as (keyof typeof Icons)[], // Alle Schlüssel des Icons-Pakets
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: screenWidth - 68,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginLeft: 40,
  },
  label: {
    fontSize: 12,
    color: '#616161',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingVertical: 7,
    paddingHorizontal: 16,
    fontSize: 16,
    color: 'black',
  },
  icon: {
    width: 24,
    height: 24,
    color: '#1868F1',
  },
  underline: {
    height: 0.5,
    backgroundColor: '#D1D1D1',
    marginVertical: 5,
    marginLeft: 40,
  },
});

export default CustomTextInput;
