import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../navigation/types';

// Hook personalizado para manejar el inicio de sesión y redirección
export const loginAndRedirect = async (
    handleSignIn: () => Promise<boolean>,
    navigation: StackNavigationProp<RootStackParamList, any>
  ) => {
    const success = await handleSignIn();
    if (success) {
      navigation.navigate('Home');
    }
  };
  