import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.page').then( m => m.AdminPage)
  },
  {
    path: 'users',
    loadComponent: () => import('./users/users.page').then( m => m.UsersPage)
  },
  {
    path: 'profesores',
    loadComponent: () => import('./profesores/profesores.page').then( m => m.ProfesoresPage)
  },
  {
    path: 'cursos',
    loadComponent: () => import('./cursos/cursos.page').then( m => m.CursosPage)
  },
  {
    path: 'clases',
    loadComponent: () => import('./clases/clases.page').then( m => m.ClasesPage)
  },
  {
    path: 'details',
    loadComponent: () => import('./details/details.page').then( m => m.DetailsPage)
  },

  {
    path: 'auth',
    loadComponent: () => import('./auth/auth.page').then( m => m.AuthPage)
  },
  {
    path: 'users-course',
    loadComponent: () => import('./users-course/users-course.page').then( m => m.UsersCoursePage)
  },

  {
    path: 'users-course',
    loadComponent: () => import('./users-course/users-course.page').then( m => m.UsersCoursePage)
  },

  { 
    path: 'course-detail-users',
    loadComponent: () => import('./course-details-users/course-details-users.page').then( m => m.CourseDetailsUsersPage)
  
   },
 { 
  path: 'course-details-users/:id',
  loadComponent: () => import('./course-details-users/course-details-users.page').then( m => m.CourseDetailsUsersPage)

 },
 

];
