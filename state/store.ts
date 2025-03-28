import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'
import productsReducer from './products/productsReducer';
import middleware from './middleware';
import cartReducer from './cart/cartReducer';
import loadingReducer from './loading/loadingReducer';
import orderReducer from './order/orderReducer';
import mailchimpReducer from './mailchimp/mailchimpReducer';
import hygraphReducer from './hygraph/hygraphReducer';
import formDataReducer from './formData/formDataReducer';
import modoReducer from './modo/modoReducer';
import userReducer from './user/userReducer';

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    loading: loadingReducer,
    mailchimp: mailchimpReducer,
    order: orderReducer,
    hygraph: hygraphReducer,
    modo: modoReducer,
    formData: formDataReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk).concat(middleware)
});

export default store;