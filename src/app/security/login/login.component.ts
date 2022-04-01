import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthenticationService) {
  }

  submit(f: NgForm) {
    if (f.invalid) {
      return
    }

    let username: string = f.value.username;
    let password: string = f.value.password;
    this.authService.login(username, password);
  }

  public ngOnInit(): void {
  }


}
