import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UsersService } from '../users.service';
import { AuthService } from '../../../core/auth.service';
import { ToastrService } from 'ngx-toastr';
import { config } from '../../../core/config';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  genders = []
  userRoles = [];
  
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) public isAdd: boolean,
    private usersService: UsersService,
    private authService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getRoles();
    this.genders = this.authService.getGenders;
  }
  getRoles() {
    this.authService.getRoles()
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
  update() {
    if(!this.data.id) {
      this.add(this.data)
    } else {
      this.updateUser(this.data);
    }

  }

  close() {
    this.dialogRef.close({isCompleted: false, message: 'User added successfully!'});
  }

  add(user: any) {
    this.usersService.add(user)
      .subscribe(user => {
          this.dialogRef.close({isCompleted: true, message: 'User added successfully!'});
          this.toastr.success(`User ${config.addedSuccess}`);
        },
        error => {
          console.log('getUserList error' , error);
          this.toastr.error(`User ${config.additionError}`);
        }
      );
  }

  updateUser(user: any) {
    this.usersService.update(user)
      .subscribe(user => {
          this.dialogRef.close({isCompleted: true, message: 'User updated successfully!'});
          this.toastr.success(`User ${config.updatedSuccess}`);
        },
        error =>{
          console.log('getUserList error' , error);
          this.toastr.error(`User ${config.updationError}`);
        }
      );
  }
}
