import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { BaseComponent } from '../../core/base.component';
import { ToastrService } from 'ngx-toastr';
import { config } from '../../core/config';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends BaseComponent implements OnInit {
  genders = ['Male', 'Female', 'Others'];
  userRoles = [];
  orginization: any;
  me: any = {
    details: {

    }
  };
  constructor(private auth: AuthService,
    private toastr: ToastrService) {
    super(auth);
  }

  ngOnInit() {
    this.getRoles()
    this.getProfiles();
    this.orginization = this.auth.getOrginization;
  }

  getProfiles() {
    this.auth.getProfiles()
      .subscribe(
        (data) => {
          if(!data.details) {
            data.details = {};
          }
          this.me = data;
          this.toastr.success(`Profile ${config.retrievedSuccess}`);
        },
        err => { 
          console.log(err);
          this.toastr.error(`Profile ${config.retrievedError}`);
        }
      );
  }

  getRoles() {
    this.auth.getRoles()
      .subscribe(
        (data) => {
          this.userRoles = data;
          this.toastr.success(`Roles ${config.retrievedSuccess}`);
        },
        err => { 
          console.log(err);
          this.toastr.error(`Roles ${config.retrievedError}`);
        }
      );
  }

  updateProfiles() {
    this.auth.updateProfiles(this.me)
      .subscribe(
        (data) => {
          this.getProfiles();
          this.toastr.success(`Profile ${config.updatedSuccess}`);
        },
        err => {
          console.log(err);
          this.toastr.error(`Profile ${config.updationError}`);
        }
      );
  }
  onSubmit() {
    this.updateProfiles();
  }

}
