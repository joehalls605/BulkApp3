import * as SecureStore from 'expo-secure-store';

export interface WeightConfig {
    currentWeight: number;
    goalWeight: number;
    useMetric: boolean;
    dailyTarget: number;
    maintenanceCalories: number;
    weightGainCalories: number;
    exerciseFrequency: string;
    mealsPerDay: string;
    foodPreference: string;
    timeframe: number;
}

const DEFAULT_CONFIG: WeightConfig = {
    currentWeight: 70,
    goalWeight: 75,
    useMetric: true,
    dailyTarget: 0,
    maintenanceCalories: 0,
    weightGainCalories: 0,
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
    timeframe: number
) => {
    // Convert to kg if using imperial units
    const weightInKg = useMetric ? currentWeight : currentWeight * 6.35029318;
    const goalWeightInKg = useMetric ? goalWeight : goalWeight * 6.35029318;

    // Calculate BMR using Mifflin-St Jeor Equation
    const heightInCm = 170; // Average height
    const age = 25; // Average age
    const bmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * age) + 5;

    // Activity multiplier based on exercise frequency
    let activityMultiplier = 1.2; // Default sedentary
    switch (exerciseFrequency) {
        case 'Never':
            activityMultiplier = 1.2;
            break;
        case 'A few times a week':
            activityMultiplier = 1.375;
            break;
        case 'Once a day':
            activityMultiplier = 1.55;
            break;
        case 'More than once a day':
            activityMultiplier = 1.725;
            break;
    }

    // Calculate maintenance calories
    const maintenanceCalories = Math.round(bmr * activityMultiplier);

    // Calculate weight gain calories based on timeframe
    const weightToGain = goalWeightInKg - weightInKg;
    const weeklyGainTarget = weightToGain / (timeframe * 4); // Convert months to weeks
    const dailyCalorieSurplus = weeklyGainTarget * 1000; // 1kg = 1000 calories
    const weightGainCalories = maintenanceCalories + dailyCalorieSurplus;

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
    useMetric?: boolean,
    exerciseFrequency?: string,
    mealsPerDay?: string,
    foodPreference?: string,
    timeframe?: number
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
            dailyTarget: 0,
            maintenanceCalories: 0,
            weightGainCalories: 0
        };

        // Calculate new calories based on updated values
        const calories = calculateCalories(
            updatedConfig.currentWeight,
            updatedConfig.goalWeight,
            updatedConfig.useMetric,
            updatedConfig.exerciseFrequency,
            updatedConfig.timeframe
        );

        // Update the config with calculated calories
        updatedConfig.maintenanceCalories = calories.maintenanceCalories;
        updatedConfig.weightGainCalories = calories.weightGainCalories;
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
                dailyCalories: calories.dailyTarget,
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