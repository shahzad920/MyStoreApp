import React from 'react';
import {
  FlatList,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useCart} from '../context/CartContext';
import {Block, Icon, Text, Button} from '../components';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation';
import {Product} from '../types/product';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cart'>;

const CartScreen: React.FC = () => {
  const {cart, getRecentPurchases,removeFromCart, increaseQuantity, decreaseQuantity} = useCart();
  const navigation = useNavigation<NavigationProp>();

  // Fetch products purchased within the last 2 days
  const recentPurchases = getRecentPurchases();

  // Calculate total amount
  const totalAmount = recentPurchases.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Confirmation dialog for removing items
  const confirmRemove = (itemId: number, itemTitle: string) => {
    Alert.alert(
      'Remove Item',
      `Are you sure you want to remove "${itemTitle}" from your cart?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => removeFromCart(itemId),
        },
      ],
      {cancelable: true},
    );
  };

  const renderItem = ({item}: {item: Product}) => {
    const {id, title, price, image, quantity} = item;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductDetail', {product: item})}>
        <Block card style={styles.cartItem}>
         
          <TouchableOpacity
            style={styles.removeIconContainer}
            onPress={() => confirmRemove(id, title)}>
            <Icon family={'entypo'} name="cross" size={20} color="#E53E3E" />
          </TouchableOpacity>
          <Image source={{uri: image}} style={styles.productImage} />

          <Block style={styles.details}>
            <Text h3 bold style={styles.title}>
              {title}
            </Text>
            <Text style={styles.viewDetailsText}>View Details</Text>
            <Text h4 bold style={styles.price}>
              ${price.toFixed(2)}
            </Text>
            <Block style={styles.quantityControls}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => decreaseQuantity(id)}>
                <Icon family={'feather'} name="minus" size={16} color="#FFF" />
              </TouchableOpacity>

              <Text h4 style={styles.quantityText}>
                {quantity}
              </Text>

              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => increaseQuantity(id)}>
                <Icon family={'feather'} name="plus" size={16} color="#FFF" />
              </TouchableOpacity>
            </Block>
          </Block>
        </Block>
      </TouchableOpacity>
    );
  };

  return (
    <Block flex style={styles.container}>
      {recentPurchases.length === 0 ? (
        <Block flex middle center>
          <Icon
            family={'material-community'}
            name="cart-outline"
            size={100}
            color="#A0AEC0"
            style={styles.icon}
          />
          <Text h2 bold style={styles.emptyTitle}>
            Your Cart is Empty
          </Text>
          <Text p style={styles.emptyDescription}>
            Add some products to your cart to see them here.
          </Text>
        </Block>
      ) : (
        <>
          <FlatList
            data={recentPurchases}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
          />

          {/* Total Amount Section */}
          <Block style={styles.totalContainer}>
            <Text h3 bold style={styles.totalText}>
              Total Amount:
            </Text>
            <Text h3 bold style={styles.totalAmount}>
              ${totalAmount.toFixed(2)}
            </Text>
          </Block>

          {/* Checkout Button */}
          <Block style={styles.checkoutButtonContainer}>
            <Button
              title="Checkout"
              onPress={() => Alert.alert('Checkout', 'Proceed to checkout!')}
              style={styles.checkoutButton}
              textStyle={styles.checkoutButtonText}
            />
          </Block>
        </>
      )}
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F9FAFB',
  },
  cartItem: {
    position: 'relative',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    marginBottom: 16,
    padding: 16,
  },
  productImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
    marginRight: 16,
  },
  details: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
    color: '#2D3748',
  },
  price: {
    fontSize: 18,
    color: '#38A169',
    marginBottom: 8,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  quantityButton: {
    backgroundColor: '#3182CE',
    borderRadius: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    color: '#2D3748',
    marginHorizontal: 16,
  },
  removeIconContainer: {
    width: 50,
    height: 50,
    position: 'absolute',
    // top: 8,
    right: -6,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  totalText: {
    color: '#2D3748',
  },
  totalAmount: {
    color: '#3182CE',
  },
  checkoutButtonContainer: {
    marginTop: 16,
  },
  checkoutButton: {
    backgroundColor: '#3182CE',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    color: '#4A5568',
    marginTop: 12,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    marginTop: 8,
  },
  viewDetailsText: {
    marginBottom: 8,
    fontSize: 14,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
});

export default CartScreen;
