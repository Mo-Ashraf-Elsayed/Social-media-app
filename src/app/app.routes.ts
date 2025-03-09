import { Routes } from '@angular/router';
import { VisitorComponent } from './core/layouts/visitor/visitor.component';
import { UserComponent } from './core/layouts/user/user.component';
import { RegisterComponent } from './core/auth/components/register/register.component';
import { SignInComponent } from './core/auth/components/sign-in/sign-in.component';
import { HomePageComponent } from './features/home/components/home-page/home-page.component';
import { userLayoutGuard } from './core/guards/user-layout.guard';
import { visitorLayoutGuard } from './core/guards/visitor-layout.guard';

export const routes: Routes = [
  {
    path: '',
    component: VisitorComponent,
    canActivate: [visitorLayoutGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: SignInComponent },
    ],
  },

  {
    path: '',
    component: UserComponent,
    canActivate: [userLayoutGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomePageComponent },
    ],
  },
];
