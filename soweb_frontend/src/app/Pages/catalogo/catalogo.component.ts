import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  iso?: string; // Código ISO opcional para relacionar con backend
}

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  imports: [RouterLink, CommonModule],
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  productos: Producto[] = [
    { id: 1, nombre: 'D122 FSSC 22000 (VERSIÓN 6) KIT DE DOCUMENTACIÓN DE PROCEDIMIENTOS MANUALES', precio: 681.00, imagen: 'assets/D122-600x842.png', iso: 'ISO22000' },
    { id: 2, nombre: 'D123 Kit de documentación editable de muestra para la evaluación de nivel 3 de CMMI (V2.0) para el desarrollo', precio: 1049.00, imagen: 'assets/D123-600x842.png', iso: 'CMMI' },
    { id: 3, nombre: 'D124 Kit de formación sobre documentación y concienciación de ISO 20121', precio: 850.00, imagen: 'assets/D124-600x842.png', iso: 'ISO20121' },
    { id: 4, nombre: 'D125 Documentos NABH para la Acreditación de Hospitales según la 5ª Edición', precio: 788.00, imagen: 'assets/D125-600x842.png', iso: 'NABH' },
    { id: 5, nombre: 'D126 Dispositivos Médicos – Kit de Documentación del Sistema de Gestión de Calidad ISO 13485:2016', precio: 419.00, imagen: 'assets/D126-600x842.png', iso: 'ISO13485' },
    { id: 6, nombre: 'D127 Kit de documentación SA 8000:2014 para la certificación del estándar de responsabilidad social', precio: 472.00, imagen: 'assets/D127-600x842.png', iso: 'SA8000' },
    { id: 7, nombre: 'D128 Kit de documentación de certificación de personal con el manual ISO 17024, procedimientos, lista de verificación', precio: 1049.00, imagen: 'assets/D128-600x842.png', iso: 'ISO17024' },
    { id: 8, nombre: 'D129 Kit de documentación del sistema de gestión de servicios de TI para la certificación ISO 20000', precio: 578.00, imagen: 'assets/D129-600x842.png', iso: 'ISO20000' },
    { id: 9, nombre: 'D130 Kit de documentos de acreditación de proveedores de PT: basado en ISO/IEC 17043:2023', precio: 1049.00, imagen: 'assets/D130-600x842.png', iso: 'ISO17043' },
    { id: 10, nombre: 'D131 Documentación BRC Storage and Distribution número 4 con manual, procedimientos, lista de verificación', precio: 473.00, imagen: 'assets/D131-600x842.png', iso: 'BRC' }
  ];

  carrito: Producto[] = [];
  carritoVisible: boolean = false;

  productosFiltrados: Producto[] = [];

  constructor(private cdr: ChangeDetectorRef, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.cargarIsosDesdeBackend();
  }

  cargarIsosDesdeBackend() {
    // Reemplaza la URL con la ruta real de tu backend para obtener las isos del pedido
    this.http.get<string[]>('http://localhost:8080/pedido/isos').subscribe({
      next: (isosBackend) => {
        this.productosFiltrados = this.filtrarProductosPorIsos(isosBackend);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al obtener las isos del backend:', error);
        // En caso de error, mostrar todos los productos o manejar según convenga
        this.productosFiltrados = this.productos;
      }
    });
  }

  agregarAlCarrito(producto: Producto) {
    this.carrito.push(producto);
    this.carritoVisible = true;
    console.log('Producto agregado al carrito:', producto);
    this.cdr.detectChanges();
    setTimeout(() => {
      this.carritoVisible = true;
      this.cdr.detectChanges();
      console.log('Carrito visible forzado a true');
    }, 0);
  }

  obtenerSubtotal(): number {
    return this.carrito.reduce((total, producto) => total + producto.precio, 0);
  }

  toggleCarrito() {
    this.carritoVisible = !this.carritoVisible;
    console.log('Carrito visible:', this.carritoVisible);
  }

  quitarDelCarrito(index: number) {
    this.carrito.splice(index, 1);
    this.cdr.detectChanges();
    console.log('Producto eliminado del carrito en índice:', index);
  }

  finalizarCompra() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    this.router.navigate(['/comprar']);
  }

  filtrarProductosPorIsos(isosBackend: string[]): Producto[] {
    return this.productos.filter(producto => producto.iso && isosBackend.includes(producto.iso));
  }
}
