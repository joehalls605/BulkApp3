import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Introduction() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#FFF8E7', '#FFF5E0']} style={styles.gradient}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <View style={[styles.iconContainer, { backgroundColor: '#FFF3E0' }]}>
                            <Ionicons name="heart" size={40} color="#FF9800" />
                        </View>
                        <Text style={styles.title}>Welcome to BulkUp</Text>
                    </View>

                    <View style={styles.messageContainer}>
                        <Text style={styles.message}>
                            We've spoken to many people who struggle with gaining weight, and we know how tough it can be. That's why we've created this app with all the tools you need to support your weight gain journey.
                        </Text>
                    </View>

                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => navigation.navigate('Questionnaire')}
                    >
                        <Text style={styles.buttonText}>Let's Understand You</Text>
                        <Ionicons name="arrow-forward" size={20} color="white" style={styles.buttonIcon} />
                    </TouchableOpacity>
                </View>
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
    content: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
    header: {
        alignItems: 'center',
        marginTop: 60,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#333',
        textAlign: 'center',
    },
    messageContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    message: {
        fontSize: 18,
        color: '#666',
        lineHeight: 28,
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#FF5722',
        padding: 20,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    buttonIcon: {
        marginLeft: 10,
    },
}); 