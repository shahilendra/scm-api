import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentGatewaysDetailsComponent } from './payment-gateways-details.component';

describe('PaymentGatewaysDetailsComponent', () => {
  let component: PaymentGatewaysDetailsComponent;
  let fixture: ComponentFixture<PaymentGatewaysDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentGatewaysDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentGatewaysDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
