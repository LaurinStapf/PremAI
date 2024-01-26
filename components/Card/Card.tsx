import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, Dimensions, ViewStyle } from 'react-native';
import * as Icons from '@fluentui/react-native-icons';

const screenWidth = Dimensions.get('window').width;

// Define the possible sizes as a TypeScript type
type CardSize = 'small' | 'medium' | 'large'; // Add all possible size strings if there are more

// Define the props for your Card component
interface CardProps {
  size?: CardSize;
  iconName?: keyof typeof Icons | null; // Use 'keyof typeof Icons' to get the icon names from the Icons object
  iconSize?: number;
  iconColor?: string;
  style?: ViewStyle;
  title: string;
  description?: string;
  children?: ReactNode;
  [key: string]: any; // For the rest of the props using the spread operator
}

const Card: React.FC<CardProps> = ({
  size = 'small',
  iconName = null,
  iconSize = 24,
  iconColor = '#808080',
  style = {},
  title,
  description,
  children,
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
        fontSize: 15
    },
    description: {
        // color: 'black',
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
