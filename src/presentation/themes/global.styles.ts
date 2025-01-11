import { Platform, StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Platform.OS === 'android' ? '#5856D6':'#66BB6A'
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color: '#e14318'
    },
    description: {
        fontSize: 14,
        fontWeight:'bold',
        color: '#207394',
        textTransform: 'capitalize',
    },
    Input: {
        borderWidth: 1,
        borderColor: '#207394',
        padding: 8,
        marginVertical: 16,
        borderRadius: 16,
        backgroundColor:'#f2ffe0'
    }
})