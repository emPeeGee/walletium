import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProtectedData();
  }

  getProtectedData(): void {
    this.authenticationService
      .getProtectedData()
      .subscribe((data: any) => console.log(data));
  }

  logout() {
    localStorage.removeItem('Token');
    this.router.navigate(['guest', 'login']);
  }
}
