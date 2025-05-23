import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Permission } from '../models/permission.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private apiUrl = 'http://localhost:8080/api/permissions'; // Adjust if your backend runs elsewhere

  constructor(private http: HttpClient) { }

  getPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${this.apiUrl}/`); // Backend endpoint is /api/permissions/
  }

  addPermission(permission: { name: string }): Observable<Permission> {
    return this.http.post<Permission>(`${this.apiUrl}/`, permission); // Backend endpoint is /api/permissions/
  }
}
