import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  imports: [],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.scss',
})
export class UnauthorizedComponent {
  router = inject(Router);

  goToLogin(event: Event) {
    event.preventDefault();
    this.router.navigate(['/login']);
  }

  goToHome(event: Event) {
    event.preventDefault();
    this.router.navigate(['/home']);
  }
}
