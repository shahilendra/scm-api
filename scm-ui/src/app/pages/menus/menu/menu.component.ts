import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MenusService } from '../menus.service';
import { ToastrService } from 'ngx-toastr';
import { config } from '../../../core/config';
import { MaterialsAssetes } from '../../../core/materials-assetes.const';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  types = ['item', 'collapse'];
  icons = MaterialsAssetes.Icons;
  menus = [];
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) public isAdd: boolean,
    private menusService: MenusService,
    private toastr: ToastrService) { }

   ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.menusService.getParentsMenus()
      .subscribe(
        (data) => {
          this.menus = data;
          this.toastr.success(`Menus ${config.retrievedSuccess}`);
        },
        err => { 
          console.log(err);
          this.toastr.error(`Menus ${config.retrievedError}`);
        });
  }

  update() {
    if(this.data.parentId == 0) {
      this.data.parentId = null;
    }

    if(!this.data.id) {
      this.add(this.data)
    } else {
      this.updateEntity(this.data);
    }

  }

  close() {
    this.dialogRef.close({isCompleted: false, message: 'Menu added successfully!'});
  }

  add(item: any) {
    this.menusService.add(item)
      .subscribe(item => {
          this.dialogRef.close({isCompleted: true, message: 'Menu added successfully!'});
          this.toastr.success(`Menu ${config.addedSuccess}`);
        },
        error => {
          console.log('getMenuList error' , error);
          this.toastr.error(`Menu ${config.additionError}`);
        }
      );
  }

  updateEntity(item: any) {
    this.menusService.update(item)
      .subscribe(item => {
          this.dialogRef.close({isCompleted: true, message: 'Menu updated successfully!'});
          this.toastr.success(`Menu ${config.updatedSuccess}`);
        },
        error =>{
          console.log('getMenuList error' , error);
          this.toastr.error(`Menu ${config.updationError}`);
        }
      );
  }

}
