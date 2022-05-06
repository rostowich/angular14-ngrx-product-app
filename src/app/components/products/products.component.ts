import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {map, Observable} from "rxjs";
import {ProductsState, ProductsStateEnum} from "../../models/ngrx/products.reducer";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productState$ :  Observable<ProductsState> | null = null;
  readonly ProductsStateEnum = ProductsStateEnum;
  constructor(private store : Store<any>) { }

  ngOnInit(): void {
    this.productState$ = this.store.pipe(
      map((state)=> state.catalogState)
    );
  }

}
