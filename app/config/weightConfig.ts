import * as SecureStore from 'expo-secure-store';

export interface WeightConfig {
    currentWeight: number;
    goalWeight: number;
    useMetric: boolean;
    dailyTarget: number;
    maintenanceCalories: number;
    weightGainCalories: number;
}

const DEFAULT_CONFIG: WeightConfig = {
    currentWeight: 70,
    goalWeight: 75,
    useMetric: true,
    dailyTarget: 0,
    maintenanceCalories: 0,
    weightGainCalories: 0
};

export const calculateCalories = (currentWeight: number, goalWeight: number, useMetric: boolean) => {
    // Convert to kg if using imperial units
    const weightInKg = useMetric ? currentWeight : currentWeight * 6.35029318;
    const goalWeightInKg = useMetric ? goalWeight : goalWeight * 6.35029318;

    // Calculate BMR using Mifflin-St Jeor Equation
    // For men: (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
    // For women: (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161
    // Using average height of 170cm and age of 25 for a baseline
    const heightInCm = 170;
    const age = 25;
    const bmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * age) + 5; // Using male formula as baseline

    // Activity multiplier (1.2 for sedentary, 1.375 for light exercise, 1.55 for moderate, 1.725 for very active, 1.9 for extra active)
    const activityMultiplier = 1.55; // Moderate activity level

    // Calculate maintenance calories
    const maintenanceCalories = Math.round(bmr * activityMultiplier);

    // Calculate weight gain calories
    // For 0.5kg gain per week, add 500 calories
    // For 1kg gain per week, add 1000 calories
    const weeklyGainTarget = 0.5; // kg per week
    const weightGainCalories = maintenanceCalories + (weeklyGainTarget * 1000);

    return {
        maintenanceCalories,
        weightGainCalories,
        dailyTarget: weightGainCalories
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
    useMetric?: boolean
): Promise<WeightConfig> => {
    try {
        // First get the current config
        const currentConfig = await loadWeightConfig();

        // Update the config with new values
        const updatedConfig: WeightConfig = {
            currentWeight: currentWeight ?? currentConfig.currentWeight,
            goalWeight: goalWeight ?? currentConfig.goalWeight,
            useMetric: useMetric ?? currentConfig.useMetric,
            dailyTarget: 0,
            maintenanceCalories: 0,
            weightGainCalories: 0
        };

        // Calculate new calories based on updated weights
        const calories = calculateCalories(
            updatedConfig.currentWeight,
            updatedConfig.goalWeight,
            updatedConfig.useMetric
        );

        // Update the config with calculated calories
        updatedConfig.maintenanceCalories = calories.maintenanceCalories;
        updatedConfig.weightGainCalories = calories.weightGainCalories;
        updatedConfig.dailyTarget = calories.dailyTarget;

        // Store the updated config
        await SecureStore.setItemAsync('weightConfig', JSON.stringify(updatedConfig));

        // Update userData with the new weights
        const userDataString = await SecureStore.getItemAsync('userData');
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            const updatedUserData = {
                ...userData,
                currentWeight: updatedConfig.currentWeight,
                goalWeight: updatedConfig.goalWeight,
                useMetric: updatedConfig.useMetric,
                dailyCalories: 0,
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
    return `${(weight * 2.20462).toFixed(1)} lbs`;
};

export const convertWeight = (weight: number, fromMetric: boolean, toMetric: boolean): number => {
    if (fromMetric === toMetric) return weight;
    return fromMetric ? weight * 2.20462 : weight / 2.20462;
}; 