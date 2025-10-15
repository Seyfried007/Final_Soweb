import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface Noticia {
  titulo: string;
  texto: string;
  imagePath: string;
  autor: string;
  avatarPath: string;
  fecha: string;
}

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent {
  noticiasRecientes: Noticia[] = [
    {
      titulo: 'Normas ISO impulsan la calidad en procesos industriales',
      texto: 'Empresas mejoran su gestión de calidad aplicando la norma ISO 9001',
      imagePath: 'assets/caratulas/imagen_noticias_recientes_1.svg',
      autor: 'Carlos Méndez',
      avatarPath: 'assets/redactores/fotoretrado_redactor_1.svg',
      fecha: '19 Feb. 2025'
    },
    {
      titulo: 'ISO 14001 gana terreno en industrias sostenibles',
      texto: 'La ISO 14001 ayuda a reducir el impacto ambiental en la industria.',
      imagePath: 'assets/caratulas/imagen_noticias_recientes_2.svg',
      autor: 'Lucía Torres',
      avatarPath: 'assets/redactores/fotoretrado_redactor_2.svg',
      fecha: '03 Mar. 2025'
    },
    {
      titulo: 'Certificación ISO 45001 mejora la seguridad laboral',
      texto: 'La norma ISO 45001 refuerza la seguridad y salud en el trabajo.',
      imagePath: 'assets/caratulas/imagen_noticias_recientes_3.svg',
      autor: 'Diego Rivas',
      avatarPath: 'assets/redactores/fotoretrado_redactor_3.svg',
      fecha: '22 Ene. 2025'
    },
    {
      titulo: 'ISO 50001 transforma la eficiencia energética',
      texto: 'ISO 50001 permite un uso más eficiente de la energía en las plantas.',
      imagePath: 'assets/caratulas/imagen_noticias_recientes_4.svg',
      autor: 'Matías Romero',
      avatarPath: 'assets/redactores/fotoretrado_redactor_4.svg',
      fecha: '10 Dic. 2024'
    },
    {
      titulo: 'ISO 27001 protege la información empresarial',
      texto: 'Con ISO 27001, las empresas protegen mejor su información digital.',
      imagePath: 'assets/caratulas/imagen_noticias_recientes_5.svg',
      autor: 'Fernando Aguirre',
      avatarPath: 'assets/redactores/fotoretrado_redactor_5.svg',
      fecha: '28 Feb. 2025'
    },
    {
      titulo: 'Normas ISO abren puertas al comercio global',
      texto: 'Certificaciones ISO facilitan el acceso a mercados internacionales.',
      imagePath: 'assets/caratulas/imagen_noticias_recientes_6.svg',
      autor: 'Matías Romero',
      avatarPath: 'assets/redactores/fotoretrado_redactor_6.svg',
      fecha: '15 Mar. 2025'
    }
  ];
}