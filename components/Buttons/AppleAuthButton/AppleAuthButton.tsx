import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, View, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

const AppleAuthButton = () => {
    return (
        <TouchableOpacity style={styles.container}>
            <Text style={styles.icon}></Text>

            <Text style={styles.text}>
                Continue with Apple
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        width: deviceWidth - 68,
        
    },
    icon: {
        fontSize: 20,
        color: '#FFFFFF',
        marginRight: 8
    },
    text: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default AppleAuthButton;
