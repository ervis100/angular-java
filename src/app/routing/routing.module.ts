import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/auth/login/login.component';
import { RegisterComponent } from '../components/auth/register/register.component';
import { UserComponent } from '../components/user/user.component';
import { AuthGuard } from '../general/guards/auth.guard';
import { ClientComponent } from '../components/client/client.component';

const routes: Routes = [
  {path : "login" , component : LoginComponent},
  {path : "register" , component : RegisterComponent},
  {path : "users" , component: UserComponent , canActivate:[AuthGuard]},
  {path : "clients" , component: ClientComponent , canActivate:[AuthGuard]},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
