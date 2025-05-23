import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users'; // Adjust if your backend runs elsewhere

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/`);
  }

  addUser(user: { name: string; email: string }): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/`, user);
  }

  assignPermission(userId: number, permissionId: number): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/${userId}/permissions/${permissionId}`, {});
  }

  removePermission(userId: number, permissionId: number): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/${userId}/permissions/${permissionId}`);
  }
}
