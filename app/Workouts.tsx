import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type WorkoutType = 'All' | 'Strength' | 'Quick' | 'Beginner';
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

    const workoutTypes: WorkoutType[] = ['All', 'Strength', 'Quick', 'Beginner'];
    const equipmentTypes: EquipmentType[] = ['All', 'With Equipment', 'No Equipment'];

    const getRandomWorkout = () => {
        const randomIndex = Math.floor(Math.random() * filteredWorkouts.length);
        setRandomWorkout(filteredWorkouts[randomIndex]);
    };

    const getTabStyle = (type: WorkoutType | EquipmentType, isSelected: boolean) => {
        const colors = {
            All: '#666666',
            Strength: '#FF5722',
            Quick: '#FF9800',
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
            case 'Quick':
                return 'flash';
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
        // Quick Workouts
        {
            title: '15-Min Full Body Blast',
            type: 'Quick',
            equipment: 'No Equipment',
            duration: '15 min',
            difficulty: 'Intermediate',
            description: 'A high-intensity full body workout perfect for when you\'re short on time.',
            tips: [
                'Keep movements explosive but controlled',
                'Minimize rest between exercises',
                'Focus on form over speed'
            ],
            restBetweenSets: '30 seconds',
            exercises: [
                '• Burpees: 3 sets x 10 reps',
                '• Mountain Climbers: 3 sets x 30 seconds',
                '• Jump Squats: 3 sets x 15 reps',
                '• Push-ups: 3 sets x max reps',
                '• Plank to Downward Dog: 3 sets x 10 reps'
            ],
            targetMuscles: ['Full Body', 'Core', 'Legs', 'Chest'],
            emoji: '⚡'
        },
        {
            title: 'Express Upper Body Power',
            type: 'Quick',
            equipment: 'With Equipment',
            duration: '20 min',
            difficulty: 'Intermediate',
            description: 'A quick but effective upper body workout focusing on compound movements.',
            tips: [
                'Use moderate weights',
                'Keep rest periods short',
                'Focus on explosive movements'
            ],
            restBetweenSets: '45 seconds',
            exercises: [
                '• Dumbbell Press: 3 sets x 12 reps',
                '• Pull-ups: 3 sets x max reps',
                '• Push-ups: 3 sets x max reps',
                '• Dumbbell Rows: 3 sets x 12 reps',
                '• Tricep Dips: 3 sets x 15 reps'
            ],
            targetMuscles: ['Chest', 'Back', 'Shoulders', 'Arms'],
            emoji: '💪'
        },
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
        // Existing Strength Workouts
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
});