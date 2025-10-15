import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class RegistrarComponent {
  nombre: string = '';
  correo: string = '';
  pais: string = '';
  ciudad: string = '';
  celular: string = '';
  genero: string = '';
  contrasena: string = '';
  contrasena2: string = '';

  constructor(private router: Router, private http: HttpClient) {
    // No additional initialization needed
  }

  onSubmit(): void {
    if (this.contrasena !== this.contrasena2) {
      alert('Contraseñas incorrectas.');
      return;
    }
    const userData = {
      nombre: this.nombre,
      correo: this.correo,
      pais: this.pais,
      ciudad: this.ciudad,
      celular: this.celular.startsWith('+51') ? this.celular.substring(3) : this.celular,
      genero: this.genero,
      contrasena: this.contrasena
    };
    console.log('Datos de usuario para registro:', userData);

    this.http.post('http://localhost:8080/registro/crear', userData).subscribe({
      next: (response) => {
        alert('Registro exitoso');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        alert('Error en el registro: ' + error.message);
      }
    });
  }
}
