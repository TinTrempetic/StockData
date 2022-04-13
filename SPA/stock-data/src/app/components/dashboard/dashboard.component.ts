import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isAuth$ = this.authService.isAuthenticated();

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {}
}
