import {TouchableOpacity, View} from 'react-native';
import {Icon, Input} from 'react-native-elements';
import React, {useState} from 'react';
import Colors from '../../screens/res/Colors';
import styles from '../../screens/LoginScreen/LoginStyle';

const TextInputPassword = ({placeholder = 'Password', value}) => {
  const [showText, setShowText] = useState(true);
  return (
    <View>
      <Input
        secureTextEntry={showText}
        placeholder={placeholder}
        placeholderTextColor={'grey'}
        autoCapitalize={'none'}
        leftIcon={
          <Icon
            name="lock"
            type="material"
            size={24}
            color={Colors.accentColor}
          />
        }
        onChangeText={(text) => value(text)}
      />
      <TouchableOpacity
        onPress={() => {
          setShowText(!showText);
        }}
        style={styles.textInputPassword}>
        <Icon
          name={showText === true ? 'eye-slash' : 'eye'}
          type={'font-awesome'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TextInputPassword;
