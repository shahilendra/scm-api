import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PaymentGatewaysDetailsService } from '../payment-gateways-details.service';;
import { ToastrService } from 'ngx-toastr';
import { config } from '../../../../core/config';

@Component({
  selector: 'app-payment-gateways-details',
  templateUrl: './payment-gateways-details.component.html',
  styleUrls: ['./payment-gateways-details.component.scss']
})
export class PaymentGatewaysDetailsComponent implements OnInit {

  paymentGateways = [];
  id: any;
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) public isAdd: boolean,
    private paymentGatewaysDetailsService: PaymentGatewaysDetailsService,
    private toastr: ToastrService) { }

  ngOnInit() {
  }
  update() {
    if(!this.data.id) {
      this.add(this.data)
    } else {
      this.updatePaymentGatewaysDetail(this.data);
    }

  }

  close() {
    this.dialogRef.close({isCompleted: false, message: 'PaymentGatewaysDetail added successfully!'});
  }

  add(paymentGatewaysDetail: any) {
    this.paymentGatewaysDetailsService.add(paymentGatewaysDetail)
      .subscribe(paymentGatewaysDetail => {
          this.dialogRef.close({isCompleted: true, message: 'PaymentGatewaysDetail added successfully!'});
          this.toastr.success(`PaymentGatewaysDetail ${config.addedSuccess}`);
        },
        error => {
          console.log('getPaymentGatewaysDetailList error' , error);
          this.toastr.error(`PaymentGatewaysDetail ${config.additionError}`);
        }
      );
  }

  updatePaymentGatewaysDetail(paymentGatewaysDetail: any) {
    this.paymentGatewaysDetailsService.update(paymentGatewaysDetail)
      .subscribe(paymentGatewaysDetail => {
          this.dialogRef.close({isCompleted: true, message: 'PaymentGatewaysDetail updated successfully!'});
          this.toastr.success(`PaymentGatewaysDetail ${config.updatedSuccess}`);
        },
        error =>{
          console.log('getPaymentGatewaysDetailList error' , error);
          this.toastr.error(`PaymentGatewaysDetail ${config.updationError}`);
        }
      );
  }
}