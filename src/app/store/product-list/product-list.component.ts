import {Component, OnInit} from '@angular/core';
import {ProductService} from "../product/product.service";
import {ProductModel} from "../product/product.model";
import {ShoppingcartService} from "../shoppingcart/shoppingcart.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {

  public products: ProductModel[] = [];

  constructor(private _productService: ProductService, private _cartService: ShoppingcartService) {
  }

  ngOnInit() {
    this._productService.getAllProducts().subscribe(data => this.products = data)
  }

  addToCart(product: ProductModel, $event: MouseEvent) {
    this._cartService.addToCart(product, $event)

  }
}

