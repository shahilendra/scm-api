import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UsersService } from '../users.service';
import { ToastrService } from 'ngx-toastr';
import { config } from '../../../core/config';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usersService: UsersService,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  delete() {
    this.deleteUser(this.data);
  }

  close() {
    this.dialogRef.close({isCompleted: false, message: 'User cancel successfully!'});
  }

  deleteUser(user: any) {
    this.usersService.delete(user)
      .subscribe(user => {
          this.dialogRef.close({isCompleted: true, message: 'User deleted successfully!'});
          this.toastr.success('User ' + config.deletedSuccess);
        },
        error => {
          console.log('getUserList error' , error);
          this.toastr.error('User ' + config.deletionError);
        }
      );
  }
}
