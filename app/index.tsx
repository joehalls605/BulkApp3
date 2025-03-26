import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from './Dashboard';
import WeightGuide from './WeightGuide';
import Motivation from './Motivation';
import Welcome from './Welcome';
import Introduction from './Introduction';
import Questionnaire from './Questionnaire';
import { MealsProvider } from '../context/MealsContext';

// THIS IS THE ENTRY POINT TO THE APPLICATION

const Stack = createStackNavigator();

export default function Index() {
    return (
        <MealsProvider>
            <Stack.Navigator 
                initialRouteName="Welcome"
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Introduction" component={Introduction} />
                <Stack.Screen name="Questionnaire" component={Questionnaire} />
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="WeightGuide" component={WeightGuide} />
                <Stack.Screen name="Motivation" component={Motivation} />
            </Stack.Navigator>
        </MealsProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20, // Add some space below the text
    },
});