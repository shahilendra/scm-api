import { Component, OnInit } from '@angular/core';
import { OrganisationsService } from './organisations.service';
import { ToastrService } from 'ngx-toastr';
import { config } from '../../core/config';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { OrganisationDeleteComponent } from './organisation-delete/organisation-delete.component';

@Component({
  selector: 'app-organisations',
  templateUrl: './organisations.component.html',
  styleUrls: ['./organisations.component.scss']
})
export class OrganisationsComponent implements OnInit {
  organisations = [];
  dialogRef: any;
  constructor(private organisationsService: OrganisationsService,
    private toastr: ToastrService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.organisationsService.getAll()
      .subscribe(
        (data) => {
          this.organisations = data;
          this.toastr.success('Organisations ' + config.retrievedSuccess);
        },
        err => { 
          console.log(err);
          this.toastr.error('Organisations ' + config.retrievedError);
        }
      );
  }
  Add() {
    this.router.navigate(['/pages/organisations', 'add']);
  }
  delete(organisation: any) {
    this.dialogRef = this.dialog.open(OrganisationDeleteComponent, {
      height: '40%',
      width: '40%',
      disableClose: true
    });
    this.dialogRef.componentInstance.data = organisation;
    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
       this.getAll();
    });
  }
}
