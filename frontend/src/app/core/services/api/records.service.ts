import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Record } from '../../../modules/user/models/record.model';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  constructor(private http: HttpClient) {}

  public getAllByAccount(accountId: string) {
    return this.http.get<Record[]>(`${environment.baseURL}records/getByAccount/${accountId}`);
  }
}
