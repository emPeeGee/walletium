/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { TokenStorageService } from '../services/others/token-storage.service';
import { catchError } from 'rxjs/operators';
import { RootState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/store/authentication/authentication.actions';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(private tokenStorageService: TokenStorageService, private store: Store<RootState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.tokenStorageService.getToken();

    if (token != null) {
      authReq = req.clone({ headers: req.headers.set('Authorization', token.access_token) });
    }

    return next.handle(authReq).pipe(
      catchError((response: HttpErrorResponse) => {
        if (response.status === 401) {
          this.store.dispatch(logout({ expired: true }));
          return EMPTY;
        }

        return throwError(response);
      })
    );
  }
}
