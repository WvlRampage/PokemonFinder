import React from 'react'
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'

interface Props {
    label?: string;
    onPress?: () => void;
    onLongPress?: () => void;
}

export const PrimaryButton = ({ label, onPress, onLongPress } : Props) => {
  return (
    <View>
         <Pressable
            onPress={() => onPress && onPress()}
            onLongPress={() => onLongPress && onLongPress()}
            style= { ({ pressed }) => [
                styles.button, pressed && styles.buttonPressed
            ]}
        >
            <Text style={styles.title}>{label}</Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Platform.OS === 'android' ? '#5856D6' : '#66BB6A',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        color: 'white',
    },
    buttonPressed: {
        backgroundColor: Platform.OS === 'android' ? '#4746AB' : 'gray',
    },
    title: {
        color:Platform.OS === 'android' ? '#FFFFFF': '#FFFFFF',
        fontWeight: 'bold',
        textAlign:'center'
    }
})
