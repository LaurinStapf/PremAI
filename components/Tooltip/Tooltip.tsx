import React, { useState, useRef, useEffect } from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  findNodeHandle,
  UIManager,
  ViewStyle,
} from 'react-native';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  type: 'bottom' | 'top'; // Diese Props definieren, ob das Tooltip oben oder unten erscheinen soll.
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, type }) => {
  const [visible, setVisible] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const childRef = useRef<View>(null);

  const toggleTooltip = () => {
    if (childRef.current) {
      UIManager.measure(findNodeHandle(childRef.current), (x, y, width, height, pageX, pageY) => {
        // x und y sind die Positionen innerhalb des Elternelements.
        // pageX und pageY sind die Positionen innerhalb des gesamten Bildschirms.
        setTooltipPos({
          x: pageX,
          y: pageY,
          width,
          height
        });
      });
    }
    setVisible(!visible);
  };

  const getTooltipStyle = (): ViewStyle => {
    const offset = 8; // Definiert den Abstand zwischen dem Tooltip und dem Child-Element
    const tooltipHeight = 60; // Annahme: Höhe des Tooltips
    
    let topPosition = 0;
  
    switch (type) {
      case 'bottom':
        topPosition = tooltipPos.y + tooltipPos.height + offset; // Unter dem Element
        break;
      case 'top':
        topPosition = tooltipPos.y - tooltipHeight - offset; // Über dem Element
        break;
      default:
        return {};
    }
  
    return {
      position: 'absolute',
      left: tooltipPos.x + (tooltipPos.width - 200) / 2, // Zentriert das Tooltip über die Breite des Child-Elements
      top: topPosition,
    };
  };
  
  


  const getArrowStyle = (): ViewStyle => {
    switch (type) {
      case 'bottom':
        return {
          ...styles.arrowBase,
          top: -7, // Positionieren Sie den Pfeil etwas außerhalb des Tooltips
          left: tooltipPos.width / 2 - 7, // Zentrierung des Pfeils basierend auf der Breite des Tooltips
          borderBottomWidth: 7, // Setzen Sie die Höhe des Pfeils
          borderBottomColor: '#1868F1', // Farbe des Pfeils
        };
      case 'top':
        return {
          ...styles.arrowBase,
          bottom: -7, // Positionieren Sie den Pfeil etwas außerhalb des Tooltips
          left: tooltipPos.width / 2 - 7, // Zentrierung des Pfeils
          transform: [{ rotate: '0deg' }], // Keine Drehung notwendig, da der Pfeil bereits nach unten zeigt
          borderTopWidth: 7, // Setzen Sie die Höhe des Pfeils
          borderTopColor: '#1868F1', // Farbe des Pfeils
        };
      default:
        return {};
    }
  };
  

  return (
    <View ref={childRef}>
      <TouchableOpacity onPress={toggleTooltip}>
        {children}
      </TouchableOpacity>
      {visible && (
        <View style={[styles.tooltip, getTooltipStyle()]}>
          <Text style={styles.tooltipText}>{content}</Text>
          <View style={[styles.tooltipArrow, getArrowStyle()]} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tooltip: {
    backgroundColor: '#1868F1',
    borderRadius: 10,
    padding: 10,
    maxWidth: 248,
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  tooltipText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  tooltipArrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
  },
  arrowBase: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderColor: 'transparent',
  },
});

export default Tooltip;
