import { Component, OnInit } from '@angular/core';
import { AuthService } from './general/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'management-system';

  constructor(private authService:AuthService) {}
  
  ngOnInit() {
    this.authService.autoLogin()
  }
}
