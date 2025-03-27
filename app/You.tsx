import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, SafeAreaView, Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function You() {
    const [currentWeight, setCurrentWeight] = useState('');
    const [goalWeight, setGoalWeight] = useState('');
    const [userData, setUserData] = useState<any>(null);
    const [useMetric, setUseMetric] = useState(true);

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            const data = await SecureStore.getItemAsync('userData');
            if (data) {
                const parsedData = JSON.parse(data);
                setUserData(parsedData);
                setCurrentWeight(parsedData.currentWeight?.toString() || '');
                setGoalWeight(parsedData.goalWeight?.toString() || '');
                setUseMetric(parsedData.useMetric ?? true);
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    };

    const updateWeight = async () => {
        const weight = parseFloat(currentWeight);
        if (isNaN(weight) || weight <= 0) {
            Alert.alert('Invalid Weight', 'Please enter a valid weight');
            return;
        }

        try {
            const updatedData = {
                ...userData,
                currentWeight: weight,
                useMetric: useMetric
            };
            await SecureStore.setItemAsync('userData', JSON.stringify(updatedData));
            setUserData(updatedData);
            Alert.alert('Success', 'Weight updated successfully');
        } catch (error) {
            console.error('Error updating weight:', error);
            Alert.alert('Error', 'Failed to update weight');
        }
    };

    const toggleUnit = () => {
        setUseMetric(!useMetric);
        if (currentWeight) {
            const weight = parseFloat(currentWeight);
            if (!isNaN(weight)) {
                const newWeight = useMetric 
                    ? (weight * 2.20462).toFixed(1) // kg to lbs
                    : (weight / 2.20462).toFixed(1); // lbs to kg
                setCurrentWeight(newWeight);
            }
        }
    };

    const formatWeight = (weight: number | undefined) => {
        if (weight === undefined) return '--';
        if (useMetric) return `${weight.toFixed(1)} kg`;
        return `${(weight * 2.20462).toFixed(1)} lbs`;
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#FFF8E7', '#FFF5E0']} style={styles.gradient}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Your Profile 👤</Text>
                </View>
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardTitle}>Current Weight</Text>
                            <TouchableOpacity style={styles.unitToggle} onPress={toggleUnit}>
                                <Text style={styles.unitToggleText}>{useMetric ? 'Metric' : 'Imperial'}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                value={currentWeight}
                                onChangeText={setCurrentWeight}
                                keyboardType="numeric"
                                placeholder="Enter your weight"
                                placeholderTextColor="#666"
                            />
                            <Text style={styles.unit}>{useMetric ? 'kg' : 'lbs'}</Text>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={updateWeight}>
                            <Text style={styles.buttonText}>Update Weight</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Your Goals</Text>
                        <View style={styles.goalContainer}>
                            <View style={styles.goalItem}>
                                <Text style={styles.goalLabel}>Current Weight</Text>
                                <Text style={styles.goalValue}>{formatWeight(userData?.currentWeight)}</Text>
                            </View>
                            <View style={styles.goalItem}>
                                <Text style={styles.goalLabel}>Goal Weight</Text>
                                <Text style={styles.goalValue}>{formatWeight(userData?.goalWeight)}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        paddingTop: Platform.OS === 'ios' ? 60 : 16,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333',
        letterSpacing: -0.5,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    unitToggle: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    unitToggleText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    input: {
        flex: 1,
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#333',
    },
    unit: {
        marginLeft: 8,
        fontSize: 16,
        color: '#666',
    },
    button: {
        backgroundColor: '#FF5722',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    goalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    goalItem: {
        flex: 1,
        alignItems: 'center',
    },
    goalLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    goalValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
}); 