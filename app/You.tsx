import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { WeightConfig, loadWeightConfig, updateWeightConfig, formatWeight, convertWeight } from './config/weightConfig';
import * as SecureStore from 'expo-secure-store';

export default function You() {
    const [currentWeight, setCurrentWeight] = useState('');
    const [goalWeight, setGoalWeight] = useState('');
    const [weightConfig, setWeightConfig] = useState<WeightConfig | null>(null);
    const [useMetric, setUseMetric] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        loadUserData();
    }, []);

    useEffect(() => {
        const subscription = navigation.addListener('focus', () => {
            loadUserData();
        });

        return subscription;
    }, [navigation]);

    const loadUserData = async () => {
        try {
            // Load weight configuration first
            const config = await loadWeightConfig();
            setWeightConfig(config);
            
            // Set the input values from the config
            setCurrentWeight(config.currentWeight.toString());
            setGoalWeight(config.goalWeight.toString());
            setUseMetric(config.useMetric);

            // Load user data
            const userDataString = await SecureStore.getItemAsync('userData');
            if (userDataString) {
                const userData = JSON.parse(userDataString);
                // Ensure user data matches config
                const updatedUserData = {
                    ...userData,
                    currentWeight: config.currentWeight,
                    goalWeight: config.goalWeight,
                    useMetric: config.useMetric
                };
                await SecureStore.setItemAsync('userData', JSON.stringify(updatedUserData));
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
            // Update config with new current weight
            const updatedConfig = await updateWeightConfig(weight, undefined, useMetric);
            setWeightConfig(updatedConfig);

            Alert.alert(
                'Success',
                `Current weight updated to ${formatWeight(weight, useMetric)}`,
                [{ text: 'OK' }]
            );
        } catch (error) {
            console.error('Error updating weight:', error);
            Alert.alert('Error', 'Failed to update weight. Please try again.');
        }
    };

    const updateGoalWeight = async () => {
        const weight = parseFloat(goalWeight);
        if (isNaN(weight) || weight <= 0) {
            Alert.alert('Invalid Weight', 'Please enter a valid weight');
            return;
        }

        // Validate that goal weight is greater than current weight
        const currentWeightNum = parseFloat(currentWeight);
        if (weight <= currentWeightNum) {
            Alert.alert(
                'Invalid Goal Weight',
                'Your goal weight must be greater than your current weight. Please try again.',
                [{ text: 'OK' }]
            );
            return;
        }

        try {
            // Update config with new goal weight
            const updatedConfig = await updateWeightConfig(undefined, weight, useMetric);
            setWeightConfig(updatedConfig);

            Alert.alert(
                'Success',
                `Goal weight updated to ${formatWeight(weight, useMetric)}`,
                [{ text: 'OK' }]
            );
        } catch (error) {
            console.error('Error updating goal weight:', error);
            Alert.alert('Error', 'Failed to update goal weight. Please try again.');
        }
    };

    const toggleUnit = () => {
        setUseMetric(!useMetric);
        if (currentWeight) {
            const weight = parseFloat(currentWeight);
            if (!isNaN(weight)) {
                const newWeight = convertWeight(weight, useMetric, !useMetric);
                setCurrentWeight(newWeight.toFixed(1));
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#FFF8E7', '#FFF5E0']} style={styles.gradient}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Your Details</Text>
                </View>
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    <View style={[styles.card, { borderLeftWidth: 4, borderLeftColor: '#306eff' }]}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardTitle}>Current Weight</Text>
                            <TouchableOpacity 
                                style={[styles.unitToggle, { backgroundColor: useMetric ? '#E3F2FD' : '#FFF3E0' }]} 
                                onPress={toggleUnit}
                            >
                                <Text style={[styles.unitToggleText, { color: useMetric ? '#1976D2' : '#FF9800' }]}>
                                    {useMetric ? 'Metric' : 'Imperial'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[styles.input, { borderColor: '#306eff' }]}
                                value={currentWeight}
                                onChangeText={setCurrentWeight}
                                keyboardType="numeric"
                                placeholder="Enter your weight"
                                placeholderTextColor="#999"
                            />
                            <Text style={[styles.unit, { color: '#306eff' }]}>{useMetric ? 'kg' : 'lbs'}</Text>
                        </View>
                        <TouchableOpacity 
                            style={[styles.button, { backgroundColor: '#306eff' }]} 
                            onPress={updateWeight}
                        >
                            <Text style={styles.buttonText}>Update Weight</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.card, { borderLeftWidth: 4, borderLeftColor: '#4CAF50' }]}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardTitle}>Goal Weight</Text>
                            <TouchableOpacity 
                                style={[styles.unitToggle, { backgroundColor: useMetric ? '#E3F2FD' : '#FFF3E0' }]} 
                                onPress={toggleUnit}
                            >
                                <Text style={[styles.unitToggleText, { color: useMetric ? '#1976D2' : '#FF9800' }]}>
                                    {useMetric ? 'Metric' : 'Imperial'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[styles.input, { borderColor: '#4CAF50' }]}
                                value={goalWeight}
                                onChangeText={setGoalWeight}
                                keyboardType="numeric"
                                placeholder="Enter your goal weight"
                                placeholderTextColor="#999"
                            />
                            <Text style={[styles.unit, { color: '#4CAF50' }]}>{useMetric ? 'kg' : 'lbs'}</Text>
                        </View>
                        <TouchableOpacity 
                            style={[styles.button, { backgroundColor: '#4CAF50' }]} 
                            onPress={updateGoalWeight}
                        >
                            <Text style={styles.buttonText}>Update Goal</Text>
                        </TouchableOpacity>
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
        borderRadius: 16,
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
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.05)',
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
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    unitToggleText: {
        fontSize: 14,
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
        borderWidth: 1.5,
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#333',
        backgroundColor: '#FFF',
    },
    unit: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '500',
    },
    button: {
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#FF5722',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    goalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    goalItem: {
        flex: 1,
        alignItems: 'center',
        padding: 12,
        borderRadius: 12,
        marginHorizontal: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    goalLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
        fontWeight: '500',
    },
    goalValue: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    targetContainer: {
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#E3F2FD',
        borderRadius: 12,
        marginTop: 8,
    },
    targetValue: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1976D2',
    },
    targetLabel: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    progressContainer: {
        marginTop: 16,
        alignItems: 'center',
    },
    progressBar: {
        width: '100%',
        height: 8,
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 8,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#4CAF50',
        borderRadius: 4,
    },
    progressText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
}); 