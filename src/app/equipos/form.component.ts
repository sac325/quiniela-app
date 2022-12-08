import { Component, OnInit } from '@angular/core';
import { Equipo} from './equipo';
import { EquiposService } from './equipos.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public equipo: Equipo = new Equipo();
  public titulo = 'Formulario';
  public imagen: HTMLInputElement; 

  //constructor with equipos component 
  constructor (private equiposService: EquiposService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarEquipo();
  }

//create function create void 
  create(): void {
    // save equipo with service equiposService then save file if exist
    this.equiposService.create(this.equipo).subscribe(equipo => {
      //get document imagen by id and save file
      this.imagen = document.getElementById('imagen') as HTMLInputElement;

      if (this.imagen.files.length > 0) {
        this.equiposService.saveFile(this.imagen.files[0], equipo.id).subscribe(
          response => {

      this.router.navigate(['/equipos'])
      swal.fire('Nuevo Equipo', `Equipo ${equipo.nombre} creado con éxito!`, 'success')
    })
  }
})
  }
  


  //create function cargarEquipo void
  cargarEquipo(): void {
    //activated route get id from url and subscribe
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.equiposService.getEquipo(id).subscribe((equipo) => this.equipo = equipo)
      }
    }
    )
  }

  //create function update void
  update(): void {
    this.equiposService.updateEquipo(this.equipo).subscribe(equipo => {
      this.router.navigate(['/equipos'])
      swal.fire('Equipo Actualizado', `Equipo ${equipo.nombre} actualizado con éxito!`, 'success')
    })
  }
  

}
