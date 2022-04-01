import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {LoginComponent} from './security/login/login.component';
import {RegisterComponent} from './security/register/register.component';
import {HomepageComponent} from './homepage/homepage.component';
import {ShoppingcartComponent} from './store/shoppingcart/shoppingcart.component';
import {StoreComponent} from './store/store.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ProductComponent} from './store/product/product.component';
import {ProductListComponent} from './store/product-list/product-list.component';
import {FormsModule} from "@angular/forms";
import {VideoComponent} from './shared/video/video.component';
import {FooterComponent} from './shared/footer/footer.component';
import {ProfileComponent} from './profile/profile.component';
import {OrdersComponent} from './store/orders/orders.component';
import {AuthInterceptor} from "./security/auth.interceptor";
import {NotfoundPageComponent} from './notfound-page/notfound-page.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    ShoppingcartComponent,
    StoreComponent,
    ProductComponent,
    ProductListComponent,
    VideoComponent,
    FooterComponent,
    ProfileComponent,
    OrdersComponent,
    NotfoundPageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NoopAnimationsModule,
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
