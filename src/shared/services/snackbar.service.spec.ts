import { TestBed } from '@angular/core/testing';
import { SnackbarService } from './snackbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('SnackbarService', () => {
  let service: SnackbarService;
  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [SnackbarService, { provide: MatSnackBar, useValue: spy }],
    });

    service = TestBed.inject(SnackbarService);
    matSnackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call open with success config when showSuccess is called', () => {
    const message = 'Success message';
    service.showSuccess(message);

    expect(matSnackBarSpy.open).toHaveBeenCalledWith(message, 'Close', {
      duration: 3000,
      panelClass: ['snackbar-success'],
      verticalPosition: 'top',
    });
  });

  it('should call open with error config when showError is called', () => {
    const message = 'Error message';
    service.showError(message);

    expect(matSnackBarSpy.open).toHaveBeenCalledWith(message, 'Close', {
      duration: 3000,
      panelClass: ['snackbar-error'],
      verticalPosition: 'top',
    });
  });

  it('should allow overriding duration for showSuccess', () => {
    const message = 'Success with custom duration';
    const duration = 5000;
    service.showSuccess(message, duration);

    expect(matSnackBarSpy.open).toHaveBeenCalledWith(message, 'Close', {
      duration,
      panelClass: ['snackbar-success'],
      verticalPosition: 'top',
    });
  });

  it('should allow overriding duration for showError', () => {
    const message = 'Error with custom duration';
    const duration = 1000;
    service.showError(message, duration);

    expect(matSnackBarSpy.open).toHaveBeenCalledWith(message, 'Close', {
      duration,
      panelClass: ['snackbar-error'],
      verticalPosition: 'top',
    });
  });
});
