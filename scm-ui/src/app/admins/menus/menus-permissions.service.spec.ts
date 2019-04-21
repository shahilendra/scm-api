import { TestBed, inject } from '@angular/core/testing';

import { MenusPermissionsService } from './menus-permissions.service';

describe('MenusPermissionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenusPermissionsService]
    });
  });

  it('should be created', inject([MenusPermissionsService], (service: MenusPermissionsService) => {
    expect(service).toBeTruthy();
  }));
});
