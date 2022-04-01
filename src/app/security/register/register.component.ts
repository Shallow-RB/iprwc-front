import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  showErrorMessage: any;

  constructor(public authService: AuthenticationService) {
  }

  submit(f: NgForm) {
    if (f.invalid) {
      return
    }
    let name: string = f.value.name;
    let username: string = f.value.username;
    let password: string = f.value.password;

    this.submitRegister(name, username, password);
  }

  public submitRegister(name: string, username: string, password: string) {
    return this.authService.register(name, username, password);
  }

  ngOnInit(): void {
  }

}
