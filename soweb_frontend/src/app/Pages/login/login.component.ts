import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, RouterModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  passwordVisible: boolean = false;
  showTooltip: boolean = false;
  password: string = '';
  role: string = 'Administrador';
  username: string = '';
  loginError: string = '';

  constructor(private router: Router, private authService: AuthService) {
    // Valores predeterminados para usuario y contraseña
    this.username = 'admin@admin.com';
    this.password = 'admin';
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  isMinLength(): boolean {
    return this.password.length >= 8;
  }

  hasUppercase(): boolean {
    return /[A-Z]/.test(this.password);
  }

  hasNumber(): boolean {
    return /\d/.test(this.password);
  }

  hasSpecialChar(): boolean {
    return /[!@#$%^&*]/.test(this.password);
  }

  allValid(): boolean {
    return this.isMinLength() &&
           this.hasUppercase() &&
           this.hasNumber() &&
           this.hasSpecialChar();
  }

  onSubmit(): void {
    this.loginError = '';
    // Simular login exitoso sin llamar al backend
    const fakeToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fakePayload.fakeSignature';
    localStorage.setItem('token', fakeToken);

    if (this.role === 'Administrador') {
      this.router.navigate(['/gtactico']);
    } else if (this.role === 'Usuario') {
      this.router.navigate(['/recibo']);
    }
  }
}
