import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, SafeAreaView, Platform, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { WeightConfig, loadWeightConfig, updateWeightConfig, formatWeight, convertWeight } from './config/weightConfig';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';

export default function You() {
    const [currentWeight, setCurrentWeight] = useState('');
    const [goalWeight, setGoalWeight] = useState('');
    const [timeframe, setTimeframe] = useState(12);
    const [weightConfig, setWeightConfig] = useState<WeightConfig | null>(null);
    const [useMetric, setUseMetric] = useState(true);
    const [activeTab, setActiveTab] = useState<'before' | 'progress' | 'after'>('before');
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

    const formatInputWeight = (weight: number, useMetric: boolean): string => {
        if (useMetric) return weight.toFixed(1);
        // Convert kg to stone for display
        return (weight * 2.20462 / 14).toFixed(1);
    };

    const loadUserData = async () => {
        try {
            // Load weight configuration first
            const config = await loadWeightConfig();
            
            // Ensure photos are properly initialized
            const cleanConfig = {
                ...config,
                beforePhoto: config.beforePhoto || undefined,
                afterPhoto: config.afterPhoto || undefined,
                progressPhotos: config.progressPhotos || []
            };
            
            setWeightConfig(cleanConfig);
            
            // Set the input values from the config
            setCurrentWeight(formatInputWeight(cleanConfig.currentWeight, cleanConfig.useMetric));
            setGoalWeight(formatInputWeight(cleanConfig.goalWeight, cleanConfig.useMetric));
            setUseMetric(cleanConfig.useMetric);
            setTimeframe(cleanConfig.timeframe);

            // Load user data
            const userDataString = await SecureStore.getItemAsync('userData');
            if (userDataString) {
                const userData = JSON.parse(userDataString);
                // Ensure user data matches config
                const updatedUserData = {
                    ...userData,
                    currentWeight: cleanConfig.currentWeight,
                    goalWeight: cleanConfig.goalWeight,
                    useMetric: cleanConfig.useMetric,
                    timeframe: cleanConfig.timeframe,
                    dailyCalories: cleanConfig.dailyTarget,
                    maintenanceCalories: cleanConfig.maintenanceCalories,
                    beforePhoto: cleanConfig.beforePhoto,
                    afterPhoto: cleanConfig.afterPhoto,
                    progressPhotos: cleanConfig.progressPhotos
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
            // Convert stone to kg if using imperial
            const weightInKg = useMetric ? weight : weight * 14 / 2.20462;

            // Update config with new current weight, maintaining other values
            const updatedConfig = await updateWeightConfig(
                weightInKg,
                weightConfig?.goalWeight,
                useMetric,
                weightConfig?.exerciseFrequency,
                weightConfig?.mealsPerDay,
                weightConfig?.foodPreference,
                timeframe,
                weightConfig?.beforePhoto
            );
            setWeightConfig(updatedConfig);

            // Update userData with new values
            const userDataString = await SecureStore.getItemAsync('userData');
            if (userDataString) {
                const userData = JSON.parse(userDataString);
                const updatedUserData = {
                    ...userData,
                    currentWeight: weightInKg,
                    useMetric: useMetric,
                    timeframe: timeframe,
                    dailyCalories: updatedConfig.dailyTarget,
                    maintenanceCalories: updatedConfig.maintenanceCalories
                };
                await SecureStore.setItemAsync('userData', JSON.stringify(updatedUserData));
            }

            Alert.alert(
                'Success',
                `Current weight updated to ${formatWeight(weightInKg, useMetric)}. Calorie targets have been recalculated.`,
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

        // Convert stone to kg if using imperial
        const weightInKg = useMetric ? weight : weight * 14 / 2.20462;
        const currentWeightInKg = useMetric ? parseFloat(currentWeight) : parseFloat(currentWeight) * 14 / 2.20462;

        // Validate that goal weight is greater than current weight
        if (weightInKg <= currentWeightInKg) {
            Alert.alert(
                'Invalid Goal Weight',
                'Your goal weight must be greater than your current weight. Please try again.',
                [{ text: 'OK' }]
            );
            return;
        }

        try {
            // Update config with new goal weight, maintaining other values
            const updatedConfig = await updateWeightConfig(
                weightConfig?.currentWeight,
                weightInKg,
                useMetric,
                weightConfig?.exerciseFrequency,
                weightConfig?.mealsPerDay,
                weightConfig?.foodPreference,
                timeframe,
                weightConfig?.beforePhoto
            );
            setWeightConfig(updatedConfig);

            // Update userData with new values
            const userDataString = await SecureStore.getItemAsync('userData');
            if (userDataString) {
                const userData = JSON.parse(userDataString);
                const updatedUserData = {
                    ...userData,
                    goalWeight: weightInKg,
                    useMetric: useMetric,
                    timeframe: timeframe,
                    dailyCalories: updatedConfig.dailyTarget,
                    maintenanceCalories: updatedConfig.maintenanceCalories
                };
                await SecureStore.setItemAsync('userData', JSON.stringify(updatedUserData));
            }

            // Ensure the displayed goal weight matches the updated value
            setGoalWeight(formatInputWeight(weightInKg, useMetric));

            Alert.alert(
                'Success',
                `Goal weight updated to ${formatWeight(weightInKg, useMetric)}. Calorie targets have been recalculated.`,
                [{ text: 'OK' }]
            );
        } catch (error) {
            console.error('Error updating goal weight:', error);
            Alert.alert('Error', 'Failed to update goal weight. Please try again.');
        }
    };

    const updateTimeframe = async () => {
        try {
            // Update config with new timeframe, maintaining other values
            const updatedConfig = await updateWeightConfig(
                weightConfig?.currentWeight,
                weightConfig?.goalWeight,
                useMetric,
                weightConfig?.exerciseFrequency,
                weightConfig?.mealsPerDay,
                weightConfig?.foodPreference,
                timeframe,
                weightConfig?.beforePhoto
            );
            setWeightConfig(updatedConfig);

            // Update userData with new values
            const userDataString = await SecureStore.getItemAsync('userData');
            if (userDataString) {
                const userData = JSON.parse(userDataString);
                const updatedUserData = {
                    ...userData,
                    timeframe: timeframe,
                    dailyCalories: updatedConfig.dailyTarget,
                    maintenanceCalories: updatedConfig.maintenanceCalories
                };
                await SecureStore.setItemAsync('userData', JSON.stringify(updatedUserData));
            }

            Alert.alert(
                'Success',
                `Timeframe updated to ${timeframe} months. Your calorie targets have been recalculated.`,
                [{ text: 'OK' }]
            );
        } catch (error) {
            console.error('Error updating timeframe:', error);
            Alert.alert('Error', 'Failed to update timeframe. Please try again.');
        }
    };

    const toggleUnit = async () => {
        const newUseMetric = !useMetric;
        setUseMetric(newUseMetric);

        if (currentWeight && goalWeight) {
            const currentWeightNum = parseFloat(currentWeight);
            const goalWeightNum = parseFloat(goalWeight);
            
            if (!isNaN(currentWeightNum) && !isNaN(goalWeightNum)) {
                // Convert between kg and stone
                const newCurrentWeight = useMetric ? currentWeightNum * 2.20462 / 14 : currentWeightNum * 14 / 2.20462;
                const newGoalWeight = useMetric ? goalWeightNum * 2.20462 / 14 : goalWeightNum * 14 / 2.20462;
                
                // Update displayed values
                setCurrentWeight(newCurrentWeight.toFixed(1));
                setGoalWeight(newGoalWeight.toFixed(1));

                try {
                    // Update config with converted weights
                    const updatedConfig = await updateWeightConfig(
                        useMetric ? currentWeightNum : currentWeightNum * 14 / 2.20462,
                        useMetric ? goalWeightNum : goalWeightNum * 14 / 2.20462,
                        newUseMetric,
                        weightConfig?.exerciseFrequency,
                        weightConfig?.mealsPerDay,
                        weightConfig?.foodPreference,
                        timeframe,
                        weightConfig?.beforePhoto
                    );
                    setWeightConfig(updatedConfig);

                    // Update userData with new values
                    const userDataString = await SecureStore.getItemAsync('userData');
                    if (userDataString) {
                        const userData = JSON.parse(userDataString);
                        const updatedUserData = {
                            ...userData,
                            currentWeight: useMetric ? currentWeightNum : currentWeightNum * 14 / 2.20462,
                            goalWeight: useMetric ? goalWeightNum : goalWeightNum * 14 / 2.20462,
                            useMetric: newUseMetric,
                            timeframe: timeframe,
                            dailyCalories: updatedConfig.dailyTarget,
                            maintenanceCalories: updatedConfig.maintenanceCalories
                        };
                        await SecureStore.setItemAsync('userData', JSON.stringify(updatedUserData));
                    }
                } catch (error) {
                    console.error('Error updating unit system:', error);
                }
            }
        }
    };

    const pickImage = async (type: 'before' | 'progress' | 'after') => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
                base64: true
            });

            if (!result.canceled) {
                const base64Image = result.assets[0].base64;
                if (!base64Image) return;

                let updatedConfig: WeightConfig = { ...weightConfig! };

                switch (type) {
                    case 'before':
                        updatedConfig.beforePhoto = base64Image;
                        break;
                    case 'after':
                        updatedConfig.afterPhoto = base64Image;
                        break;
                    case 'progress':
                        if (!updatedConfig.progressPhotos) {
                            updatedConfig.progressPhotos = [];
                        }
                        if (updatedConfig.progressPhotos.length >= 10) {
                            Alert.alert('Maximum Photos Reached', 'You can only have up to 10 progress photos.');
                            return;
                        }
                        updatedConfig.progressPhotos.push(base64Image);
                        break;
                }

                const newConfig = await updateWeightConfig(
                    updatedConfig.currentWeight,
                    updatedConfig.goalWeight,
                    updatedConfig.useMetric,
                    updatedConfig.exerciseFrequency,
                    updatedConfig.mealsPerDay,
                    updatedConfig.foodPreference,
                    updatedConfig.timeframe,
                    type === 'before' ? base64Image : updatedConfig.beforePhoto,
                    type === 'after' ? base64Image : updatedConfig.afterPhoto
                );

                // Update the config with the new values
                if (type === 'progress') {
                    newConfig.progressPhotos = updatedConfig.progressPhotos;
                }

                setWeightConfig(newConfig);
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Alert.alert('Error', 'Failed to pick image. Please try again.');
        }
    };

    const deletePhoto = async (type: 'before' | 'progress' | 'after', index?: number) => {
        try {
            let updatedConfig: WeightConfig = { ...weightConfig! };

            switch (type) {
                case 'before':
                    updatedConfig.beforePhoto = undefined;
                    break;
                case 'after':
                    updatedConfig.afterPhoto = undefined;
                    break;
                case 'progress':
                    if (index !== undefined && updatedConfig.progressPhotos) {
                        updatedConfig.progressPhotos = updatedConfig.progressPhotos.filter((_, i) => i !== index);
                    }
                    break;
            }

            const newConfig = await updateWeightConfig(
                updatedConfig.currentWeight,
                updatedConfig.goalWeight,
                updatedConfig.useMetric,
                updatedConfig.exerciseFrequency,
                updatedConfig.mealsPerDay,
                updatedConfig.foodPreference,
                updatedConfig.timeframe,
                type === 'before' ? undefined : updatedConfig.beforePhoto,
                type === 'after' ? undefined : updatedConfig.afterPhoto
            );

            // Update the config with the new values
            if (type === 'progress' && index !== undefined) {
                newConfig.progressPhotos = updatedConfig.progressPhotos;
            }

            setWeightConfig(newConfig);
            
            if (type === 'after') {
                Alert.alert(
                    'Photo Deleted',
                    'Your after photo has been removed. You can upload a new one whenever you\'re ready.',
                    [{ text: 'OK' }]
                );
            }
        } catch (error) {
            console.error('Error deleting photo:', error);
            Alert.alert('Error', 'Failed to delete photo. Please try again.');
        }
    };

    const renderPhotoTab = () => {
        switch (activeTab) {
            case 'before':
                return (
                    <View style={styles.photoContainer}>
                        {weightConfig?.beforePhoto ? (
                            <View style={styles.photoWrapper}>
                                <Image 
                                    source={{ uri: `data:image/jpeg;base64,${weightConfig.beforePhoto}` }}
                                    style={styles.photo}
                                />
                            </View>
                        ) : (
                            <TouchableOpacity 
                                style={styles.uploadButton}
                                onPress={() => pickImage('before')}
                            >
                                <Ionicons name="camera" size={40} color="#666" />
                                <Text style={styles.uploadText}>Upload Before Photo</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                );

            case 'progress':
                return (
                    <View style={styles.photoContainer}>
                        <View style={styles.progressGrid}>
                            {weightConfig?.progressPhotos?.map((photo, index) => (
                                <View key={index} style={styles.progressPhotoWrapper}>
                                    <Image 
                                        source={{ uri: `data:image/jpeg;base64,${photo}` }}
                                        style={styles.progressPhoto}
                                    />
                                    <TouchableOpacity 
                                        style={styles.deleteButton}
                                        onPress={() => deletePhoto('progress', index)}
                                    >
                                        <Ionicons name="trash" size={20} color="white" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                            {(!weightConfig?.progressPhotos || weightConfig.progressPhotos.length < 10) && (
                                <TouchableOpacity 
                                    style={styles.uploadButton}
                                    onPress={() => pickImage('progress')}
                                >
                                    <Ionicons name="add-circle" size={40} color="#666" />
                                    <Text style={styles.uploadText}>Add your progress photos 📸</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                );

          
        
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#FFF8E7', '#FFF5E0']} style={styles.gradient}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Your Bulk Journey 📈</Text>
                </View>
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.photoTabs}>
                        <TouchableOpacity 
                            style={[
                                styles.tab, 
                                activeTab === 'before' && styles.activeTabBefore
                            ]}
                            onPress={() => setActiveTab('before')}
                        >
                            <Text style={[styles.tabText, activeTab === 'before' && styles.activeTabText]}>Before</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[
                                styles.tab, 
                                activeTab === 'progress' && styles.activeTabProgress
                            ]}
                            onPress={() => setActiveTab('progress')}
                        >
                            <Text style={[styles.tabText, activeTab === 'progress' && styles.activeTabText]}>After</Text>
                        </TouchableOpacity>
                
                    </View>

                    {renderPhotoTab()}

                    <View style={[styles.card, { borderLeftWidth: 4, borderLeftColor: '#c4c4c4' }]}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardTitle}>Weight Goals 🎯</Text>
                            <TouchableOpacity 
                                style={[styles.unitToggle, { backgroundColor: useMetric ? '#E3F2FD' : '#FFF3E0' }]} 
                                onPress={toggleUnit}
                            >
                                <Text style={[styles.unitToggleText, { color: useMetric ? '#1976D2' : '#FF9800' }]}>
                                    {useMetric ? 'Metric' : 'Imperial'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={styles.weightInputsContainer}>
                            <View style={styles.weightInputWrapper}>
                                <Text style={styles.weightLabel}>Current Weight</Text>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={[styles.input, { borderColor: '#306eff' }]}
                                        value={currentWeight}
                                        onChangeText={setCurrentWeight}
                                        keyboardType="numeric"
                                        placeholder="Enter your weight"
                                        placeholderTextColor="#999"
                                    />
                                    <Text style={[styles.unit, { color: '#306eff' }]}>{useMetric ? 'kg' : 'st'}</Text>
                                </View>
                                <TouchableOpacity 
                                    style={[styles.button, { backgroundColor: '#306eff' }]} 
                                    onPress={updateWeight}
                                >
                                    <Text style={styles.buttonText}>Update</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.weightInputWrapper}>
                                <Text style={styles.weightLabel}>Goal Weight</Text>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={[styles.input, { borderColor: '#4CAF50' }]}
                                        value={goalWeight}
                                        onChangeText={setGoalWeight}
                                        keyboardType="numeric"
                                        placeholder="Enter your goal weight"
                                        placeholderTextColor="#999"
                                    />
                                    <Text style={[styles.unit, { color: '#4CAF50' }]}>{useMetric ? 'kg' : 'st'}</Text>
                                </View>
                                <TouchableOpacity 
                                    style={[styles.button, { backgroundColor: '#4CAF50' }]} 
                                    onPress={updateGoalWeight}
                                >
                                    <Text style={styles.buttonText}>Update</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* <View style={[styles.card, { borderLeftWidth: 4, borderLeftColor: '#FF9800' }]}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardTitle}>Timeframe</Text>
                        </View>
                        <View style={styles.timeframeContainer}>
                            <Slider
                                style={styles.slider}
                                minimumValue={6}
                                maximumValue={60}
                                step={1}
                                value={timeframe}
                                onValueChange={setTimeframe}
                                minimumTrackTintColor="#FF9800"
                                maximumTrackTintColor="#E0E0E0"
                                thumbTintColor="#FF9800"
                            />
                            <Text style={styles.timeframeText}>
                                {timeframe} {timeframe === 1 ? 'month' : 'months'}
                            </Text>
                        </View>
                        <TouchableOpacity 
                            style={[styles.button, { backgroundColor: '#FF9800' }]} 
                            onPress={updateTimeframe}
                        >
                            <Text style={styles.buttonText}>Update Timeframe</Text>
                        </TouchableOpacity>
                    </View> */}

                    {/* Photo Tabs */}
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
    timeframeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    slider: {
        flex: 1,
        height: 40,
        marginHorizontal: 16,
    },
    timeframeText: {
        fontSize: 16,
        fontWeight: '500',
        marginHorizontal: 16,
    },
    photoTabs: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 4,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 8,
    },
    activeTabBefore: {
        backgroundColor: '#ff9430',
    },
    activeTabProgress: {
        backgroundColor: '#009e2f',
    },
    activeTabAfter: {
        backgroundColor: '#4CAF50',
    },
    tabText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
    },
    activeTabText: {
        color: 'white',
    },
    photoContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    photoWrapper: {
        position: 'relative',
        width: '100%',
        height: 300,
        borderRadius: 8,
        overflow: 'hidden',
    },
    photo: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    progressGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    progressPhotoWrapper: {
        position: 'relative',
        width: '48%',
        height: 150,
        borderRadius: 8,
        overflow: 'hidden',
    },
    progressPhoto: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    uploadButton: {
        width: '100%',
        height: 300,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#ddd',
        borderStyle: 'dashed',
    },
    uploadText: {
        marginTop: 8,
        fontSize: 16,
        color: '#666',
    },
    deleteButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 20,
        padding: 8,
    },
    weightInputsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
    },
    weightInputWrapper: {
        flex: 1,
    },
    weightLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#666',
        marginBottom: 8,
    },
}); 