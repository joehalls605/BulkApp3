import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Animated, TextInput, Switch, TouchableWithoutFeedback, Keyboard, ScrollView, Alert, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import { RootStackParamList } from './types';
import { WeightConfig, calculateCalories, updateWeightConfig } from './config/weightConfig';
import * as ImagePicker from 'expo-image-picker';

type QuestionnaireScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Questionnaire'>;

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
    const navigation = useNavigation<QuestionnaireScreenNavigationProp>();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress] = useState(new Animated.Value(0));
    const [processingMessage, setProcessingMessage] = useState(0);
    const [useMetric, setUseMetric] = useState(true);
    const [currentWeight, setCurrentWeight] = useState('');
    const [goalWeight, setGoalWeight] = useState('');
    const [gender, setGender] = useState('');
    const [timeframe, setTimeframe] = useState(12);
    const [beforePhoto, setBeforePhoto] = useState<string | null>(null);

    const processingMessages = [
        "Processing your details...",
        "Building your weight gain coach...",
        "Calculating your calorie targets...",
        "Preparing your meal suggestions...",
        "Almost ready..."
    ];

    useEffect(() => {
        if (isProcessing) {
            // Animate progress bar over 3 seconds
            Animated.timing(progress, {
                toValue: 1,
                duration: 3000,
                useNativeDriver: false,
            }).start(() => {
                navigation.navigate('StartJourney');
            });

            // Cycle through messages every 600ms
            const messageInterval = setInterval(() => {
                setProcessingMessage(prev => (prev + 1) % processingMessages.length);
            }, 600);

            return () => clearInterval(messageInterval);
        }
    }, [isProcessing]);

    const handleAnswer = (answer: string) => {
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

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
                base64: true
            });

            if (!result.canceled) {
                setBeforePhoto(result.assets[0].base64 || null);
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Error', 'Failed to pick image. Please try again.');
        }
    };

    const handleSubmit = async () => {
        try {
            // Show processing state
            setIsProcessing(true);

            // Update weight config with all values
            await updateWeightConfig(
                parseFloat(currentWeight),
                parseFloat(goalWeight),
                useMetric,
                answers[1] || 'Never',
                answers[2] || '3 times',
                answers[3] || 'A mix of all',
                timeframe,
                beforePhoto || undefined
            );

            // Navigation will happen automatically after the progress animation completes
        } catch (error) {
            console.error('Error saving questionnaire:', error);
            Alert.alert('Error', 'Failed to save questionnaire');
            setIsProcessing(false);
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
                        <Animated.Text 
                            style={[
                                styles.processingText,
                                {
                                    opacity: progress.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [1, 0.8]
                                    })
                                }
                            ]}
                        >
                            {processingMessages[processingMessage]}
                        </Animated.Text>
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
                        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                            <View style={styles.content}>
                                <View style={styles.header}>
                                    <Text style={styles.questionNumber}>Question 4/4</Text>
                                    <Text style={styles.question}>Let's set your weight goals</Text>
                                </View>

                                <View style={styles.weightContainer}>
                                    <View style={styles.unitToggle}>
                                        <Text style={styles.unitText}>Metric</Text>
                                        <Switch
                                            value={useMetric}
                                            onValueChange={setUseMetric}
                                            trackColor={{ false: '#767577', true: '#FF5722' }}
                                            thumbColor={useMetric ? '#fff' : '#f4f3f4'}
                                        />
                                        <Text style={styles.unitText}>Imperial</Text>
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
                                        <Text style={styles.inputLabel}>Timeframe to Reach Goal</Text>
                                        <View style={styles.timeframeContainer}>
                                            <Slider
                                                style={styles.slider}
                                                minimumValue={6}
                                                maximumValue={60}
                                                step={1}
                                                value={timeframe}
                                                onValueChange={setTimeframe}
                                                minimumTrackTintColor="#FF5722"
                                                maximumTrackTintColor="#E0E0E0"
                                                thumbTintColor="#FF5722"
                                            />
                                            <Text style={styles.timeframeText}>
                                                {timeframe} {timeframe === 1 ? 'month' : 'months'}
                                            </Text>
                                        </View>
                                    </View>

                                    <TouchableOpacity
                                        style={[styles.button, (!currentWeight || !goalWeight) && styles.buttonDisabled]}
                                        onPress={() => setCurrentQuestion(prev => prev + 1)}
                                        disabled={!currentWeight || !goalWeight}
                                    >
                                        <Text style={styles.buttonText}>Next</Text>
                                        <Ionicons name="chevron-forward" size={20} color="white" style={styles.buttonIcon} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </LinearGradient>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        );
    }

    if (currentQuestion === questions.length + 1) {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={styles.container}>
                    <LinearGradient colors={['#FFF8E7', '#FFF5E0']} style={styles.gradient}>
                        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                            <View style={styles.content}>
                                <View style={styles.header}>
                                    <Text style={styles.questionNumber}>Final Step</Text>
                                    <Text style={styles.question}>Upload your 'Before' Photo</Text>
                                </View>

                                <View style={styles.weightContainer}>
                                    <View style={styles.section}>
                                        <Text style={styles.sectionTitle}>Your day 1 photo 📈</Text>
                                        <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
                                            {beforePhoto ? (
                                                <Image 
                                                    source={{ uri: `data:image/jpeg;base64,${beforePhoto}` }}
                                                    style={styles.previewImage}
                                                />
                                            ) : (
                                                <View style={styles.photoPlaceholder}>
                                                    <Ionicons name="camera" size={40} color="#666" />
                                                    <Text style={styles.photoPlaceholderText}>Tap to upload photo</Text>
                                                </View>
                                            )}
                                        </TouchableOpacity>
                                    </View>

                                    <TouchableOpacity
                                        style={[styles.button, !beforePhoto && styles.buttonDisabled]}
                                        onPress={handleSubmit}
                                        disabled={!beforePhoto}
                                    >
                                        <Text style={styles.buttonText}>Complete Setup</Text>
                                        <Ionicons name="checkmark-circle" size={20} color="white" style={styles.buttonIcon} />
                                    </TouchableOpacity>

                                    <View style={styles.footer}>
                                        <Text style={styles.footerText}>Made with ❤️ in London</Text>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
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
        padding: 24,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    processingTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
        marginBottom: 16,
        textAlign: 'center',
    },
    processingText: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        marginBottom: 32,
        fontStyle: 'italic',
    },
    progressBar: {
        width: '80%',
        height: 6,
        backgroundColor: '#E0E0E0',
        borderRadius: 3,
        overflow: 'hidden',
        marginTop: 16,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#4CAF50',
        borderRadius: 3,
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
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 12,
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
    unitText: {
        fontSize: 16,
        color: '#666',
        marginHorizontal: 10,
        fontWeight: '500',
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
        gap: 8,
    },
    genderOption: {
        flex: 1,
        padding: 15,
        borderRadius: 12,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
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
    genderOptionSelected: {
        backgroundColor: '#FF5722',
        borderColor: '#FF5722',
    },
    genderText: {
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
    },
    genderTextSelected: {
        color: 'white',
    },
    timeframeContainer: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 12,
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
    slider: {
        width: '100%',
        height: 40,
    },
    timeframeText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginTop: 8,
        fontWeight: '500',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    testToggleContainer: {
        marginBottom: 20,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 12,
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
    testToggleLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        fontWeight: '500',
    },
    testToggle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    testToggleText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    section: {
        marginBottom: 20,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        color: '#333'
    },
    photoButton: {
        width: '100%',
        height: 200,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    photoPlaceholder: {
        alignItems: 'center'
    },
    photoPlaceholderText: {
        marginTop: 10,
        color: '#666'
    },
    previewImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    footer: {
        marginTop: 20,
        alignItems: 'center',
        paddingTop: 170,
        paddingBottom: 20,
    },
    footerText: {
        fontSize: 14,
        color: '#666',
        fontStyle: 'italic',
    },
}); 