import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput, Animated, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { WeightConfig, loadWeightConfig } from './config/weightConfig';

interface Meal {
    id: number;
    name: string;
    calories: number;
    ingredients: string[];
    emojis: string[];
    time: string;
    isCompleted?: boolean;
    prepSteps?: string[];
    portions?: {
        size: string;
        calories: number;
    }[];
}

interface UserData {
    currentWeight: number;
    goalWeight: number;
    useMetric: boolean;
    exerciseFrequency: string;
    mealsPerDay: string;
    foodPreference: string;
    completedMeals: { [key: number]: boolean };
    dailyCalories?: number;
}

const allMeals: Meal[] = [
    // Breakfast Meals
    {
        id: 1,
        name: "High-Protein Breakfast Bowl",
        calories: 650,
        ingredients: ["Eggs", "Oatmeal", "Banana", "Peanut Butter", "Honey"],
        emojis: ["🥚", "🥣", "🍌", "🥜", "🍯"],
        time: "Breakfast",
        prepSteps: [
            "Cook 1 cup oatmeal with water",
            "Fry 3 eggs to your preference",
            "Slice 1 banana",
            "Add 2 tbsp peanut butter",
            "Drizzle with honey"
        ],
        portions: [
            { size: "Small", calories: 450 },
            { size: "Medium", calories: 650 },
            { size: "Large", calories: 850 }
        ]
    },
    {
        id: 2,
        name: "Peanut Butter & Banana Toast",
        calories: 550,
        ingredients: ["Whole Grain Bread", "Peanut Butter", "Banana", "Honey", "Chia Seeds"],
        emojis: ["🍞", "🥜", "🍌", "🍯", "🌱"],
        time: "Breakfast",
        prepSteps: [
            "Toast 2 slices of whole grain bread",
            "Spread 2 tbsp peanut butter on toast",
            "Slice 1 banana and arrange on top",
            "Drizzle with honey",
            "Sprinkle chia seeds"
        ],
        portions: [
            { size: "Small", calories: 350 },
            { size: "Medium", calories: 550 },
            { size: "Large", calories: 750 }
        ]
    },
    {
        id: 3,
        name: "Protein Pancakes",
        calories: 600,
        ingredients: ["Protein Powder", "Oats", "Eggs", "Greek Yogurt", "Maple Syrup"],
        emojis: ["🥞", "🌾", "🥚", "🥛", "🍁"],
        time: "Breakfast",
        prepSteps: [
            "Blend 1 cup oats into flour",
            "Mix with 1 scoop protein powder",
            "Add 2 eggs and 1/2 cup Greek yogurt",
            "Cook pancakes on medium heat",
            "Top with maple syrup"
        ],
        portions: [
            { size: "Small", calories: 400 },
            { size: "Medium", calories: 600 },
            { size: "Large", calories: 800 }
        ]
    },
    {
        id: 4,
        name: "Breakfast Burrito",
        calories: 700,
        ingredients: ["Eggs", "Black Beans", "Avocado", "Cheese", "Whole Wheat Tortilla"],
        emojis: ["🌯", "🥚", "🫘", "🥑", "🧀"],
        time: "Breakfast",
        prepSteps: [
            "Scramble 3 eggs",
            "Warm black beans",
            "Slice avocado",
            "Heat tortilla",
            "Assemble and roll burrito"
        ],
        portions: [
            { size: "Small", calories: 500 },
            { size: "Medium", calories: 700 },
            { size: "Large", calories: 900 }
        ]
    },
    {
        id: 5,
        name: "Greek Yogurt Parfait",
        calories: 500,
        ingredients: ["Greek Yogurt", "Granola", "Mixed Berries", "Honey", "Almonds"],
        emojis: ["🥛", "🌾", "🫐", "🍯", "🥜"],
        time: "Breakfast",
        prepSteps: [
            "Layer 1 cup Greek yogurt in a bowl",
            "Add 1/2 cup granola",
            "Top with mixed berries",
            "Drizzle with honey",
            "Sprinkle with chopped almonds"
        ],
        portions: [
            { size: "Small", calories: 350 },
            { size: "Medium", calories: 500 },
            { size: "Large", calories: 650 }
        ]
    },
    {
        id: 6,
        name: "Breakfast Quesadilla",
        calories: 650,
        ingredients: ["Eggs", "Cheese", "Spinach", "Whole Wheat Tortilla", "Salsa"],
        emojis: ["🌯", "🥚", "🧀", "🥬", "🍅"],
        time: "Breakfast",
        prepSteps: [
            "Scramble 2 eggs with spinach",
            "Place tortilla in a pan",
            "Add scrambled eggs and cheese",
            "Fold and cook until golden",
            "Serve with salsa"
        ],
        portions: [
            { size: "Small", calories: 450 },
            { size: "Medium", calories: 650 },
            { size: "Large", calories: 850 }
        ]
    },
    // Lunch Meals
    {
        id: 7,
        name: "Chicken & Rice Bowl",
        calories: 850,
        ingredients: ["Chicken Breast", "Brown Rice", "Avocado", "Sweet Potato", "Olive Oil"],
        emojis: ["🍗", "🍚", "🥑", "🍠", "🫒"],
        time: "Lunch",
        prepSteps: [
            "Cook 1 cup brown rice",
            "Grill chicken breast",
            "Roast sweet potato cubes",
            "Slice avocado",
            "Assemble bowl with olive oil"
        ],
        portions: [
            { size: "Small", calories: 600 },
            { size: "Medium", calories: 850 },
            { size: "Large", calories: 1100 }
        ]
    },
    {
        id: 8,
        name: "Tuna Pasta Bowl",
        calories: 700,
        ingredients: ["Whole Grain Pasta", "Tuna", "Olive Oil", "Cherry Tomatoes", "Parmesan"],
        emojis: ["🍝", "🐟", "🫒", "🍅", "🧀"],
        time: "Lunch",
        prepSteps: [
            "Cook pasta according to package",
            "Drain and mix with olive oil",
            "Add canned tuna",
            "Halve cherry tomatoes",
            "Top with parmesan"
        ],
        portions: [
            { size: "Small", calories: 500 },
            { size: "Medium", calories: 700 },
            { size: "Large", calories: 900 }
        ]
    },
    {
        id: 9,
        name: "Quinoa Buddha Bowl",
        calories: 750,
        ingredients: ["Quinoa", "Chickpeas", "Kale", "Sweet Potato", "Tahini Dressing"],
        emojis: ["🌾", "🫘", "🥬", "🍠", "🥄"],
        time: "Lunch",
        prepSteps: [
            "Cook 1 cup quinoa",
            "Roast chickpeas with spices",
            "Steam kale and sweet potato",
            "Make tahini dressing",
            "Assemble bowl and drizzle with dressing"
        ],
        portions: [
            { size: "Small", calories: 500 },
            { size: "Medium", calories: 750 },
            { size: "Large", calories: 1000 }
        ]
    },
    {
        id: 10,
        name: "Turkey Wrap",
        calories: 650,
        ingredients: ["Turkey Breast", "Whole Wheat Wrap", "Hummus", "Mixed Greens", "Cucumber"],
        emojis: ["🥪", "🦃", "🥫", "🥬", "🥒"],
        time: "Lunch",
        prepSteps: [
            "Warm the wrap slightly",
            "Spread hummus on wrap",
            "Layer turkey slices",
            "Add greens and cucumber",
            "Roll tightly and cut diagonally"
        ],
        portions: [
            { size: "Small", calories: 450 },
            { size: "Medium", calories: 650 },
            { size: "Large", calories: 850 }
        ]
    },
    {
        id: 11,
        name: "Salmon Salad",
        calories: 600,
        ingredients: ["Salmon", "Mixed Greens", "Avocado", "Cherry Tomatoes", "Olive Oil"],
        emojis: ["🐟", "🥬", "🥑", "🍅", "🫒"],
        time: "Lunch",
        prepSteps: [
            "Grill salmon fillet",
            "Wash and dry mixed greens",
            "Slice avocado and tomatoes",
            "Flake salmon over greens",
            "Drizzle with olive oil"
        ],
        portions: [
            { size: "Small", calories: 400 },
            { size: "Medium", calories: 600 },
            { size: "Large", calories: 800 }
        ]
    },
    {
        id: 12,
        name: "Mediterranean Bowl",
        calories: 700,
        ingredients: ["Brown Rice", "Grilled Chicken", "Feta", "Olives", "Cucumber"],
        emojis: ["🍚", "🍗", "🧀", "🫒", "🥒"],
        time: "Lunch",
        prepSteps: [
            "Cook brown rice",
            "Grill chicken breast",
            "Chop cucumber and olives",
            "Crumble feta cheese",
            "Assemble bowl with all ingredients"
        ],
        portions: [
            { size: "Small", calories: 500 },
            { size: "Medium", calories: 700 },
            { size: "Large", calories: 900 }
        ]
    },
    // Dinner Meals
    {
        id: 13,
        name: "Protein Power Bowl",
        calories: 750,
        ingredients: ["Quinoa", "Salmon", "Kale", "Almonds", "Dried Fruit"],
        emojis: ["🌾", "🐟", "🥬", "🥜", "🍇"],
        time: "Dinner",
        prepSteps: [
            "Cook 1 cup quinoa",
            "Bake salmon fillet",
            "Massage kale with olive oil",
            "Toast almonds",
            "Add dried fruit"
        ],
        portions: [
            { size: "Small", calories: 500 },
            { size: "Medium", calories: 750 },
            { size: "Large", calories: 1000 }
        ]
    },
    {
        id: 14,
        name: "Beef & Sweet Potato Bowl",
        calories: 950,
        ingredients: ["Ground Beef", "Sweet Potato", "Spinach", "Cheese", "Sour Cream"],
        emojis: ["🥩", "🍠", "🥬", "🧀", "🥛"],
        time: "Dinner",
        prepSteps: [
            "Brown ground beef",
            "Roast sweet potato cubes",
            "Wilt spinach",
            "Grate cheese",
            "Top with sour cream"
        ],
        portions: [
            { size: "Small", calories: 650 },
            { size: "Medium", calories: 950 },
            { size: "Large", calories: 1250 }
        ]
    },
    {
        id: 15,
        name: "Grilled Chicken Pasta",
        calories: 800,
        ingredients: ["Whole Grain Pasta", "Chicken Breast", "Pesto", "Cherry Tomatoes", "Parmesan"],
        emojis: ["🍝", "🍗", "🌿", "🍅", "🧀"],
        time: "Dinner",
        prepSteps: [
            "Cook pasta according to package",
            "Grill chicken breast",
            "Halve cherry tomatoes",
            "Mix pasta with pesto",
            "Top with chicken, tomatoes, and parmesan"
        ],
        portions: [
            { size: "Small", calories: 600 },
            { size: "Medium", calories: 800 },
            { size: "Large", calories: 1000 }
        ]
    },
    {
        id: 16,
        name: "Shrimp Stir Fry",
        calories: 700,
        ingredients: ["Shrimp", "Brown Rice", "Mixed Vegetables", "Soy Sauce", "Ginger"],
        emojis: ["🦐", "🍚", "🥬", "🥫", "🧄"],
        time: "Dinner",
        prepSteps: [
            "Cook brown rice",
            "Stir-fry shrimp until pink",
            "Add vegetables and stir-fry",
            "Mix in soy sauce and ginger",
            "Serve over rice"
        ],
        portions: [
            { size: "Small", calories: 500 },
            { size: "Medium", calories: 700 },
            { size: "Large", calories: 900 }
        ]
    },
    {
        id: 17,
        name: "Turkey Meatballs",
        calories: 750,
        ingredients: ["Ground Turkey", "Whole Grain Pasta", "Marinara", "Parmesan", "Basil"],
        emojis: ["🦃", "🍝", "🍅", "🧀", "🌿"],
        time: "Dinner",
        prepSteps: [
            "Form turkey into meatballs",
            "Bake meatballs until cooked",
            "Cook pasta according to package",
            "Heat marinara sauce",
            "Combine and top with parmesan and basil"
        ],
        portions: [
            { size: "Small", calories: 550 },
            { size: "Medium", calories: 750 },
            { size: "Large", calories: 950 }
        ]
    },
    {
        id: 18,
        name: "Baked Salmon",
        calories: 650,
        ingredients: ["Salmon", "Brown Rice", "Broccoli", "Lemon", "Olive Oil"],
        emojis: ["🐟", "🍚", "🥦", "🍋", "🫒"],
        time: "Dinner",
        prepSteps: [
            "Season salmon with lemon and oil",
            "Bake salmon until flaky",
            "Cook brown rice",
            "Steam broccoli",
            "Serve salmon over rice with broccoli"
        ],
        portions: [
            { size: "Small", calories: 450 },
            { size: "Medium", calories: 650 },
            { size: "Large", calories: 850 }
        ]
    },
    // Snack Meals
    {
        id: 19,
        name: "Mass Gaining Smoothie",
        calories: 800,
        ingredients: ["Protein Powder", "Banana", "Oats", "Almond Milk", "Chia Seeds"],
        emojis: ["🥛", "🍌", "🌾", "🥛", "🌱"],
        time: "Snack",
        prepSteps: [
            "Blend 1 banana",
            "Add 1 scoop protein powder",
            "Mix in 1/2 cup oats",
            "Pour in almond milk",
            "Stir in chia seeds"
        ],
        portions: [
            { size: "Small", calories: 500 },
            { size: "Medium", calories: 800 },
            { size: "Large", calories: 1100 }
        ]
    },
    {
        id: 20,
        name: "Mass Gaining Shake",
        calories: 900,
        ingredients: ["Whey Protein", "Whole Milk", "Greek Yogurt", "Frozen Berries", "Honey"],
        emojis: ["🥛", "🥛", "🥛", "🫐", "🍯"],
        time: "Snack",
        prepSteps: [
            "Add 2 scoops whey protein",
            "Pour in whole milk",
            "Mix in Greek yogurt",
            "Add frozen berries",
            "Sweeten with honey"
        ],
        portions: [
            { size: "Small", calories: 600 },
            { size: "Medium", calories: 900 },
            { size: "Large", calories: 1200 }
        ]
    },
    {
        id: 21,
        name: "Trail Mix Bowl",
        calories: 600,
        ingredients: ["Mixed Nuts", "Dried Fruit", "Dark Chocolate", "Seeds", "Coconut"],
        emojis: ["🥜", "🍇", "🍫", "🌱", "🥥"],
        time: "Snack",
        prepSteps: [
            "Mix equal parts nuts and dried fruit",
            "Add dark chocolate chunks",
            "Sprinkle with seeds",
            "Add shredded coconut",
            "Portion into serving sizes"
        ],
        portions: [
            { size: "Small", calories: 400 },
            { size: "Medium", calories: 600 },
            { size: "Large", calories: 800 }
        ]
    },
    {
        id: 22,
        name: "Protein Energy Balls",
        calories: 450,
        ingredients: ["Protein Powder", "Oats", "Peanut Butter", "Honey", "Chia Seeds"],
        emojis: ["⚪", "🌾", "🥜", "🍯", "🌱"],
        time: "Snack",
        prepSteps: [
            "Mix protein powder with oats",
            "Add peanut butter and honey",
            "Stir in chia seeds",
            "Form into balls",
            "Refrigerate for 30 minutes"
        ],
        portions: [
            { size: "Small", calories: 300 },
            { size: "Medium", calories: 450 },
            { size: "Large", calories: 600 }
        ]
    },
    {
        id: 23,
        name: "Greek Yogurt Bowl",
        calories: 500,
        ingredients: ["Greek Yogurt", "Granola", "Banana", "Honey", "Almonds"],
        emojis: ["🥛", "🌾", "🍌", "🍯", "🥜"],
        time: "Snack",
        prepSteps: [
            "Scoop Greek yogurt into bowl",
            "Add granola layer",
            "Slice banana on top",
            "Drizzle with honey",
            "Sprinkle with chopped almonds"
        ],
        portions: [
            { size: "Small", calories: 350 },
            { size: "Medium", calories: 500 },
            { size: "Large", calories: 650 }
        ]
    },
    {
        id: 24,
        name: "Protein Ice Cream",
        calories: 550,
        ingredients: ["Protein Powder", "Banana", "Almond Milk", "Cocoa Powder", "Peanut Butter"],
        emojis: ["🍦", "🍌", "🥛", "🍫", "🥜"],
        time: "Snack",
        prepSteps: [
            "Freeze banana slices",
            "Blend with protein powder",
            "Add almond milk and cocoa",
            "Swirl in peanut butter",
            "Freeze until desired consistency"
        ],
        portions: [
            { size: "Small", calories: 350 },
            { size: "Medium", calories: 550 },
            { size: "Large", calories: 750 }
        ]
    }
];

