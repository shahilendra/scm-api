import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  orginization: any;
  isAuthenticated: boolean;
  constructor(private auth: AuthService,
  	private router: Router) {
  }

  ngOnInit() {
  	this.isAuthenticated = this.auth.authenticated;
    this.orginization = this.auth.getOrginization;
  }

  logout() {
    this.auth.signOut()
      .subscribe(
        (data) => {
          localStorage.removeItem('currentUser');
          localStorage.removeItem('token');
          this.isAuthenticated = this.auth.authenticated;
          this.router.navigate(['/sigin']);
        },
        err => console.log(err)
      );
  }
}
