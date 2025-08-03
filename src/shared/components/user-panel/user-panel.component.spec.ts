import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { UserPanelComponent } from './user-panel.component';
import { ProductService } from '../../services/product.service';
import { SnackbarService } from '../../services/snackbar.service';
import { of } from 'rxjs';
import { Product } from '../../models/product.interface';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('UserPanelComponent', () => {
  let component: UserPanelComponent;
  let fixture: ComponentFixture<UserPanelComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let snackbarSpy: jasmine.SpyObj<SnackbarService>;

  const mockProducts: Product[] = [
    { id: 1, name: 'Cola', price: 1.5, quantity: 5, image: '' },
    { id: 2, name: 'Water', price: 1.0, quantity: 0, image: '' },
  ];

  beforeEach(async () => {
    const productSpy = jasmine.createSpyObj('ProductService', [
      'getProducts',
      'updateProduct',
    ]);
    const snackSpy = jasmine.createSpyObj('SnackbarService', [
      'showSuccess',
      'showError',
    ]);

    productSpy.getProducts.and.returnValue(of(mockProducts));

    await TestBed.configureTestingModule({
      imports: [UserPanelComponent],
      providers: [
        { provide: ProductService, useValue: productSpy },
        { provide: SnackbarService, useValue: snackSpy },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserPanelComponent);

    productServiceSpy = TestBed.inject(
      ProductService
    ) as jasmine.SpyObj<ProductService>;
    snackbarSpy = TestBed.inject(
      SnackbarService
    ) as jasmine.SpyObj<SnackbarService>;

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    expect(component.products.length).toBe(2);
    expect(productServiceSpy.getProducts).toHaveBeenCalled();
  });

  it('should increase inserted amount when coin is inserted', () => {
    component.insertCoin(0.5);
    expect(component.insertedAmount).toBe(0.5);

    component.insertCoin(1);
    expect(component.insertedAmount).toBe(1.5);
  });

  it('should reset inserted money and show snackbar', () => {
    component.insertedAmount = 1.75;
    component.resetInsertedMoney();

    expect(snackbarSpy.showSuccess).toHaveBeenCalledWith('Returned €1.75');
    expect(component.insertedAmount).toBe(0);
  });

  it('should show error if trying to buy product with insufficient funds', () => {
    const product = mockProducts[0];

    component.insertedAmount = 1.0;
    component.buyProduct(product);

    expect(snackbarSpy.showError).toHaveBeenCalledWith(
      'Not enough money inserted.'
    );
    expect(productServiceSpy.updateProduct).not.toHaveBeenCalled();
  });

  it('should not allow buying product if quantity is 0', () => {
    const product = mockProducts[1];

    component.insertedAmount = 5;
    component.buyProduct(product);

    expect(productServiceSpy.updateProduct).not.toHaveBeenCalled();
    expect(snackbarSpy.showSuccess).not.toHaveBeenCalled();
  });

  it('should buy product and show success message with cashback', fakeAsync(() => {
    const product = { ...mockProducts[0] };
    component.insertedAmount = 2.0;

    const updatedProduct = { ...product, quantity: product.quantity - 1 };
    productServiceSpy.updateProduct.and.returnValue(of(updatedProduct));
    productServiceSpy.getProducts.and.returnValue(of([]));

    component.buyProduct(product);
    tick();

    expect(snackbarSpy.showSuccess).toHaveBeenCalledWith(
      `You can take your Cola and your change of $0.50`
    );
    expect(component.insertedAmount).toBe(0);
  }));

  it('should buy product and show success message without cashback', fakeAsync(() => {
    const product = { ...mockProducts[0] };
    component.insertedAmount = 1.5;

    const updatedProduct = { ...product, quantity: product.quantity - 1 };
    productServiceSpy.updateProduct.and.returnValue(of(updatedProduct));
    productServiceSpy.getProducts.and.returnValue(of([]));

    component.buyProduct(product);
    tick();

    expect(snackbarSpy.showSuccess).toHaveBeenCalledWith(
      `You can take your Cola`
    );
    expect(component.insertedAmount).toBe(0);
  }));
});
