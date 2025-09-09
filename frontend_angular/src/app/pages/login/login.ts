import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auths/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  correo = '';
  clave = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Funcion encargada de iniciar sesion
  iniciarSesion() {
    // Se llama al servicio para utilziar su funcionalidad (Ctrl + click en iniciarSesion)
    this.authService.iniciarSesion(this.correo, this.clave).subscribe({
      // El next sirve para manejar las respuestas exitosas de la funcion
      next: () => {
        // Se obtiene el usuario logueado
        const usuario = this.authService.obtenerUsuario();

        // Aquí decides a dónde va el usuario
        if (usuario.rol === 'Administrador') {
          this.router.navigate(['/usuarios']); // panel admin
        } else {
          this.router.navigate(['/inicio']);   // página normal
        }
      },
      error: err => {
        alert('Credenciales incorrectas');
      }
    });
  }
}
