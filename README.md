
# **Product Cards App**

A feature-rich **React Native** application showcasing a modern product catalog. Users can browse products, view details, add items to their cart, and track recent purchases with a sleek and responsive interface.

---

## **Features**

### 🛒 **Shopping Experience**
- **Product List**:
  - Clean card layout for each product.
  - Displays name, description (truncated), price, and an image.
  - Smooth animations and responsive design.
- **Cart Functionality**:
  - Add, remove, or modify product quantities in the cart.
  - View total cost and recent purchases (last 2 days).
- **Product Details**:
  - View full product details with a hero image and description.
  - Add directly to the cart with feedback messages.

### 🌟 **Optimized for UX/UI**
- Toast notifications for feedback (e.g., product added to cart).
- Dynamic font scaling and contrast for accessibility.
- Smooth navigation and animations.

### ⚙️ **Performance**
- Efficient handling of large product lists using pagination.
- Loading indicators and skeleton placeholders for better UX.

---

## **Tech Stack**

- **React Native**: Mobile application framework.
- **React Navigation**: Navigation between screens.
- **Context API**: State management for the cart.
- **Axios**: API calls to fetch product data.
- **react-native-vector-icons**: Icon library for rich visuals.

---

## **Getting Started**

### **Prerequisites**

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [Android Studio](https://developer.android.com/studio) (for Android)
- [Xcode](https://developer.apple.com/xcode/) (for iOS)
- [React Native CLI](https://reactnative.dev/docs/environment-setup)

---

### **Installation**

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/product-cards-app.git
   cd product-cards-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the Metro bundler:
   ```bash
   npx react-native start
   ```

4. Run the app:
   - For Android:
     ```bash
     npx react-native run-android
     ```
   - For iOS:
     ```bash
     npx react-native run-ios
     ```

---

## **Folder Structure**

```plaintext
product-cards-app/
├── src/
│   ├── components/          # Reusable UI components (Button, Icon, etc.)
│   ├── context/             # Context API (Cart management)
│   ├── navigation/          # Navigation stack (AppNavigator.tsx)
│   ├── screens/             # App screens (HomeScreen, CartScreen, ProductDetailScreen)
│   ├── services/            # API integrations (e.g., fetchProducts)
│   ├── types/               # TypeScript type definitions
│   ├── App.tsx              # Main app entry point
├── android/                 # Android-specific files
├── ios/                     # iOS-specific files
├── package.json             # Project metadata and dependencies
├── README.md                # Project documentation
```

---

## **Usage**

### **Commands**

- **Start Metro Bundler**:
  ```bash
  npx react-native start
  ```
- **Run on Android**:
  ```bash
  npx react-native run-android
  ```
- **Run on iOS**:
  ```bash
  npx react-native run-ios
  ```

---

## **API**

This app uses the **[Fake Store API](https://fakestoreapi.com/)** to fetch product data.

### Example API Request:
```bash
GET https://fakestoreapi.com/products?limit=5
```

### Response Example:
```json
[
  {
    "id": 1,
    "title": "Product Name",
    "price": 25.99,
    "description": "Product description here.",
    "category": "electronics",
    "image": "https://example.com/image.jpg",
    "rating": {"rate": 4.5, "count": 120}
  }
]
```

---

## **Key Features by Screen**

### **Home Screen**
- Displays product cards with:
  - Name, price, image, and truncated description.
  - "View Details" and "Buy" buttons.
- Supports pagination and pull-to-refresh functionality.

### **Product Detail Screen**
- Full product description, image, and price.
- Add to cart button with success feedback.

### **Cart Screen**
- Lists all cart items with:
  - Quantity controls (increment, decrement).
  - A "Remove" button for each product.
- Displays the total price.
- Checkout button with a confirmation prompt.

### **Recent Purchases**
- Tracks products purchased within the last 2 days.
- Accessible in the cart screen.

---

## **Styling and UX**

### **Global Styling**
- Adaptive layouts for different screen sizes.

### **Feedback and Notifications**
- Toast messages for user actions like adding/removing products.

### **Accessibility**
- High contrast text and dynamic font scaling.
- Large touch targets for buttons.

