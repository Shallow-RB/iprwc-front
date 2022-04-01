import {Component, OnInit, Renderer2, RendererFactory2} from '@angular/core';
import {ShoppingcartService} from "./shoppingcart.service";
import {ProductModel} from "../product/product.model";
import {OrdersService} from "../orders/orders.service";

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss']
})
export class ShoppingcartComponent implements OnInit {

  username = localStorage.getItem('username');
  totalPrice: number = 0.00;
  private renderer: Renderer2;
  constructor(public cartService: ShoppingcartService, private orderService: OrdersService, rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  ngOnInit(): void {
    this.calculateTotal()
  }

  calculateTotal() {
    let sum: number = 0
    let cart = this.cartService.getCartData();
    if (cart.length != 0){
      for (let j of cart) {
        sum += j.price;
        this.totalPrice = sum
      }
    } else {
      this.totalPrice = 0
    }

  }

  onDelete(item: ProductModel) {
    const data = this.cartService.getCartData()
    const removeItem = () => {
      return data.filter(obj => obj.id !== item.id)
    }
    this.cartService.setCartData(removeItem())

    this.calculateTotal()
  }

  createOrder(event: MouseEvent){
    this.orderService.createOrder();
    this.changeButtonColor(event, 'success')
    localStorage.removeItem('cart')
    this.totalPrice = 0
  }

  changeButtonColor($event: MouseEvent, className: string) {
    this.renderer.addClass($event.target, className)
  }
}

