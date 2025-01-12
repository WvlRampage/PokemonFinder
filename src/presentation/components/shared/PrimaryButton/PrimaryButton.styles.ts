import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
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
