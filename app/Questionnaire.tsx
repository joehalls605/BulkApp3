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
    const [useMetricHeight, setUseMetricHeight] = useState(true);
    const [currentWeight, setCurrentWeight] = useState('');
    const [goalWeight, setGoalWeight] = useState('');
    const [height, setHeight] = useState('');
    const [gender, setGender] = useState('');

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
            height: parseFloat(height),
            useMetric,
            useMetricHeight,
            gender,
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

                                <View style={styles.inputContainer}>
                                    <View style={styles.heightHeader}>
                                        <Text style={styles.inputLabel}>Height</Text>
                                        <View style={styles.heightUnitToggle}>
                                            <Text style={[styles.unitText, { fontSize: 12 }]}>cm</Text>
                                            <Switch
                                                value={useMetricHeight}
                                                onValueChange={setUseMetricHeight}
                                                trackColor={{ false: '#767577', true: '#FF5722' }}
                                                thumbColor={useMetricHeight ? '#fff' : '#f4f3f4'}
                                            />
                                            <Text style={[styles.unitText, { fontSize: 12 }]}>ft</Text>
                                        </View>
                                    </View>
                                    <TextInput
                                        style={styles.input}
                                        value={height}
                                        onChangeText={setHeight}
                                        keyboardType="numeric"
                                        placeholder={useMetricHeight ? "Enter height in cm" : "Enter height in ft"}
                                        returnKeyType="done"
                                        onSubmitEditing={Keyboard.dismiss}
                                    />
                                </View>

                                <View style={styles.inputContainer}>
                                    <Text style={styles.inputLabel}>Gender</Text>
                                    <View style={styles.genderOptions}>
                                        <TouchableOpacity 
                                            style={[styles.genderOption, gender === 'Male' && styles.genderOptionSelected]}
                                            onPress={() => setGender('Male')}
                                        >
                                            <Text style={[styles.genderText, gender === 'Male' && styles.genderTextSelected]}>Male</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            style={[styles.genderOption, gender === 'Female' && styles.genderOptionSelected]}
                                            onPress={() => setGender('Female')}
                                        >
                                            <Text style={[styles.genderText, gender === 'Female' && styles.genderTextSelected]}>Female</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            style={[styles.genderOption, gender === 'Prefer not to say' && styles.genderOptionSelected]}
                                            onPress={() => setGender('Prefer not to say')}
                                        >
                                            <Text style={[styles.genderText, gender === 'Prefer not to say' && styles.genderTextSelected]}>Prefer not to say</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <TouchableOpacity
                                    style={[styles.button, (!currentWeight || !goalWeight || !height || !gender) && styles.buttonDisabled]}
                                    onPress={startProcessing}
                                    disabled={!currentWeight || !goalWeight || !height || !gender}
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
                            <View style={styles.headerTop}>
                                {currentQuestion > 0 && (
                                    <TouchableOpacity 
                                        style={styles.backButton}
                                        onPress={() => setCurrentQuestion(prev => prev - 1)}
                                    >
                                        <Ionicons name="chevron-back" size={24} color="#666" />
                                        <Text style={styles.backButtonText}>Back</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
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
        marginBottom: 20,
    },
    unitText: {
        fontSize: 14,
        color: '#666',
        marginHorizontal: 10,
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    heightHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    heightUnitToggle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#FF5722',
        padding: 20,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        elevation: 2,
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
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    backButtonText: {
        fontSize: 16,
        color: '#666',
        marginLeft: 4,
    },
    genderOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    genderOption: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#F5F5F5',
        marginHorizontal: 4,
        alignItems: 'center',
    },
    genderOptionSelected: {
        backgroundColor: '#FF5722',
    },
    genderText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    genderTextSelected: {
        color: 'white',
    },
}); 