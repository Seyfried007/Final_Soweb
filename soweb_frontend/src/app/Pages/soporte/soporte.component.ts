import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-soporte',
  imports: [RouterLink],
  templateUrl: './soporte.component.html',
  styleUrl: './soporte.component.css'
})
export class SoporteComponent {

  enviarMensaje() {
    alert('Funcionalidad de envío próximamente');
  }

}
