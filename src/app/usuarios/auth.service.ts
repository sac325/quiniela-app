import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  username: string;
  password: string;

  private urlEndPoint: string = 'http://localhost:8090/api/security/oauth/token';

  constructor(private http: HttpClient) {
    // Create a Buffer containing the credentials
    this.username = 'frontendapp';
    this.password = '12345';
   
   }
   //function to convert buffer to base64
  base64encode(auth) {
    console.log(auth);
          //convert auth to base64 
          return btoa(auth);
  }

 //create a fuction login wiht authorization basic request token sending username and password
  login(usuario: string, password: string): Observable<any> {

    const auth = btoa('frontendapp:12345');
    console.log(auth);
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic '+auth
    });
    //header could be set to Access-Control-Allow-Origin: http://localhost:4200.
    //header   to Access-Control-Allow-Origin: http://localhost:4200
    //httpHeaders.set('Access-Control-Allow-Origin', 'http://localhost:4200');

    //print header by console to see allow origins transform into json text
    console.log(httpHeaders);

    

    const params = new HttpParams()
    .set('grant_type', 'password')
    .set('username', usuario)
    .set('password', password);
    console.log(params.toString());
    return this.http.post<any>(this.urlEndPoint, params, { headers: httpHeaders });
  }
  

}
