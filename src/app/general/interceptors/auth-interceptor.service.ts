import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, Observable, take } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private authService:AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler){
        return this.authService.auth.pipe(
            take(1),
            exhaustMap(auth => {
                if(!auth){
                    return next.handle(req);
                }               
                console.log(req.headers.append('Authorization' , 'Bearer '+auth.token))
                
                const modRequest = req.clone({
                    headers : req.headers.set('Authorization' , 'Bearer '+auth.token)
                })
                return next.handle(modRequest);
            })
        );
    }
}