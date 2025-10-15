import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-tarjeta',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent implements OnInit {
  amount: number = 0;
  totalFinal: number = 0;

  cardholderName: string = '';
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  cardType: string = '';
  transactionId: string = '';
  products: { imagen: string; abreviado: string }[] = [];
  formSubmitted: boolean = false;

  constructor(private router: Router, private http: HttpClient) {
    if (!http) {
      console.error('HttpClient no está inyectado correctamente');
    }
  }

  selectCardType(type: string): void {
    this.cardType = type;
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const carritoGuardado = localStorage.getItem('carrito');
      if (carritoGuardado) {
        const carrito = JSON.parse(carritoGuardado);
        this.products = carrito.map((producto: any) => {
          return {
            imagen: producto.imagen || '',
            abreviado: (producto.nombre || producto.producto || 'Producto').substring(0, 10)
          };
        });
        this.totalFinal = carrito.reduce((total: number, producto: any) => {
          return total + (producto.precio || 0) * (producto.cantidad || 1);
        }, 0);
      }
    }
  }

  onCardNumberInput(): void {
    this.cardNumber = this.cardNumber.replace(/\D/g, '').slice(0, 16);
    // Forzar actualización del valor para que Angular reconozca el cambio y valide
    setTimeout(() => {
      this.cardNumber = this.cardNumber;
    });
  }

  onExpiryDateInput(): void {
    this.expiryDate = this.expiryDate.replace(/[^0-9\/]/g, '').slice(0, 5);
  }

  onCvvInput(): void {
    this.cvv = this.cvv.replace(/\D/g, '').slice(0, 4);
  }

  isExpiryDateValid(): boolean {
    const expiryDateClean = this.expiryDate.trim();
    const expiryDateParts = expiryDateClean.split('/');
    if (expiryDateParts.length !== 2) {
      return false;
    }
    const month = parseInt(expiryDateParts[0], 10);
    const year = parseInt(expiryDateParts[1], 10);
    if (isNaN(month) || isNaN(year)) {
      return false;
    }
    return month >= 1 && month <= 12 && year > 24;
  }

  onSubmit(): void {
    console.log('onSubmit llamado');
    this.formSubmitted = true;
    if (this.isFormValid()) {
      // Generar código aleatorio que empieza con 'C' y 3 dígitos random
      const randomDigits = Math.floor(Math.random() * 900) + 100; // 100-999
      this.transactionId = `C${randomDigits}`;

      // Aquí se puede manejar el envío de datos al backend o integración con SDK de pago
      console.log('Formulario válido. Datos:', {
        cardholderName: this.cardholderName,
        cardNumber: this.cardNumber,
        expiryDate: this.expiryDate,
        cvv: this.cvv,
        cardType: this.cardType,
        transactionId: this.transactionId,
        products: this.products,
        amount: this.amount
      });

      this.enviarDatosBackend();

      // Eliminar llamada a enviarPedidoIsos porque ya no existe
      // this.enviarPedidoIsos();

      alert(`Pago procesado (simulado). Código de transacción: ${this.transactionId}`);
      this.router.navigate(['/catalogo']);
    } else {
      console.warn('Formulario inválido.');
    }
  }

  // Eliminar la función enviarPedidoIsos ya que se integrará en enviarDatosBackend

  enviarDatosBackend(): void {
    const carritoGuardado = localStorage.getItem('carrito');
    const isos = carritoGuardado ? JSON.parse(carritoGuardado).map((producto: any) => producto.sku || producto.codigo || producto.id || producto.nombre) : [];

    const transaccion = {
      codTransaccion: this.transactionId,
      nombrePropietario: this.cardholderName,
      montoFinal: this.totalFinal,
      productoIsos: isos
    };

    const token = localStorage.getItem('token'); // Asumiendo que el token JWT está almacenado en localStorage
    console.log('Token JWT para enviarDatosBackend:', token);

    // Usar token falso hardcodeado para pruebas
    const fakeToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fakePayload.fakeSignature';

    this.http.post('http://localhost:8080/transaccion/crear', transaccion, {
      headers: {
        Authorization: fakeToken
      }
    }).subscribe({
      next: (response) => {
        console.log('Transacción enviada al backend correctamente', response);
      },
      error: (error) => {
        console.error('Error al enviar transacción al backend', error);
      }
    });
  }

  isFormValid(): boolean {
    // Limpiar espacios y caracteres no numéricos para validación
    const cardNumberClean = this.cardNumber.replace(/\D/g, '');
    const cvvClean = this.cvv.trim();

    // Omitir validación de fecha de expiración según solicitud
    const expiryValid = true;

    const isValid =
      this.cardholderName.length >= 3 &&
      /^\d{16}$/.test(cardNumberClean) &&
      expiryValid &&
      /^\d{3,4}$/.test(cvvClean) &&
      this.cardType !== '';

    console.log('Validación del formulario:', {
      cardholderNameLength: this.cardholderName.length,
      cardNumberLength: cardNumberClean.length,
      cvvLength: cvvClean.length,
      cardType: this.cardType,
      isValid: isValid
    });

    return isValid;
  }
}
