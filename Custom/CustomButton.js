
import React from 'react';
import { Text, StyleSheet,Pressable } from 'react-native';

const CustomButton = ({ title,onPress}) => {
  return (
    <Pressable
      style={styles.button}
      onPress={onPress} >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width:200,
    backgroundColor: '#FF6600',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop:10,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CustomButton;