
import {Button} from 'react-native';
import React from 'react';

const HomeScreen=({navigation})=>{
    const navigtionToLogin = ()=>{
        navigation.navigate('Login');
    };
    return <Button title='go to login screen ' onPress={navigtionToLogin} />;   
};

export default HomeScreen;

