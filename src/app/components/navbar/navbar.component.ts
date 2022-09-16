import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/general/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService , private router:Router) { }
  isAuth:boolean = false;

  ngOnInit(): void {
    this.authService.auth.subscribe(
      (auth) => {
        this.isAuth = !!auth;
      }
    )
  }

  logout() {
    this.authService.logout();
  }
}
