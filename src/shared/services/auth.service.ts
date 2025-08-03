import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly storageKey = 'auth_user';

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      this.setUser({ username, role: 'admin' });
      return true;
    } else if (username === 'user' && password === 'user') {
      this.setUser({ username, role: 'user' });
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.storageKey);
    this.router.navigate(['/login']);
  }

  setUser(user: { username: string; role: string }) {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  getUser(): { username: string; role: string } | null {
    const user = localStorage.getItem(this.storageKey);
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getUser();
  }

  hasRole(role: string): boolean {
    return this.getUser()?.role === role;
  }
}
