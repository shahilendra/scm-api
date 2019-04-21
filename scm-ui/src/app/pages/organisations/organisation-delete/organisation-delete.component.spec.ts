import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationDeleteComponent } from './organisation-delete.component';

describe('OrganisationDeleteComponent', () => {
  let component: OrganisationDeleteComponent;
  let fixture: ComponentFixture<OrganisationDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganisationDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
