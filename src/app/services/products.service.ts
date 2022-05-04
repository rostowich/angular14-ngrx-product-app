import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/product.model";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({providedIn:"root"})
export class ProductsService{

  constructor(private http:HttpClient) {
  }

  getAllProducts() : Observable<Product[]>{
    return this.http.get<Product[]>(environment.host+"/products");
  }

  getSelectedProducts() : Observable<Product[]>{
    return this.http.get<Product[]>(environment.host+"/products?selected=true");
  }

  getAvailableProducts() : Observable<Product[]>{
    return this.http.get<Product[]>(environment.host+"/products?available=true");
  }

  searchProducts(keyword:string) : Observable<Product[]>{
    return this.http.get<Product[]>(environment.host+"/products?name_like="+keyword);
  }

  select(product:Product) : Observable<Product>{
    product.selected = !product.selected;
    return this.http.put<Product>(environment.host+"/products/"+product.id, product);
  }

  delete(product:Product) : Observable<void>{
    return this.http.delete<void>(environment.host+"/products/"+product.id);
  }

  save(product:Product) : Observable<Product>{
    return this.http.post<Product>(environment.host+"/products", product);
  }

  getAProduct(id:number) : Observable<Product>{
    return this.http.get<Product>(environment.host+"/products/"+id);
  }

  updateProduct(product:Product) : Observable<Product>{
    return this.http.put<Product>(environment.host+"/products/"+product.id, product);
  }
}
