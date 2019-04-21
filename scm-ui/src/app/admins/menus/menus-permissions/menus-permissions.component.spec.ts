import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusPermissionsComponent } from './menus-permissions.component';

describe('MenusPermissionsComponent', () => {
  let component: MenusPermissionsComponent;
  let fixture: ComponentFixture<MenusPermissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenusPermissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenusPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
