// Direcciones de las colecciones
export type RootStackParamList = {
    SignIn: undefined;
    SignUp: undefined;
    Home: undefined;
    Profile: undefined;
    Explore: undefined;
    Add: undefined;
    EditProfile: undefined;
    MyProducts: undefined;
    ProductDetail: {
      productId: string;
      name: string;
      price: number;
      imageUrl: string;
      seller: string;
      description: string;
    };
    CategoryProducts: {
      categoryName: string;
    };
  };


  