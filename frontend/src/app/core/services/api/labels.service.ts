import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DeleteResponse } from 'src/app/shared/models/delete-response.model';
import { Label } from 'src/app/modules/user/models/label.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LabelsService {
  constructor(private http: HttpClient) {}

  getAllByUser(userId: string): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}labels/getByUser/${userId}`);
  }

  get(labelId: string): Observable<Label> {
    return this.http.get<Label>(`${environment.baseURL}labels/getOne/${labelId}`);
  }

  create(label: Label): Observable<Label> {
    return this.http.post<Label>(`${environment.baseURL}labels/create`, label);
  }

  update(label: Label): Observable<Label> {
    return this.http.put<Label>(`${environment.baseURL}labels/update`, label);
  }

  delete(labelId: string): Observable<DeleteResponse> {
    return this.http.delete<DeleteResponse>(`${environment.baseURL}labels/delete/${labelId}`);
  }
}
