import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDeleteComponent } from './menu-delete.component';

describe('MenuDeleteComponent', () => {
  let component: MenuDeleteComponent;
  let fixture: ComponentFixture<MenuDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
