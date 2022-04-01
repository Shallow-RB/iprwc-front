import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ProductModel} from "./product.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService{

  private readonly apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiURL;
  }

  getAllProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.apiUrl + "/product/getproducts")
  }
}
