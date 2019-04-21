import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { PagesRoutingModule } from './pages.routing';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';

import { BaseLayoutModule } from '../layouts/index';
import { UsersComponent } from './users/users.component';
import { UsersService } from './users/users.service';
import { DeleteComponent } from './users/delete/delete.component';
import { EditComponent } from './users/edit/edit.component';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { OrganisationsComponent } from './organisations/organisations.component';
import { OrganisationsService } from './organisations/organisations.service';
import { OrganisationComponent } from './organisations/organisation/organisation.component';
import { OrganisationDeleteComponent } from './organisations/organisation-delete/organisation-delete.component';
import { RolesComponent } from './roles/roles.component';
import { RoleComponent } from './roles/role/role.component';
import { RoleDeleteComponent } from './roles/role-delete/role-delete.component';
import { MenusComponent } from './menus/menus.component';
import { MenuComponent } from './menus/menu/menu.component';
import { MenuDeleteComponent } from './menus/menu-delete/menu-delete.component';
import { RolesService } from './roles/roles.service';
import { MenusService } from './menus/menus.service';

import {MaterialComponentsModule} from '../shared/material.module';
// import {CdkTableModule} from '@angular/cdk/table';
import {  MatTableModule
} from '@angular/material';

import { PaymentGatewaysDetailsDeleteComponent } from './organisations/organisation/payment-gateways-details-delete/payment-gateways-details-delete.component';
import { PaymentGatewaysDetailsComponent } from './organisations/organisation/payment-gateways-details/payment-gateways-details.component';
import { PaymentGatewaysDetailsService } from './organisations/organisation/payment-gateways-details.service';

@NgModule({
  imports: [
    SharedModule,
    PagesRoutingModule,
    BaseLayoutModule,
    AngularDateTimePickerModule,
    // CdkTableModule,
    MatTableModule
  ],
  declarations: [
    PagesComponent,
    ProfileComponent,
    UsersComponent,
    DeleteComponent,
    EditComponent,
    OrganisationsComponent,
    OrganisationComponent,
    OrganisationDeleteComponent,
    RolesComponent,
    RoleComponent,
    RoleDeleteComponent,
    MenusComponent,
    MenuComponent,
    MenuDeleteComponent,
    PaymentGatewaysDetailsDeleteComponent,
    PaymentGatewaysDetailsComponent
  ],
  providers: [
    UsersService,
    OrganisationsService,
    RolesService,
    MenusService,
    PaymentGatewaysDetailsService
   
  ],
  entryComponents: [
    DeleteComponent,
    EditComponent,
    OrganisationDeleteComponent,
    RoleComponent,
    RoleDeleteComponent,
    MenuComponent,
    MenuDeleteComponent,
    PaymentGatewaysDetailsDeleteComponent,
    PaymentGatewaysDetailsComponent

  ]
})
export class PagesModule {
}
