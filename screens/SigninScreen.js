
import React,{useState} from 'react';
import {Image,StyleSheet,View,Alert} from 'react-native';
import CustomButton from '../Custom/CustomButton';
import CustomInput from '../Custom/CustomInput';
import log from '../log';

const SigninScreen =(props)=>{
    let users = [];
const [username,setUsername]=useState('');
const [password,setPassword]=useState('');
 // Function to fetch data from the API
 async function fetchData() {
    try {
        const response = await fetch('http://192.168.1.168:3000/users');
        const data = await response.json();
        return data;
    } catch (error) {
        log.error('Fetch data failed ' + error);
        return null;
    }
}

// Call the fetchData function and store the result in a variable
async function storeData() {
    try{
        users = await fetchData();
    }catch(err){
        console.log(err);
    }
    
}

storeData();

const doLogin = () => {
    // Kiểm tra dữ liệu gồm username và password
    if (username.length == 0) {
        alert('Username is required');
        return;
    }

    if (password.length == 0) {
        alert('Password is required');
        return;
    }

    // Tạo đối tượng lưu giữ thông tin login
    let request = { username: username, password: password };

    log.info('authInfo: ' + JSON.stringify(request));

    if (users) {
        const authInfo = users.find((user) => user.userName === request.username);

        if (!authInfo) {
            Alert.alert('Notification', 'Cant find user infomation', [{ text: 'Cancel', onPress: () => log.error('Cant find user ' + request.username) }]);
        } else {
            if (authInfo.password != request.password) {
                Alert.alert('Notification', 'Password is not correct', [{ text: 'Cancel', onPress: () => log.error('Password is not correct for ' + request.username) }]);
            } else {
                Alert.alert('Notification', 'Login successfull ' + request.username, [
                    { text: 'OK', onPress: () => navigateToHome() },
                    { text: 'Cancel', onPress: () => log.info('Press Cancel') }
                ]);
            }
        }
    }
};

const navigateToHome=()=>{
    props.navigation.navigate('Home');
};
return(
    <View  style={styles.root}>
        <Image source={require('../assets/Flash.png')} style={styles.logo}/>
        {/* <Image source={Flash} style={styles.logo}/> */}
        <CustomInput placeholder='Username' value={username} setValue={setUsername} secureTextEntry={false} />
        <CustomInput placeholder='Password' value={password} setValue={setPassword} secureTextEntry={true}  />
        <CustomButton title='Sign In' onPress={doLogin} />
        <CustomButton title='back to home' onPress={navigateToHome} />
    </View>
);
};
export default SigninScreen;

const styles=StyleSheet.create({
root:{
    alignItems:'center',
    padding:20,
},
logo:{
    width:200,
    height:200,
    resizeMode:'contain',
},
});