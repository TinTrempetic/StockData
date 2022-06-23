import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  isAuth$ = this.authService.isAuthenticated();

  constructor(private authService: AuthenticationService) {}
}
