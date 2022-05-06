import {Product} from "../product.model";
import {NoAction, ProductsAction, ProductsActionsTypes} from "./products.actions";
import {Action} from "@ngrx/store";

export enum ProductsStateEnum{
  LOADING = "Loading",
  LOADED = "Loaded",
  ERROR = "Error",
  INITIAL = "Initial",
  NEW = "New",
  EDIT = "Edit",
  UPDATED = "UPDATED",
}

export interface ProductsState{
  products : Product[],
  errorMessage : string,
  dataState :  ProductsStateEnum,
  currentProduct :  Product | null,
  currentAction : ProductsAction | {type:  ProductsActionsTypes.NO_ACTION, payload : {}}
}

const initState : ProductsState ={
  products : [],
  errorMessage : "",
  dataState : ProductsStateEnum.INITIAL,
  currentProduct :  null,
  currentAction : {type:  ProductsActionsTypes.NO_ACTION, payload : {}}
}

export function productsReducer(state : ProductsState = initState, action : Action) : ProductsState{
  switch (action.type) {
    case ProductsActionsTypes.GET_ALL_PRODUCTS:
      return {...state, dataState : ProductsStateEnum.LOADING, currentAction : <ProductsAction>action}
    case ProductsActionsTypes.GET_ALL_PRODUCTS_SUCCESS:
      return {...state, dataState : ProductsStateEnum.LOADED, products : (<ProductsAction>action).payload, currentAction : <ProductsAction>action}
    case ProductsActionsTypes.GET_ALL_PRODUCTS_ERROR:
      return {...state, dataState : ProductsStateEnum.ERROR, errorMessage : (<ProductsAction>action).payload, currentAction : <ProductsAction>action}

    /** Get Selected products */
    case ProductsActionsTypes.GET_SELECTED_PRODUCTS:
      return {...state, dataState : ProductsStateEnum.LOADING, currentAction : <ProductsAction>action}
    case ProductsActionsTypes.GET_SELECTED_PRODUCTS_SUCCESS:
      return {...state, dataState : ProductsStateEnum.LOADED, products : (<ProductsAction>action).payload, currentAction : <ProductsAction>action}
    case ProductsActionsTypes.GET_SELECTED_PRODUCTS_ERROR:
      return {...state, dataState : ProductsStateEnum.ERROR, errorMessage : (<ProductsAction>action).payload, currentAction : <ProductsAction>action}

    /** Search products */
    case ProductsActionsTypes.SEARCH_PRODUCTS:
      return {...state, dataState : ProductsStateEnum.LOADING, currentAction : <ProductsAction>action}
    case ProductsActionsTypes.SEARCH_PRODUCTS_SUCCESS:
      return {...state, dataState : ProductsStateEnum.LOADED, products : (<ProductsAction>action).payload, currentAction : <ProductsAction>action}
    case ProductsActionsTypes.SEARCH_PRODUCTS_ERROR:
      return {...state, dataState : ProductsStateEnum.ERROR, errorMessage : (<ProductsAction>action).payload, currentAction : <ProductsAction>action}

    /** Select product */
    case ProductsActionsTypes.SELECT_PRODUCT:
      return {...state, dataState : ProductsStateEnum.LOADING, currentAction : <ProductsAction>action}
    case ProductsActionsTypes.SELECT_PRODUCT_SUCCESS:
      let product : Product = (<ProductsAction>action).payload;
      let listProducts = [...state.products];
      let data : Product[] = listProducts.map(p => p.id == product.id ? product : p);
      return {...state, dataState : ProductsStateEnum.LOADED, products : data, currentAction : <ProductsAction>action}
    case ProductsActionsTypes.SEARCH_PRODUCTS_ERROR:
      return {...state, dataState : ProductsStateEnum.ERROR, errorMessage : (<ProductsAction>action).payload, currentAction : <ProductsAction>action}

    /** Delete product */
    case ProductsActionsTypes.DELETE_PRODUCT:
      return {...state, dataState : ProductsStateEnum.LOADING, currentAction : <ProductsAction>action}
    case ProductsActionsTypes.DELETE_PRODUCT_SUCCESS:
      let productDeleted : Product = (<ProductsAction>action).payload;
      let index = state.products.indexOf(productDeleted);
      let productList = [...state.products];
      productList.splice(index,1);
      return {...state, dataState : ProductsStateEnum.LOADED, products : productList, currentAction : <ProductsAction>action}
    case ProductsActionsTypes.DELETE_PRODUCT_ERROR:
      return {...state, dataState : ProductsStateEnum.ERROR, errorMessage : (<ProductsAction>action).payload, currentAction : <ProductsAction>action}

    /** New product */
    case ProductsActionsTypes.NEW_PRODUCT:
      return {...state, dataState : ProductsStateEnum.LOADING, currentAction : <ProductsAction>action}
    case ProductsActionsTypes.NEW_PRODUCT_SUCCESS:
      return {...state, dataState : ProductsStateEnum.NEW, currentAction : <ProductsAction>action}
    case ProductsActionsTypes.NEW_PRODUCT_SUCCESS:
      return {...state, dataState : ProductsStateEnum.ERROR, errorMessage : (<ProductsAction>action).payload, currentAction : <ProductsAction>action}

    /** Save product */
    case ProductsActionsTypes.SAVE_PRODUCT:
      return {...state, dataState : ProductsStateEnum.LOADING, currentAction : <ProductsAction>action}
    case ProductsActionsTypes.SAVE_PRODUCT_SUCCESS:
      let prods = [...state.products];
      prods.push((<ProductsAction>action).payload)
      return {...state, dataState : ProductsStateEnum.LOADED, products : prods, currentAction : <ProductsAction>action}
    case ProductsActionsTypes.SAVE_PRODUCT_ERROR:
      return {...state, dataState : ProductsStateEnum.ERROR, errorMessage : (<ProductsAction>action).payload, currentAction : <ProductsAction>action}

    /** Edit product */
    case ProductsActionsTypes.EDIT_PRODUCT:
      return {...state, dataState : ProductsStateEnum.LOADING, currentAction : <ProductsAction>action}
    case ProductsActionsTypes.EDIT_PRODUCT_SUCCESS:
      return {...state, dataState : ProductsStateEnum.LOADED, currentProduct : (<ProductsAction>action).payload, currentAction : <ProductsAction>action}
    case ProductsActionsTypes.EDIT_PRODUCT_ERROR:
      return {...state, dataState : ProductsStateEnum.ERROR, errorMessage : (<ProductsAction>action).payload, currentAction : <ProductsAction>action}

    /** Update product */
    case ProductsActionsTypes.UPDATE_PRODUCT:
      return {...state, dataState : ProductsStateEnum.LOADING, currentAction : <ProductsAction>action}
    case ProductsActionsTypes.UPDATE_PRODUCT_SUCCESS:
      let updatedProduct : Product = (<ProductsAction>action).payload;
      let updatedProducts : Product[] = state.products.map(product => product.id == updatedProduct.id ? updatedProduct : product);
      return {...state, dataState : ProductsStateEnum.UPDATED, products : updatedProducts, currentProduct : (<ProductsAction>action).payload, currentAction : <ProductsAction>action}
    case ProductsActionsTypes.UPDATE_PRODUCT_ERROR:
      return {...state, dataState : ProductsStateEnum.ERROR, errorMessage : (<ProductsAction>action).payload, currentAction : <ProductsAction>action}

    default : return {...state}
  }

}

