import { Injectable } from '@angular/core';
import { Token } from 'src/app/shared/models/token.model';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';

  constructor() {}

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  setToken(token: Token): void {
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(token));
  }

  getToken(): Token | null {
    const unparsedToken = localStorage.getItem(this.TOKEN_KEY);

    if (unparsedToken) {
      return JSON.parse(unparsedToken);
    }

    return null;
  }

  setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getUser(): User | null {
    const unparsedUser = localStorage.getItem(this.USER_KEY);

    if (unparsedUser) {
      return JSON.parse(unparsedUser);
    }

    return null;
  }
}
