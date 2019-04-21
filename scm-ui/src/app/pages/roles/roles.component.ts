import { Component, OnInit } from '@angular/core';
import { RolesService } from './roles.service';
import { ToastrService } from 'ngx-toastr';
import { config } from '../../core/config';
import { Router } from '@angular/router';
import {MatDialog } from '@angular/material';
import { RoleDeleteComponent } from './role-delete/role-delete.component';
import { RoleComponent } from './role/role.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  roles = [];
  dialogRef: any;
  constructor(private rolesService: RolesService,
    private toastr: ToastrService,
    private router: Router,
    private dialog: MatDialog
  ) { }
  ngOnInit() {
   this.getAll();
  }

  getAll() {
    this.rolesService.getAll()
      .subscribe(
        (data) => {
          this.roles = data;
          this.toastr.success(`roles ${config.retrievedSuccess}`);
        },
        err => { 
          console.log(err);
          this.toastr.error(`roles ${config.retrievedError}`);
        }
      );
  }
  
  delete(role: any) {
    this.dialogRef = this.dialog.open(RoleDeleteComponent, {
      height: '40%',
      width: '40%',
      disableClose: true
    });
    this.dialogRef.componentInstance.data = role;
    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
       this.getAll();
    });
  }

  edit(item: any) {
    let newdata = Object.assign({}, item);
    this.dialogRef = this.dialog.open(RoleComponent, {
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
    };
    this.dialogRef = this.dialog.open(RoleComponent, {
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
}