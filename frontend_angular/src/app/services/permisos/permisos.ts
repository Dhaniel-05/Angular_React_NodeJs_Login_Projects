import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PermisosService {

  // LOS SERVICES SIRVEN PARA HACER PETICIONES HTTP AL BACKEND 

  private apiUrl = 'http://localhost:3000/api/permisos';

  constructor(private http: HttpClient) {}

  obtenerPermisos(): Observable<any[]> { // Observable es una promesa que puede emitir múltiples valores a lo largo del tiempo
    return this.http.get<any[]>(this.apiUrl); // GET a la URL de la API
  }

  obtenerPermisoPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  agregarPermiso(permiso: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, permiso);
  }

  actualizarPermiso(id: number, permiso: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, permiso);
  }

  eliminarPermiso(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
