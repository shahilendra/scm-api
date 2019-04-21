import { NgModule } from '@angular/core';

import { AuthService } from './auth.service';
import { ConfigService } from './config.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor'
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { BaseComponent } from './base.component';
import { TimeUtilityService } from './time-utility.service';
//import { FilterSearchPipe } from './filter-search.pipe';

@NgModule({
  declarations: [BaseComponent],
  providers: [
  	AuthService,
  	AuthGuard,
  	ConfigService, {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    TimeUtilityService
  ],
  //exports: [FilterSearchPipe]
})
export class CoreModule {
}
