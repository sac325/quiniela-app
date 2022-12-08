import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { CommonModule } from '@angular/common';
import { Equipo } from './equipo';
//import observable of
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import swal from 'sweetalert2';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {

  public equipos: any = [];

  
  //add httpheaders content type application/json
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private restService:RestService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getTeams();
  }

  getTeams(){
    return this.restService.get('http://localhost:8090/api/equipos/listar').subscribe(data => {
      this.equipos = data;
      console.log(this.equipos);

    }
    );
          /* return this.restService.get(this.listarUrl).pipe(map((data) => data as Equipo[]));  */
  }

  // create delete function get id and delete equipo by id sweetalert2 confirm
  delete(id: number): void {
    swal.fire({
      title: 'Estas seguro?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.restService.delete('http://localhost:8090/api/equipos/eliminar/'+id).subscribe(
          response => {
            this.getTeams();
            swal.fire(
              'Borrado!',
              'El equipo ha sido borrado.',
              'success'
            )
          }
        )
      }
    })
  }

}
