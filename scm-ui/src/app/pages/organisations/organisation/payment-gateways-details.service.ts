import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../../core/config';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PaymentGatewaysDetailsService {

   constructor(private http: HttpClient) {
  }

  /**
   *  get all paymentGatewaysDetail
   * */
  getAll(): Observable<any> {    
    return this.http.get(`${config.baseApiURL}v1/payment-gateways-details`);
  }

  /**
   *  get paymentGatewaysDetail by id 
   * */
  getById(id: string): Observable<any> {    
    return this.http.get(`${config.baseApiURL}v1/payment-gateways-details/${id}`);
  }

  /**
   *  add new paymentGatewaysDetail
   * */
  add(paymentGatewaysDetail: any): Observable<any> {    
    return this.http.post(`${config.baseApiURL}v1/payment-gateways-details`, paymentGatewaysDetail);
  }

  /**
   *  Update paymentGatewaysDetail by id 
   * */
  update(paymentGatewaysDetail: any): Observable<any> {    
    return this.http.put(`${config.baseApiURL}v1/payment-gateways-details/${paymentGatewaysDetail.id}`, paymentGatewaysDetail);
  }

  /**
   *  delete paymentGatewaysDetail by id 
   * */
  delete(paymentGatewaysDetail: any): Observable<any> {    
    return this.http.delete(`${config.baseApiURL}v1/payment-gateways-details/${paymentGatewaysDetail.id}`);
  }
  /**
   *  get paymentGatewaysDetail by parking id 
   * */
  getByOrganisationId(id: string): Observable<any> {    
    return this.http.get(`${config.baseApiURL}v1/payment-gateways-details/${id}/by-organisation-id`);
  }
  

}
