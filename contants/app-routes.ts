export enum APP_ROUTES {
  HOME = 'index',
  LOGIN = '/(auth)',
  CREATE_ACCOUNT = '/(auth)/signup',
  SET_PASSWORD = '/(auth)/password',
  VERIFY_OTP = '/(auth)/verify',

  ACCOUNT_CREATED = '/(auth)/accountCreated',

  ORDER = 'order',
  ORDER_DETAILS = '/order/details',
  FINANCE = 'finance',
  CART = 'cart',
  ACCOUNT = 'account',

  NOTIFICATION="/authorised/notification",
  SEARCH="/authorised/search",

  // product routes link 
  ALL_PRODUCT = "/product/AllProducts/AllProducts",
  PRODUCT_BY_CATEGORY = "/product/Category/Category",
  PRODUCT_DETAILS="/product/productDetails/[productId]",
  CHECKOUT="/checkout/checkout",
  CHECKOUTSUMMARY="/checkout/CheckoutSummary",
  PAYMENT="/checkout/Payment",

  //account routes link start 
  ADDRESS = "/account/Address",

  // account seeting 
  PASSWORD_SETTING = "/account/Password_Email/PasswordSettings",
  CHANGE_PASSWORD=  "/account/Password_Email/ChangePassword", 
  CHANGE_EMAIL = "/account/Password_Email/ChangeEmail",

  // PERSONAL_DETAILS routes
  PERSONAL_DETAILS = "/account/PersonalDetails/PersonalDetails",
  EDIT_PERSONAL_DETAILS = "/account/PersonalDetails/EditPersonalDetails", 

  PRIVACY = "/account/PrivacyPolicy",
  SUPPORT = "/account/Support",
  TERMS = "/account/Terms",

  // account routes link end 

  // address routes link 
  ADD_ADDRESS = "/address/AddAddress",

  //Finance
  TOPUPWALLET= "/Finance/TopUpWallet/TopUpWallet",
  CREDITHISTORY= "/Finance/CreditHistory/CreditHistory",
  HOWWORKS= "/Finance/HowWorks/HowWorks",
  REDEEM= "/Finance/Redeem/Redeem",
  REFEREARN= "/Finance/ReferEarn/ReferEarn",
  SCANQRCODE= "/Finance/ScanQRCode/ScanQRCode",
  SHARELINK= "/Finance/ShareLink/ShareLink",
}
