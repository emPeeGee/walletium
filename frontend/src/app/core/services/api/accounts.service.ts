import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeleteResponse } from 'src/app/core/models/delete-response.model';
import { Account, AccountWithUser } from 'src/app/modules/user/models/account.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  constructor(private http: HttpClient) {}

  getAllByUser(userId: string): Observable<AccountWithUser[]> {
    return this.http.get<AccountWithUser[]>(`${environment.baseURL}accounts/getByUser/${userId}`);
  }

  get(accountId: string): Observable<Account> {
    return this.http.get<Account>(`${environment.baseURL}accounts/getOne/${accountId}`);
  }

  create(account: Account): Observable<Account> {
    return this.http.post<Account>(`${environment.baseURL}accounts/create`, account);
  }

  update(account: Account): Observable<Account> {
    return this.http.put<Account>(`${environment.baseURL}accounts/update`, account);
  }

  delete(accountId: string): Observable<DeleteResponse> {
    return this.http.delete<DeleteResponse>(`${environment.baseURL}accounts/delete/${accountId}`);
  }
}
