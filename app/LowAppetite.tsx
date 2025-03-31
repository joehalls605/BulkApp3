import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface Smoothie {
    id: number;
    name: string;
    calories: number;
    ingredients: string[];
    emojis: string[];
    prepTime: string;
}

interface HighCalorieMeal {
    id: number;
    name: string;
    calories: number;
    description: string;
    emojis: string[];
}

const smoothies: Smoothie[] = [
    {
        id: 1,
        name: "Peanut Butter Banana Protein Shake",
        calories: 600,
        ingredients: ["Banana", "Peanut Butter", "Protein Powder", "Milk", "Honey", "Ice"],
        emojis: ["🍌", "🥜", "💪", "🥛", "🍯", "🧊"],
        prepTime: "5 mins"
    },
    {
        id: 2,
        name: "Berry Blast Weight Gain Smoothie",
        calories: 550,
        ingredients: ["Mixed Berries", "Greek Yogurt", "Oats", "Honey", "Chia Seeds", "Milk"],
        emojis: ["🫐", "🥛", "🌾", "🍯", "🌱", "🥛"],
        prepTime: "5 mins"
    },
    {
        id: 3,
        name: "Chocolate Avocado Shake",
        calories: 650,
        ingredients: ["Avocado", "Cocoa Powder", "Banana", "Milk", "Honey", "Ice"],
        emojis: ["🥑", "🍫", "🍌", "🥛", "🍯", "🧊"],
        prepTime: "5 mins"
    }
];

const highCalorieMeals: HighCalorieMeal[] = [
    {
        id: 1,
        name: "Nut Butter Energy Bites",
        calories: 200,
        description: "Mix peanut butter, oats, honey, and dark chocolate chips. Roll into small balls.",
        emojis: ["🥜", "🌾", "🍯", "🍫"]
    },
    {
        id: 2,
        name: "Avocado Toast with Eggs",
        calories: 350,
        description: "Mash avocado on toast, top with eggs and olive oil drizzle.",
        emojis: ["🥑", "🍞", "🥚", "🫒"]
    },
    {
        id: 3,
        name: "Cheese and Crackers Plate",
        calories: 300,
        description: "Assorted cheese, whole grain crackers, and dried fruit.",
        emojis: ["🧀", "🥖", "🍇", "🥜"]
    }
];

const appetiteTips = [
    {
        title: "Small, Frequent Meals",
        description: "Eat 5-6 smaller meals throughout the day instead of 3 large ones",
        emoji: "⏰"
    },
    {
        title: "Flavor Enhancement",
        description: "Use herbs, spices, and sauces to make food more appealing",
        emoji: "🌿"
    },
    {
        title: "Gentle Exercise",
        description: "Light walking before meals can help stimulate appetite",
        emoji: "🚶"
    },
    {
        title: "Meal Timing",
        description: "Try to eat at the same times each day to establish a routine",
        emoji: "📅"
    }
];

const calorieBoosters = [
    {
        title: "Add Healthy Fats",
        description: "Drizzle olive oil, add avocado, or include nuts in meals",
        emoji: "🫒"
    },
    {
        title: "Protein Powder",
        description: "Add to smoothies, oatmeal, or yogurt for extra protein",
        emoji: "💪"
    },
    {
        title: "Dairy Alternatives",
        description: "Use full-fat milk or plant-based alternatives with added calories",
        emoji: "🥛"
    }
];

