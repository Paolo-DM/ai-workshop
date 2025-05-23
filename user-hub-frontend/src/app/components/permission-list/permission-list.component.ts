import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common'; // For *ngFor, *ngIf, etc.

import { Permission } from '../../models/permission.model';
import { PermissionService } from '../../services/permission.service';

@Component({
  selector: 'app-permission-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.scss']
})
export class PermissionListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name'];
  dataSource = new MatTableDataSource<Permission>();
  permissionForm: FormGroup;

  constructor(
    private permissionService: PermissionService,
    private fb: FormBuilder
  ) {
    this.permissionForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadPermissions();
  }

  loadPermissions(): void {
    this.permissionService.getPermissions().subscribe({
      next: (permissions) => {
        this.dataSource.data = permissions;
      },
      error: (err) => {
        console.error('Error loading permissions:', err);
        // Optionally, display a user-friendly message
      }
    });
  }

  onSubmitNewPermission(): void {
    if (this.permissionForm.valid) {
      this.permissionService.addPermission(this.permissionForm.value).subscribe({
        next: (newPermission) => {
          this.loadPermissions(); // Refresh the list
          this.permissionForm.reset();
          // Optionally, provide user feedback
        },
        error: (err) => {
          console.error('Error adding permission:', err);
          // Optionally, display a user-friendly message (e.g., permission name already exists)
        }
      });
    }
  }
}
