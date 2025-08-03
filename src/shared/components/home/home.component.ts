import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserPanelComponent } from '../user-panel/user-panel.component';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [UserPanelComponent, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  username: string = '';
  role: string = '';

  constructor() {
    const user = this.auth.getUser();
    if (user) {
      this.username = user.username;
      this.role = user.role;
    }
  }

  goToAdminPanel() {
    this.router.navigate(['/admin']);
  }
}
