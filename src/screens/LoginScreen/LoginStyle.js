import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
		container: {flex: 1, justifyContent: 'center' },
		containerButtonLogin: {
				marginTop: 32,
				marginHorizontal: 16,
		},
		containerImage: {
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
		},
		textInputPassword: {
				position: 'absolute',
				right: 16,
				top: 8,
				bottom: 8,
		},
		containerTextInput: {marginTop: 8},
		image: {
				width: 200,
				height: 200,
				borderRadius: 45,
		},
		body: {
				flex: 1,
				marginHorizontal: 16,
				justifyContent: 'center'
		},
});

export default styles;
