import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface MealsContextType {
    mealsCompleted: number;
    incrementMealsCompleted: () => void;
    resetMealsCompleted: () => void;
}

const MealsContext = createContext<MealsContextType | undefined>(undefined);

export const MealsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [mealsCompleted, setMealsCompleted] = useState(0);

    useEffect(() => {
        const loadMealsCompleted = async () => {
            try {
                const storedMealsCompleted = await AsyncStorage.getItem('mealsCompleted');
                if (storedMealsCompleted !== null) {
                    setMealsCompleted(parseInt(storedMealsCompleted, 10));
                }
            } catch (error) {
                console.error('Error loading meals completed:', error);
            }
        };

        loadMealsCompleted();
    }, []);

    useEffect(() => {
        const saveMealsCompleted = async () => {
            try {
                await AsyncStorage.setItem('mealsCompleted', mealsCompleted.toString());
            } catch (error) {
                console.error('Error saving meals completed:', error);
            }
        };

        saveMealsCompleted();
    }, [mealsCompleted]);

    const incrementMealsCompleted = () => {
        setMealsCompleted(prev => prev + 1);
    };

    const resetMealsCompleted = () => {
        setMealsCompleted(0);
    };

    const value: MealsContextType = {
        mealsCompleted,
        incrementMealsCompleted,
        resetMealsCompleted,
    };

    return (
        <MealsContext.Provider value={value}>{children}</MealsContext.Provider>
    );
};

export const useMeals = () => {
    const context = useContext(MealsContext);
    if (!context) {
        throw new Error('useMeals must be used within a MealsProvider');
    }
    return context;
};