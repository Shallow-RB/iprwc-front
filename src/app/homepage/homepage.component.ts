import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../security/authentication.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  public username = localStorage.getItem('username');

  constructor(public authService: AuthenticationService) {
  }

  ngOnInit(): void {
    const video = document.getElementById("spaceVideo");
    // @ts-ignore
    video.playbackRate = 3;
    this.authService.loginStatus()
  }
}
