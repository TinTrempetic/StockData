import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthenticationService } from './services/authentication';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  isLoading$ = this.authService.isLoading();

  constructor(private authService: AuthenticationService) {}
}
