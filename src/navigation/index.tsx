import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import {CartIcon} from '../components';
import {Product} from '../types/product';

export type RootStackParamList = {
  Home: undefined;
  Cart: undefined;
  ProductDetail: {product: Product};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const navigation: React.FC = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({navigation}) => ({
              title: 'Products',
              headerRight: () => <CartIcon navigation={navigation} />,
            })}
          />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetailScreen}
            options={({route}) => ({
              title: (route.params as any)?.product?.title || 'Product Details',
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default navigation;
