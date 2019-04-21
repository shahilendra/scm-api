import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { RolesService } from '../roles.service';
import { ToastrService } from 'ngx-toastr';
import { config } from '../../../core/config';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) public isAdd: boolean,
    private rolesService: RolesService,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  update() {
    if(!this.data.id) {
      this.add(this.data)
    } else {
      this.updateRole(this.data);
    }

  }

  close() {
    this.dialogRef.close({isCompleted: false, message: 'Role added successfully!'});
  }

  add(role: any) {
    this.rolesService.add(role)
      .subscribe(role => {
          this.dialogRef.close({isCompleted: true, message: 'Role added successfully!'});
          this.toastr.success(`Role ${config.addedSuccess}`);
        },
        error => {
          console.log('getRoleList error' , error);
          this.toastr.error(`Role ${config.additionError}`);
        }
      );
  }

  updateRole(role: any) {
    this.rolesService.update(role)
      .subscribe(role => {
          this.dialogRef.close({isCompleted: true, message: 'Role updated successfully!'});
          this.toastr.success(`Role ${config.updatedSuccess}`);
        },
        error =>{
          console.log('getRoleList error' , error);
          this.toastr.error(`Role ${config.updationError}`);
        }
      );
  }
}