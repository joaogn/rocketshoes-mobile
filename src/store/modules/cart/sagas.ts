import { Alert } from 'react-native';
import { AnyAction } from 'redux';
import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
import {
  addToCartSuccess,
  updateAmountSuccess,
  removeFromCart,
} from './actions';

import { ApplicationState } from '../../index';
import { formatPrice } from '../../../util/format';
import NavigationService from '../../../services/navigate';

interface AddCartSagaTypes extends AnyAction {
  id: number;
}

interface UpdateAmountSagaTypes extends AnyAction {
  id: number;
  amount: number;
}

function* addToCart({ id }: AddCartSagaTypes) {
  const productExist = yield select((state: ApplicationState) =>
    state.cart.find(p => p.id === id)
  );
  console.tron.log(yield select((state: ApplicationState) => state.cart));
  const stock = yield call(api.get, `/stock/${id}`);

  const stockAmount = stock.data.amount;
  const currentAmount = productExist ? productExist.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    Alert.alert('Produto fora do estoque');
    return;
  }

  if (productExist) {
    yield put(updateAmountSuccess(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);
    const data = {
      ...response.data,
      amount: 1,
      priceFormatterd: formatPrice(response.data.price),
    };
    yield put(addToCartSuccess(data));
    NavigationService.navigate('Cart');
  }
}

function* updateAmount({ id, amount }: UpdateAmountSagaTypes) {
  if (amount && amount <= 0) {
    yield put(removeFromCart(id));
    return;
  }

  const stock = yield call(api.get, `/stock/${id}`);
  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    Alert.alert('Produto fora do estoque');
    return;
  }

  yield put(updateAmountSuccess(id, amount));
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
