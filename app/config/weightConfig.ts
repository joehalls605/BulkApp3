import * as SecureStore from 'expo-secure-store';

export interface WeightConfig {
    currentWeight: number;
    goalWeight: number;
    useMetric: boolean;
    dailyTarget: number;
    maintenanceCalories: number;
    exerciseFrequency: string;
    mealsPerDay: string;
    foodPreference: string;
    timeframe: number;
    beforePhoto?: string; // Base64 encoded photo
}

const DEFAULT_CONFIG: WeightConfig = {
    currentWeight: 70,
    goalWeight: 75,
    useMetric: true,
    dailyTarget: 0,
    maintenanceCalories: 0,
    exerciseFrequency: 'Never',
    mealsPerDay: '3 times',
    foodPreference: 'A mix of all',
    timeframe: 12
};

export const calculateCalories = (
    currentWeight: number, 
    goalWeight: number, 
    useMetric: boolean,
    exerciseFrequency: string,
    timeframe: number,
    mealsPerDay: string = '3 times',
    foodPreference: string = 'A mix of all'
) => {
    // Convert to kg if using imperial units
    const weightInKg = useMetric ? currentWeight : currentWeight * 6.35029318;
    const goalWeightInKg = useMetric ? goalWeight : goalWeight * 6.35029318;

    // Calculate BMR using Mifflin-St Jeor Equation
    // Using average values for height (170cm) and age (25) since not provided
    const heightInCm = 170;
    const age = 25;
    const bmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * age) + 5;

    // Activity multipliers based on exercise frequency
    const activityMultipliers = {
        'Never': 1.2,
        'A few times a week': 1.3,
        'Once a day': 1.4,
        'More than once a day': 1.5
    };

    // Meal frequency multiplier
    const mealMultipliers = {
        '1-2 times': 0.95,
        '3 times': 1.0,
        '4-5 times': 1.05,
        '6+ times': 1.1
    };

    // Food preference multiplier
    const foodMultipliers = {
        'Protein-rich foods': 1.05,
        'Carbohydrates': 1.0,
        'Healthy fats': 1.1,
        'A mix of all': 1.0
    };

    // Calculate maintenance calories using all multipliers
    const maintenanceCalories = Math.round(
        bmr * 
        activityMultipliers[exerciseFrequency as keyof typeof activityMultipliers] *
        mealMultipliers[mealsPerDay as keyof typeof mealMultipliers] *
        foodMultipliers[foodPreference as keyof typeof foodMultipliers]
    );

    // Ensure values are within reasonable ranges
    const minMaintenance = 1500; // Minimum maintenance calories
    const maxMaintenance = 2800; // Maximum maintenance calories
    const finalMaintenance = Math.min(Math.max(maintenanceCalories, minMaintenance), maxMaintenance);

    return {
        maintenanceCalories: finalMaintenance,
        dailyTarget: finalMaintenance
    };
};

export const loadWeightConfig = async (): Promise<WeightConfig> => {
    try {
        const configData = await SecureStore.getItemAsync('weightConfig');
        if (configData) {
            return JSON.parse(configData);
        }
        return DEFAULT_CONFIG;
    } catch (error) {
        console.error('Error loading weight config:', error);
        return DEFAULT_CONFIG;
    }
};

export const updateWeightConfig = async (
    currentWeight?: number,
    goalWeight?: number,
    useMetric?: boolean,
    exerciseFrequency?: string,
    mealsPerDay?: string,
    foodPreference?: string,
    timeframe?: number,
    beforePhoto?: string
): Promise<WeightConfig> => {
    try {
        // First get the current config
        const currentConfig = await loadWeightConfig();

        // Update the config with new values
        const updatedConfig: WeightConfig = {
            currentWeight: currentWeight ?? currentConfig.currentWeight,
            goalWeight: goalWeight ?? currentConfig.goalWeight,
            useMetric: useMetric ?? currentConfig.useMetric,
            exerciseFrequency: exerciseFrequency ?? currentConfig.exerciseFrequency,
            mealsPerDay: mealsPerDay ?? currentConfig.mealsPerDay,
            foodPreference: foodPreference ?? currentConfig.foodPreference,
            timeframe: timeframe ?? currentConfig.timeframe,
            beforePhoto: beforePhoto ?? currentConfig.beforePhoto,
            dailyTarget: 0,
            maintenanceCalories: 0
        };

        // Calculate new calories based on updated values
        const calories = calculateCalories(
            updatedConfig.currentWeight,
            updatedConfig.goalWeight,
            updatedConfig.useMetric,
            updatedConfig.exerciseFrequency,
            updatedConfig.timeframe,
            updatedConfig.mealsPerDay,
            updatedConfig.foodPreference
        );

        // Update the config with calculated calories
        updatedConfig.maintenanceCalories = calories.maintenanceCalories;
        updatedConfig.dailyTarget = calories.dailyTarget;

        // Store the updated config
        await SecureStore.setItemAsync('weightConfig', JSON.stringify(updatedConfig));

        // Update userData with the new values
        const userDataString = await SecureStore.getItemAsync('userData');
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            const updatedUserData = {
                ...userData,
                currentWeight: updatedConfig.currentWeight,
                goalWeight: updatedConfig.goalWeight,
                useMetric: updatedConfig.useMetric,
                exerciseFrequency: updatedConfig.exerciseFrequency,
                mealsPerDay: updatedConfig.mealsPerDay,
                foodPreference: updatedConfig.foodPreference,
                timeframe: updatedConfig.timeframe,
                beforePhoto: updatedConfig.beforePhoto,
                dailyCalories: calories.dailyTarget,
                maintenanceCalories: calories.maintenanceCalories,
                completedMeals: {}
            };
            await SecureStore.setItemAsync('userData', JSON.stringify(updatedUserData));
        }

        return updatedConfig;
    } catch (error) {
        console.error('Error updating weight config:', error);
        return DEFAULT_CONFIG;
    }
};

export const formatWeight = (weight: number, useMetric: boolean): string => {
    if (useMetric) return `${weight.toFixed(1)} kg`;
    // Convert kg to stone and pounds
    const totalPounds = weight * 2.20462;
    const stone = Math.floor(totalPounds / 14);
    const pounds = Math.round(totalPounds % 14);
    return `${stone}st ${pounds}lbs`;
};

export const convertWeight = (weight: number, fromMetric: boolean, toMetric: boolean): number => {
    if (fromMetric === toMetric) return weight;
    if (fromMetric) {
        // Converting from kg to stone
        return weight * 2.20462 / 14;
    } else {
        // Converting from stone to kg
        return weight * 14 / 2.20462;
    }
}; 