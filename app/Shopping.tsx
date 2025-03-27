import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface ShoppingItem {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    emoji: string;
}

const allItems: { [key: string]: ShoppingItem[] } = {
    Breakfast: [
        { name: 'Oats', calories: 307, protein: 13, carbs: 55, fats: 5, emoji: '🌾' },
        { name: 'Whole Milk', calories: 146, protein: 8, carbs: 12, fats: 8, emoji: '🥛' },
        { name: 'Eggs', calories: 155, protein: 13, carbs: 1, fats: 11, emoji: '🥚' },
        { name: 'Bananas', calories: 105, protein: 1, carbs: 27, fats: 0, emoji: '🍌' },
        { name: 'Peanut Butter', calories: 188, protein: 8, carbs: 7, fats: 16, emoji: '🥜' },
        { name: 'Greek Yogurt', calories: 133, protein: 10, carbs: 9, fats: 5, emoji: '🥛' },
        { name: 'Granola', calories: 471, protein: 10, carbs: 64, fats: 20, emoji: '🌾' },
        { name: 'Protein Powder', calories: 120, protein: 24, carbs: 3, fats: 1, emoji: '🥛' },
    ],
    Lunch: [
        { name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fats: 3.6, emoji: '🍗' },
        { name: 'Brown Rice', calories: 216, protein: 5, carbs: 45, fats: 1.8, emoji: '🍚' },
        { name: 'Sweet Potato', calories: 103, protein: 2, carbs: 23, fats: 0, emoji: '🍠' },
        { name: 'Avocado', calories: 160, protein: 2, carbs: 8, fats: 15, emoji: '🥑' },
        { name: 'Olive Oil', calories: 119, protein: 0, carbs: 0, fats: 14, emoji: '🫒' },
        { name: 'Tuna', calories: 184, protein: 30, carbs: 0, fats: 6, emoji: '🐟' },
        { name: 'Quinoa', calories: 120, protein: 4, carbs: 22, fats: 2, emoji: '🌾' },
        { name: 'Mixed Vegetables', calories: 50, protein: 2, carbs: 10, fats: 0, emoji: '🥬' },
    ],
    Dinner: [
        { name: 'Salmon', calories: 208, protein: 22, carbs: 0, fats: 13, emoji: '🐟' },
        { name: 'Quinoa', calories: 120, protein: 4, carbs: 22, fats: 2, emoji: '🌾' },
        { name: 'Broccoli', calories: 55, protein: 3.7, carbs: 11, fats: 0.6, emoji: '🥦' },
        { name: 'Almonds', calories: 164, protein: 6, carbs: 6, fats: 14, emoji: '🥜' },
        { name: 'Greek Yogurt', calories: 133, protein: 10, carbs: 9, fats: 5, emoji: '🥛' },
        { name: 'Ground Beef', calories: 332, protein: 20, carbs: 0, fats: 28, emoji: '🥩' },
        { name: 'Pasta', calories: 371, protein: 13, carbs: 74, fats: 1.5, emoji: '🍝' },
        { name: 'Cheese', calories: 402, protein: 23, carbs: 1.3, fats: 33, emoji: '🧀' },
    ],
    Snacks: [
        { name: 'Mixed Nuts', calories: 172, protein: 5, carbs: 8, fats: 15, emoji: '🥜' },
        { name: 'Protein Powder', calories: 120, protein: 24, carbs: 3, fats: 1, emoji: '🥛' },
        { name: 'Dried Fruit', calories: 85, protein: 0.5, carbs: 22, fats: 0.2, emoji: '🍇' },
        { name: 'Dark Chocolate', calories: 170, protein: 2, carbs: 13, fats: 12, emoji: '🍫' },
        { name: 'Granola', calories: 471, protein: 10, carbs: 64, fats: 20, emoji: '🌾' },
        { name: 'Protein Bars', calories: 200, protein: 20, carbs: 25, fats: 8, emoji: '🍫' },
        { name: 'Trail Mix', calories: 150, protein: 4, carbs: 12, fats: 10, emoji: '🥜' },
        { name: 'Greek Yogurt', calories: 133, protein: 10, carbs: 9, fats: 5, emoji: '🥛' },
    ]
};

export default function Shopping() {
    const navigation = useNavigation();
    const [shoppingList, setShoppingList] = useState<{ [key: string]: ShoppingItem[] }>({});

    useEffect(() => {
        generateRandomList();
    }, []);

    const generateRandomList = () => {
        const newList: { [key: string]: ShoppingItem[] } = {};
        
        Object.entries(allItems).forEach(([category, items]) => {
            // Shuffle items and take 5 random ones
            const shuffled = [...items].sort(() => Math.random() - 0.5);
            newList[category] = shuffled.slice(0, 5);
        });
        
        setShoppingList(newList);
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'Breakfast':
                return { name: 'sunny', color: '#FFA000' };
            case 'Lunch':
                return { name: 'sunny-outline', color: '#FF5722' };
            case 'Dinner':
                return { name: 'moon', color: '#1976D2' };
            case 'Snacks':
                return { name: 'nutrition', color: '#4CAF50' };
            default:
                return { name: 'restaurant', color: '#666' };
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#FFF8E7', '#FFF5E0']} style={styles.gradient}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity 
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                        >
                            <Ionicons name="arrow-back" size={24} color="#333" />
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.headerTitle}>Today's Shopping List 🛒</Text>
                            <Text style={styles.headerSubtitle}>High-calorie foods for weight gain</Text>
                        </View>
                    </View>
                    <TouchableOpacity 
                        style={styles.refreshButton}
                        onPress={generateRandomList}
                    >
                        <Ionicons name="refresh" size={24} color="#FF5722" />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    {Object.entries(shoppingList).map(([category, items]) => {
                        const icon = getCategoryIcon(category);
                        return (
                            <View key={category} style={styles.categorySection}>
                                <View style={styles.categoryHeader}>
                                    <Ionicons name={icon.name} size={24} color={icon.color} />
                                    <Text style={styles.categoryTitle}>{category}</Text>
                                </View>
                                {items.map((item, index) => (
                                    <View key={index} style={styles.itemCard}>
                                        <View style={styles.itemHeader}>
                                            <Text style={styles.itemEmoji}>{item.emoji}</Text>
                                            <Text style={styles.itemName}>{item.name}</Text>
                                        </View>
                                        <View style={styles.nutritionContainer}>
                                            <View style={styles.nutritionItem}>
                                                <Text style={styles.nutritionValue}>{item.calories}</Text>
                                                <Text style={styles.nutritionLabel}>cal</Text>
                                            </View>
                                            <View style={styles.nutritionItem}>
                                                <Text style={styles.nutritionValue}>{item.protein}g</Text>
                                                <Text style={styles.nutritionLabel}>protein</Text>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        );
                    })}
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
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    refreshButton: {
        padding: 8,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
    },
    categorySection: {
        marginBottom: 24,
    },
    categoryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginLeft: 8,
    },
    itemCard: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    itemHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    itemEmoji: {
        fontSize: 24,
        marginRight: 12,
    },
    itemName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    nutritionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#F5F5F5',
        padding: 12,
        borderRadius: 8,
    },
    nutritionItem: {
        alignItems: 'center',
    },
    nutritionValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    nutritionLabel: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        padding: 8,
        marginRight: 8,
    },
}); 