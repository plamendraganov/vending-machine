import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { ProductService } from './product.service';
import { Product } from '../models/product.interface';
import { provideHttpClient } from '@angular/common/http';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const mockProducts: Product[] = [
    { id: 1, name: 'Coke', price: 1.5, quantity: 10 },
    { id: 2, name: 'Pepsi', price: 1.2, quantity: 5 },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ProductService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products', () => {
    service.getProducts().subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('http://localhost:3000/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should add a new product', () => {
    const newProduct = { name: 'Fanta', price: 1.3, quantity: 8 };

    service.addProduct(newProduct).subscribe((product) => {
      expect(product).toEqual({ id: 3, ...newProduct });
    });

    const req = httpMock.expectOne('http://localhost:3000/products');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newProduct);
    req.flush({ id: 3, ...newProduct });
  });

  it('should update an existing product', () => {
    const changes = { price: 1.7 };
    const id = 1;

    service.updateProduct(id, changes).subscribe((updated) => {
      expect(updated).toEqual({ id, name: 'Coke', price: 1.7, quantity: 10 });
    });

    const req = httpMock.expectOne(`http://localhost:3000/products/${id}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(changes);
    req.flush({ id, name: 'Coke', price: 1.7, quantity: 10 });
  });

  it('should delete a product', () => {
    const id = 2;

    service.deleteProduct(id).subscribe((res) => {
      expect(res).toBeNull();
    });

    const req = httpMock.expectOne(`http://localhost:3000/products/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
