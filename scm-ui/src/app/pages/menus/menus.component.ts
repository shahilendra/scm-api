import { Component, OnInit } from '@angular/core';
import { MenusService } from './menus.service';
import { ToastrService } from 'ngx-toastr';
import { config } from '../../core/config';
import { Router } from '@angular/router';
import {MatDialog } from '@angular/material';
import { MenuDeleteComponent } from './menu-delete/menu-delete.component';
import { MenuComponent } from './menu/menu.component';
@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent implements OnInit {
  menus = [];
  dialogRef: any;
  constructor(private menusService: MenusService,
    private toastr: ToastrService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.menusService.getAll()
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

  delete(menu: any) {
    this.dialogRef = this.dialog.open(MenuDeleteComponent, {
      height: '40%',
      width: '40%',
      disableClose: true
    });
    this.dialogRef.componentInstance.data = menu;
    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
       this.getAll();
    });
  }
  edit(item: any) {
    let newdata = Object.assign({}, item);
    if(!newdata.parentId) {
      newdata.parentId = 0;
    }
    this.dialogRef = this.dialog.open(MenuComponent, {
      height: '90%',
      width: '50%',
      disableClose: true
    });

    this.dialogRef.componentInstance.data = newdata;
    this.dialogRef.componentInstance.isAdd = false;
    this.dialogRef.afterClosed().subscribe(result => {
      if(result.isCompleted) {
        this.getAll();
      }
      console.log('The dialog was closed');
    });
  }

  Add() {
    let newItem = {
      displayOrder: 1,
      parentId: 0,
      type: 'item'
    };
    this.dialogRef = this.dialog.open(MenuComponent, {
      height: '90%',
      width: '50%',
      disableClose: true
    });

    this.dialogRef.componentInstance.data = newItem;
    this.dialogRef.componentInstance.isAdd = true;
    this.dialogRef.afterClosed().subscribe(result => {
      if(result.isCompleted) {
        this.getAll();
      }
      console.log('The dialog was closed');
    });
  }

  getParentName(menu: any): string {
    let parentName = '';
    if(menu && menu.parentId && menu.parentId !=null) {
      this.menus.forEach((item: any) => {
        if(item.id == menu.parentId) {
          parentName = item.title;
        }
      })
    }
    return parentName;
  }
}
