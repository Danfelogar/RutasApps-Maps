import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

interface Props {
    title: string;
    onPress: ()=> void;
    style?: StyleProp<ViewStyle>;
}

export const Button = ({ title, onPress, style }: Props) => {
  return (
      //recueda que el "as any" se  pone por si en style me mandan un undefined es decir no me mandan nada por lo que es necesario inicializar esta propiedad como un objeto vacio para  que no se dañe la app
    <TouchableOpacity onPress={ onPress } activeOpacity={ 0.9 } style={{ ...style as any,...styles.Button}}>
        <Text style={ styles.title } >{ title }</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    Button: {
        height: 50,
        width: 200,
        backgroundColor: 'orange',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        elevation: 6,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
    }
});
