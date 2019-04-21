import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { RolesService } from '../roles.service';
import { ToastrService } from 'ngx-toastr';
import { config } from '../../../core/config';

@Component({
  selector: 'app-role-delete',
  templateUrl: './role-delete.component.html',
  styleUrls: ['./role-delete.component.scss']
})
export class RoleDeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private rolesService: RolesService,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  delete() {
    this.deleteRole(this.data);
  }

  close() {
    this.dialogRef.close({isCompleted: false, message: 'Role cancel successfully!'});
  }

  deleteRole(role: any) {
    this.rolesService.delete(role)
      .subscribe(role => {
          this.dialogRef.close({isCompleted: true, message: 'Role deleted successfully!'});
          this.toastr.success('Role ${config.deletedSuccess}');
        },
        error => {
          console.log('getRoleList error' , error);
          this.toastr.error('Role ${config.deletionError}');
        }
      );
  }
}