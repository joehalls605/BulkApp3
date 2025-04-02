import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

type WorkoutType = 'All' | 'Strength' | 'Beginner';
type EquipmentType = 'All' | 'With Equipment' | 'No Equipment';

interface Workout {
    title: string;
    type: WorkoutType;
    equipment: EquipmentType;
    duration: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    description: string;
    tips: string[];
    restBetweenSets: string;
    exercises: string[];
    targetMuscles: string[];
    emoji: string;
}

export default function Workouts() {
    const [selectedWorkoutType, setSelectedWorkoutType] = useState<WorkoutType>('All');
    const [selectedEquipment, setSelectedEquipment] = useState<EquipmentType>('All');
    const [randomWorkout, setRandomWorkout] = useState<Workout | null>(null);
    const [filteredWorkouts, setFilteredWorkouts] = useState<Workout[]>([]);
    const [showRefreshMessage, setShowRefreshMessage] = useState(false);
    const navigation = useNavigation();

    const workoutTypes: WorkoutType[] = ['All', 'Strength', 'Beginner'];
    const equipmentTypes: EquipmentType[] = ['All', 'With Equipment', 'No Equipment'];

    const getRandomWorkout = () => {
        const randomIndex = Math.floor(Math.random() * filteredWorkouts.length);
        setRandomWorkout(filteredWorkouts[randomIndex]);
    };

    const refreshWorkouts = () => {
        // Create a copy of the filtered workouts array
        const shuffledWorkouts = [...filteredWorkouts];
        
        // Fisher-Yates shuffle algorithm
        for (let i = shuffledWorkouts.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledWorkouts[i], shuffledWorkouts[j]] = [shuffledWorkouts[j], shuffledWorkouts[i]];
        }
        
        // Update the filtered workouts with the shuffled array
        setFilteredWorkouts(shuffledWorkouts);
        
        // Show refresh message
        setShowRefreshMessage(true);
        setTimeout(() => setShowRefreshMessage(false), 3000);
    };

    const getTabStyle = (type: WorkoutType | EquipmentType, isSelected: boolean) => {
        const colors = {
            All: '#666666',
            Strength: '#FF5722',
            Beginner: '#4CAF50',
            'With Equipment': '#9C27B0',
            'No Equipment': '#FF9800'
        };
        return {
            borderColor: colors[type],
            backgroundColor: isSelected ? `${colors[type]}20` : 'transparent'
        };
    };

    const getIconName = (type: WorkoutType | EquipmentType) => {
        switch (type) {
            case 'All':
                return 'grid';
            case 'Strength':
                return 'barbell';
            case 'Beginner':
                return 'school';
            case 'With Equipment':
                return 'barbell';
            case 'No Equipment':
                return 'body';
            default:
                return 'grid';
        }
    };

    const workouts: Workout[] = [
        // Beginner Workouts
        {
            title: 'First Time Full Body',
            type: 'Beginner',
            equipment: 'No Equipment',
            duration: '30 min',
            difficulty: 'Beginner',
            description: 'Perfect for those new to working out, focusing on basic movements and proper form.',
            tips: [
                'Start with lighter weights or bodyweight',
                'Focus on learning proper form',
                'Take breaks when needed'
            ],
            restBetweenSets: '1-2 minutes',
            exercises: [
                '• Wall Push-ups: 3 sets x 8-10 reps',
                '• Assisted Squats: 3 sets x 10 reps',
                '• Standing Knee Raises: 3 sets x 10 reps each leg',
                '• Bird Dogs: 3 sets x 10 reps each side',
                '• Plank Hold: 3 sets x 30 seconds'
            ],
            targetMuscles: ['Full Body', 'Core', 'Legs', 'Chest'],
            emoji: '🌟'
        },
        {
            title: 'Gentle Strength Start',
            type: 'Beginner',
            equipment: 'With Equipment',
            duration: '35 min',
            difficulty: 'Beginner',
            description: 'A gentle introduction to strength training with light weights and proper form.',
            tips: [
                'Use light weights to start',
                'Focus on controlled movements',
                'Don\'t rush through exercises'
            ],
            restBetweenSets: '1-2 minutes',
            exercises: [
                '• Dumbbell Press: 3 sets x 10 reps',
                '• Light Dumbbell Rows: 3 sets x 10 reps',
                '• Assisted Squats: 3 sets x 10 reps',
                '• Light Dumbbell Curls: 3 sets x 10 reps',
                '• Light Dumbbell Extensions: 3 sets x 10 reps'
            ],
            targetMuscles: ['Full Body', 'Arms', 'Legs', 'Back'],
            emoji: '🌱'
        },
        {
            title: 'Core Foundation',
            type: 'Beginner',
            equipment: 'No Equipment',
            duration: '25 min',
            difficulty: 'Beginner',
            description: 'Build a strong core foundation with these basic exercises.',
            tips: [
                'Keep your core engaged throughout',
                'Breathe steadily during exercises',
                'Start with shorter holds and build up'
            ],
            restBetweenSets: '1 minute',
            exercises: [
                '• Plank: 3 sets x 30 seconds',
                '• Dead Bug: 3 sets x 10 reps each side',
                '• Bird Dog: 3 sets x 10 reps each side',
                '• Glute Bridge: 3 sets x 12 reps',
                '• Side Plank: 2 sets x 20 seconds each side'
            ],
            targetMuscles: ['Core', 'Abs', 'Lower Back'],
            emoji: '💫'
        },
        // Strength Workouts
        {
            title: 'Upper Body Strength',
            type: 'Strength',
            equipment: 'With Equipment',
            duration: '45-60 min',
            difficulty: 'Intermediate',
            description: 'A balanced upper body workout focusing on building strength in your chest, back, shoulders, and arms.',
            tips: [
                'Start with lighter weights to perfect your form',
                'Keep your back straight during all exercises',
                'Rest 2-3 minutes between sets'
            ],
            restBetweenSets: '2-3 minutes',
            exercises: [
                '• Bench Press: 4 sets x 6-8 reps',
                '• Barbell Rows: 4 sets x 8-10 reps',
                '• Overhead Press: 3 sets x 8-10 reps',
                '• Pull-ups: 3 sets x max reps',
                '• Tricep Extensions: 3 sets x 12-15 reps'
            ],
            targetMuscles: ['Chest', 'Back', 'Shoulders', 'Arms'],
            emoji: '🏋️'
        },
        {
            title: 'Lower Body Power',
            type: 'Strength',
            equipment: 'With Equipment',
            duration: '60-75 min',
            difficulty: 'Intermediate',
            description: 'A comprehensive lower body workout focusing on building strength and muscle in your legs.',
            tips: [
                'Warm up thoroughly before heavy lifts',
                'Keep your back straight during squats',
                'Rest 2-3 minutes between sets'
            ],
            restBetweenSets: '2-3 minutes',
            exercises: [
                '• Barbell Squats: 4 sets x 6-8 reps',
                '• Romanian Deadlifts: 4 sets x 8-10 reps',
                '• Leg Press: 3 sets x 10-12 reps',
                '• Calf Raises: 4 sets x 15-20 reps',
                '• Leg Extensions: 3 sets x 12-15 reps'
            ],
            targetMuscles: ['Legs', 'Glutes', 'Calves'],
            emoji: '🦵'
        },
        {
            title: 'Full Body Strength',
            type: 'Strength',
            equipment: 'With Equipment',
            duration: '75-90 min',
            difficulty: 'Advanced',
            description: 'A comprehensive full-body workout focusing on compound movements for maximum muscle growth.',
            tips: [
                'Start with compound movements',
                'Use proper form and control',
                'Rest 2-3 minutes between sets'
            ],
            restBetweenSets: '2-3 minutes',
            exercises: [
                '• Deadlifts: 4 sets x 6-8 reps',
                '• Barbell Squats: 4 sets x 8-10 reps',
                '• Bench Press: 4 sets x 8-10 reps',
                '• Pull-ups: 3 sets x max reps',
                '• Overhead Press: 3 sets x 8-10 reps'
            ],
            targetMuscles: ['Full Body', 'Back', 'Legs', 'Chest', 'Shoulders'],
            emoji: '💪'
        },
        {
            title: 'Push Day',
            type: 'Strength',
            equipment: 'With Equipment',
            duration: '60 min',
            difficulty: 'Intermediate',
            description: 'Focus on pushing movements for chest, shoulders, and triceps.',
            tips: [
                'Warm up your shoulders thoroughly',
                'Keep your core tight during presses',
                'Control the weight on the way down'
            ],
            restBetweenSets: '2-3 minutes',
            exercises: [
                '• Bench Press: 4 sets x 8-10 reps',
                '• Overhead Press: 4 sets x 8-10 reps',
                '• Incline Dumbbell Press: 3 sets x 10-12 reps',
                '• Lateral Raises: 3 sets x 12-15 reps',
                '• Tricep Pushdowns: 3 sets x 12-15 reps'
            ],
            targetMuscles: ['Chest', 'Shoulders', 'Triceps'],
            emoji: '💪'
        },
        {
            title: 'Pull Day',
            type: 'Strength',
            equipment: 'With Equipment',
            duration: '60 min',
            difficulty: 'Intermediate',
            description: 'Focus on pulling movements for back and biceps.',
            tips: [
                'Keep your back straight during rows',
                'Squeeze your shoulder blades together',
                'Control the weight throughout the movement'
            ],
            restBetweenSets: '2-3 minutes',
            exercises: [
                '• Barbell Rows: 4 sets x 8-10 reps',
                '• Pull-ups: 4 sets x max reps',
                '• Face Pulls: 3 sets x 12-15 reps',
                '• Bicep Curls: 3 sets x 12-15 reps',
                '• Hammer Curls: 3 sets x 12-15 reps'
            ],
            targetMuscles: ['Back', 'Biceps', 'Rear Delts'],
            emoji: '💪'
        },
        {
            title: 'Leg Day',
            type: 'Strength',
            equipment: 'With Equipment',
            duration: '60 min',
            difficulty: 'Intermediate',
            description: 'Focus on building strong legs with compound movements.',
            tips: [
                'Warm up thoroughly before heavy lifts',
                'Keep your core tight during squats',
                'Focus on proper form over weight'
            ],
            restBetweenSets: '2-3 minutes',
            exercises: [
                '• Barbell Squats: 4 sets x 8-10 reps',
                '• Romanian Deadlifts: 4 sets x 8-10 reps',
                '• Bulgarian Split Squats: 3 sets x 10 reps each leg',
                '• Calf Raises: 4 sets x 15-20 reps',
                '• Leg Curls: 3 sets x 12-15 reps'
            ],
            targetMuscles: ['Legs', 'Glutes', 'Calves'],
            emoji: '��'
        }
    ];

    useEffect(() => {
        const filtered = workouts.filter(workout => {
            const matchesType = selectedWorkoutType === 'All' || workout.type === selectedWorkoutType;
            const matchesEquipment = selectedEquipment === 'All' || workout.equipment === selectedEquipment;
            return matchesType && matchesEquipment;
        });
        setFilteredWorkouts(filtered);
    }, [selectedWorkoutType, selectedEquipment]);

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#FFF8E7', '#FFF5E0']} style={styles.gradient}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="chevron-back" size={24} color="#666" />
                        <Text style={styles.backButtonText}>Back</Text>
                    </TouchableOpacity>
                    <View style={styles.headerContent}>
                        <Text style={styles.headerTitle}>Workouts</Text>
                    </View>
                    <TouchableOpacity 
                        style={styles.headerButton}
                        onPress={refreshWorkouts}
                    >
                        <Ionicons name="refresh" size={24} color="#FF5722" />
                    </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {/* Workout Type Tabs */}
                    <View style={styles.tabsContainer}>
                        <Text style={styles.tabsLabel}>Workout Type</Text>
                        <View style={styles.tabs}>
                            {workoutTypes.map((type) => (
                                <TouchableOpacity 
                                    key={type}
                                    style={[styles.tab, getTabStyle(type, selectedWorkoutType === type)]}
                                    onPress={() => setSelectedWorkoutType(type)}
                                >
                                    <Ionicons 
                                        name={getIconName(type)}
                                        size={20} 
                                        color={getTabStyle(type, selectedWorkoutType === type).borderColor} 
                                    />
                                    <Text style={[styles.tabText, { color: getTabStyle(type, selectedWorkoutType === type).borderColor }]}>
                                        {type}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                            <TouchableOpacity 
                                style={[styles.tab, styles.randomTab]}
                                onPress={getRandomWorkout}
                            >
                                <Ionicons name="shuffle" size={20} color="#FF5722" />
                                <Text style={[styles.tabText, { color: '#FF5722' }]}>Random</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Random Workout Display */}
                    {randomWorkout && (
                        <View style={styles.randomWorkoutCard}>
                            <Text style={styles.randomWorkoutTitle}>Try This Workout!</Text>
                            <View style={styles.workoutHeader}>
                                <Text style={styles.workoutEmoji}>{randomWorkout.emoji}</Text>
                                <Text style={styles.workoutTitle}>{randomWorkout.title}</Text>
                            </View>
                            <Text style={styles.workoutDescription}>{randomWorkout.description}</Text>
                            <View style={styles.targetMusclesContainer}>
                                {randomWorkout.targetMuscles.map((muscle, muscleIndex) => (
                                    <View key={muscleIndex} style={styles.targetMuscleTag}>
                                        <Text style={styles.targetMuscleText}>{muscle}</Text>
                                    </View>
                                ))}
                            </View>
                            <View style={styles.exercisesContainer}>
                                <Text style={styles.exercisesTitle}>Exercises:</Text>
                                {randomWorkout.exercises.map((exercise, exerciseIndex) => (
                                    <Text key={exerciseIndex} style={styles.exerciseItem}>{exercise}</Text>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* Equipment Type Tabs */}
                    <View style={styles.tabsContainer}>
                        <Text style={styles.tabsLabel}>Equipment</Text>
                        <View style={styles.tabs}>
                            {equipmentTypes.map((type) => (
                                <TouchableOpacity 
                                    key={type}
                                    style={[styles.tab, getTabStyle(type, selectedEquipment === type)]}
                                    onPress={() => setSelectedEquipment(type)}
                                >
                                    <Ionicons 
                                        name={getIconName(type)}
                                        size={20} 
                                        color={getTabStyle(type, selectedEquipment === type).borderColor} 
                                    />
                                    <Text style={[styles.tabText, { color: getTabStyle(type, selectedEquipment === type).borderColor }]}>
                                        {type}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Workout Cards */}
                    {filteredWorkouts.map((workout, index) => (
                        <View key={index} style={styles.workoutCard}>
                            <View style={styles.workoutHeader}>
                                <View style={styles.workoutTitleContainer}>
                                    <Text style={styles.workoutEmoji}>{workout.emoji}</Text>
                                    <Text style={styles.workoutTitle}>{workout.title}</Text>
                                </View>
                                <View style={styles.workoutMeta}>
                                    <Text style={styles.workoutDuration}>{workout.duration}</Text>
                                    <Text style={styles.workoutDifficulty}>{workout.difficulty}</Text>
                                </View>
                            </View>

                            <Text style={styles.workoutDescription}>{workout.description}</Text>

                            <View style={styles.targetMusclesContainer}>
                                {workout.targetMuscles.map((muscle, muscleIndex) => (
                                    <View key={muscleIndex} style={styles.targetMuscleTag}>
                                        <Text style={styles.targetMuscleText}>{muscle}</Text>
                                    </View>
                                ))}
                            </View>

                            <View style={styles.tipsContainer}>
                                <Text style={styles.tipsTitle}>Important Tips:</Text>
                                {workout.tips.map((tip, tipIndex) => (
                                    <Text key={tipIndex} style={styles.tipItem}>{tip}</Text>
                                ))}
                            </View>

                            <View style={styles.restInfo}>
                                <Text style={styles.restText}>Rest between sets: {workout.restBetweenSets}</Text>
                            </View>

                            <View style={styles.exercisesContainer}>
                                <Text style={styles.exercisesTitle}>Exercises:</Text>
                                {workout.exercises.map((exercise, exerciseIndex) => (
                                    <Text key={exerciseIndex} style={styles.exerciseItem}>{exercise}</Text>
                                ))}
                            </View>
                        </View>
                    ))}

                    {/* Refresh Section */}
                    <View style={styles.refreshSection}>
                        <TouchableOpacity 
                            style={styles.refreshButton}
                            onPress={refreshWorkouts}
                        >
                            <Ionicons name="refresh" size={24} color="#4CAF50" />
                            <Text style={styles.refreshButtonText}>Refresh Workouts</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        paddingTop: Platform.OS === 'ios' ? 48 : 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        position: 'relative',
    },
    headerContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 48,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
        textAlign: 'center',
    },
    headerButton: {
        padding: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    backButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#666',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    tabsContainer: {
        marginBottom: 20,
    },
    tabsLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
    },
    tabs: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    tab: {
        padding: 12,
        borderRadius: 20,
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: 8,
        marginBottom: 8,
        borderWidth: 2,
    },
    tabText: {
        marginLeft: 8,
        fontWeight: '600',
    },
    randomTab: {
        borderColor: '#FF5722',
        backgroundColor: '#FF572220',
    },
    randomWorkoutCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        elevation: 3,
    },
    randomWorkoutTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FF5722',
        marginBottom: 10,
    },
    workoutCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    workoutHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    workoutTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    workoutEmoji: {
        fontSize: 24,
        marginRight: 10,
    },
    workoutTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        flex: 1,
    },
    workoutMeta: {
        alignItems: 'flex-end',
    },
    workoutDuration: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    workoutDifficulty: {
        fontSize: 14,
        color: '#4CAF50',
        fontWeight: '500',
    },
    targetMusclesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 15,
    },
    targetMuscleTag: {
        backgroundColor: '#E3F2FD',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginRight: 8,
        marginBottom: 8,
    },
    targetMuscleText: {
        fontSize: 12,
        color: '#1976D2',
        fontWeight: '500',
    },
    exercisesContainer: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        padding: 15,
        borderRadius: 8,
    },
    workoutDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 15,
        lineHeight: 20,
    },
    tipsContainer: {
        backgroundColor: '#F5F5F5',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    tipsTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
    },
    tipItem: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        lineHeight: 20,
    },
    restInfo: {
        backgroundColor: '#E8F5E9',
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#C8E6C9',
    },
    restText: {
        fontSize: 14,
        color: '#2E7D32',
        fontWeight: '500',
    },
    exercisesTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
    },
    exerciseItem: {
        fontSize: 14,
        color: '#333',
        marginBottom: 12,
        lineHeight: 20,
    },
    refreshSection: {
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: 10,
    },
    refreshButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#4CAF50',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    refreshButtonText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#4CAF50',
        fontWeight: '600',
    },
    refreshMessage: {
        marginTop: 10,
        fontSize: 14,
        color: '#666',
        fontStyle: 'italic',
        textAlign: 'center',
    },
});