import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import styles from '../LoginScreen/LoginStyle';
import {ProgressDialog, TextInput, TextInputPassword} from '../../components';
import {Button, Icon} from 'react-native-elements';
import Colors from '../res/Colors';
import HttpClient from '../../data/HttpClient';
import NetworkConfig from '../../data/NetworkConfig';

const RegisterScreen = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setLoading] = useState(false);

  const register = async () => {
    console.log('Register');
    setLoading(true);
    try {
        let url = NetworkConfig.URL + 'api/auth/register';
        let res = await HttpClient.Request.post(url)
            .jsonBody({
                name: name,
                email: email,
                password: password,
                password_confirmation: confirmPassword
            })
            .call();
        let body = await res.json();
        console.log(body);
        setLoading(false);
        if (body.success === true) {
            alert('Register Berhasil')
            props.navigation.goBack();
        } else {
            alert('Register Gagal')
        }

    } catch (e) {
        console.log(e);
        setLoading(false);
        Alert.alert('warning', 'internal server error')
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <TextInput
          value={(text) => setName(text)}
          placeholder="Name"
          placeholderTextColor={'grey'}
          keyboardType={'default'}
          autoCapitalize={'none'}
          leftIcon={
            <Icon
              name="email"
              type="material"
              size={24}
              color={Colors.accentColor}
            />
          }
        />
        <TextInput
          value={(text) => setEmail(text)}
          placeholder="Email"
          placeholderTextColor={'grey'}
          keyboardType={'email-address'}
          autoCapitalize={'none'}
          leftIcon={
            <Icon
              name="email"
              type="material"
              size={24}
              color={Colors.accentColor}
            />
          }
        />
        <View style={styles.containerTextInput}>
          <TextInputPassword
            value={(text) => {
              setPassword(text);
            }}
          />
        </View>
        <View style={styles.containerTextInput}>
          <TextInputPassword
            placeholder={'Confirm password'}
            value={(text) => {
              setConfirmPassword(text);
            }}
          />
        </View>

        <View style={styles.containerButtonLogin}>
          <Button
            buttonStyle={{backgroundColor: Colors.accentColor}}
            type={'solid'}
            title="Register"
            onPress={() => register()}
          />
        </View>
      </View>
      <ProgressDialog visible={isLoading} text="Please wait..." />
    </View>
  );
};

export default RegisterScreen;
