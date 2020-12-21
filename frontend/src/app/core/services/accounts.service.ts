import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from 'src/app/user/models/account.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  constructor(private http: HttpClient) {}

  getAllByUser(userId: string): Observable<any> {
    return this.http.get(`${environment.baseURL}accounts/getAllByUser/${userId}`);
  }

  create(account: Account): Observable<any> {
    return this.http.post(`${environment.baseURL}accounts/create`, account);
  }

  update(account: Account): Observable<any> {
    return this.http.put(`${environment.baseURL}accounts/update/${account.userId}/${account._id}`, account);
  }
}
