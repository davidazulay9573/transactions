import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './ui/pages/auth/signin/signin.component';
import { SignupComponent } from './ui/pages/auth/signup/signup.component';
import { TransactionsComponent } from './ui/pages/transactions/transactions.component';
import { SendTransactionComponent } from './ui/pages/transactions/send-transaction/send-transaction.component';

import { routeGuard } from './guards/route.guard';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'signup', component: SignupComponent, canActivate : [authGuard] },
  { path: 'signin', component: SigninComponent, canActivate : [authGuard] },
  { path: 'transactions', component: TransactionsComponent, canActivate: [routeGuard] },
  { path: 'transactions/send', component: SendTransactionComponent, canActivate: [routeGuard] },

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
