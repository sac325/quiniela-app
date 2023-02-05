import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Equipo } from './equipo';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})

export class EquiposService {
  private urlEndPoint: string = 'http://localhost:8090/api/equipos/crear';
  private urlEndPointL: string = 'http://localhost:8090/api/equipos/listar';
  private urlEndPointE: string = 'http://localhost:8090/api/equipos/editar';
  private urlEndPointD: string = 'http://localhost:8090/api/equipos/eliminar';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient , private router: Router) { }

  private isNoAutorizado(e): boolean {
    if (e.status == 401 || e.status == 403) {
      this.router.navigate(['/login']);
      return true;
    }

    return false;
  }

  create(equipo: Equipo): Observable<Equipo> {
    return this.http.post<Equipo>(this.urlEndPoint, equipo , { headers: this.httpHeaders })
      .pipe(
        catchError(e => {
          if (this.isNoAutorizado(e)) {
            return throwError(() => new Error(e.error.mensaje));
          }
          if (e.status == 400) {
            return throwError(() => new Error(e.error.mensaje));
          }
          console.error(e.error.mensaje);
          swal.fire('Error al crear el equipo', e.error.mensaje, 'error');
          return throwError(() => new Error(e.error.mensaje));
        }
        )
      );


  }

  //create function get Equipo by id observable and Equipo class
  getEquipo(id): Observable<Equipo> {
//returm client get urlEndPointL and id manage error sweetalert2 json errorn and message
    return this.http.get<Equipo>(`${this.urlEndPointL}/${id}`).pipe(
      catchError(e => {
        //navigate to equipos
        this.router.navigate(['/equipos']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        // pass a factory function to `throwError(() => new Error('test'))`
        return throwError(() => new Error(e.error.mensaje));
      })
    );
    //    return this.http.get<Equipo>(`${this.urlEndPointL}/${id}`);
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
