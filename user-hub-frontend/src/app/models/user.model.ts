import { Permission } from './permission.model';

export interface User {
  id: number;
  name: string;
  email: string;
  permissions: Permission[];
}
