import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import { logout } from 'src/app/store/authentication/authentication.actions';
import { selectTokenData } from 'src/app/store/authentication/authentication.selectors';

@Injectable({
  providedIn: 'root'
})
export class UserActiveService {
  private userExpireDate: Date | null = null;

  constructor(private store: Store<RootState>) {
    localStorage.removeItem('userExpireDate');
  }

  run(): void {
    this.store.select(selectTokenData).subscribe(token => {
      this.userExpireDate = new Date();
      this.userExpireDate?.setSeconds(this.userExpireDate.getSeconds() + Number(30));

      localStorage.setItem('userExpireDate', this.userExpireDate.toDateString());

      console.log(this.userExpireDate);
    });

    window.onload = () => {
      this.checkExpiredSesion();
    };

    window.onmousedown = () => {
      this.checkExpiredSesion();
    };

    window.onclick = () => {
      this.checkExpiredSesion();
    };

    window.onscroll = () => {
      this.checkExpiredSesion();
    };

    window.onkeypress = () => {
      this.checkExpiredSesion();
    };
  }

  checkExpiredSesion(): void {
    console.log('Active');
    const currentDate = Date.now();
    const expireDate = Date.parse(localStorage.getItem('userExpireDate')!);
    console.log(currentDate);
    console.log(expireDate);

    if (currentDate > expireDate) {
      this.store.dispatch(logout());
      this.userExpireDate = null;
      localStorage.removeItem('userExpireDate');
    }

    // this.store
    //   .select(fromRoot.getClientActive)
    //   .take(1)
    //   .subscribe(active => {
    //     if (!active) {
    //       this.store.dispatch(new layout.ClientActiveAction());
    //     }
    //   });
  }
}
