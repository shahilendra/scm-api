import { TestBed, inject } from '@angular/core/testing';

import { PaymentGatewaysDetailsService } from './payment-gateways-details.service';

describe('PaymentGatewaysDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentGatewaysDetailsService]
    });
  });

  it('should be created', inject([PaymentGatewaysDetailsService], (service: PaymentGatewaysDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
