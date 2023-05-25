
import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
const CustomInput = ({ placeholder,value,setValue,secureTextEntry}) => {
 

  return (
    <View style={styles.container}>
      <TextInput 
      autoCapitalize='none'
      placeholder={placeholder}
      value={value}
      onChangeText={setValue}
      secureTextEntry={secureTextEntry}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    marginTop:20,
  },
  input: {
    width: 400,
    height: 50,
    borderWidth: 2,
    borderColor: '#FF6600',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default CustomInput;