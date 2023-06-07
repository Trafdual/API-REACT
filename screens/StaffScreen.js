import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomInput from '../Custom/CustomInput';
import CustomButton from '../Custom/CustomButton';
const StaffScreen = () => {
    
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  // Lấy id của người dùng từ bộ nhớ cục bộ hoặc AsyncStorage (sau khi đăng nhập)
  useEffect(() => {
    async function getUserId() {
      const userId = await AsyncStorage.getItem('userId');
      setUserId(JSON.parse(userId));
    }
    getUserId();
  }, []);

  // Gọi API để lấy thông tin của người dùng dựa trên id
  useEffect(() => {
    async function getUserData() {
      if (userId) {
        const response = await fetch(`http://192.168.1.168:3000/users/${userId}`);
        const data = await response.json();
        setUser(data);
      }
    }
    getUserData();
  }, [userId]);
    return (
      <View>
      {user ? (
        <>
       <CustomInput value={user.name} placeholder='Họ và tên '/>
            <CustomInput value={user.phone} placeholder='Số Điện Thoại '/>
            <CustomInput value={user.address} placeholder='Địa Chỉ '/>
            <CustomInput value={user.date} placeholder='Ngày Tháng Năm Sinh '/>
            <CustomButton title='Cập Nhật' />
        </>
      ) : (
        <Text>Loading...</Text> // Nếu chưa lấy được thông tin từ API thì hiển thị "Loading..."
      )}
    </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    text: {
      fontSize: 18,
      marginBottom: 10,
    },
  });
export default StaffScreen;