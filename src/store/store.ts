import { configureStore } from '@reduxjs/toolkit';
import authenticationSlices from './authenticationSlices';
import cartSlice from './shopping-cart/cartSlice';
import cartUiSlice from './shopping-cart/cartUiSlice';
import productSlices from './productSlices';
import waiterSlice from './waiterSlice';
import State from 'types/AuthSliceState';

import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import promotionSlices from './promotionSlices';
import printerSlices from './printerSlice';
import promosyonSlices from './promosyonSlice';
import { combineReducers } from 'redux';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({ history: createBrowserHistory() });

const store: any = configureStore({
  reducer: combineReducers({
    router: routerReducer,
    cart: cartSlice.reducer,
    cartUi: cartUiSlice.reducer,
    auth: authenticationSlices,
    product: productSlices,
    waiter: waiterSlice,
    promotion: promotionSlices,
    promosyon: promosyonSlices,
    printer: printerSlices,
  }),
  middleware: [routerMiddleware, thunk],
});

export default store;
export const history = createReduxHistory(store);
