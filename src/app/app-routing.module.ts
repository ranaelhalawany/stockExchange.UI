import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrderDashboardComponent } from './components/order-dashboard/order-dashboard.component';
import { NewOrderComponent } from './components/new-order/new-order.component';
import { StockHistoryComponent } from './components/stock-history/stock-history.component';




const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'orders', component: OrderDashboardComponent},
  {path:'order/create', component: NewOrderComponent},
  {path:'stock/history', component:StockHistoryComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
