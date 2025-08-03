import { Routes } from '@angular/router';
import { LoginComponent } from '../shared/components/login/login.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { AppComponent } from './app.component';
import { AdminComponent } from '../shared/components/admin/admin.component';
import { UserPanelComponent } from '../shared/components/user-panel/user-panel.component';
import { UnauthorizedComponent } from '../shared/components/unauthorized/unauthorized.component';
import { HomeComponent } from '../shared/components/home/home.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' }
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  { path: '**', redirectTo: 'login' }
];

