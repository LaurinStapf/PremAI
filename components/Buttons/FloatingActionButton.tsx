import React from 'react';
import { Text, StyleSheet, View, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import your preferred icon library
import * as Icons from '@fluentui/react-native-icons';
import { TouchableRipple } from 'react-native-paper';

const deviceWidth = Dimensions.get('window').width;

type ButtonProps = {
  onPress: () => void;
  onLongPress?: () => void;
  title?: string;
  iconName?: keyof typeof Icons;
  style?: object; // Consider using a more specific type for style
};

const FloatingActionButton: React.FC<ButtonProps> = ({
  onPress,
  onLongPress,
  title = 'Save',
  iconName = '',
  style = {},
}) => {
  const renderIcon = () => {
    if (!iconName) return null;

    const IconComponent = Icons[iconName];
    if (!IconComponent) return null;

    return <IconComponent size={24} color="white" style={styles.icon} />;
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.fabContainer}>
        <TouchableRipple borderless={true} style={[styles.fab, style]} rippleColor="rgba(255, 255, 255, .32)" onPress={onPress} onLongPress={onLongPress}>
          <>
            {renderIcon()}
            {title && <Text style={styles.text}>{title}</Text>}
          </>
        </TouchableRipple>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',  
    backgroundColor: 'white', 
  },
  fabContainer: {
    shadowColor: '#000',
    marginBottom: 18,
    marginRight: 13,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.14,
    shadowRadius: 8,
    elevation: 2,
  },
  fab: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#1868F1',
    borderRadius: 28,
    padding: 16,
  },
  text: {
    color: 'white',
    fontSize: 15,
    marginLeft: 8,
  },
  icon: {
    // Icon styles if needed
  },
});

export default FloatingActionButton;