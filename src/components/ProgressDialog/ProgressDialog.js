import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import MaterialDialogContainer from '../MaterialDialogContainer/MaterialDialogContainer';

const ProgressDialog = ({visible, text}) => {
		return (
				<MaterialDialogContainer visible={visible}>
						<View style={styles.container}>
								<Text style={styles.text}>{text}</Text>
								<ActivityIndicator style={{width: 50}} size="large" />
						</View>
				</MaterialDialogContainer>
		);
};

const styles = StyleSheet.create({
		container: {
				flexDirection: 'row',
				padding: 24,
				justifyContent: 'space-between',
				alignItems: 'center',
		},

		text: {
				flexGrow: 1,
				fontSize: 16,
		},
});

export default ProgressDialog;
