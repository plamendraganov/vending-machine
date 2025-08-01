import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
username: string = '';
  role: string = '';

  constructor(private auth: AuthService) {
    const user = this.auth.getUser();
    if (user) {
      this.username = user.username;
      this.role = user.role;
    }
  }
}
