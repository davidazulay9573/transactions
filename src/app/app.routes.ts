import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { TransactionComponent } from './pages/transactions/transactions.component';
import { routeGuard } from './guards/route.guard';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'signup', component: SignupComponent, canActivate : [authGuard] },
  { path: 'signin', component: SigninComponent, canActivate : [authGuard] },
  { path: 'transactions', component: TransactionComponent, canActivate: [routeGuard] },
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: '**', redirectTo: 'signup' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  static getRoutes() {
    return routes;
  }
}
