import React from 'react';
import {StatusBar} from 'react-native';
import AppNavigator from './navigation';
import {CartProvider} from './context/CartContext';

const App: React.FC = () => {
  return (
    <CartProvider>
      <StatusBar
        barStyle="light-content" 
        backgroundColor="#3182CE" 
        translucent={false} 
      />
      <AppNavigator />
    </CartProvider>
  );
};

export default App;
