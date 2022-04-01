import {ProductModel} from "../product/product.model";
import {AuthenticationService} from "../../security/authentication.service";
import {Injectable, Renderer2, RendererFactory2} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingcartService {
  placeholder: ProductModel[] = [];

  loggedIn = false;
  renderer: Renderer2;


  constructor(private authService: AuthenticationService, rendererFactory: RendererFactory2) {
    authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.loggedIn = isLoggedIn
    })
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  addToCart(product: ProductModel, event: MouseEvent) {
    const ls = this.getCartData();
    let exists: ProductModel;

    if (ls) {
      exists = ls.find((item) => {
        return item.id === product.id;
      })

      if (!exists) {
        ls.push(product)
        this.setCartData(ls);
        this.changeButtonColor(event, 'success')
      } else {
        this.changeButtonColor(event, 'fail')
      }
    }
  }

  changeButtonColor($event: MouseEvent, className: string) {
    this.renderer.addClass($event.target, className)
  }
  setCartData(data: any[]) {
    localStorage.setItem('cart', JSON.stringify(data));
  }
  getCartData(): any[] {
    return JSON.parse(localStorage.getItem('cart') || "[]");
  }

}