type MealType = 'All' | 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';

export default function Meals() {
    const navigation = useNavigation();
    const route = useRoute();
    const [fadeAnim] = useState(new Animated.Value(1));
    const [userData, setUserData] = useState<UserData>({
        currentWeight: 70,
        goalWeight: 70,
        useMetric: true,
        exerciseFrequency: 'Never',
        mealsPerDay: '3 times',
        foodPreference: 'A mix of all',
        completedMeals: {},
        dailyCalories: 0
    });
    const [weightConfig, setWeightConfig] = useState<WeightConfig | null>(null);
    const [selectedMealType, setSelectedMealType] = useState<MealType>('All');
    const [displayedMeals, setDisplayedMeals] = useState<Meal[]>([]);
    const [expandedMeal, setExpandedMeal] = useState<number | null>(null);

    useEffect(() => {
        loadUserData();
    }, []);

    useEffect(() => {
        const subscription = navigation.addListener('focus', () => {
            loadUserData();
        });

        return subscription;
    }, [navigation]);

    const loadUserData = async () => {
        try {
            // Load weight configuration first
            const config = await loadWeightConfig();
            setWeightConfig(config);

            // Load user data
            const userDataString = await SecureStore.getItemAsync('userData');
            if (userDataString) {
                const userData = JSON.parse(userDataString);
                setUserData(userData);
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    };

    const calculateDailyTarget = (currentWeight: number, goalWeight: number, useMetric: boolean) => {
        // Convert to kg if using imperial units
        const weightInKg = useMetric ? currentWeight : currentWeight * 6.35029318;
        const goalWeightInKg = useMetric ? goalWeight : goalWeight * 6.35029318;

        // Calculate maintenance calories (30 calories per kg of body weight)
        const maintenanceCalories = Math.round(weightInKg * 30);

        // Calculate weight gain calories (maintenance + 500 calories for 0.5kg gain per week)
        const weightGainCalories = maintenanceCalories + 500;

        return weightGainCalories;
    };

    const getRandomMeals = (type: MealType) => {
        let count = 20; // Show 10 meals for each type
        if (type === 'All') {
            count = 40; // Show more meals for 'All' view
        }

        const filteredMeals = type === 'All' 
            ? allMeals 
            : allMeals.filter(meal => meal.time === type);
        
        const shuffled = [...filteredMeals].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    };

    // Update displayed meals when tab changes
    useEffect(() => {
        const meals = getRandomMeals(selectedMealType);
        const mealsWithStatus = meals.map(meal => ({
            ...meal,
            isCompleted: userData.completedMeals?.[meal.id] || false
        }));
        setDisplayedMeals(mealsWithStatus);
    }, [selectedMealType]);

    const toggleMealCompletion = async (mealId: number) => {
        try {
            const updatedCompletedMeals = {
                ...userData.completedMeals,
                [mealId]: !userData.completedMeals?.[mealId]
            };

            // Calculate total calories from completed meals
            const totalCalories = displayedMeals.reduce((total, meal) => {
                return total + (updatedCompletedMeals[meal.id] ? meal.calories : 0);
            }, 0);

            // Update user data
            const updatedUserData = {
                ...userData,
                completedMeals: updatedCompletedMeals,
                dailyCalories: totalCalories
            };

            await SecureStore.setItemAsync('userData', JSON.stringify(updatedUserData));
            setUserData(updatedUserData);

            // Update displayed meals to reflect the new completion status
            setDisplayedMeals(prevMeals => 
                prevMeals.map(meal => ({
                    ...meal,
                    isCompleted: updatedCompletedMeals[meal.id] || false
                }))
            );
        } catch (error) {
            console.error('Error updating meal completion:', error);
        }
    };

    const handleRefresh = async () => {
        await loadUserData();
        const meals = getRandomMeals(selectedMealType);
        const mealsWithStatus = meals.map(meal => ({
            ...meal,
            isCompleted: userData.completedMeals?.[meal.id] || false
        }));
        setDisplayedMeals(mealsWithStatus);
    };

    const mealTypes: MealType[] = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack'];

    const getTabStyle = (type: MealType) => {
        const colors = {
            All: '#666666',
            Breakfast: '#FF9800',
            Lunch: '#4CAF50',
            Dinner: '#2196F3',
            Snack: '#9C27B0'
        };
        return {
            borderColor: colors[type],
            backgroundColor: selectedMealType === type ? `${colors[type]}20` : 'transparent'
        };
    };

    const getTabIcon = (type: MealType) => {
        switch (type) {
            case 'All':
                return 'grid';
            case 'Breakfast':
                return 'sunny';
            case 'Lunch':
                return 'sunny-outline';
            case 'Dinner':
                return 'moon';
            case 'Snack':
                return 'cafe';
            default:
                return 'grid';
        }
    };

    const handleExpandMeal = (mealId: number) => {
        console.log('Expanding meal:', mealId);
        console.log('Meal prep steps:', displayedMeals.find(m => m.id === mealId)?.prepSteps);
        setExpandedMeal(mealId);
    };

    const handleCloseMeal = () => {
        console.log('Closing expanded meal');
        setExpandedMeal(null);
    };

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
                    <View style={styles.headerContent}>
                        <Text style={styles.headerTitle}>Bulk Meals</Text>
                    </View>
                    <TouchableOpacity 
                        style={styles.headerButton}
                        onPress={handleRefresh}
                    >
                        <Ionicons name="refresh" size={24} color="#FF5722" />
                    </TouchableOpacity>
                </View>

                <View style={styles.tabsContainer}>
                    <View style={styles.tabs}>
                        {mealTypes.map((type) => (
                            <TouchableOpacity 
                                key={type}
                                style={[styles.tab, getTabStyle(type)]}
                                onPress={() => setSelectedMealType(type)}
                            >
                                <Ionicons 
                                    name={getTabIcon(type)} 
                                    size={16} 
                                    color={getTabStyle(type).borderColor}
                                    style={styles.tabIcon}
                                />
                                <Text style={[styles.tabText, { color: getTabStyle(type).borderColor }]}>
                                    {type}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {displayedMeals.map((meal: Meal) => (
                        <View key={meal.id} style={styles.mealCard}>
                            {expandedMeal === meal.id ? (
                                <View style={styles.expandedContent}>
                                    <View style={styles.expandedHeader}>
                                        <Text style={styles.prepTitle}>Preparation Steps</Text>
                                        <TouchableOpacity 
                                            onPress={handleCloseMeal}
                                            style={styles.closeButton}
                                        >
                                            <Ionicons name="close" size={20} color="#666" />
                                        </TouchableOpacity>
                                    </View>
                                    {meal.prepSteps && meal.prepSteps.map((step, index) => (
                                        <View key={index} style={styles.prepStep}>
                                            <Text style={styles.stepNumber}>{index + 1}</Text>
                                            <Text style={styles.stepText}>{step}</Text>
                                        </View>
                                    ))}
                                    {meal.portions && (
                                        <View style={styles.portionsContainer}>
                                            <Text style={styles.portionsTitle}>Portion Sizes</Text>
                                            {meal.portions.map((portion, index) => (
                                                <View key={index} style={styles.portionItem}>
                                                    <Text style={styles.portionSize}>{portion.size}</Text>
                                                    <Text style={styles.portionCalories}>{portion.calories} cal</Text>
                                                </View>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            ) : (
                                <View>
                                    <View style={styles.mealHeader}>
                                        <Text style={styles.mealTime}>{meal.time}</Text>
                                        <Text style={styles.mealCalories}>{meal.calories} cal</Text>
                                    </View>
                                    <Text style={styles.mealName}>{meal.name}</Text>
                                    <View style={styles.ingredientsContainer}>
                                        {meal.ingredients.map((ingredient: string, index: number) => (
                                            <View key={index} style={styles.ingredientItem}>
                                                <Text style={styles.ingredientEmoji}>{meal.emojis[index]}</Text>
                                                <Text style={styles.ingredientText}>{ingredient}</Text>
                                            </View>
                                        ))}
                                    </View>
                                    <TouchableOpacity 
                                        style={styles.prepButton}
                                        onPress={() => handleExpandMeal(meal.id)}
                                    >
                                        <Text style={styles.prepButtonText}>Prep Steps</Text>
                                        <Ionicons name="restaurant" size={16} color="#FF5722" />
                                    </TouchableOpacity>
                                </View>
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
    caloriesContainer: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
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
        margin: 16,
    },
    caloriesText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    progressBar: {
        width: '100%',
        height: 6,
        backgroundColor: '#E0E0E0',
        borderRadius: 3,
        marginBottom: 8,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#FF5722',
        borderRadius: 3,
    },
    tabsContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 15,
    },
    tabs: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
    },
    tabIcon: {
        marginRight: 6,
    },
    tabText: {
        fontSize: 14,
        fontWeight: '500',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    mealCard: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        marginBottom: 15,
        elevation: 2,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.05)',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    mealHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    mealTime: {
        fontSize: 14,
        color: '#666',
        backgroundColor: '#FFF8E7',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    mealCalories: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FF5722',
    },
    mealName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 15,
    },
    ingredientsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    ingredientItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF8E7',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
    },
    ingredientEmoji: {
        fontSize: 16,
        marginRight: 5,
    },
    ingredientText: {
        fontSize: 14,
        color: '#666',
    },
    mealHeaderRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#FF5722',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#FF5722',
    },
    expandedContent: {
        padding: 15,
    },
    expandedHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    closeButton: {
        padding: 8,
    },
    prepButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 15,
        padding: 8,
        gap: 6,
    },
    prepButtonText: {
        color: '#FF5722',
        fontSize: 14,
        fontWeight: '600',
    },
    prepTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    prepStep: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    stepNumber: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#FF5722',
        color: 'white',
        textAlign: 'center',
        lineHeight: 24,
        marginRight: 10,
        fontSize: 14,
        fontWeight: '600',
    },
    stepText: {
        flex: 1,
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    portionsContainer: {
        marginTop: 20,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    portionsTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
    },
    portionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 6,
    },
    portionSize: {
        fontSize: 14,
        color: '#666',
    },
    portionCalories: {
        fontSize: 14,
        color: '#FF5722',
        fontWeight: '500',
    },
});
