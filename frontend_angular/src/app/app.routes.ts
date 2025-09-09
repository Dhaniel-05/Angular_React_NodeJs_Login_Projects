import { Routes } from '@angular/router';
import { Layout } from './components/layout/layout';
import { authGuard } from './guard/guard'; // Importamos el guard

export const routes: Routes = [
  // Ruta pública para iniciar sesión
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then(m => m.LoginComponent) // Carga standalone del login
  },

  {
    path: '', // Ruta raíz
    component: Layout, // Todas las páginas estarán dentro del componente layout
    canActivate: [authGuard], // Protegemos las rutas hijas con el guard
    children: [ // Se definen las rutas hijas
      // Cuando se entre a una ruta ejemplo: http://localhost:4200/usuarios se cargará el componente usuarios
      {
        path: 'usuarios',
        loadComponent: () =>
          import('./pages/usuarios/usuarios').then(m => m.UsuariosComponent) // Método standalone para cargar los componentes dinámicamente sin necesidad de módulos
      },
      // Cuando se entre a una ruta ejemplo: http://localhost:4200/roles se cargará el componente roles
      {
        path: 'roles',
        loadComponent: () =>
          import('./pages/roles/roles').then(m => m.RolesComponent) // Método standalone para cargar los componentes dinámicamente sin necesidad de módulos
      },


      // Si la ruta es vacía lo redirige a usuarios y debe ser la ruta exacta sino da error
      { path: '', redirectTo: 'usuarios', pathMatch: 'full' }
    ]
    
  },
  {
    path: 'inicio',
    loadComponent: () =>
      import('./pages/pagina/pagina').then(m => m.InicioComponent) // Método standalone para cargar los componentes dinámicamente sin necesidad de módulos
  },

  // Cualquier ruta no encontrada redirige a login
  { path: '**', redirectTo: 'login' }
];
