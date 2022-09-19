import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RoutingModule } from './routing/routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


import { MaterialModule } from './material/material.module';
import { UserComponent } from './components/user/user.component';
import { AlertComponent } from './components/alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { DialogComponent } from './components/dialog/dialog.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthInterceptorService } from './general/interceptors/auth-interceptor.service';
import { ClientComponent } from './components/client/client.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    AlertComponent,
    DropdownDirective,
    DialogComponent,
    NavbarComponent,
    ClientComponent,
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS , useClass:AuthInterceptorService , multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
