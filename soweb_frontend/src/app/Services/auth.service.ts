import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  name: string;
  isActive: boolean;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  private loadingSubject = new BehaviorSubject<boolean>(true);

  user$: Observable<User | null> = this.userSubject.asObservable();
  isLoading$: Observable<boolean> = this.loadingSubject.asObservable();

  private apiUrl = 'http://localhost:8080'; // Cambiar si es necesario

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('plaza_vea_user');
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser));
    }
    this.loadingSubject.next(false);
  }

  login(username: string, password: string): Observable<boolean> {
    this.loadingSubject.next(true);

    const url = `${this.apiUrl}/login`;
    const body = { correo: username, clave: password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, body, { headers, observe: 'response' }).pipe(
      tap(response => {
        const token = response.headers.get('Authorization');
        if (token) {
          localStorage.setItem('token', token);
          // Opcional: obtener info usuario y setear userSubject
          this.userSubject.next({ id: '', username, email: '', role: 'employee', name: username, isActive: true, createdAt: new Date().toISOString() });
        }
        this.loadingSubject.next(false);
      }),
      map(response => !!response.headers.get('Authorization')),
      catchError(error => {
        this.loadingSubject.next(false);
        return of(false);
      })
    );
  }

  logout(): void {
    this.userSubject.next(null);
    localStorage.removeItem('plaza_vea_user');
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
