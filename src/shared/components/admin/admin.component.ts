import { Component } from '@angular/core';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  products: Product[] = [];
  newProductName = '';
  newProductPrice: number | null = null;

  constructor(private productService: ProductService) {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((p) => (this.products = p));
  }

  addProduct() {
    if (this.newProductName && this.newProductPrice != null) {
      this.productService
        .addProduct({
          name: this.newProductName,
          price: this.newProductPrice,
        })
        .subscribe(() => {
          this.loadProducts();
          this.newProductName = '';
          this.newProductPrice = null;
        });
    }
  }

  updateProduct(id: number, newName: string, newPrice: string) {
    const updatedData = {
      name: newName,
      price: Number(newPrice),
    };
    this.productService
      .updateProduct(id, updatedData)
      .subscribe(() => this.loadProducts());
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
  }
}
