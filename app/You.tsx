import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { WeightConfig, loadWeightConfig, updateWeightConfig, formatWeight, convertWeight } from './config/weightConfig';

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
        const config = await loadWeightConfig();
        setWeightConfig(config);
        setCurrentWeight(config.currentWeight.toString());
        setGoalWeight(config.goalWeight.toString());
        setUseMetric(config.useMetric);
    };

    const updateWeight = async () => {
        const weight = parseFloat(currentWeight);
        if (isNaN(weight) || weight <= 0) {
            Alert.alert('Invalid Weight', 'Please enter a valid weight');
            return;
        }

        try {
            const updatedConfig = await updateWeightConfig(weight, undefined, useMetric);
            setWeightConfig(updatedConfig);

            // Check if goal weight has been reached
            if (weightConfig?.goalWeight) {
                const currentWeightInKg = useMetric ? weight : convertWeight(weight, false, true);
                const goalWeightInKg = useMetric ? weightConfig.goalWeight : convertWeight(weightConfig.goalWeight, false, true);
                
                // Allow for a small margin of error (0.1 kg)
                if (Math.abs(currentWeightInKg - goalWeightInKg) <= 0.1) {
                    Alert.alert(
                        '🎉 Congratulations! 🎉',
                        'You have reached your goal weight! Keep up the great work!',
                        [{ text: 'OK', style: 'default' }]
                    );
                } else {
                    Alert.alert('Success', 'Weight updated successfully');
                }
            } else {
                Alert.alert('Success', 'Weight updated successfully');
            }
        } catch (error) {
            console.error('Error updating weight:', error);
            Alert.alert('Error', 'Failed to update weight');
        }
    };

    const updateGoalWeight = async () => {
        const weight = parseFloat(goalWeight);
        if (isNaN(weight) || weight <= 0) {
            Alert.alert('Invalid Weight', 'Please enter a valid goal weight');
            return;
        }

        try {
            const updatedConfig = await updateWeightConfig(undefined, weight, useMetric);
            setWeightConfig(updatedConfig);
            Alert.alert('Success', 'Goal weight updated successfully');
        } catch (error) {
            console.error('Error updating goal weight:', error);
            Alert.alert('Error', 'Failed to update goal weight');
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
                    <Text style={styles.headerTitle}>Your Bulking Details 💪</Text>
                </View>
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    <View style={[styles.card, { borderLeftWidth: 4, borderLeftColor: '#FF5722' }]}>
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
                                style={[styles.input, { borderColor: '#FF5722' }]}
                                value={currentWeight}
                                onChangeText={setCurrentWeight}
                                keyboardType="numeric"
                                placeholder="Enter your weight"
                                placeholderTextColor="#999"
                            />
                            <Text style={[styles.unit, { color: '#FF5722' }]}>{useMetric ? 'kg' : 'lbs'}</Text>
                        </View>
                        <TouchableOpacity 
                            style={[styles.button, { backgroundColor: '#FF5722' }]} 
                            onPress={updateWeight}
                        >
                            <Text style={styles.buttonText}>Update Weight</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.card, { borderLeftWidth: 4, borderLeftColor: '#4CAF50' }]}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardTitle}>Goal Weight</Text>
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

                    <View style={[styles.card, { backgroundColor: '#FFF8E7' }]}>
                        <Text style={styles.cardTitle}>Your Progress</Text>
                        <View style={styles.goalContainer}>
                            <View style={[styles.goalItem, { backgroundColor: '#FFF3E0' }]}>
                                <Text style={styles.goalLabel}>Current Weight</Text>
                                <Text style={[styles.goalValue, { color: '#FF5722' }]}>
                                    {weightConfig ? formatWeight(weightConfig.currentWeight, weightConfig.useMetric) : '--'}
                                </Text>
                            </View>
                            <View style={[styles.goalItem, { backgroundColor: '#E8F5E9' }]}>
                                <Text style={styles.goalLabel}>Goal Weight</Text>
                                <Text style={[styles.goalValue, { color: '#4CAF50' }]}>
                                    {weightConfig ? formatWeight(weightConfig.goalWeight, weightConfig.useMetric) : '--'}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.card, { borderLeftWidth: 4, borderLeftColor: '#2196F3' }]}>
                        <Text style={styles.cardTitle}>Daily Calorie Target</Text>
                        <View style={styles.targetContainer}>
                            <Text style={styles.targetValue}>{weightConfig?.dailyTarget ?? 0} cal</Text>
                            <Text style={styles.targetLabel}>For optimal weight gain</Text>
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
}); 