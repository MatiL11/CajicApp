// Direcciones de las colecciones
export type RootStackParamList = {
    SignIn: undefined;
    SignUp: undefined;
    Home: undefined;
    Profile: undefined;
    Explore: undefined;
    Add: undefined;
    EditProfile: undefined;
    MyProducts: {
      refresh: boolean;
    },
    ProductDetail: {
      productId: string;
      name: string;
      price: number;
      imageUrl: string;
      seller: string;
      description: string;
      contactNumber: string;
    };
    CategoryProducts: {
      categoryName: string;
    };
    EditProduct: {
      productId: string;
      name: string;
      price: number;
      description: string;
      category: string;
      imageUrl: string;
    };
  };


  