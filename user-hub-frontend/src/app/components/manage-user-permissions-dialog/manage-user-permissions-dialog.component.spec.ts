import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUserPermissionsDialogComponent } from './manage-user-permissions-dialog.component';

describe('ManageUserPermissionsDialogComponent', () => {
  let component: ManageUserPermissionsDialogComponent;
  let fixture: ComponentFixture<ManageUserPermissionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageUserPermissionsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageUserPermissionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
