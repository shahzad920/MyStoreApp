import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useCart} from '../../context/CartContext';
import {Block, Icon, Text} from '..';

const CartIcon: React.FC<{navigation: any}> = ({navigation}) => {
  const {cart} = useCart();

  const IconBadge = ({count}: {count: number}) => {
    return (
      <Block
        round={16}
        bColor="red"
        style={{
          position: 'absolute',
          top: -5,
          right: -10,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
        }}>
        <Text small color="#fff" bold>
          {count}
        </Text>
      </Block>
    );
  };

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
      <Icon name="shopping-cart" family="font-awesome" size={24} color="#000" />
      {cart.length > 0 && <IconBadge count={cart.length} />}
    </TouchableOpacity>
  );
};

export default CartIcon;
