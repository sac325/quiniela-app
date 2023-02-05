import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { Usuario } from './usuario';
import swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo: string = 'Por favor Sign In!';
  usuario: Usuario;

  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
  }

  login(): void {
    console.log(this.usuario);
    if (this.usuario.userlogin == null || this.usuario.passwd == null) {
      swal.fire('Error Login', 'Username o password vacios!', 'error');
      return;
    }

    this.authService.login(this.usuario.userlogin, this.usuario.passwd).subscribe(response => {
      console.log(response);
      /* this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario; */
      //this.router.navigate(['/equipos']);
      swal.fire('Login', `Hola ${response.userlogin}, has iniciado sesion con exito!`, 'success');
    }
    );
    
  }

}