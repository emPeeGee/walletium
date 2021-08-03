import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Record } from '../../../modules/user/models/record.model';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  constructor(private http: HttpClient) {}

  public getRecordById(id: string): Observable<Record> {
    return this.http.get<Record>(`${environment.baseURL}records/${id}`);
  }

  public getAllUserRecords(): Observable<Record[]> {
    return this.http.get<Record[]>(`${environment.baseURL}records/`);
  }

  public getAllByAccount(accountId: string): Observable<Record[]> {
    return this.http.get<Record[]>(`${environment.baseURL}records/getByAccount/${accountId}`);
  }
}
