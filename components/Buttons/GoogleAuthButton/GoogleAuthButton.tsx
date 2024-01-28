import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, Dimensions } from 'react-native';
import GoogleLogo from '../../../assets/google_logo.png'

const deviceWidth = Dimensions.get('window').width; 

const GoogleAuthButton: React.FC = () => {
    return (
        <TouchableOpacity style={styles.container}>
            <Image source={GoogleLogo} style={styles.icon} />
            <Text style={styles.text}>Continue with Google</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    // please create styles for outlined google social auth
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        width: deviceWidth - 68,
        margin: 10,
        borderColor: '#000000',
        borderWidth: 1,
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 8
    },
    text: {
        color: '#000000',

        // make it roboto arial sans serif
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'Roboto_400Regular',
        
    },

});

export default GoogleAuthButton;
