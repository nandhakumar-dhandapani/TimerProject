import React from "react";
import { TextInput } from 'react-native'

const CommonTextInput = ({ placeholder, value, onChangeText, keyboardType, style }) => {
    return (
        <TextInput
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            style={style}
        />
    )
}
export default CommonTextInput;


