import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { PermissionListComponent } from './components/permission-list/permission-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', redirectTo: '/users', pathMatch: 'full' }, // Default route
    { path: 'users', component: UserListComponent },
    { path: 'permissions', component: PermissionListComponent },
    { path: 'dashboard', component: DashboardComponent },
    // Optional: Add a wildcard route for 404
    // { path: '**', component: PageNotFoundComponent }, // You would need to create PageNotFoundComponent
];
