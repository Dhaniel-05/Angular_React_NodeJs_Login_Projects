import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auths/auth';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagina.html',
  styleUrls: ['./pagina.css']
})
export class InicioComponent {
  usuario: any;

  constructor(private authService: AuthService, private router: Router) {
    this.usuario = this.authService.obtenerUsuario();
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    this.router.navigate(['/login']);
  }
}
