import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentGatewaysDetailsDeleteComponent } from './payment-gateways-details-delete.component';

describe('PaymentGatewaysDetailsDeleteComponent', () => {
  let component: PaymentGatewaysDetailsDeleteComponent;
  let fixture: ComponentFixture<PaymentGatewaysDetailsDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentGatewaysDetailsDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentGatewaysDetailsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
