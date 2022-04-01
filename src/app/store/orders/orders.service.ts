import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "../../security/authentication.service";
import {ShoppingcartService} from "../shoppingcart/shoppingcart.service";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private readonly apiUrl: string;
  cart = this.cartService.getCartData();

  postData = {
    products: this.getProductIdFromLS(),
  }

  constructor(private http: HttpClient, private authService: AuthenticationService, private cartService: ShoppingcartService) {
    this.apiUrl = environment.apiURL;
  }

  getOrdersById(): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl+ "/order")
  }

  public createOrder() {

    const options = {
      headers: new HttpHeaders().set("Content-Type", "application/json")
    }

    return this.http.post<any>(this.apiUrl + "/order", JSON.stringify(this.postData), options)
      .subscribe(
        error => {
          console.log(error)
        }
      )
  }

  getProductIdFromLS() {
    let productIdList = [];

    for (let product of this.cart) {
      productIdList.push(product.id)
    }
    return productIdList;

  }
}

