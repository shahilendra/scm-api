import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MenusService } from '../menus.service';
import { ToastrService } from 'ngx-toastr';
import { config } from '../../../core/config';

@Component({
  selector: 'app-menu-delete',
  templateUrl: './menu-delete.component.html',
  styleUrls: ['./menu-delete.component.scss']
})
export class MenuDeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private menusService: MenusService,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  delete() {
    this.deleteRole(this.data);
  }

  close() {
    this.dialogRef.close({isCompleted: false, message: 'Menu cancel successfully!'});
  }

  deleteRole(item: any) {
    this.menusService.delete(item)
      .subscribe(item => {
          this.dialogRef.close({isCompleted: true, message: 'Menu deleted successfully!'});
          this.toastr.success('Menu ${config.deletedSuccess}');
        },
        error => {
          console.log('getRoleList error' , error);
          this.toastr.error('Menu ${config.deletionError}');
        });
  }
}