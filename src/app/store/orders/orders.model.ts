import {ProductModel} from "../product/product.model";

export interface OrdersModel {
  orderId: number
  userId: number
  products: ProductModel[]
}
