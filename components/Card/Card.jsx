// Card.js

import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import * as Icons from '@fluentui/react-native-icons';

const screenWidth = Dimensions.get('window').width;

const Card = ({ size = 'small', iconName = null, iconSize = 24, iconColor = '#808080', style = {}, title, description, children, ...props }) => {
    const iconWidth = iconName ? iconSize + 8 : 0;

    const renderIcon = () => {
        if (!iconName) return null;

        const IconComponent = Icons[iconName];
        if (!IconComponent) return null;

        return (
            <View style={[styles.iconContainer]}>
                <IconComponent size={iconSize} color={iconColor} style={styles.icon} />
            </View>
        );
    };

    return (
        <View style={[styles.container, style]} {...props}>
            <View style={styles.contentContainer}>
              {renderIcon()}
                <View>
                  <Text style={styles.text}>{title}</Text>
                  {description && <Text style={styles.description}>{description}</Text>}
                  {children}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: 12,
        width: screenWidth - 68,
        borderRadius: 8,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.14,
        shadowRadius: 2,
        elevation: 2,
    },
    contentContainer: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
    },
    text: {
        color: '#242424',
        fontSize: 15,
        fontStyle: 'normal',
        fontWeight: 600,
        flexShrink: 1,
    },
    description: {
        color: 'black',
        fontSize: 13,
        color: '#616161',
        flexShrink: 1,
    },
    iconContainer: {
        flexShrink: 0,
        justifyContent: 'center',
    },
});

export default Card;
