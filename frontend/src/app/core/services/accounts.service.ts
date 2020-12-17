import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  constructor(private http: HttpClient) {}

  getAllByUser(userId: string): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}accounts/getAllByUser/${userId}`);
  }
}
