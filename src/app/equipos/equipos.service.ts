import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Equipo } from './equipo';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class EquiposService {
  private urlEndPoint: string = 'http://localhost:8090/api/equipos/crear';
  private urlEndPointL: string = 'http://localhost:8090/api/equipos/listar';
  private urlEndPointE: string = 'http://localhost:8090/api/equipos/editar';
  private urlEndPointD: string = 'http://localhost:8090/api/equipos/eliminar';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }


  create(equipo: Equipo): Observable<Equipo> {
    return this.http.post<Equipo>(this.urlEndPoint, equipo , { headers: this.httpHeaders });

  }

  //create function get Equipo by id observable and Equipo class
  getEquipo(id): Observable<Equipo> {
    return this.http.get<Equipo>(`${this.urlEndPointL}/${id}`);
  }

  // create function updateEquipo observable and Equipo class
  updateEquipo(equipo: Equipo): Observable<Equipo> {
    return this.http.put<Equipo>(`${this.urlEndPointE}/${equipo.id}`, equipo, { headers: this.httpHeaders });
  }

  // create delete finction return observable Equipo class get id
  delete(id: number): Observable<Equipo> {
    return this.http.delete<Equipo>(`${this.urlEndPointD}/${id}`, { headers: this.httpHeaders });
  }

  // create saveFile function multipart file and id
  saveFile(file: File, id): Observable<any> {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("id", id);
    return this.http.post(`${this.urlEndPoint}/upload`, formData);
  }

}
