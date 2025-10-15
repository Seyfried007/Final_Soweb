import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comprar',
  standalone: true,
  templateUrl: './comprar.component.html',
  imports: [RouterLink, CommonModule, FormsModule],
  styleUrls: ['./comprar.component.css']
})
export class ComprarComponent implements OnInit {
  carrito: any[] = [];
  selectedIndex: number | null = null;
  cupon: string = '';
  descuento: number = 0;

  ngOnInit() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.carrito = JSON.parse(carritoGuardado);
      // Set default quantity to 1 if not present
      this.carrito.forEach(producto => {
        if (!producto.cantidad || producto.cantidad < 1) {
          producto.cantidad = 1;
        }
      });
    }
  }

  obtenerSubtotal(): number {
    return this.carrito.reduce((total, producto) => total + producto.precio * (producto.cantidad || 1), 0);
  }

  actualizarSubtotal(index: number) {
    if (this.carrito[index].cantidad < 1) {
      this.carrito[index].cantidad = 1;
    }
  }

  quitarDelCarrito(index: number) {
    this.carrito.splice(index, 1);
    if (this.selectedIndex === index) {
      this.selectedIndex = null;
    }
  }

  aplicarCupon() {
    if (this.cupon === 'ISO25') {
      this.descuento = this.obtenerSubtotal() * 0.05;
    } else {
      this.descuento = 0;
    }
  }
}
