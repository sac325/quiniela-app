import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http:HttpClient) { }

  getTeams(url:string){
    return this.http.get(url);
  }
  // error 401 redirect function
  private isNoAutorizado(e:any): boolean {
    if (e.status == 401 || e.status == 403) {
      if (e.error.mensaje && e.error.mensaje.indexOf('No autorizado') >= 0) {
        return true;
      }
    }
    return false;
  }

}
