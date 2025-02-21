export enum API_ROUTES {
  LOGIN = '/auth/user/login',
  RESET_PASSWORD = '/auth/user/reset-password',
  PASSWORD_RESET_TOKEN = '/auth/user/verify-reset-token',
  RESEND_TOKEN = '/auth/user/resend-token',
  NEW_PASSWORD_RESET = 'auth/user/reset-password/new',
  TEST_LOGIN = 'auth/admin/login',
  CREATE_ACCOUNT = '/auth/user/create',
  FETCH_ORDER = '/order/user',
  ORDER = '/order',

  FETCH_CATEGORY= "/product/categories",
  FETCH_PRODUCT = "/product/admin",
  FETCH_PRODUCT_BY_CATEGORY = "/product/product-by-category",

}
