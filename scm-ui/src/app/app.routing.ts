import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AdminComponent} from './admin/admin.component';
import {SignupComponent} from './pages/signup/signup.component';
import {SigninComponent} from './pages/signin/signin.component';
import { AuthGuardService as AuthGuard } from './core/auth-guard.service';
const routes: Routes = [
  {path: '', redirectTo: 'apps/navigation', pathMatch: 'full'},
  {path: 'home', loadChildren: './home/home.module#HomeModule'},
  {path: 'sigin', component: SigninComponent},
  {path: 'sigup', component: SignupComponent},
  {
    path: '', component: AdminComponent, children: [
      {path: 'apps/navigation', loadChildren: './navigation/navigation.module#NavigationModule'},
      {path: 'pages', loadChildren: './pages/pages.module#PagesModule'},
      {path: 'page-layouts', loadChildren: './page-layouts/page-layouts.module#PageLayoutsModule'}
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
