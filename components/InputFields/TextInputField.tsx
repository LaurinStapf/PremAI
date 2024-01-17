import React from 'react';
import { View, TextInput, StyleSheet, Image, Text, Dimensions } from 'react-native';
import { Mail24Filled } from '@fluentui/react-native-icons';

const screenWidth = Dimensions.get('window').width;

interface CustomTextInputProps {
  placeholder: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({ placeholder }) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>E-Mail</Text>
      </View>
      <View style={styles.inputContainer}>
        <Mail24Filled style={styles.icon} />
        <TextInput
          style={styles.input}
        />
      </View>
      <View style={{...styles.underline, marginLeft: 40,}} />
    </View>
  );
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
  },
  label: {
    fontSize: 12,
    color: '#616161',
    marginLeft: 40,
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
  },
});

export default CustomTextInput;
