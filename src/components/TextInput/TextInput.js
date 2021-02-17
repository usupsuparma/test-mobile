import {Icon, Input} from 'react-native-elements';
import {View} from 'react-native';
import React, {useState} from 'react';

const TextInput = ({value, ...rest}) => {
  return (
    <View>
      <Input
        {...rest}
        onChangeText={(text) => {
          value(text);
        }}
      />
    </View>
  );
};

export default TextInput;
