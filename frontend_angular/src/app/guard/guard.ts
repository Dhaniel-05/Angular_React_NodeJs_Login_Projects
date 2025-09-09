import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auths/auth';
 
export const authGuard: CanActivateFn = () => { // El CanActivateFN sirve para definir si una ruta se puede activar o no
  const authService = inject(AuthService); //inject nueva forma de inyectar dependencias sin utilizar un constructor
  const router = inject(Router); // Inyecta el servicio de enrutamiento para redirigir si no está autenticado

  if (authService.estaAutenticado()) {
    return true; // Usuario autenticado, permite acceso
  } else {
    router.navigate(['/login']); // Redirige al login si no está autenticado
    return false;
  }
};
