import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Animated, TextInput, Switch, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const questions = [
    {
        id: 1,
        question: "How often do you exercise?",
        options: [
            "Never",
            "A few times a week",
            "Once a day",
            "More than once a day"
        ]
    },
    {
        id: 2,
        question: "How often do you eat per day?",
        options: [
            "1-2 times",
            "3 times",
            "4-5 times",
            "6+ times"
        ]
    },
    {
        id: 3,
        question: "What type of food do you like the most?",
        options: [
            "Protein-rich foods",
            "Carbohydrates",
            "Healthy fats",
            "A mix of all"
        ]
    }
];

const dailyTips = [
    "Try adding a tablespoon of olive oil to your meals for extra calories",
    "Eat protein-rich foods first to help build muscle mass",
    "Consider drinking your calories with healthy smoothies",
    "Track your progress weekly, not daily",
    "Stay hydrated - it helps with appetite and digestion",
    "Get enough sleep - it's crucial for muscle growth",
    "Eat before and after workouts for optimal results",
    "Include healthy fats like avocados and nuts in your diet",
    "Try eating smaller meals more frequently",
    "Don't skip breakfast - it sets the tone for your day"
];

export default function Questionnaire() {
    const navigation = useNavigation();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress] = useState(new Animated.Value(0));
    const [useMetric, setUseMetric] = useState(true);
    const [currentWeight, setCurrentWeight] = useState('');
    const [goalWeight, setGoalWeight] = useState('');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');

    const handleAnswer = (answer) => {
        setAnswers(prev => ({
            ...prev,
            [questions[currentQuestion].id]: answer
        }));

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            setCurrentQuestion(prev => prev + 1); // Move to weight input
        }
    };

    const startProcessing = async () => {
        setIsProcessing(true);
        
        // Prepare user data
        const userData = {
            ...answers,
            currentWeight: parseFloat(currentWeight),
            goalWeight: parseFloat(goalWeight),
            age: parseInt(age),
            height: parseFloat(height),
            useMetric,
            dailyTip: dailyTips[Math.floor(Math.random() * dailyTips.length)]
        };

        try {
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
            
            Animated.timing(progress, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: false,
            }).start(() => {
                navigation.navigate('Dashboard', { userData });
            });
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    };

    if (isProcessing) {
        return (
            <SafeAreaView style={styles.container}>
                <LinearGradient colors={['#FFF8E7', '#FFF5E0']} style={styles.gradient}>
                    <View style={styles.processingContainer}>
                        <View style={[styles.iconContainer, { backgroundColor: '#FFF3E0' }]}>
                            <Ionicons name="analytics" size={40} color="#FF9800" />
                        </View>
                        <Text style={styles.processingTitle}>Processing Your Information</Text>
                        <Text style={styles.processingText}>Creating your personalized plan...</Text>
                        <View style={styles.progressBar}>
                            <Animated.View 
                                style={[
                                    styles.progressFill,
                                    {
                                        width: progress.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: ['0%', '100%']
                                        })
                                    }
                                ]} 
                            />
                        </View>
                    </View>
                </LinearGradient>
            </SafeAreaView>
        );
    }

    if (currentQuestion === questions.length) {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={styles.container}>
                    <LinearGradient colors={['#FFF8E7', '#FFF5E0']} style={styles.gradient}>
                        <View style={styles.content}>
                            <View style={styles.header}>
                                <Text style={styles.questionNumber}>Final Step</Text>
                                <Text style={styles.question}>Let's set your weight goals</Text>
                            </View>

                            <View style={styles.weightContainer}>
                                <View style={styles.unitToggle}>
                                    <Text style={styles.unitText}>Use kg</Text>
                                    <Switch
                                        value={useMetric}
                                        onValueChange={setUseMetric}
                                        trackColor={{ false: '#767577', true: '#FF5722' }}
                                        thumbColor={useMetric ? '#fff' : '#f4f3f4'}
                                    />
                                    <Text style={styles.unitText}>Use stone</Text>
                                </View>

                                <View style={styles.inputContainer}>
                                    <Text style={styles.inputLabel}>Current Weight ({useMetric ? 'kg' : 'stone'})</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={currentWeight}
                                        onChangeText={setCurrentWeight}
                                        keyboardType="numeric"
                                        placeholder="Enter your current weight"
                                        returnKeyType="done"
                                        onSubmitEditing={Keyboard.dismiss}
                                    />
                                </View>

                                <View style={styles.inputContainer}>
                                    <Text style={styles.inputLabel}>Goal Weight ({useMetric ? 'kg' : 'stone'})</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={goalWeight}
                                        onChangeText={setGoalWeight}
                                        keyboardType="numeric"
                                        placeholder="Enter your goal weight"
                                        returnKeyType="done"
                                        onSubmitEditing={Keyboard.dismiss}
                                    />
                                </View>

                                <View style={styles.rowContainer}>
                                    <View style={[styles.inputContainer, styles.halfWidth]}>
                                        <Text style={styles.inputLabel}>Age</Text>
                                        <TextInput
                                            style={styles.input}
                                            value={age}
                                            onChangeText={setAge}
                                            keyboardType="numeric"
                                            placeholder="Enter your age"
                                            maxLength={2}
                                            returnKeyType="done"
                                            onSubmitEditing={Keyboard.dismiss}
                                        />
                                    </View>

                                    <View style={[styles.inputContainer, styles.halfWidth]}>
                                        <Text style={styles.inputLabel}>Height ({useMetric ? 'cm' : 'inches'})</Text>
                                        <TextInput
                                            style={styles.input}
                                            value={height}
                                            onChangeText={setHeight}
                                            keyboardType="numeric"
                                            placeholder="Enter your height"
                                            returnKeyType="done"
                                            onSubmitEditing={Keyboard.dismiss}
                                        />
                                    </View>
                                </View>

                                <TouchableOpacity
                                    style={[styles.button, (!currentWeight || !goalWeight || !age || !height) && styles.buttonDisabled]}
                                    onPress={startProcessing}
                                    disabled={!currentWeight || !goalWeight || !age || !height}
                                >
                                    <Text style={styles.buttonText}>Complete Setup</Text>
                                    <Ionicons name="checkmark-circle" size={20} color="white" style={styles.buttonIcon} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </LinearGradient>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        );
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <LinearGradient colors={['#FFF8E7', '#FFF5E0']} style={styles.gradient}>
                    <View style={styles.content}>
                        <View style={styles.header}>
                            <Text style={styles.questionNumber}>
                                Question {currentQuestion + 1} of {questions.length}
                            </Text>
                            <Text style={styles.question}>
                                {questions[currentQuestion].question}
                            </Text>
                        </View>

                        <View style={styles.optionsContainer}>
                            {questions[currentQuestion].options.map((option, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.optionButton}
                                    onPress={() => handleAnswer(option)}
                                >
                                    <Text style={styles.optionText}>{option}</Text>
                                    <Ionicons name="chevron-forward" size={20} color="#666" />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </LinearGradient>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    header: {
        marginTop: 60,
        marginBottom: 40,
    },
    questionNumber: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    question: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
        lineHeight: 32,
    },
    optionsContainer: {
        flex: 1,
    },
    optionButton: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        elevation: 2,
    },
    optionText: {
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    processingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    processingTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
    },
    processingText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
    },
    progressBar: {
        width: '80%',
        height: 8,
        backgroundColor: '#F5F5F5',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#FF5722',
        borderRadius: 4,
    },
    weightContainer: {
        flex: 1,
        padding: 20,
    },
    unitToggle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    unitText: {
        fontSize: 16,
        color: '#666',
        marginHorizontal: 10,
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 16,
        color: '#666',
        marginBottom: 8,
    },
    input: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 12,
        fontSize: 16,
        elevation: 2,
    },
    button: {
        backgroundColor: '#FF5722',
        padding: 20,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    buttonIcon: {
        marginLeft: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    halfWidth: {
        flex: 1,
        marginHorizontal: 5,
    },
}); 