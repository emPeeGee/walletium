import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Record, RecordPostPut } from '../../../modules/user/models/record.model';
import { DeleteResponse } from '../../models/delete-response.model';

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

  public create(record: RecordPostPut): Observable<Record> {
    return this.http.post<Record>(`${environment.baseURL}records/create`, record);
  }

  public update(record: RecordPostPut): Observable<Record> {
    return this.http.put<Record>(`${environment.baseURL}records/update`, record);
  }

  public delete(recordId: string): Observable<DeleteResponse> {
    return this.http.delete<DeleteResponse>(`${environment.baseURL}records/delete/${recordId}`);
  }
}
