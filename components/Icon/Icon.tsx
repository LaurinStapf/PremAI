import React from 'react';
import * as Icons from '@fluentui/react-native-icons';

interface IconProps {
    name: string;
    size?: number;
    color?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 24, color }) => {
    const renderIcon = () => {
        if (!name) return null;
        
        const IconComponent = Icons[name]; // Access the specific icon
        if (!IconComponent) return null; // If no icon is found
    
        return (
          <IconComponent size={24} color={color} />
        );
      };

      return (renderIcon());
};

export default Icon;