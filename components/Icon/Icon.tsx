import React from 'react';
import * as Icons from '@fluentui/react-native-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface IconProps {
    name: string;
    size?: number;
    color?: string;
    onPress?: () => void;
}

const Icon: React.FC<IconProps> = ({ name, size = 24, color, onPress }) => {
    const renderIcon = () => {
        if (!name) return null;
        
        const IconComponent = Icons[name]; // Access the specific icon
        if (!IconComponent) return null; // If no icon is found
    
        return (
          <IconComponent size={24} color={color} onPress= {onPress} />
        );
      };

      return (
        <TouchableOpacity onPress={onPress}>
          {renderIcon()}
        </TouchableOpacity>
      );
}

export default Icon;