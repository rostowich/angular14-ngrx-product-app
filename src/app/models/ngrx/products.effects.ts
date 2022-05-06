import {Injectable} from "@angular/core";
import {ProductsService} from "../../services/products.service";
import {catchError, map, mergeMap, Observable, of} from "rxjs";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  DeleteProductActionError,
  DeleteProductActionSuccess, EditProductActionError, EditProductActionSuccess,
  GetAllProductsActionError,
  GetAllProductsActionSuccess,
  GetSelectedProductsActionError,
  GetSelectedProductsActionSuccess, NewProductAction, NewProductActionSuccess,
  ProductsAction,
  ProductsActionsTypes, SaveProductActionError, SaveProductActionSuccess,
  SearchProductsActionError,
  SearchProductsActionSuccess,
  SelectProductActionError,
  SelectProductActionSuccess, UpdateProductActionError, UpdateProductActionSuccess
} from "./products.actions";

@Injectable()
export class ProductsEffects{
  constructor(private productService : ProductsService,
              private effectActions :  Actions) {
  }

  getAllProductsEffect : Observable<ProductsAction> = createEffect(
    () => this.effectActions.pipe(
      ofType(ProductsActionsTypes.GET_ALL_PRODUCTS),
      mergeMap(()=>{
        return this.productService.getAllProducts().pipe(
          map((products) => new GetAllProductsActionSuccess(products)),
          catchError((err)=> of(new GetAllProductsActionError(err.message)))
        );
      })
    )
  )

  getSelectedProductsEffect : Observable<ProductsAction> = createEffect(
    () => this.effectActions.pipe(
      ofType(ProductsActionsTypes.GET_SELECTED_PRODUCTS),
      mergeMap(()=>{
        return this.productService.getSelectedProducts().pipe(
          map((products) => new GetSelectedProductsActionSuccess(products)),
          catchError((err)=> of(new GetSelectedProductsActionError(err.message)))
        );
      })
    )
  )

  searchProductsEffect : Observable<ProductsAction> = createEffect(
    () => this.effectActions.pipe(
      ofType(ProductsActionsTypes.SEARCH_PRODUCTS),
      mergeMap((action : ProductsAction)=>{
        return this.productService.searchProducts(action.payload).pipe(
          map((products) => new SearchProductsActionSuccess(products)),
          catchError((err)=> of(new SearchProductsActionError(err.message)))
        );
      })
    )
  )

  selectProductEffect : Observable<ProductsAction> = createEffect(
    () => this.effectActions.pipe(
      ofType(ProductsActionsTypes.SELECT_PRODUCT),
      mergeMap((action : ProductsAction)=>{
        return this.productService.select(action.payload).pipe(
          map((product) => new SelectProductActionSuccess(product)),
          catchError((err)=> of(new SelectProductActionError(err.message)))
        );
      })
    )
  )

  deleteProductEffect : Observable<ProductsAction> = createEffect(
    () => this.effectActions.pipe(
      ofType(ProductsActionsTypes.DELETE_PRODUCT),
      mergeMap((action : ProductsAction)=>{
        return this.productService.delete(action.payload.id).pipe(
          map(() => new DeleteProductActionSuccess(action.payload)),
          catchError((err)=> of(new DeleteProductActionError(err.message)))
        );
      })
    )
  )

  newProductEffect : Observable<ProductsAction> = createEffect(
    () => this.effectActions.pipe(
      ofType(ProductsActionsTypes.NEW_PRODUCT),
      map((action : ProductsAction)=>{
        return new NewProductActionSuccess({});
      })
    )
  )

  saveProductEffect : Observable<ProductsAction> = createEffect(
    () => this.effectActions.pipe(
      ofType(ProductsActionsTypes.SAVE_PRODUCT),
      mergeMap((action : ProductsAction)=>{
        return this.productService.save(action.payload).pipe(
          map((product) => new SaveProductActionSuccess(product)),
          catchError((err)=> of(new SaveProductActionError(err.message)))
        );
      })
    )
  )

  editProductEffect : Observable<ProductsAction> = createEffect(
    () => this.effectActions.pipe(
      ofType(ProductsActionsTypes.EDIT_PRODUCT),
      mergeMap((action : ProductsAction)=>{
        return this.productService.getAProductById(action.payload).pipe(
          map((product) => new EditProductActionSuccess(product)),
          catchError((err)=> of(new EditProductActionError(err.message)))
        );
      })
    )
  )

  updateProductEffect : Observable<ProductsAction> = createEffect(
    () => this.effectActions.pipe(
      ofType(ProductsActionsTypes.UPDATE_PRODUCT),
      mergeMap((action : ProductsAction)=>{
        return this.productService.updateProduct(action.payload).pipe(
          map((product) => new UpdateProductActionSuccess(product)),
          catchError((err)=> of(new UpdateProductActionError(err.message)))
        );
      })
    )
  )

 }
