import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  username: string;
  password: string;
  auth: Buffer;
  private urlEndPoint: string = 'localhost:8090/api/security/oauth/token';

  constructor(private http: HttpClient) {
    // Create a Buffer containing the credentials
    this.username = 'frontendapp';
    this.password = '12345';
    this.auth = Buffer.from(`${this.username}:${this.password}`);
   }
   //function to convert buffer to base64
    private base64encode(auth : Buffer): string {
    return auth.toString('base64');
  }

 //create a fuction login wiht authorization basic request token sending username and password
  login(usuario: string, password: string): Observable<any> {

    const credentials = this.base64encode(this.auth);
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + credentials
    });
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario);
    params.set('password', password );
    console.log(params.toString());
    return this.http.post<any>(this.urlEndPoint, params.toString(), { headers: httpHeaders });
    
  }
  

}
