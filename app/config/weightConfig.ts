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

    // Calculate maintenance calories (30 calories per kg of body weight)
    const maintenanceCalories = Math.round(weightInKg * 30);

    // Calculate weight gain calories (maintenance + 500 calories for 0.5kg gain per week)
    const weightGainCalories = maintenanceCalories + 500;

    return {
        maintenanceCalories,
        weightGainCalories,
        dailyTarget: weightGainCalories
    };
};

export const loadWeightConfig = async (): Promise<WeightConfig> => {
    try {
        const data = await SecureStore.getItemAsync('userData');
        if (data) {
            const parsedData = JSON.parse(data);
            const { currentWeight, goalWeight, useMetric } = parsedData;
            
            if (currentWeight && goalWeight) {
                const calories = calculateCalories(currentWeight, goalWeight, useMetric);
                return {
                    currentWeight,
                    goalWeight,
                    useMetric: useMetric ?? true,
                    ...calories
                };
            }
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
        const existingData = await SecureStore.getItemAsync('userData');
        const parsedData = existingData ? JSON.parse(existingData) : {};

        const updatedData = {
            ...parsedData,
            currentWeight: currentWeight ?? parsedData.currentWeight ?? DEFAULT_CONFIG.currentWeight,
            goalWeight: goalWeight ?? parsedData.goalWeight ?? DEFAULT_CONFIG.goalWeight,
            useMetric: useMetric ?? parsedData.useMetric ?? DEFAULT_CONFIG.useMetric,
            dailyCalories: 0,
            completedMeals: {}
        };

        const calories = calculateCalories(
            updatedData.currentWeight,
            updatedData.goalWeight,
            updatedData.useMetric
        );

        await SecureStore.setItemAsync('userData', JSON.stringify(updatedData));

        return {
            currentWeight: updatedData.currentWeight,
            goalWeight: updatedData.goalWeight,
            useMetric: updatedData.useMetric,
            ...calories
        };
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