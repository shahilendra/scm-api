import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../shared/shared.module';

import { ComponentModule } from '../component/component.module';
import { WidgetModule } from '../widget/widget.module';
import { AdminsRoutingModule } from './admins.routing';
import { AdminsComponent } from './admins.component';

@NgModule({
  imports: [
    HttpModule,
    SharedModule,
    ComponentModule,
    WidgetModule,
    AdminsRoutingModule
  ],
  declarations: [AdminsComponent]
})
export class AdminsModule { }
