import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {

  public equipos: any = [];
  
  
  constructor(private restService:RestService) { }

  ngOnInit(): void {
    this.getTeams();
  }

  getTeams(){
    return this.restService.getTeams('http://localhost:8090/api/equipos/listar').subscribe(data => {


      this.equipos = data;

      console.log(this.equipos);
    }
    );
  }

}
