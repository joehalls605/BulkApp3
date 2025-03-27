import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Questionnaire from './app/Questionnaire';
import StartJourney from './app/StartJourney';
import Dashboard from './app/Dashboard';
import TermsAndConditions from './app/TermsAndConditions';
import TermsOfUse from './app/TermsOfUse';
import SubscriptionManagement from './app/SubscriptionManagement';
import Shopping from './app/Shopping';
import Congratulations from './app/Congratulations';
import { RootStackParamList } from './app/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="StartJourney"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="StartJourney" component={StartJourney} />
                <Stack.Screen name="Questionnaire" component={Questionnaire} />
                <Stack.Screen name="Congratulations" component={Congratulations} />
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="Shopping" component={Shopping} />
                <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
                <Stack.Screen name="TermsOfUse" component={TermsOfUse} />
                <Stack.Screen name="SubscriptionManagement" component={SubscriptionManagement} />
            </Stack.Navigator>
        </NavigationContainer>
    );
} 