import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PaymentGatewaysDetailsService } from '../payment-gateways-details.service';;
import { ToastrService } from 'ngx-toastr';
import { config } from '../../../../core/config';

@Component({
  selector: 'app-payment-gateways-details-delete',
  templateUrl: './payment-gateways-details-delete.component.html',
  styleUrls: ['./payment-gateways-details-delete.component.scss']
})
export class PaymentGatewaysDetailsDeleteComponent implements OnInit {

   constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private paymentGatewaysDetailsService: PaymentGatewaysDetailsService,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  delete() {
    this.deletePaymentGatewaysDetail(this.data);
  }

  close() {
    this.dialogRef.close({isCompleted: false, message: 'PaymentGatewaysDetail cancel successfully!'});
  }

  deletePaymentGatewaysDetail(paymentGatewaysDetail: any) {
    this.paymentGatewaysDetailsService.delete(paymentGatewaysDetail)
      .subscribe(paymentGatewaysDetail => {
          this.dialogRef.close({isCompleted: true, message: 'PaymentGatewaysDetail deleted successfully!'});
          this.toastr.success('PaymentGatewaysDetail ${config.deletedSuccess}');
        },
        error => {
          console.log('getPaymentGatewaysDetailList error' , error);
          this.toastr.error('PaymentGatewaysDetail ${config.deletionError}');
        }
      );
  }
}