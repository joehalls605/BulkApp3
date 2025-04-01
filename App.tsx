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
import Welcome from './app/Welcome';
import Introduction from './app/Introduction';
import MealSuggestions from './app/MealSuggestions';
import QuickMeals from './app/QuickMeals';
import LowAppetite from './app/LowAppetite';
import LoadingScreen from './app/LoadingScreen';
import { RootStackParamList } from './app/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Welcome"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Introduction" component={Introduction} />
                <Stack.Screen name="Questionnaire" component={Questionnaire} />
                <Stack.Screen name="StartJourney" component={StartJourney} />
                <Stack.Screen name="Congratulations" component={Congratulations} />
                <Stack.Screen name="Loading" component={LoadingScreen} />
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="Shopping" component={Shopping} />
                <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
                <Stack.Screen name="TermsOfUse" component={TermsOfUse} />
                <Stack.Screen name="SubscriptionManagement" component={SubscriptionManagement} />
                <Stack.Screen name="MealSuggestions" component={MealSuggestions} />
                <Stack.Screen name="QuickMeals" component={QuickMeals} />
                <Stack.Screen name="LowAppetite" component={LowAppetite} />
            </Stack.Navigator>
        </NavigationContainer>
    );
} 