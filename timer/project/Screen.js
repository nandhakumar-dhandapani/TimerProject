import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Modal, Alert, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommonTextInput from './CommonComponents/CommonComponent';
import { ProgressBar } from 'react-native-paper';
import screenStyles from './ScreenStyle'
import { SCREEN_STRINGS } from './ScreenStrings';

const Screen = () => {
    const [timers, setTimers] = useState([]);
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');
    const [category, setCategory] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTimer, setSelectedTimer] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const styles = screenStyles(isDarkMode);
    let strings = SCREEN_STRINGS
    

    useEffect(() => {
        loadTimers();
    }, []);

    const saveTimers = async (newTimers) => {
        setTimers(newTimers);
        await AsyncStorage.setItem('timers', JSON.stringify(newTimers));
    };

    const loadTimers = async () => {
        const storedTimers = await AsyncStorage.getItem('timers');
        if (storedTimers) {
            setTimers(JSON.parse(storedTimers));
        }
    };

    const addTimer = () => {
        if (!name || !duration || isNaN(parseInt(duration))) {
            alert(strings.VALID_DETAILS);
            return;
        }
        const newTimer = { id: Date.now(), name, duration: parseInt(duration), remaining: parseInt(duration), category, status: 'Paused' };
        const updatedTimers = [...timers, newTimer];
        saveTimers(updatedTimers);
        setName('');
        setDuration('');
        setCategory('');
    };

    const startTimer = (id) => {
        const updatedTimers = timers.map(timer => {
            if (timer.id === id && timer.remaining > 0) {
                const interval = setInterval(() => {
                    setTimers(prevTimers => prevTimers.map(t => {
                        if (t.id === id && t.remaining > 0) {
                            if (t.remaining === Math.ceil(t.duration / 2)) {
                                ''
                            }
                            if (t.remaining === 1) {
                                clearInterval(interval);
                                setModalVisible(true);
                                setSelectedTimer(t);
                                return { ...t, remaining: 0, status: strings.COMPLETED };
                            }
                            return { ...t, remaining: t.remaining - 1 };
                        }
                        return t;
                    }));
                }, 1000);
                return { ...timer, interval, status: strings.RUNNING };
            }
            return timer;
        });
        saveTimers(updatedTimers);
    };


    const pauseTimer = (id) => {
        const updatedTimers = timers.map(timer => {
            if (timer.id === id && timer.status === strings.RUNNING) {
                clearInterval(timer.interval);
                return { ...timer, status: strings.PAUSED };
            }
            return timer;
        });
        saveTimers(updatedTimers);
    };


    const resetTimer = (id) => {
        const updatedTimers = timers.map(timer => {
            if (timer.id === id) {
                clearInterval(timer.interval);
                return { ...timer, remaining: timer.duration, status: strings.PAUSED };
            }
            return timer;
        });
        saveTimers(updatedTimers);
    };

    const deleteAll = () => {
        saveTimers([]);
    };
    const deleteTime = (id) => {
        saveTimers(timers.filter(timer => timer.id !== id));
    };
   
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Timer App</Text>
            <CommonTextInput
                placeholder={strings.NAME}
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <CommonTextInput
                placeholder={strings.DURATION}
                value={duration}
                onChangeText={setDuration}
                keyboardType={'numeric'}
                style={styles.input}
            />
            <CommonTextInput
                placeholder={strings.CATEGORY}
                value={category}
                onChangeText={setCategory}
                style={styles.input}
            />
            <View style={styles.addDelButton}>
                <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
                <TouchableOpacity style={styles.button} onPress={addTimer}>
                    <Text style={styles.buttonText}>{strings.ADD_TIMER}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={deleteAll}>
                    <Text style={styles.buttonText}>{strings.DELETE_ALL}</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={timers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.timerContainer}>
                        <Text>{item.name} ({item.category}) - {item.remaining}s</Text>
                        <ProgressBar progress={item.duration ? item.remaining / item.duration : 0} color="#4F7942" style={{ height: 8, marginTop: 5 }} />
                        <View style={styles.buttonGroup}>
                            <TouchableOpacity style={styles.button} onPress={() => startTimer(item.id)} disabled={item.status === strings.RUNNING}>
                                <Text style={styles.buttonText}>{strings.START}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => pauseTimer(item.id)} disabled={item.status !== strings.RUNNING}>
                                <Text style={styles.buttonText}>{strings.PAUSE}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => resetTimer(item.id)}>
                                <Text style={styles.buttonText}>{strings.RESET}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => deleteTime(item.id)}>
                                <Text style={styles.buttonText}>{strings.DELETE}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
            <Modal visible={modalVisible} transparent>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>Congratulations! {selectedTimer?.name} is completed.</Text>
                    <Button title="OK" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>
        </View>
    );
};
export default Screen;
