import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private _loginService: LoginService) { }

  ngOnInit(): void {
  }

  settingsClick() {
      this.router.navigate(['/settings']);
  }

  dataClick() {
      this.router.navigate(['/data']);
  }
    
  logoutClick() {
    this._loginService.loggedIn = false;
    this.router.navigate(['/login']);
  }

}
