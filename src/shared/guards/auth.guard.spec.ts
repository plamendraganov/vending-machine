import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', [
      'isAuthenticated',
      'hasRole',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should allow access if authenticated and role matches', () => {
    authServiceSpy.isAuthenticated.and.returnValue(true);
    authServiceSpy.hasRole.and.returnValue(true);

    const route = {
      data: { role: 'admin' },
    } as unknown as ActivatedRouteSnapshot;
    const result = guard.canActivate(route);

    expect(result).toBeTrue();
  });

  it('should redirect to /login if not authenticated', () => {
    authServiceSpy.isAuthenticated.and.returnValue(false);

    const route = {} as ActivatedRouteSnapshot;
    const result = guard.canActivate(route);

    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should redirect to /unauthorized if role does not match', () => {
    authServiceSpy.isAuthenticated.and.returnValue(true);
    authServiceSpy.hasRole.and.returnValue(false);

    const route = {
      data: { role: 'admin' },
    } as unknown as ActivatedRouteSnapshot;
    const result = guard.canActivate(route);

    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/unauthorized']);
  });
});
