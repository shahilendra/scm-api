import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { OrganisationsComponent } from './organisations/organisations.component';
import { OrganisationComponent } from './organisations/organisation/organisation.component';
import { MenusComponent } from './menus/menus.component';
import { RolesComponent } from './roles/roles.component';


const routes: Routes = [
   {
    path: 'users',
    component: UsersComponent
  }, {
    path: 'profile',
    component: ProfileComponent
  }, {
    path: 'organisations',
    component: OrganisationsComponent
  }, {
    path: 'organisations/:id',
    component: OrganisationComponent
  }, {
    path: 'menus',
    component: MenusComponent
  }, {
    path: 'roles',
    component: RolesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule {
}
