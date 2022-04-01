import {Component, OnInit} from '@angular/core';
import {OrdersService} from "../store/orders/orders.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {OrdersModel} from "../store/orders/orders.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private readonly apiUrl: string;
  public username = localStorage.getItem('username');
  public orders: OrdersModel[]= [];

  constructor(private http: HttpClient, private orderService: OrdersService) {
    this.apiUrl = environment.apiURL;
  }

  ngOnInit(): void {
    this.orderService.getOrdersById().subscribe(data => this.orders = data)
  }


}
