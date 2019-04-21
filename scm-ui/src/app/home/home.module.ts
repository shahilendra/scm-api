import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    HomeRoutingModule,
    CoreModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
