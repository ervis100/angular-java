import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, tap , pipe, last } from "rxjs";
import { Auth } from "./Auth.model";

@Injectable({providedIn: 'root'})
export class AuthService{
    auth = new BehaviorSubject<Auth>(null);

    constructor(
      private http:HttpClient , 
      private router:Router,
      ) {}

    login(userData) {
      return this.http.post<any>('http://localhost:8080/api/auth/get-token', userData).pipe(
        tap( result => {
          console.log(result)
          const auth = new Auth(
            result.user.email , 
            result.user.username , 
            result.user.name , 
            //result.roles[0].name , 
            result.token.accessToken , 
            result.token.expiredDate
            )
            console.log(auth)
            this.auth.next(auth);
            localStorage.setItem('userData' , JSON.stringify(auth));
        })
      )
      .subscribe(result => {
        this.router.navigate(['users'])
      })
    }

    autoLogin() {
      const authenticated = JSON.parse(localStorage.getItem('userData'));
      if(!authenticated ) {
        return false
      }
      let lastLog = new Auth(
        authenticated.email, 
        authenticated.username,
        authenticated.name,
        authenticated._token,
        authenticated.tokenExpiration)
      if(lastLog.token) {
        this.auth.next(lastLog)
        // this.router.navigate(['users'])
      }
      return null
    }

    logout() {
      this.auth.next(null)
      localStorage.removeItem('userData');
      this.router.navigate(['/login'])
    }

    autoLogout(expirationDuration:number) {
      setTimeout(()=>{
        this.logout();
      } , expirationDuration)
    }
}