export default function LowAppetite() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#FFF8E7', '#FFF5E0']} style={styles.gradient}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="chevron-back" size={24} color="#666" />
                        <Text style={styles.backButtonText}>Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Small Appetite Meals</Text>
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    <View style={[styles.section, { backgroundColor: '#E3F2FD' }]}>
                        <View style={styles.sectionHeader}>
                            <View style={[styles.iconContainer, { backgroundColor: '#2196F3' }]}>
                                <Ionicons name="water" size={24} color="white" />
                            </View>
                            <Text style={styles.sectionTitle}>High-Calorie Shakes</Text>
                        </View>
                        {smoothies.map((smoothie) => (
                            <View key={smoothie.id} style={[styles.card, { backgroundColor: 'white' }]}>
                                <Text style={styles.cardTitle}>{smoothie.name}</Text>
                                <View style={styles.cardInfo}>
                                    <View style={styles.infoItem}>
                                        <Ionicons name="flame-outline" size={16} color="#FF5722" />
                                        <Text style={styles.infoText}>{smoothie.calories} cal</Text>
                                    </View>
                                    <View style={styles.infoItem}>
                                        <Ionicons name="time-outline" size={16} color="#666" />
                                        <Text style={styles.infoText}>{smoothie.prepTime}</Text>
                                    </View>
                                </View>
                                <View style={styles.ingredientsContainer}>
                                    {smoothie.ingredients.map((ingredient, index) => (
                                        <View key={index} style={[styles.ingredientItem, { backgroundColor: '#E3F2FD' }]}>
                                            <Text style={styles.ingredientEmoji}>{smoothie.emojis[index]}</Text>
                                            <Text style={styles.ingredientText}>{ingredient}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        ))}
                    </View>

                    <View style={[styles.section, { backgroundColor: '#E8F5E9' }]}>
                        <View style={styles.sectionHeader}>
                            <View style={[styles.iconContainer, { backgroundColor: '#4CAF50' }]}>
                                <Ionicons name="restaurant" size={24} color="white" />
                            </View>
                            <Text style={styles.sectionTitle}>Easy High-Calorie Meals</Text>
                        </View>
                        {highCalorieMeals.map((meal) => (
                            <View key={meal.id} style={[styles.card, { backgroundColor: 'white' }]}>
                                <Text style={styles.cardTitle}>{meal.name}</Text>
                                <View style={styles.cardInfo}>
                                    <View style={styles.infoItem}>
                                        <Ionicons name="flame-outline" size={16} color="#FF5722" />
                                        <Text style={styles.infoText}>{meal.calories} cal</Text>
                                    </View>
                                </View>
                                <Text style={styles.description}>{meal.description}</Text>
                                <View style={styles.ingredientsContainer}>
                                    {meal.emojis.map((emoji, index) => (
                                        <Text key={index} style={styles.ingredientEmoji}>{emoji}</Text>
                                    ))}
                                </View>
                            </View>
                        ))}
                    </View>

                    <View style={[styles.section, { backgroundColor: '#FFF3E0' }]}>
                        <View style={styles.sectionHeader}>
                            <View style={[styles.iconContainer, { backgroundColor: '#FF9800' }]}>
                                <Ionicons name="bulb" size={24} color="white" />
                            </View>
                            <Text style={styles.sectionTitle}>Appetite-Stimulating Tips</Text>
                        </View>
                        {appetiteTips.map((tip, index) => (
                            <View key={index} style={[styles.tipCard, { backgroundColor: 'white' }]}>
                                <Text style={styles.tipEmoji}>{tip.emoji}</Text>
                                <View style={styles.tipContent}>
                                    <Text style={styles.tipTitle}>{tip.title}</Text>
                                    <Text style={styles.tipDescription}>{tip.description}</Text>
                                </View>
                            </View>
                        ))}
                    </View>

                    <View style={[styles.section, { backgroundColor: '#F3E5F5' }]}>
                        <View style={styles.sectionHeader}>
                            <View style={[styles.iconContainer, { backgroundColor: '#9C27B0' }]}>
                                <Ionicons name="add-circle" size={24} color="white" />
                            </View>
                            <Text style={styles.sectionTitle}>Calorie Boosters</Text>
                        </View>
                        {calorieBoosters.map((booster, index) => (
                            <View key={index} style={[styles.tipCard, { backgroundColor: 'white' }]}>
                                <Text style={styles.tipEmoji}>{booster.emoji}</Text>
                                <View style={styles.tipContent}>
                                    <Text style={styles.tipTitle}>{booster.title}</Text>
                                    <Text style={styles.tipDescription}>{booster.description}</Text>
                                </View>
                            </View>
                        ))}
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    backButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#666',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginLeft: 16,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    section: {
        marginBottom: 30,
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 12,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
    },
    card: {
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 2,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    cardInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 8,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    infoText: {
        fontSize: 14,
        color: '#666',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        lineHeight: 20,
    },
    ingredientsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    ingredientItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF8E7',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    ingredientEmoji: {
        fontSize: 16,
        marginRight: 4,
    },
    ingredientText: {
        fontSize: 14,
        color: '#666',
    },
    tipCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 2,
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
    tipEmoji: {
        fontSize: 24,
        marginRight: 12,
    },
    tipContent: {
        flex: 1,
    },
    tipTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    tipDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
}); 