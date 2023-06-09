import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app.routing';
import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';

// import { FireBaseComponentsModule } from './shared/firebase.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {DndModule} from 'ng2-dnd';
import {HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignupComponent,
    SigninComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    AdminModule,
    AppRoutingModule,
    // FireBaseComponentsModule,
    ReactiveFormsModule,
    DndModule.forRoot(),
    environment['ngsw'] ? ServiceWorkerModule.register('./ngsw-worker.js') : [],
    HttpClientModule,
    ToastrModule.forRoot({ closeButton : true, maxOpened: 2, autoDismiss: true, preventDuplicates: true}),
  ],
  providers: [ToastrModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
