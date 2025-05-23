import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Required for ngModel with MatCheckbox
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { User } from '../../models/user.model';
import { Permission } from '../../models/permission.model';
import { PermissionService } from '../../services/permission.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-manage-user-permissions-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatListModule,
    MatCheckboxModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './manage-user-permissions-dialog.component.html',
  styleUrls: ['./manage-user-permissions-dialog.component.scss']
})
export class ManageUserPermissionsDialogComponent implements OnInit {
  allPermissions: Permission[] = [];
  userPermissions: Set<number>;
  isLoading = false;
  isLoadingPermissions = false; // Separate loading for initial permissions fetch

  constructor(
    public dialogRef: MatDialogRef<ManageUserPermissionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    private permissionService: PermissionService,
    private userService: UserService
  ) {
    this.userPermissions = new Set(this.data.user.permissions.map(p => p.id));
  }

  ngOnInit(): void {
    this.loadAllPermissions();
  }

  loadAllPermissions(): void {
    this.isLoadingPermissions = true;
    this.permissionService.getPermissions().subscribe({
      next: (permissions) => {
        this.allPermissions = permissions;
        this.isLoadingPermissions = false;
      },
      error: (err) => {
        console.error('Error loading all permissions:', err);
        this.isLoadingPermissions = false;
        // Optionally, show an error message to the user
      }
    });
  }

  isPermissionAssigned(permission: Permission): boolean {
    return this.userPermissions.has(permission.id);
  }

  onPermissionChange(event: MatCheckboxChange, permission: Permission): void {
    this.isLoading = true;
    if (event.checked) {
      this.userService.assignPermission(this.data.user.id, permission.id).subscribe({
        next: (updatedUser) => {
          this.userPermissions.add(permission.id);
          // Optionally update the user data in the dialog if needed, though not strictly necessary
          // this.data.user = updatedUser;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error assigning permission:', err);
          event.source.checked = false; // Revert checkbox on error
          this.isLoading = false;
        }
      });
    } else {
      this.userService.removePermission(this.data.user.id, permission.id).subscribe({
        next: (updatedUser) => {
          this.userPermissions.delete(permission.id);
          // this.data.user = updatedUser;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error removing permission:', err);
          event.source.checked = true; // Revert checkbox on error
          this.isLoading = false;
        }
      });
    }
  }

  onDoneClick(): void {
    this.dialogRef.close(true); // Pass true to indicate changes might have been made
  }
}
