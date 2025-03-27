import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Questionnaire from './app/Questionnaire';
import StartJourney from './app/StartJourney';
import Dashboard from './app/Dashboard';
import TermsAndConditions from './app/TermsAndConditions';
import TermsOfUse from './app/TermsOfUse';
import { RootStackParamList } from './app/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Questionnaire"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Questionnaire" component={Questionnaire} />
                <Stack.Screen name="StartJourney" component={StartJourney} />
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
                <Stack.Screen name="TermsOfUse" component={TermsOfUse} />
            </Stack.Navigator>
        </NavigationContainer>
    );
} 