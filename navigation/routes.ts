import SignInScreen from '../components/Auth/SignIn/SignInScreen';
import SignUpScreen from '../components/Auth/SignUp/SignUpScreen';
import HomeScreen from '../screens/Public/HomeScreen/HomeScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import CreateProduct from '../screens/CreateProduct/CreateProductScreen';
import ExploreScreen from '../screens/Explore/ExploreScreen';
import EditProfileScreen from '../screens/EditProfile/EditProfileScreen';
import MyProductsScreen from '../screens/MyProducts/MyProductsScreen';
import ProductDetailScreen from '../screens/ProductDetail/ProductDetailScreen';
import CategoryProductsScreen from '../screens/CategoryProducts/CategoryProductsScreen';
import EditProductScreen from '../screens/EditProduct/EditProductScreen';

export const AppRoutes = {
  SignIn: {
    name: 'SignIn',
    component: SignInScreen
  },
  SignUp: {
    name: 'SignUp',
    component: SignUpScreen
  },
  Home: {
    name: 'Home',
    component: HomeScreen
  },
  Profile: {
    name: 'Profile',
    component: ProfileScreen
  },
  Add: {
    name: 'Add',
    component: CreateProduct
  },
  Explore: {
    name: 'Explore',
    component: ExploreScreen
  },
  EditProfile: {
    name: 'EditProfile',
    component: EditProfileScreen
  },
  MyProducts: {
    name: 'MyProducts',
    component: MyProductsScreen
  },
  ProductDetail: {
    name: 'ProductDetail',
    component: ProductDetailScreen
  },
  CategoryProducts: {
    name: 'CategoryProducts',
    component: CategoryProductsScreen
  },
  EditProduct: {
    name: 'EditProduct',
    component: EditProductScreen
  }
};