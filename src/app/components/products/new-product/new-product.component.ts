import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductsState, ProductsStateEnum} from "../../../models/ngrx/products.reducer";
import {Store} from "@ngrx/store";
import {NewProductAction, SaveProductAction} from "../../../models/ngrx/products.actions";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  productFormGroup : FormGroup | null = null;
  state :  ProductsState | null = null;
  readonly ProductsStateEnum = ProductsStateEnum;
  submitted : boolean = false;
  constructor(private store : Store<any>, private formBuilder :  FormBuilder) { }

  ngOnInit(): void {
    this.store.dispatch(new NewProductAction({}));
    this.store.subscribe(state => {
      this.state = state.catalogState;
      if(this.state?.dataState == ProductsStateEnum.NEW){
        this.productFormGroup = this.formBuilder.group({
          name : ["",Validators.required],
          price : [0,Validators.required],
          quantity : [0,Validators.required],
          selected : [true,Validators.required],
          available : [true,Validators.required]
        })
      }

    })
  }

  newProduct() {
    this.store.dispatch(new NewProductAction({}));
  }

  onSaveProduct() {
    this.submitted = true;
    if(!this.productFormGroup?.valid) return
    this.store.dispatch(new SaveProductAction(this.productFormGroup?.value));
  }
}
