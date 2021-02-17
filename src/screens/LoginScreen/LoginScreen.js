import React, {useState, useEffect} from 'react';
import {Alert, BackHandler, Text, TouchableOpacity, View} from 'react-native';
import {Button, Icon, Image, Input} from 'react-native-elements';
import styles from './LoginStyle';
import {TextInput, TextInputPassword, ProgressDialog} from '../../components';
import Colors from '../res/Colors';
import HttpClient from '../../data/HttpClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetworkConfig from '../../data/NetworkConfig';

const LoginScreen = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const validationLogin = async () => {
      let token = await AsyncStorage.getItem('token');
      if (token !== null) {
        props.navigation.navigate('Home');
      }
    }
    validationLogin();
  }, [])

  // handle back button
  const disableLoading = () => {
    setLoading(false);
  };

  const login = async () => {
    setLoading(true);
    if (email === '' || password === '') {
      disableLoading();
      Alert.alert('Login', "Email or Password don't empty");
      return;
    }
    let url = NetworkConfig.URL + 'api/auth/login';
    try {
      let response = await HttpClient.Request.post(url).jsonBody({
        email: email,
        password: password
      }).call();
      const body = await response.json();
      console.log(body);
      setLoading(false);
      if (body.success === true) {
        alert('Login berhasil')
        await AsyncStorage.setItem('token', body.data.token);
        props.navigation.navigate('Home');
      } else {
        alert('Login gagal')
      }
    } catch (e) {
      console.log(e);
      setLoading(false)
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.body}>
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

        <View
          style={{alignItems: 'flex-end', marginTop: 16, marginHorizontal: 16}}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Register');
            }}>
            <View>
              <Text>Register here</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.containerButtonLogin}>
          <Button
            buttonStyle={{backgroundColor: Colors.accentColor}}
            type={'solid'}
            title="Login"
            onPress={() => login()}
          />
        </View>
      </View>
      <ProgressDialog visible={isLoading} text="Please wait..." />
    </View>
  );
};

export default LoginScreen;
