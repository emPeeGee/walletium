import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DeleteResponse } from 'src/app/core/models/delete-response.model';
import { Label, SaveLabel } from 'src/app/modules/user/models/label.model';

@Injectable({
  providedIn: 'root'
})
export class LabelsService {
  constructor(private http: HttpClient) {}

  getAllByUser(userId: string): Observable<Label[]> {
    return this.http.get<Label[]>(`${environment.baseURL}labels/getByUser/${userId}`);
  }

  get(labelId: string): Observable<Label> {
    return this.http.get<Label>(`${environment.baseURL}labels/getOne/${labelId}`);
  }

  create(label: SaveLabel): Observable<Label> {
    return this.http.post<Label>(`${environment.baseURL}labels/create`, label);
  }

  update(label: SaveLabel): Observable<Label> {
    return this.http.put<Label>(`${environment.baseURL}labels/update`, label);
  }

  delete(labelId: string): Observable<DeleteResponse> {
    return this.http.delete<DeleteResponse>(`${environment.baseURL}labels/delete/${labelId}`);
  }
}
