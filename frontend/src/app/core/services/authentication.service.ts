import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  createNewUser(payload: any) {
    return this.http.post(
      `${environment.baseURL}authentication/signup`,
      payload
    );
  }

  userLogin(payload: any) {
    return this.http.post(
      `${environment.baseURL}authentication/login`,
      payload
    );
  }

  getProtectedData() {
    return this.http.get(`${environment.baseURL}authentication/data`);
  }
}
