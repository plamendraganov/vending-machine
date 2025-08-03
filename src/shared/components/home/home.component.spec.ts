import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

const mockAuthService = {
  getUser: jasmine.createSpy().and.returnValue({
    username: 'adminUser',
    role: 'admin',
  }),
};

const mockRouter = {
  navigate: jasmine.createSpy('navigate'),
};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with user details from AuthService', () => {
    expect(component.username).toBe('adminUser');
    expect(component.role).toBe('admin');
  });

  it('should call router.navigate to go to admin panel', () => {
    component.goToAdminPanel();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/admin']);
  });
});
