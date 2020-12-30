import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${environment.baseURL}categories/getAll`);
  }

  create(formData: FormData): Observable<any> {
    return this.http.post(`${environment.baseURL}categories/create`, formData);
  }

  update(categoryId: string, formData: FormData): Observable<any> {
    return this.http.put(`${environment.baseURL}categories/update/${categoryId}`, formData);
  }

  delete(categoryId: string): Observable<any> {
    return this.http.delete(`${environment.baseURL}categories/deleteOne/${categoryId}`);
  }
}
