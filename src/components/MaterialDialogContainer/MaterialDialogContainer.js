import React from 'react';
import {TouchableWithoutFeedback, Modal, View, StyleSheet} from 'react-native';
import Colors from '../../screens/res/Colors';

const MaterialDialogContainer = ({visible, onCancel, children}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}>
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.backgroundOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.dialogContainer}>{children}</View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backgroundOverlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.dialogBackgroundOverlay,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dialogContainer: {
    flexGrow: 1,
    backgroundColor: 'white',
    marginLeft: 24,
    marginRight: 24,
    borderRadius: 4,
    elevation: 24,
  },
});

export default MaterialDialogContainer;
