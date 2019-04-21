import { Component, OnInit } from '@angular/core';
import { OrganisationsService } from '../organisations.service';
import { ToastrService } from 'ngx-toastr';
import { config } from '../../../core/config';
import { Router, ActivatedRoute } from '@angular/router';
import {PaymentGatewaysDetailsService } from './payment-gateways-details.service';
import { PaymentGatewaysDetailsComponent } from './payment-gateways-details/payment-gateways-details.component';
import { PaymentGatewaysDetailsDeleteComponent } from './payment-gateways-details-delete/payment-gateways-details-delete.component';
import {MatDialog } from '@angular/material';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.scss']
})
export class OrganisationComponent implements OnInit {

  organisation: any = {};
  id: any;
  dialogRef: any;
  data: any = {};
  paymentGatewaysDetails= [];
  constructor(
    private organisationsService: OrganisationsService,
    private paymentGatewaysDetailsService: PaymentGatewaysDetailsService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if(this.id.toLowerCase() =='add') {
        this.organisation = {};
      } else {
        this.getById(this.id);
        this.getAllPaymentGatewaysDetails(this.id);
      }
    });
  }
  getById(id: any) {
    this.organisationsService.getById(id)
      .subscribe(
        (data) => {
          this.organisation = data;
          this.toastr.success(`Organisation  ${config.retrievedSuccess}`);
        },
        err => { 
          console.log(err);
          this.toastr.error(`Organisation ${config.retrievedError}`);
        }
      );
  }
  onSubmit() {
    this.update();
  }
  update() {
    if(!this.organisation.id) {
      this.add(this.organisation)
    } else {
      this.updateCall(this.organisation);
    }

  }

  add(organisation: any) {
    this.organisationsService.add(organisation)
      .subscribe(organisation => {
          this.toastr.success(`Organisation ${config.addedSuccess}`);
          this.goToList();
        },
        error => {
          console.log('organisation error' , error);
          this.toastr.error(`Organisation ${config.additionError}`);
        }
      );
  }

  updateCall(organisation: any) {
    this.organisationsService.update(organisation)
      .subscribe(organisation => {
          this.toastr.success(`Organisation ${config.updatedSuccess}`);
          this.goToList();
        },
        error =>{
          console.log('getUserList error' , error);
          this.toastr.error(`Organisation ${config.updationError}`);
        }
      );
  }

  private goToList() {
    this.router.navigate(['/pages/organisations']);
  }


AddPaymentGatewaysDetails() {

  }
  editPaymentGatewaysDetail(item: any) {
    let newdata = Object.assign({}, item);
    this.dialogRef = this.dialog.open(PaymentGatewaysDetailsComponent, {
      height: '90%',
      width: '50%',
      disableClose: true
    });

    this.dialogRef.componentInstance.data = newdata;
    this.dialogRef.componentInstance.isAdd = false;
    this.dialogRef.afterClosed().subscribe(result => {
      if(result.isCompleted) {
        this.getAllPaymentGatewaysDetails(this.id);
      }
      console.log('The dialog was closed');
    });
  }

  AddPaymentGatewaysDetail() {
    let newItem = {
      PaymentGatewaysDetailId: this.id,
      organisationsId: this.data.organisationId
    };
    this.dialogRef = this.dialog.open(PaymentGatewaysDetailsComponent, {
      height: '90%',
      width: '50%',
      disableClose: true
    });

    this.dialogRef.componentInstance.data = newItem;
    this.dialogRef.componentInstance.isAdd = true;
    this.dialogRef.afterClosed().subscribe(result => {
      if(result.isCompleted) {
        this.getAllPaymentGatewaysDetails(this.id);
      }
      console.log('The dialog was closed');
    });
  }

  deletePaymentGatewaysDetail(item: any) {

  this.dialogRef = this.dialog.open(PaymentGatewaysDetailsDeleteComponent, {
      height: '40%',
      width: '40%',
      disableClose: true
    });
    this.dialogRef.componentInstance.data = item;
    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
       this.getAllPaymentGatewaysDetails(this.id);
    });
  }

   getAllPaymentGatewaysDetails(id: any) {
    this.paymentGatewaysDetailsService.getByOrganisationId(id)
      .subscribe(
        (data) => {
          this.paymentGatewaysDetails = data;
          this.toastr.success(`PaymentGatewaysDetails parkings  ${config.retrievedSuccess}`);
        },
        err => { 
          console.log(err);
          this.toastr.error(`PaymentGatewaysDetails parkings ${config.retrievedError}`);
        }
      );
  }
}