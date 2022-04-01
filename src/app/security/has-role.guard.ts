import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from "./authentication.service";
import {Role} from "./role";
import decode from "jwt-decode";
import {Jwt} from "./jwt";
import {JwtHelperService} from "@auth0/angular-jwt";

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let roles = <Role> route.data["roles"]
    const token = localStorage.getItem("access_token")

    if (!token || jwtHelper.isTokenExpired(token)) {
      this.authService.logout();
      return false;
    }
    if (!roles)
      roles = Role.ROLE_USER

    const payload = <Jwt> decode(token)

    if (!this.authService.isLoggedIn$ || !payload.roles.includes(roles)) {
      // this.authService.logout()
      this.router.navigateByUrl('/login')
      return false
    }

    return true
  }

}
