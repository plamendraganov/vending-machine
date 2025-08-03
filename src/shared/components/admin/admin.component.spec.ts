import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { of } from 'rxjs';
import { AdminComponent } from './admin.component';
import { ProductService } from '../../services/product.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../models/product.interface';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let mockProductService: jasmine.SpyObj<ProductService>;

  const mockProducts: Product[] = [
    { id: 1, name: 'Coke', price: 1.5, quantity: 5, image: '' },
    { id: 2, name: 'Pepsi', price: 1.2, quantity: 3, image: '' },
  ];

  beforeEach(async () => {
    mockProductService = jasmine.createSpyObj<ProductService>(
      'ProductService',
      ['getProducts', 'addProduct', 'updateProduct', 'deleteProduct']
    );

    mockProductService.getProducts.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [AdminComponent, ReactiveFormsModule],
      providers: [{ provide: ProductService, useValue: mockProductService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products and create edit forms', () => {
    mockProductService.getProducts.and.returnValue(of(mockProducts));
    component.loadProducts();

    expect(component.products.length).toBe(2);
    expect(Object.keys(component.productEdits)).toContain('1');
    expect(component.productEdits[1].get('name')?.value).toBe('Coke');
  });

  it('should add product when form is valid', () => {
    mockProductService.getProducts.and.returnValue(of([]));
    mockProductService.addProduct.and.returnValue(
      of({ id: 3, name: 'Fanta', price: 1.3, quantity: 6, image: '' })
    );
    component.newProductForm.setValue({
      name: 'Fanta',
      price: 1.3,
      quantity: 6,
      image: '',
    });

    component.addProduct();

    expect(mockProductService.addProduct).toHaveBeenCalledWith({
      name: 'Fanta',
      price: 1.3,
      quantity: 6,
      image: '',
    });
  });

  it('should not add product when form is invalid', () => {
    component.newProductForm.setValue({
      name: '',
      price: null,
      quantity: null,
      image: '',
    });

    component.addProduct();

    expect(mockProductService.addProduct).not.toHaveBeenCalled();
  });

  it('should update product if edit form is valid', () => {
    const id = 1;
    mockProductService.getProducts.and.returnValue(of(mockProducts));
    mockProductService.updateProduct.and.returnValue(of(mockProducts[0]));

    component.loadProducts();
    component.productEdits[id].setValue({
      name: 'Coke Zero',
      price: 1.4,
      quantity: 4,
      image: '',
    });

    component.updateProduct(id);

    expect(mockProductService.updateProduct).toHaveBeenCalledWith(1, {
      name: 'Coke Zero',
      price: 1.4,
      quantity: 4,
      image: '',
    });
  });

  it('should not update product if edit form is invalid', () => {
    const id = 1;
    mockProductService.getProducts.and.returnValue(of(mockProducts));
    component.loadProducts();
    component.productEdits[id].setValue({
      name: '',
      price: null,
      quantity: null,
      image: '',
    });

    component.updateProduct(id);

    expect(mockProductService.updateProduct).not.toHaveBeenCalled();
  });

  it('should delete product', () => {
    mockProductService.deleteProduct.and.returnValue(of());
    component.deleteProduct(1);

    expect(mockProductService.deleteProduct).toHaveBeenCalledWith(1);
  });
});
