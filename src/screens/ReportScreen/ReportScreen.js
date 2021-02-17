import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HttpClient from '../../data/HttpClient';
import {ProgressDialog} from '../../components';

const ReportScreen = () => {
    const [presences, setPresences] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const getData = async () => {
        try {
            setLoading(true);
            let token = await AsyncStorage.getItem('token');
            console.log(token);
            let res = await HttpClient.Request.get('http://10.0.2.2:8000/api/presence/details')
                .bearerToken(token)
                .call();
            let body = await res.json();
            setLoading(false)
            if (body.success === true) {
                setPresences(body.data);
            } else  {
                alert('Failed get data');
            }
            console.log(body);
        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const formatDate = time => {
        let data = new Date(time);
        let day = data.getDay();
        let month = data.getMonth();
        let year = data.getFullYear();
        return data.toDateString();
    }

    const formatTime = time => {
        if (time === null || undefined) return  '-'
        let date = new Date(time);
        return date.toLocaleTimeString();
    }

    const formatDuration = x => {
        if (x === null || undefined) return  '-'
        let y     = x % 3600;
        let jam   = x / 3600;
        let menit = y / 60;
        let detik = y % 60;
        return `${Math.floor(jam)} jam : ${Math.floor(menit)} menit`
    }


    const renderItem = ({ item }) => (
        <View style={{flexDirection: 'row', width: '100%'}}>
            <View style={{flex: 1}}>
                <Text style={{fontSize: 12}} >{item.name}</Text>
            </View>
            <View style={{flex: 1.5}}>
                <Text style={{fontSize: 12}}>{formatDate(item.created_at)}</Text>
            </View>
            <View style={{flex: 1}}>
                <Text style={{fontSize: 12}}>{formatTime(item.presence_in)}</Text>
            </View>
            <View style={{flex: 1}}>
                <Text style={{fontSize: 12}}>{formatTime(item.presence_out)}</Text>

            </View>
            <View style={{flex: 1}}>
                <Text style={{fontSize: 12}}>{formatDuration(item.duration)}</Text>

            </View>
        </View>
    );

    const ListHeader = () => (
        <View style={{flexDirection: 'row', width: '100%', backgroundColor: 'grey'}}>
            <View style={{flex: 1}}>
                <Text style={{fontSize: 12, color: 'white'}} >username</Text>
            </View>
            <View style={{flex: 1.5}}>
                <Text style={{fontSize: 12, color: 'white'}}>Date</Text>
            </View>
            <View style={{flex: 1}}>
                <Text style={{fontSize: 12, color: 'white'}}>In</Text>
            </View>
            <View style={{flex: 1}}>
                <Text style={{fontSize: 12, color: 'white'}}>out</Text>

            </View>
            <View style={{flex: 1}}>
                <Text style={{fontSize: 12, color: 'white'}}>Duration</Text>

            </View>
        </View>
    )
  return (
    <View style={{flex: 1, marginHorizontal: 16}}>
        <View style={{height: 16}} />
        <FlatList
            ListHeaderComponent={ListHeader}
            data={presences} renderItem={renderItem} style={{flex: 1}} keyExtractor={item => item.id} />

        <ProgressDialog visible={isLoading} text="Please wait..." />
    </View>
  );
};

export default ReportScreen;
