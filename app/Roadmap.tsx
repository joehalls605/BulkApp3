import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type RoadmapScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Roadmap'>;

const roadmapSteps = [
    {
        title: "Build Your Routine",
        icon: "calendar",
        color: "#4CAF50",
        tip: "Start with 1-2 gym sessions per week and 3 main meals. Keep it simple and stickable!",
        duration: "Week 1"
    },
    {
        title: "Eat More",
        icon: "restaurant",
        color: "#FF9800",
        tip: "Add 300-500 extra calories daily. Think protein shakes, peanut butter, and bigger portions.",
        duration: "Week 2"
    },
    {
        title: "Level Up Your Training",
        icon: "barbell",
        color: "#2196F3",
        tip: "Focus on compound lifts (bench, squat, deadlift). Start light, go slow, perfect your form.",
        duration: "Week 3"
    },
    {
        title: "First Gains Check",
        icon: "trophy",
        color: "#9C27B0",
        tip: "Take progress pics and measurements. You should see some changes by now!",
        duration: "Month 1"
    },
    {
        title: "Fine-Tune Your Diet",
        icon: "nutrition",
        color: "#E91E63",
        tip: "Hit your protein goals (1.6-2.2g per kg). Carbs are your friend for energy!",
        duration: "Month 2"
    },
    {
        title: "Recovery Mode",
        icon: "bed",
        color: "#795548",
        tip: "Sleep 7-9 hours, chill out, and let your body grow. Rest is just as important as training!",
        duration: "Month 2-3"
    },
    {
        title: "Mid-Journey Check",
        icon: "analytics",
        color: "#607D8B",
        tip: "Check your progress, adjust calories if needed, and switch up your workouts to keep growing.",
        duration: "Month 3"
    },
    {
        title: "Advanced Moves",
        icon: "fitness",
        color: "#FF5722",
        tip: "Try supersets and drop sets to push your limits. Time to get creative with your training!",
        duration: "Month 4"
    },
    {
        title: "Maintain & Plan",
        icon: "checkmark-circle",
        color: "#4CAF50",
        tip: "Keep your gains while slowly returning to maintenance calories. Ready for your next bulk?",
        duration: "Month 5-6"
    }
];

export default function Roadmap() {
    const navigation = useNavigation<RoadmapScreenNavigationProp>();

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#FFF8E7', '#FFF5E0']} style={styles.gradient}>
                <View style={styles.header}>
                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Your Bulking Roadmap 🗺️</Text>
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {roadmapSteps.map((step, index) => (
                        <View key={index} style={styles.stepContainer}>
                            <View style={styles.stepHeader}>
                                <View style={[styles.iconContainer, { backgroundColor: `${step.color}20` }]}>
                                    <Ionicons name={step.icon as any} size={24} color={step.color} />
                                </View>
                                <View style={styles.stepTitleContainer}>
                                    <Text style={styles.stepTitle}>{step.title}</Text>
                                    <Text style={styles.stepDuration}>{step.duration}</Text>
                                </View>
                            </View>
                            <View style={styles.tipContainer}>
                                <Ionicons name="bulb" size={16} color="#FF9800" style={styles.tipIcon} />
                                <Text style={styles.tipText}>{step.tip}</Text>
                            </View>
                            {index < roadmapSteps.length - 1 && (
                                <View style={styles.connector} />
                            )}
                        </View>
                    ))}
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        paddingTop: Platform.OS === 'ios' ? 60 : 20,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.06)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 3,
    },
    backButton: {
        padding: 8,
        marginRight: 12,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1a1a1a',
        letterSpacing: -0.5,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 24,
        paddingBottom: 40,
    },
    stepContainer: {
        marginBottom: 24,
    },
    stepHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    stepTitleContainer: {
        flex: 1,
    },
    stepTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 4,
    },
    stepDuration: {
        fontSize: 14,
        color: '#666',
        fontStyle: 'italic',
    },
    tipContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        marginLeft: 24,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.08)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    tipIcon: {
        marginRight: 8,
        marginTop: 2,
    },
    tipText: {
        flex: 1,
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    connector: {
        position: 'absolute',
        left: 24,
        top: 48,
        bottom: -24,
        width: 2,
        backgroundColor: '#E0E0E0',
    },
}); 