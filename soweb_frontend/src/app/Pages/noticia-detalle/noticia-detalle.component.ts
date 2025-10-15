import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Comentario, Noticia, NoticiasService } from '../servicios/noticias.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-noticia-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './noticia-detalle.component.html',
  styleUrl: './noticia-detalle.component.css'
})
export class NoticiaDetalleComponent implements OnInit{
  private route = inject(ActivatedRoute);
  private svc = inject(NoticiasService);
  noticia?: Noticia;
  siguienteNoticia?: Noticia;

  nuevoComentario = {
  autor: '',
  correo: '',
  texto: ''
  };
  respuestaNombre: string = '';
  respuestaTexto: string = '';
  respuestaCorreo: string = '';
  comentarioEnRespuesta: number | null = null;


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      const noticias = this.svc.getAll();

      this.noticia = noticias.find(n => n.id === id);

      const siguienteId = (id + 1) % noticias.length;
      this.siguienteNoticia = noticias.find(n => n.id === siguienteId);
      // Agregar propiedad de control visual a cada comentario
      this.noticia?.comentarios.forEach(c => c['mostrandoRespuesta'] = false);
      
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  }

  getTiempoRelativo(fecha: string): string {
    const diferencia = Date.now() - new Date(fecha).getTime();
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    if (dias < 30) return `hace ${dias} días`;
    const meses = Math.floor(dias / 30);
    return `hace ${meses} Meses`;
  }

  agregarComentario(): void {
    if (!this.noticia) return;

    const nuevoId = this.noticia.comentarios.length > 0
      ? Math.max(...this.noticia.comentarios.map(c => c.id)) + 1
      : 0;

    this.noticia.comentarios.push({
      id: nuevoId,
      autor: this.nuevoComentario.autor.trim(),
      texto: this.nuevoComentario.texto.trim(),
      fecha: new Date().toISOString().split('T')[0],
      respuestas: []
    });

    // Limpiar el formulario
    this.nuevoComentario = {
      autor: '',
      correo: '',
      texto: ''
    };

    // Opcional: scroll al final
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });
    }, 100);
  }
    toggleFormulario(comentario: Comentario) {
      // Oculta todos los formularios de respuesta excepto este
      this.noticia?.comentarios.forEach(c => {
        if (c.id !== comentario.id) c.mostrandoRespuesta = false;
      });

      // Alterna visibilidad
      comentario.mostrandoRespuesta = !comentario.mostrandoRespuesta;

      if (comentario.mostrandoRespuesta) {
        this.respuestaNombre = '';
        this.respuestaCorreo = '';
        this.respuestaTexto = '';
      }
    }
  enviarRespuesta(idComentario: number) {
    const comentarioPadre = this.noticia?.comentarios.find(c => c.id === idComentario);
    if (!comentarioPadre || !this.respuestaNombre.trim() || !this.respuestaTexto.trim() || !this.respuestaCorreo.includes('@')) return;

    const nuevaRespuesta = {
      id: comentarioPadre.respuestas?.length ?? 0,
      autor: this.respuestaNombre,
      texto: this.respuestaTexto,
      fecha: new Date().toISOString().split('T')[0],
      respuestas: []
    };

    comentarioPadre.respuestas = comentarioPadre.respuestas || [];
    comentarioPadre.respuestas.push(nuevaRespuesta);

    // Cierra el formulario
    comentarioPadre['mostrandoRespuesta'] = false;
    this.comentarioEnRespuesta = null;
  }

}