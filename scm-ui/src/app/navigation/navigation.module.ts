import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../shared/shared.module';

import { NavigationComponent } from './navigation.component';
import { NavigationRoutingModule } from './navigation.routing';
import { ComponentModule } from '../component/component.module';
import { WidgetModule } from '../widget/widget.module';

@NgModule({
  imports: [
    HttpModule,
    SharedModule,
    NavigationRoutingModule,
    ComponentModule,
    WidgetModule
  ],
  declarations: [NavigationComponent]
})
export class NavigationModule { }
