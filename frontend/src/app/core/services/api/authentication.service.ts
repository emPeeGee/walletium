import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Auth } from 'src/app/shared/models/auth.model';
import { Credentials } from 'src/app/shared/models/credentials.model';
import { Signup } from 'src/app/shared/models/signup.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  createNewUser(payload: Signup): Observable<Signup> {
    return this.http.post<Signup>(`${environment.baseURL}authentication/signup`, payload);
  }

  userLogin(payload: Credentials): Observable<Auth> {
    return this.http
      .post<Auth>(`${environment.baseURL}authentication/signin`, payload)
      .pipe(tap(res => console.log(res)));
  }

  getProtectedData(): Observable<any> {
    return this.http.get(`${environment.baseURL}authentication/data`);
  }
}
