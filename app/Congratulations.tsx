import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type CongratulationsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Congratulations'>;

export default function Congratulations() {
    const navigation = useNavigation<CongratulationsScreenNavigationProp>();
    const fadeAnim = new Animated.Value(0);

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#FFF8E7', '#FFF5E0']} style={styles.gradient}>
                <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="checkmark-circle" size={65} color="#00bf1d" />
                    </View>
                    <Text style={styles.title}>Welcome to BulkUp! 🎉</Text>
                    <Text style={styles.subtitle}>Your journey to a stronger, healthier you starts now 💪</Text>
                    
                    <View style={styles.detailsContainer}>
                        <View style={styles.detailItem}>
                            <Ionicons name="time" size={24} color="#00bf1d" />
                            <Text style={styles.detailText}>7 days of premium access</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Ionicons name="fitness" size={24} color="#4036cf" />
                            <Text style={styles.detailText}>Full access to all features</Text>
                        </View>
                    </View>

                    <Text style={styles.featuresTitle}>Your tools to gain weight and more!</Text>
                    <View style={styles.featuresGrid}>
                        <View style={[styles.featureCard, { borderColor: '#4CAF50' }]}>
                            <View style={[styles.featureIconContainer, { backgroundColor: '#E8F5E9' }]}>
                                <Ionicons name="restaurant" size={24} color="#4CAF50" />
                            </View>
                            <Text style={styles.featureTitle}>Meal Plans</Text>
                        </View>

                        <View style={[styles.featureCard, { borderColor: '#FF9800' }]}>
                            <View style={[styles.featureIconContainer, { backgroundColor: '#FFF3E0' }]}>
                                <Ionicons name="barbell" size={24} color="#FF9800" />
                            </View>
                            <Text style={styles.featureTitle}>Custom Workouts</Text>
                        </View>

                        <View style={[styles.featureCard, { borderColor: '#2196F3' }]}>
                            <View style={[styles.featureIconContainer, { backgroundColor: '#E3F2FD' }]}>
                                <Ionicons name="cart" size={24} color="#2196F3" />
                            </View>
                            <Text style={styles.featureTitle}>Bulking Lists</Text>
                        </View>

                        <View style={[styles.featureCard, { borderColor: '#9C27B0' }]}>
                            <View style={[styles.featureIconContainer, { backgroundColor: '#F3E5F5' }]}>
                                <Ionicons name="bulb" size={24} color="#9C27B0" />
                            </View>
                            <Text style={styles.featureTitle}>Daily Tips</Text>
                        </View>
                    </View>

                    <TouchableOpacity 
                        style={styles.enterButton}
                        onPress={() => navigation.navigate('Dashboard')}
                    >
                        <Text style={styles.enterButtonText}>Start Your Journey</Text>
                        <Ionicons name="arrow-forward" size={24} color="white" style={styles.enterButtonIcon} />
                    </TouchableOpacity>
                </Animated.View>
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#E8F5E9',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#333',
        marginBottom: 16,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 20,
        color: '#666',
        textAlign: 'center',
        marginBottom: 32,
    },
    detailsContainer: {
        width: '100%',
        marginBottom: 10,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    detailText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 12,
        flex: 1,
    },
    featuresTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
        marginBottom: 16,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    featuresGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 32,
        gap: 12,
    },
    featureCard: {
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 12,
        width: '45%',
        borderWidth: 1.5,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    featureIconContainer: {
        padding: 8,
        borderRadius: 14,
        marginBottom: 8,
    },
    featureTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    },
    enterButton: {
        backgroundColor: '#00bf1d',
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '100%',
    },
    enterButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
    enterButtonIcon: {
        marginLeft: 12,
    },
}); 