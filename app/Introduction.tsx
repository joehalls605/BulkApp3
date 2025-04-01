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
                            <Ionicons name="trending-up" size={40} color="#FF9800" />
                        </View>
                        <Text style={styles.title}>Let’s get you started.</Text>
                    </View>

                    <View style={styles.messageContainer}>
                        <Text style={styles.message}>
                        Gaining weight isn’t easy, but we’ve got your back. {'\n'}Tell us your goals, and let’s crush them together 📈
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
        marginVertical: 20,
    },
    message: {
        fontSize: 18,
        color: '#333333',
        lineHeight: 28,
        textAlign: 'center',
        backgroundColor: 'white',
        padding: 25,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#FF9800',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    button: {
        backgroundColor: '#FF5722',
        padding: 20,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 120,
        marginTop: 10,
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