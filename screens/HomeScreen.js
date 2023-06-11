import React, { useEffect, useState } from 'react';
import { SafeAreaView, Button, View, Text, StyleSheet, ScrollView, Image, Alert, FlatList, TouchableOpacity, Modal } from 'react-native';
import log from '../log';
import Student from '../Custom/Student';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomInput from '../Custom/CustomInput';
import CustomButton from '../Custom/CustomButton';
import { CheckBox } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
const HomeScreen = () => {
    const [students, setStudents] = useState([]);
    const [authInfo, setAuthInfo] = useState();
    const [selectedIndex, setIndex] = useState(0);
    const [name, setname] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [date, setDate] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setfullName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setgender] = useState('');
    const [id, setid] = useState('');
    const [dateOfBirth, setdateOfBirth] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    }

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
    const addStudents = () => {
        fetch("http://192.168.1.168:3000/students", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                fullName: fullName,
                email: email,
                gender: gender,
                dateOfBirth: dateOfBirth
            })
        }
        ).then((res) => res.json()).then(resJson => {
            setStudents(resJson);
            setEmail('');
            setfullName('');
            setdateOfBirth('');
            setgender('');
            setModalVisible(!modalVisible);
            getListStudent();
        }).catch(err => { console.log(err) })
    }
    // Xoá dữ liệu
    const deleteStudent = async (item) => {
        try {
            const API_URL = 'http://192.168.1.168:3000/students/' + item;
            const response = await fetch(API_URL, { method: 'DELETE' });
            if (response && response.status === 200) {
                getListStudent();
            }
        } catch (error) {
            log.error('Delete data failed ' + error);
        }
    };
    const updateStudent = async (item) => {
        try {
            const API_URL = 'http://192.168.1.168:3000/students/' + item;
            const response = await fetch(API_URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                console.log('Lỗi cập nhật thông tin');
                return;
            }
            const jsonValue = JSON.stringify(data);
            await AsyncStorage.setItem(`authInfo_${item}`, jsonValue);
            setEmail('');
            setfullName('');
            setdateOfBirth('');
            setgender('');
            setid('');
            setModalVisible(!modalVisible);
            getListStudent();
        } catch (error) {
            console.log(error);
        }
    }
    const data = {
        fullName: fullName,
        email: email,
        gender: gender,
        dateOfBirth: dateOfBirth
    }
    const edit = (id, fullName, email, gender, dateOfBirth) => {
        setModalVisible(!modalVisible);
        setid(id);
        setfullName(fullName);
        setEmail(email);
        setgender(gender);
        setdateOfBirth(dateOfBirth);
    }



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
            <View>
                <Button title='Thêm sinh viên' onPress={toggleModal} />
                <FlatList
                    data={students}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.item1}>
                                <View style={styles.itemImageContainer1}>
                                    {item.gender === 'Male' ? (
                                        <Image style={styles.itemImage1} source={require('../assets/male.png')} resizeMode='contain' />
                                    ) : (
                                        <Image style={styles.itemImage1} source={require('../assets/female.png')} resizeMode='contain' />
                                    )}
                                </View>
                                <View>
                                    <Text>{item.id}</Text>
                                    <Text>{item.fullName}</Text>
                                    <Text>{item.gender}</Text>
                                    <Text>{item.email}</Text>
                                    <Text>{item.dateOfBirth}</Text>
                                </View>
                                <View style={{ marginLeft: 20 }}>
                                    <TouchableOpacity style={styles.deleteButton} onPress={() => deleteStudent(item.id)}>
                                        <FontAwesome5 name='trash-alt' size={25} color='red' />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.deleteButton} onPress={() => edit(item.id, item.fullName, item.email, item.gender, item.dateOfBirth)}>
                                        <MaterialIcons name='edit' size={25} color='red' />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }} />
                <Modal
                    visible={modalVisible}
                    onDismiss={() => setModalVisible(!modalVisible)}
                >
                    <View style={styles.root}>
                        <CustomInput value={fullName} setValue={(text) => setfullName(text)} placeholder='FullName' />
                        <CustomInput value={gender} setValue={(text) => setgender(text)} placeholder='Gender' />
                        <CustomInput value={email} setValue={(text) => setEmail(text)} placeholder='Email' />
                        <CustomInput value={dateOfBirth} setValue={(text) => setdateOfBirth(text)} placeholder='dateOfBirth' />
                        <CustomButton title='save' onPress={() => {
                            if (id && fullName && email && gender && dateOfBirth) {
                                updateStudent(id);
                            }
                            else {
                                addStudents();
                            }
                        }} />


                    </View>
                </Modal>
            </View>
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
    const rennderForm = () => {
        return (
            <SafeAreaView style={styles.formCotainer}>
                <Text style={styles.formHeader}>Student Infomation</Text>
                <CustomInput placeholder='Fullname' value={''} setValue={''} secureTextEntry={false} />
                <CustomInput placeholder='Email' value={''} setValue={''} secureTextEntry={false} />
                <View style={{ flexDirection: 'row' }}>
                    <CheckBox title='Male' checked={selectedIndex === 0} onPress={() => setIndex(0)} checkedIcon='dot-circle-o' uncheckedIcon='circle-o' />
                    <CheckBox title='Female' checked={selectedIndex === 1} onPress={() => setIndex(1)} checkedIcon='dot-circle-o' uncheckedIcon='circle-o' />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Role: </Text>
                    <Text>{authInfo?.role}</Text>
                </View>
                <CustomButton title={'Save'} />
            </SafeAreaView>
        );
    };
    // Gọi vào hàm return với dữ liệu ban đầu là là danh sách sinh viên rỗng
    return <SafeAreaView style={styles.container}>{authInfo?.role === 'ADMIN' ? renderStudents() : rennderForm()}</SafeAreaView>;
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
    }, item1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomColor: '#E2E2E2',
        borderBottomWidth: 0.5
    },
    itemImageContainer1: {
        width: 100,
        height: 100,
        borderRadius: 100
    },
    itemImage1: {
        flex: 1,
        width: undefined,
        height: undefined
    },
    right: {
        paddingLeft: 15
    },
    deleteButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    }
});


export default HomeScreen;