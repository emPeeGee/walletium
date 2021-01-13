import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/admin/models/category.model';
import { DeleteResponse } from 'src/app/shared/models/delete-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.baseURL}categories/`);
  }

  create(formData: FormData): Observable<Category> {
    return this.http.post<Category>(`${environment.baseURL}categories/create`, formData);
  }

  update(formData: FormData): Observable<Category> {
    return this.http.put<Category>(`${environment.baseURL}categories/update`, formData);
  }

  delete(categoryId: string): Observable<DeleteResponse> {
    return this.http.delete<DeleteResponse>(`${environment.baseURL}categories/delete/${categoryId}`);
  }
}
