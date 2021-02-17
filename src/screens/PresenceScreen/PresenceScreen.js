import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ProgressDialog} from '../../components';
import HttpClient from '../../data/HttpClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../res/Colors';
import NetworkConfig from '../../data/NetworkConfig';

const PresenceScreen = () => {
    const [status, setStatus] = useState(0);
    const [isLoading, setLoading] = useState(false);


    const validationPresence = async () => {
        console.log('test');
        setLoading(true);
        const token = await AsyncStorage.getItem('token');
        console.log(token);
        try {
            let url = NetworkConfig.URL + 'api/presence/cek-status'
            let res = await HttpClient.Request.get(url)
                .bearerToken(token)
                .call();
            console.log(res);
            let body = await res.json();
            console.log(body);
            setStatus(body.data);
            setLoading(false);
        } catch (e) {
            console.log(e);
            setLoading(false)
        }
    }


    useEffect(() => {
        validationPresence();
    },[])

    const presenceIn = async () => {
        try {
            setLoading(true)
            let url = NetworkConfig.URL + 'api/presence/in'
            let token = await AsyncStorage.getItem('token');
            let res = await HttpClient.Request.post(url)
                .bearerToken(token)
                .call();
            let body = await res.json();
            console.log(body.message);
            setLoading(false);
            if (body.success === true) {
                alert('Presence In Success')
                setStatus(1)
            } else  {
                alert('Presence In Failed')
            }
        } catch (e) {
            console.log(e);
            setLoading(false)
            alert('Internal Server Error')
        }
    }

    const presenceOut = async () => {
            try {
                setLoading(true)
                let token = await AsyncStorage.getItem('token');
                let url = NetworkConfig.URL + 'api/presence/out';
                let res = await HttpClient.Request.post(url)
                    .bearerToken(token)
                    .call();
                let body = await res.json();
                setLoading(false);
                if (body.success === true) {
                    alert('Presence OUT Success')
                    setStatus(0)
                } else  {
                    alert('Presence OUT Failed')
                }
            } catch (e) {
                console.log(e);
                setLoading(false)
                alert('Internal Server Error')
            }
    }

    const presence = () => {
        status === 0 ? presenceIn() : presenceOut()
    }

  return (
    <View style={{flex: 1}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',marginHorizontal: 32}}>
            <Text>Silahkan melakukan presence dibawah</Text>
            <View style={{height: 24}} />
            <TouchableOpacity onPress={() => {
                presence();
            }} style={{height: 40, borderRadius: 8, backgroundColor: Colors.accentColor, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'white'}}>{status === 1 ? 'Presence OUT' : 'Presence In'}</Text>
            </TouchableOpacity>
        </View>

        <ProgressDialog visible={isLoading} text="Please wait..." />
    </View>
  );
};

export default PresenceScreen;
