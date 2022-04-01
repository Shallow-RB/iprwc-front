import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {LoginComponent} from './security/login/login.component';
import {StoreComponent} from "./store/store.component";
import {RegisterComponent} from "./security/register/register.component";
import {ShoppingcartComponent} from "./store/shoppingcart/shoppingcart.component";
import {HasRoleGuard} from "./security/has-role.guard";
import {Role} from "./security/role";
import {IsAuthenticatedGuard} from "./security/is-authenticated.guard";
import {ProfileComponent} from "./profile/profile.component";
import {NotfoundPageComponent} from "./notfound-page/notfound-page.component";

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'homepage', component: HomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '404', component: NotfoundPageComponent},
  {
    path: 'product',
    component: StoreComponent,
    canActivate: [IsAuthenticatedGuard, HasRoleGuard],
    data: {role: Role.ROLE_USER}
  },
  {
    path: 'shoppingcart', component: ShoppingcartComponent,
    canActivate: [IsAuthenticatedGuard, HasRoleGuard],
    data: {
      role: Role.ROLE_USER
    }
  },
  {
    path: 'profile', component: ProfileComponent,
    canActivate: [IsAuthenticatedGuard, HasRoleGuard],
    data: {
      role: Role.ROLE_USER
    }
  },

  {
    path: '**', redirectTo: '404',
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
