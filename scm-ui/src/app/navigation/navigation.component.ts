import { Component, OnInit, Inject } from '@angular/core';
import { BaseComponent } from '../core/base.component';
import  { AuthService } from '../core/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent extends BaseComponent implements OnInit {

  constructor(
    public _authService: AuthService,
    private router: Router) {
  	super(_authService);
  }

  ngOnInit() {
  }

  OnClick(event: any) {
    let action = 'games'; 
    if(event == 'approved') {
      this.router.navigate(['/pages/games-approved']);
    } else if(event == 'games') {
      this.router.navigate(['/pages/games']);
      
    } else if(event == 'Players') {
      this.router.navigate(['/pages/users'], { queryParams: { action: 'add' } });
      
    } else if(event == 'unapproved') {
      this.router.navigate(['/pages/game', 'unapproved']);
    }
  } 
  
}
