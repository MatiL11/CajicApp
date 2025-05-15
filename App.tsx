import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './components/Auth/SignIn/SignInScreen';
import SignUpScreen from './components/Auth/SignUp/SignUpScreen';
import HomeScreen from './screens/Public/HomeScreen/HomeScreen';
import ProfileScreen from './screens/Profile/ProfileScreen';
import CreateProduct from './screens/CreateProduct/CreateProductScreen';
import ExploreScreen from './screens/Explore/ExploreScreen';
import EditProfileScreen from './screens/EditProfile/EditProfileScreen';
import MyProductsScreen from './screens/MyProducts/MyProductsScreen';
import ProductDetailScreen from './screens/ProductDetail/ProductDetailScreen';
import CategoryProductsScreen from './screens/CategoryProducts/CategoryProductsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} /> 
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Add" component={CreateProduct} />
        <Stack.Screen name="Explore" component={ExploreScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="MyProducts" component={MyProductsScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="CategoryProducts" component={CategoryProductsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}