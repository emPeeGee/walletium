import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Token } from 'src/app/shared/models/token.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken: Token = JSON.parse(localStorage.getItem('token')!); // Get the auth token from  localstorage.
    // Clone the request and replace the original headers with cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken.token ?? '')
    });

    return next.handle(authReq); // send cloned request with header to the next handler.
  }
}
