import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/general/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient , private authService:AuthService) { }
  loginForm: FormGroup;
  hide = true
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'usernameOrEmail': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(5)])
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
     this.authService.login(this.loginForm.value); 
    }
  }

}
