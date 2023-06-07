import React, { useEffect, useState } from 'react';
import { SafeAreaView, Button, View, Text, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import log from '../log';
import { useNavigation } from '@react-navigation/native';
import Student from '../Custom/Student';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StaffScreen from './StaffScreen';
import CustomInput from '../Custom/CustomInput';
import CustomButton from '../Custom/CustomButton';
const HomeScreen = () => {
    const navigation = useNavigation();
    const [students, setStudents] = useState([]);
    const [authInfo, setAuthInfo] = useState();
    const [name, setname] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [date, setDate] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Hàm điều hướng
    const navigateToLogin = () => {
        navigation.navigate('Login');
    };

    // Funtion lấy data login từ AsyncStorage
    const retrieveData = async () => {
        try {
            const authInfo = await AsyncStorage.getItem('authInfo');
            if (authInfo !== null) {
                log.info('====> authInfo from AsyncStorage', authInfo);
                setAuthInfo(JSON.parse(authInfo));
            }
        } catch (error) {
            log.error(error);
        }
    };

    // Funtion logout
    const doLogout = () => {
        AsyncStorage.removeItem('authInfo');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }]
        });
    };

    // Funtion lấy danh sách sinh viên
    const getListStudent = async () => {
        try {
            const API_URL = 'http://192.168.1.168:3000/students';
            const response = await fetch(API_URL);
            const data = await response.json();
            // log.info('====> students:', JSON.stringify(data));
            setStudents(data);
        } catch (error) {
            log.error('Fetch data failed ' + error);
        }
    };

    // React Hooks là những hàm cho phép bạn “kết nối” React state và lifecycle vào các components sử dụng hàm.
    // useState() là 1 react hook
    // 6 trường hợp sử dụng của useEffect() trong React
    // 1.Chạy một lần khi mount : tìm nạp data API.
    // 2.Chạy khi thay đổi state : thường thì khi validate input đầu vào.
    // 3.Chạy khi thay đổi state : filtering trực tiếp.
    // 4.Chạy khi thay đổi state : trigger animation trên giá trị của array mới.
    // 5.Chạy khi props thay đổi : update lại list đã fetched API khi data update.
    // 6.Chạy khi props thay đổi : updateing data API để cập nhật BTC
    useEffect(() => {
        retrieveData();
        getListStudent();

    }, []);

    // Funtion render danh sách sinh viên
    const renderStudents = () => {
        return (
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View>
                    <Text style={styles.txtHeader}>List Student</Text>
                </View>
                <View style={styles.studentContainer}>
                    {students.map((item, index) => {
                        return <Student student={item} key={index}></Student>;
                    })}
                </View>
            </ScrollView>
        );
    };
    // const renderStaff=()=>{
    //     return(
    //     <View>
    //     <StaffScreen></StaffScreen>
    //     </View>
    //     );
    // }
    const newObj = {
        username: username,
        password: password,
        name: name,
        phone: phone,
        address: address,
        date: date
    };
    const updateStaff = async () => {
        const authInfo = await AsyncStorage.getItem('authInfo');
        fetch(`http://192.168.1.168:3000/users/${authInfo}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newObj),
        }).then((res) => res.json());
    }
    
    const validate = () => {
        if (name == '') {
            alert('không được để trông tên')
        }
        else if (phone == '') {
            alert('không được để trông số điện thoại')
        }
        else if (address == '') {
            alert('không được để trông địa chỉ')
        }
        else if (date == '') {
            alert('không được để trông ngày sinh')
        }
        else {
            updateStaff();
            alert('cập nhật thành công');
            setAddress('');
            setDate('');
            setPhone('');
            setname('');
        }
    }
    const Form = () => {
        return (
            <View style={styles.root} >
                <Text style={{ fontSize: 20, textAlign: 'center', }}>Form Staff</Text>
                <CustomInput value={name} setValue={setname} placeholder='Họ và tên ' />
                <CustomInput value={phone} setValue={setPhone} placeholder='Số Điện Thoại ' />
                <CustomInput value={address} setValue={setAddress} placeholder='Địa Chỉ ' />
                <CustomInput value={date} setValue={setDate} placeholder='Ngày Tháng Năm Sinh ' />
                <CustomButton title='Cập Nhật' onPress={validate} />
            </View>
        )
    }
    // Gọi vào hàm return với dữ liệu ban đầu là là danh sách sinh viên rỗng
    return (
        <SafeAreaView style={styles.container}>
            {authInfo ? <Button title='Logout' onPress={doLogout} /> : <Button title='Go to Login Screen' onPress={navigateToLogin} />}
            {authInfo?.role === 'ADMIN' ? renderStudents() : Form()}

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    txtHeader: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    scrollView: {
        flexGrow: 1,
        padding: 20
    },
    item: {
        paddingVertical: 15,
        borderBottomColor: '#E2E2E2',
        borderBottomWidth: 0.5,
        flexDirection: 'row'
    },
    itemImageContainer: {
        width: 100,
        height: 100,
        borderRadius: 100
    },
    itemImage: {
        flex: 1,
        width: undefined,
        height: undefined
    }, root: {
        alignItems: 'center',
        padding: 20,
    }
});


export default HomeScreen;