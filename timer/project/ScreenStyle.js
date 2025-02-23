import { StyleSheet } from 'react-native';
import { useMemo } from 'react';

const screenStyles = (isDarkMode) => {
    return useMemo(() => StyleSheet.create({
        container: {
            flex: 1,
            padding: 15,
            backgroundColor: isDarkMode ? '#222' : '#fff',
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            textAlign: 'center',
            marginVertical: 10,
            backgroundColor: isDarkMode ? '#fff' : '',
        },
        timerContainer: {
            borderRadius: 10,
            padding: 15,
            marginVertical: 20,
            shadowRadius: 10,
            backgroundColor: isDarkMode ? '#333' : 'hsl(140, 17.60%, 96.70%)',
            shadowColor: isDarkMode ? '#fff' : 'green',
            shadowOffset: {
                height: 0,
                width: 4
            },
            elevation: 5,
            shadowOpacity: 0.6
        },
        buttonGroup: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5
        },
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(233, 229, 229, 0.81)',
        },
        modalText: {
            backgroundColor: 'white',
            padding: 20,
            fontSize: 18,
            textAlign: 'center'
        },
        button: {
            backgroundColor: isDarkMode ? 'rgba(233, 229, 229, 0.81)' : '#82e8ae',
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: isDarkMode ? '#888' : 'transparent',
            shadowColor: 'black',
            marginTop: 10
        },
        buttonText: {
            color: 'black',
            fontSize: 16,
            fontWeight: 'bold',
        },
        input: {
            padding: 10,
            backgroundColor: isDarkMode ? 'rgba(241, 243, 241, 0.2)' : 'rgba(203, 228, 208, 0.2)',
            borderRadius: 10,
            marginVertical: 5,
            fontSize: 18,
            color: isDarkMode ? 'white' : 'black',
            borderColor: 'grey',
            shadowColor: 'grey',
            shadowOffset: {
                width: 10,
                height: 2
            },
        },
        addDelButton: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center'
        }
    }), [isDarkMode]);
};

export default screenStyles;