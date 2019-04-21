import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NavigationService } from './navigation.service';
import { AuthService } from '../../core/auth.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  orginization: any;
  navigationModel = [];
  navigationModelChangeSubscription: Subscription;

  constructor(private service: NavigationService
    , private auth: AuthService) {
    this.auth.getMenusCall();
    this.navigationModelChangeSubscription = this.service.onNavigationModelChange.subscribe((navigation) => {
      if(navigation && navigation.length) {
        this.navigationModel = navigation;
      } else {
        this.navigationModel = [];
      }
    });
  }

  ngOnInit() {
    this.orginization = this.auth.getOrginization;
  }

  ngOnDestroy() {
    this.navigationModelChangeSubscription.unsubscribe();
  }

}
