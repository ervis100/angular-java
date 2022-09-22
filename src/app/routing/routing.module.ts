import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/auth/login/login.component';
import { RegisterComponent } from '../components/auth/register/register.component';
import { UserComponent } from '../components/user/user.component';
import { AuthGuard } from '../general/guards/auth.guard';
import { ClientComponent } from '../components/client/client.component';
import { EditClientComponent } from '../components/edit-client/edit-client.component';
import { OrderReportComponent } from '../components/order-report/order-report.component';
import { OrderDetailsComponent } from '../components/order-details/order-details.component';
import { NewOrderComponent } from '../components/new-order/new-order.component';

const routes: Routes = [
  {path : "login" , component : LoginComponent},
  {path : "register" , component : RegisterComponent},
  {path : "users" , component: UserComponent , canActivate:[AuthGuard]},
  {path : "clients" , component: ClientComponent , canActivate:[AuthGuard] , children:[
    {path: "new" , component: EditClientComponent},
    {path: ":id/edit" , component: EditClientComponent}
  ]},
  {path:"client/:id/orders" , component:OrderReportComponent , canActivate:[AuthGuard] , children:[
    {path:"new" , component: NewOrderComponent},
    {path:':order/details' , component:OrderDetailsComponent}
  ] }
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
