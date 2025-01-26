# Grocerly: Grocery Delivery Mobile App

## Overview

Grocerly is a comprehensive grocery delivery mobile application built with Expo and React Native, designed to provide a seamless online grocery shopping and delivery experience.

## 🚀 Features

- **User Authentication**: Secure sign-in and registration
- **Internationalization**: English and Chinese Language Support via i18next and expo-localize
- **Location Services**: User and driver location tracking
- **Payment Integration**: 
  - Stripe wallet functionality
  - Secure payment processing
- **Delivery Tracking**: 
  - Google Maps integration
  - Real-time driver location updates (Uber-like experience)
- **Notifications**: Push notification system
- **Smooth Animations**: Enhanced user interface interactions
- **Skeleton Loader**: Improved page loading experience

## 🛠 Technology Stack

- **Framework**: Expo React Native
- **State Management**: React Hooks, React Query, context api
- **Navigation**: Expo router
- **Payment**: Stripe
- **Mapping**: Google Maps API
- **Testing**: Jest and Jest-expo
- **Internationalization**: i18next, expo-localize

## 📂 Project Structure

```
grocerly/
  ├── components/
  │   ├── common/
  │   ├── grocery/
  ├── apis/
  ├── apps/
  |   ├── onboarding/
  │   ├── Auth/
  │   ├── Home/
  │   ├── ProductCatalog/
  │   ├── Cart/
  │   ├── Checkout/
  │   ├── Tracking/
  ├── hooks/
  ├── utils/
  ├── types/
  ├── themes/
  ├── constant/
  ├── config/
  ├── lib/
  ├── assets/
  ├── locales/
  |   ├── en/
  │   ├── ch/
```

## 🔑 Key Technical Decisions

### Architecture
- Modular component structure
- Feature-based folder organization
- TypeScript for type safety
- Comprehensive error handling

### Performance Optimization
- React.memo for component memoization
- useMemo and useCallback for efficient re-renders
- Virtualized lists for long content
- Skeleton loaders for smooth loading

## 🌟 User Journey

1. **Authentication**: Secure and intuitive sign-up/login
2. **Product Browsing**: Searchable, filterable product catalog
3. **Shopping**: Easy product selection and cart management
4. **Checkout**: Streamlined payment process
5. **Tracking**: Real-time delivery updates

## 🔜 Roadmap

- Expanded payment options
- Enhanced accessibility features

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

[Insert License Information]
```

Would you like me to modify anything about the README format or content?
