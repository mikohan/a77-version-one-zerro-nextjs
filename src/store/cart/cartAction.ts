// third-party
import { Dispatch } from 'redux';
// application
import { ICartItemOption } from '~/store/cart/cartTypes';
import { IProduct } from '~/interfaces/product';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_UPDATE_QUANTITIES,
  CartAddItemAction,
  CartItemQuantity,
  CartRemoveItemAction,
  CartUpdateQuantitiesAction,
  CART_CLEAR_CART,
  ICartClearCartAction,
} from '~/store/cart/cartActionTypes';

export function clearCart(): ICartClearCartAction {
  console.log('Triggered');
  return {
    type: CART_CLEAR_CART,
  };
}
export function cartAddItemSuccess(
  product: IProduct,
  options: ICartItemOption[] = [],
  quantity = 1
): CartAddItemAction {
  return {
    type: CART_ADD_ITEM,
    product,
    options,
    quantity,
  };
}

export function cartRemoveItemSuccess(itemId: number): CartRemoveItemAction {
  return {
    type: CART_REMOVE_ITEM,
    itemId,
  };
}

export function cartUpdateQuantitiesSuccess(
  quantities: CartItemQuantity[]
): CartUpdateQuantitiesAction {
  return {
    type: CART_UPDATE_QUANTITIES,
    quantities,
  };
}

export function cartAddItem(
  product: IProduct,
  options: ICartItemOption[] = [],
  quantity = 1
): any {
  // sending request to server, timeout is used as a stub
  return (dispatch: Dispatch) =>
    new Promise((resolve: any) => {
      setTimeout(() => {
        dispatch(cartAddItemSuccess(product, options, quantity));
        resolve();
      }, 250);
    });
}

export function cartRemoveItem(itemId: number): any {
  // sending request to server, timeout is used as a stub
  return (dispatch: Dispatch) =>
    new Promise((resolve: any) => {
      setTimeout(() => {
        dispatch(cartRemoveItemSuccess(itemId));
        resolve();
      }, 250);
    });
}

export function cartUpdateQuantities(quantities: CartItemQuantity[]): any {
  // sending request to server, timeout is used as a stub
  return (dispatch: Dispatch) =>
    new Promise((resolve: any) => {
      setTimeout(() => {
        dispatch(cartUpdateQuantitiesSuccess(quantities));
        resolve();
      }, 250);
    });
}
