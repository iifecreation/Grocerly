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

  PRODUCT_DETAILS="/productDetails/[productId]",
  CHECKOUT="/checkout/checkout",
  CHECKOUTSUMMARY="/checkout/CheckoutSummary",
  PAYMENT="/checkout/Payment"

}
