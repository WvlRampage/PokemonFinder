import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { styles } from './PrimaryButton.styles';

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
