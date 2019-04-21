import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { OrganisationsService } from '../organisations.service';
import { ToastrService } from 'ngx-toastr';
import { config } from '../../../core/config';

@Component({
  selector: 'app-organisation-delete',
  templateUrl: './organisation-delete.component.html',
  styleUrls: ['./organisation-delete.component.scss']
})
export class OrganisationDeleteComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private organisationsService: OrganisationsService,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  delete() {
    this.deleteItem(this.data);
  }

  close() {
    this.dialogRef.close({isCompleted: false, message: 'Organisation cancel successfully!'});
  }

  deleteItem(organisation: any) {
    this.organisationsService.delete(organisation)
      .subscribe(user => {
          this.dialogRef.close({isCompleted: true, message: 'Organisation deleted successfully!'});
          this.toastr.success(`Organisation ${config.deletedSuccess}`);
        },
        error => {
          console.log('Organisation error' , error);
          this.toastr.error(`Organisation ${config.deletionError}`);
        }
      );
  }
}
