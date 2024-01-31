// TextLogo.tsx
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Logo from '../../assets/TextLogo.svg';
import { Dimensions } from 'react-native';

const TextLogo = () => {
  const [showLogo, setShowLogo] = useState(false);

  const screenHeight = Dimensions.get('screen').height;
  const minScreenHeightToShowLogo = 600; // Adjust this value as needed

  useEffect(() => {
    setShowLogo(screenHeight >= minScreenHeightToShowLogo);
  }, [screenHeight, minScreenHeightToShowLogo]);

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        marginBottom: 25, // Passen Sie diesen Wert bei Bedarf an
      }}
    >
      {showLogo ? <Logo /> : null}
    </View>
  );
};

export default TextLogo;
