import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Contactanos } from '../Models/Equipo';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactanosService {

  private http=inject(HttpClient);
  private apiUrl:string = appsettings.apiUrl+"Contactanos";

  constructor() { }

  listartodos(){
    return this.http.get<Contactanos[]>(this.apiUrl);
  }
  listarnombre(nom:string){
    return this.http.get<Contactanos[]>(`${this.apiUrl}/nombre/${nom}`);
  }
  obtenerContactanos(id:number){
    return this.http.get<Contactanos>(`${this.apiUrl}/${id}`);
  }
  crear(objeto:Contactanos){
    let ruta = this.apiUrl+"/crear";
    return this.http.post<Contactanos>(ruta,objeto);
  }
  editar(objeto:Contactanos, id:number){
    return this.http.put<Contactanos>(`${this.apiUrl}/${id}`,objeto);
  }
  eliminar(id:number){
    return this.http.delete<String>(`${this.apiUrl}/${id}`);
  }
}
