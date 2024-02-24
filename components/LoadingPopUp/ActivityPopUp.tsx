import React from 'react';
import { View, Modal, ActivityIndicator, StyleSheet, Text, Dimensions} from 'react-native';
import Spinner from './Spinner';

const screenWidth = Dimensions.get('screen').width;

const LoadingOverlay = ({ visible, percent }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
    >
      <View style={styles.overlay}>
        <View style={styles.loadingContainer}>
          <Spinner percent={percent}/>
          {/* <Text style={{ color: '#242424', fontSize: 16 }}>Zu {percent}% hochgeladen</Text> */}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: 100,
    padding: 12,
    backgroundColor: 'white', // Sie können die Farben entsprechend anpassen
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.14,
    shadowRadius: 2,
    elevation: 2,
    flexShrink: 0,
  },
});

export default LoadingOverlay;