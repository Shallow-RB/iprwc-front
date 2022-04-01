import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserModel} from "./user.model";
import {BehaviorSubject, Observable, of} from "rxjs";
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from "../../environments/environment";

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl: string;

  public invalidCredentials: boolean = false;
  public usernameTaken: boolean = false;
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  user!: UserModel;

  constructor(private http: HttpClient, private _router: Router) {
    this._isLoggedIn$.next(!!this.token);
    this.user = this.getUser(<string>this.token)
    this.apiUrl = environment.apiURL;
  }

  get token(): any {
    return localStorage.getItem('access_token');
  }

  public register(name: string, username: string, password: string) {
    const options = {
      headers: new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
    }

    const regBody = new URLSearchParams();
    regBody.set("name", name)
    regBody.set("username", username)
    regBody.set("password", password)

    return this.http.post<any>(this.apiUrl+ "/user/register", regBody, options)
      .subscribe(() => {
          this._router.navigateByUrl("/login");
        },
        error => {
          this.usernameTaken = true;
          console.log(error);
        }
      )

  }

  public login(username: string, password: string) {
    const options = {
      headers: new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
    }

    const body = new URLSearchParams();
    body.set("username", username)
    body.set("password", password)

    return this.http.post<any>(this.apiUrl + "/login", body, options)
      .subscribe(
        data => {
          localStorage.setItem("username", username);
          localStorage.setItem("access_token", <string>Object.values(data)[0]);
          localStorage.setItem("refresh_token", <string>Object.values(data)[1]);
          this.user = this.getUser(<string>this.token)
          this._isLoggedIn$.next(true);
          this.invalidCredentials = false;
          this._router.navigateByUrl("");
        }, error => {
          this.invalidCredentials = true;
          console.log(error);
        }
      )
  }

  public getUser(token: string): UserModel {
    return jwtHelper.decodeToken(token)
  }

  loginStatus(): Observable<boolean> {
    const token = localStorage.getItem("access_token")
    return token !== null ? of(!jwtHelper.isTokenExpired(token)) : of(false);
  }

  logout() {
    localStorage.clear();
    this._isLoggedIn$.next(false);
    this._router.navigateByUrl("");
    // window.location.reload();
  }



}

