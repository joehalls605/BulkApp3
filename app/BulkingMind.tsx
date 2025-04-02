import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function BulkingMind() {
    const navigation = useNavigation();

    const principles = [
        {
            title: "Healthy Body Image",
            description: "Focus on strength and health, not just size. Your worth isn't measured by the scale.",
            icon: "heart",
            color: "#FF5722"
        },
        {
            title: "Patience is Key",
            description: "Gaining weight healthily takes time. Celebrate small victories along the way.",
            icon: "time",
            color: "#4CAF50"
        },
        {
            title: "Be Kind to Yourself",
            description: "Progress isn't linear. Don't be too hard on yourself during slower periods.",
            icon: "happy",
            color: "#2196F3"
        },
        {
            title: "Embrace the Journey",
            description: "There will be ups and downs. Each day is a step forward, no matter how small.",
            icon: "trending-up",
            color: "#9C27B0"
        },
        {
            title: "Seek Support",
            description: "If you're struggling, reach out to friends, family, or professionals. You're not alone.",
            icon: "people",
            color: "#FF9800",
            isHighlighted: true
        }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#FFF8E7', '#FFF5E0']} style={styles.gradient}>
                <View style={styles.header}>
                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#666" />
                    </TouchableOpacity>
                    <View style={styles.headerContent}>
                        <Text style={styles.title}>Bulking Mental Health</Text>
                    </View>
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                <Text style={styles.subtitle}>Your mental health is just as important as your physical health. Please keep these steps in mind:</Text>
                    {principles.map((principle, index) => (
                        <View 
                            key={index} 
                            style={[
                                styles.card,
                                principle.isHighlighted && styles.highlightedCard
                            ]}
                        >
                            <View style={[styles.iconContainer, { backgroundColor: `${principle.color}20` }]}>
                                <Ionicons name={principle.icon as any} size={32} color={principle.color} />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={[
                                    styles.cardTitle,
                                    principle.isHighlighted && styles.highlightedTitle
                                ]}>
                                    {principle.title}
                                </Text>
                                <Text style={[
                                    styles.cardDescription,
                                    principle.isHighlighted && styles.highlightedDescription
                                ]}>
                                    {principle.description}
                                </Text>
                            </View>
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
        paddingTop: 20,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    },
    backButton: {
        padding: 8,
        marginRight: 12,
    },
    headerContent: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 24,
        paddingBottom: 40,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: 8,
        marginTop: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    highlightedCard: {
        backgroundColor: '#FFF3E0',
        borderWidth: 2,
        borderColor: '#FF9800',
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 4,
    },
    highlightedTitle: {
        color: '#FF9800',
    },
    cardDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    highlightedDescription: {
        color: '#666',
        fontWeight: '500',
    },
    footer: {
        marginTop: 20,
        padding: 20,
        backgroundColor: '#FFF3E0',
        borderRadius: 16,
    },
    footerText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        fontStyle: 'italic',
    },
}); 