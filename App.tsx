import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRoutes } from './navigation/routes';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {Object.values(AppRoutes).map((route) => (
          <Stack.Screen 
            key={route.name}
            name={route.name} 
            component={route.component} 
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}