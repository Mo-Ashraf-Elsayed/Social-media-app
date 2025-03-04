import { Routes } from '@angular/router';
import { VisitorComponent } from './core/layouts/visitor/visitor.component';
import { UserComponent } from './core/layouts/user/user.component';
import { RegisterComponent } from './core/auth/components/register/register.component';
import { SignInComponent } from './core/auth/components/sign-in/sign-in.component';
import { HomePageComponent } from './features/home/home-page/home-page.component';

export const routes: Routes = [
  {
    path: '',
    component: VisitorComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: SignInComponent },
    ],
  },

  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomePageComponent },
    ],
  },
];
