import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NavigationModel } from './navigation.model';
import  { AuthService } from '../../core/auth.service';

@Injectable()
export class NavigationService {

  onNavigationCollapseToggle = new EventEmitter<any>();
  onNavigationCollapseToggled = new EventEmitter<any>();
  onNavigationModelChange: BehaviorSubject<any> = new BehaviorSubject({});
  navigationModel: NavigationModel;


  constructor(private authService: AuthService) {
    this.authService.getMenus.subscribe(menus => {
      this.navigationModel = new NavigationModel(menus);
      // this.navigationModel.model = menus;
      this.onNavigationModelChange.next(this.navigationModel.model);
    },
    error => console.log('get menus error' , error)
    );
  }

  getNavigationModel() {
    return this.navigationModel.model;
  }

  setNavigationModel(model) {
    this.navigationModel = model;
    this.onNavigationModelChange.next(this.navigationModel.model);
  }

  addNavigationItem() {

  }

  getNavigationItem() {

  }

  findNavigationItemById(location, navigation?) {
    if (!navigation) {
      navigation = this.navigationModel.model;
    }

    for (const navItem of navigation) {
      if (navItem.id === location[0]) {
        if (location.length > 1) {
          location.splice(0, 1);
          return this.findNavigationItemById(location, navItem.children);
        } else {
          return navItem;
        }
      }
    }
  }
}
