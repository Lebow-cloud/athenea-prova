import { UserProfileComponent } from './user-profile/user-profile.component'; // Asegúrate de importar el componente correcto
import { Routes } from '@angular/router';
import { UsersTableComponent } from './users-table/users-table.component';
export const routes: Routes = [
  {
    path: '',
    component: UsersTableComponent,
  },
  {
    path: 'user-profile/:id',
    component: UserProfileComponent,
  },
];
