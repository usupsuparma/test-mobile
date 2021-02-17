import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import Colors from '../res/Colors';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = (props) => {

    const buttonConfirm = () => {
        Alert.alert(
            'Confirm',
            'Do you want to log out?',
            [
                {
                    text: 'NO',
                    onPress: () => console.warn('NO Pressed'),
                    style: 'cancel',
                },
                { text: 'YES', onPress: () => logout() },
            ],
            { cancelable: false }
        );
    };

    const logout = async () => {
        AsyncStorage.clear()
            .then(() => {
                RNRestart.Restart();
            })
            .catch(err => {
                console.log(err);
            });
    }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32}}>
        <TouchableOpacity onPress={() => {
            props.navigation.navigate('Presence')
        }} style={{height: 40, borderRadius: 8, backgroundColor: Colors.accentColor, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white'}}>Presence</Text>
        </TouchableOpacity>
        <View style={{height: 8}} />
        <TouchableOpacity onPress={() => {
            props.navigation.navigate('Report')
        }} style={{height: 40, borderRadius: 8, backgroundColor: Colors.accentColor, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white'}}>Report</Text>
        </TouchableOpacity>
        <View style={{height: 32}} />
        <TouchableOpacity onPress={() => {
            buttonConfirm();
        }} style={{height: 40, borderRadius: 8, backgroundColor: Colors.accentColor, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white'}}>Logout</Text>
        </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
