import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UsersService } from './users.service';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { filter } from "lodash";
import { BaseComponent } from '../../core/base.component';
import { AuthService } from '../../core/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { config } from '../../core/config';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends BaseComponent implements OnInit {
  allUsers: any;
  users: any;
  checked = false;

  sideOpen: boolean = true;
  dialogRef: any;
  userRoles = -1;
  userRolesList = [];
  sub: any;
  action: any;
  length = config.pageLength;
  pageSize = config.pageSize;
  pageSizeOptions = config.pageSizeOptions;
  //MatPaginator Output
  pageEvent: PageEvent;
  constructor(
    private usersService: UsersService,
    private dialog: MatDialog,
    public _authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {

    super(_authService);
  }

  ngOnInit() {
    this.getUserList();
    this.getRoles();
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.action = params.action;
      });
  }
  getRoles() {
    this.authService.getRoles()
      .subscribe(
        (data) => {
          this.userRolesList = data;
          this.toastr.success(`Roles ${config.retrievedSuccess}`);
        },
        err => { 
          console.log(err);
          this.toastr.error(`Roles ${config.retrievedError}`);
        }
      );
  }
  openAddNew() {
    if(this.action && this.action.toLowerCase() == 'add') {
      this.userRoles = 1;
      this.Add();
    }
  }

  getUserList() {
    this.usersService.getUsers().subscribe(users => {
      this.allUsers = users;
      this.bindFiletrUsers();
      this.openAddNew();
      this.toastr.success('users ' + config.retrievedSuccess);
    },
    error => { 
      console.log('getUserList error' , error)
      this.toastr.error('users ' + config.retrievedError);
     }
    );
  }
  bindFiletrUsers() {
    if(this.userRoles === -1) {
      this.users = this.allUsers;
    } else {
      this.users = filter(this.allUsers, (item) => { 
        return item.roleId == this.userRoles;
      });
    }
   
  }

  onSideTriggered() {
    this.sideOpen = false;
  }
  userTabChange(roleId: any) {
    this.userRoles = roleId;
    this.bindFiletrUsers();
  }
  delete(user: any) {
    this.dialogRef = this.dialog.open(DeleteComponent, {
      height: '40%',
      width: '40%',
      disableClose: true
    });
    this.dialogRef.componentInstance.data = user;
    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
       this.getUserList();
    });
  }
  edit(user: any) {
    let newdata = Object.assign({}, user);
    this.dialogRef = this.dialog.open(EditComponent, {
      height: '90%',
      width: '50%',
      disableClose: true
    });

    this.dialogRef.componentInstance.data = newdata;
    this.dialogRef.componentInstance.isAdd = false;
    this.dialogRef.afterClosed().subscribe(result => {
      if(result.isCompleted) {
        this.getUserList();
      }
      console.log('The dialog was closed');
    });
  }
  Add() {
    let newUser = {
      roleId: this.userRoles === -1? 1 : this.userRoles,
      gender: 'Others',
      details: ''
    };
    this.dialogRef = this.dialog.open(EditComponent, {
      height: '90%',
      width: '50%',
      disableClose: true
    });

    this.dialogRef.componentInstance.data = newUser;
    this.dialogRef.componentInstance.isAdd = true;
    this.dialogRef.afterClosed().subscribe(result => {
      if(result.isCompleted) {
        this.getUserList();
      }
      console.log('The dialog was closed');
    });
  }

  getUserRole(roleId: any): string {
    let selectedRole = '';
    this.userRolesList.forEach((item)=> {
      if(item.id == roleId) {
        selectedRole = item.name;
      }
    });
    return selectedRole;
  }
}
