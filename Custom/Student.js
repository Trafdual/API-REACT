import { StyleSheet, View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import React, {useState} from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import HomeScreen from '../screens/HomeScreen';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';

const Student = ({ student, onDelete, onUpdate }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!modalVisible);
      }
    return (
        <View style={styles.item}>
            <View style={styles.itemImageContainer}>
                {student.gender === 'Male' ? (
                    <Image style={styles.itemImage} source={require('../assets/male.png')} resizeMode='contain' />
                ) : (
                    <Image style={styles.itemImage} source={require('../assets/female.png')} resizeMode='contain' />
                )}
            </View>
            <View>
            <Text>{student.id}</Text>
                <Text>{student.fullName}</Text>
                <Text>{student.gender}</Text>
                <Text>{student.email}</Text>
                <Text>{student.dateOfBirth}</Text>
            </View>
            <View style={{marginLeft:20}}>
            <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(student)}>
                <FontAwesome5 name='trash-alt' size={25} color='red' />
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={toggleModal}>
                <MaterialIcons name='edit' size={25} color='red' />
            </TouchableOpacity>
            <Modal
        visible={modalVisible}
      >
        <View>
                <CustomInput value={student.fullName} setValue={student.fullName} placeholder='FullName'/>
                <CustomInput value={student.gender} setValue={student.gender} placeholder='Gender'/>
                <CustomInput value={student.email} setValue={student.email} placeholder='Email'/>
                <CustomInput value={student.dateOfBirth} setValue={student.dateOfBirth} placeholder='dateOfBirth'/>
                <CustomButton title='save' onPress={()=> onUpdate(student)}/>
            </View>
      </Modal>
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomColor: '#E2E2E2',
        borderBottomWidth: 0.5
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

export default Student;