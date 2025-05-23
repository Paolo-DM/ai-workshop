import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // Import MatDialog and MatDialogModule
import { CommonModule } from '@angular/common'; // For *ngFor, *ngIf, etc.

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ManageUserPermissionsDialogComponent } from '../manage-user-permissions-dialog/manage-user-permissions-dialog.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule, // Add MatIconModule
    MatDialogModule // Add MatDialogModule
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'permissions', 'managePermissions']; // Added 'managePermissions'
  dataSource = new MatTableDataSource<User>();
  userForm: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private dialog: MatDialog // Inject MatDialog
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.dataSource.data = users;
      },
      error: (err) => {
        console.error('Error loading users:', err);
        // Optionally, display a user-friendly message
      }
    });
  }

  onSubmitNewUser(): void {
    if (this.userForm.valid) {
      this.userService.addUser(this.userForm.value).subscribe({
        next: (newUser) => {
          this.loadUsers(); // Refresh the list
          this.userForm.reset();
          // Optionally, scroll to the new user or provide other feedback
        },
        error: (err) => {
          console.error('Error adding user:', err);
          // Optionally, display a user-friendly message (e.g., email already exists)
        }
      });
    }
  }

  // Helper to display permissions
  getPermissionNames(permissions: User['permissions']): string {
    if (!permissions || permissions.length === 0) {
      return 'None';
    }
    return permissions.map(p => p.name).join(', ');
  }

  openManagePermissionsDialog(user: User): void {
    const dialogRef = this.dialog.open(ManageUserPermissionsDialogComponent, {
      width: '450px', // Adjusted width for better content display
      data: { user: user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // If true is returned, it means changes were made
        this.loadUsers(); // Refresh the user list
      }
    });
  }
}
