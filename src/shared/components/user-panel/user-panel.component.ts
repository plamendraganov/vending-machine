import { Component, inject } from '@angular/core';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.scss',
})
export class UserPanelComponent {
  private productService = inject(ProductService);
  private snackbarService = inject(SnackbarService);

  products: Product[] = [];
  insertedAmount: number = 0;

  coins = [
    { label: '1¢', value: 0.01, img: 'assets/coins/1_cent.png' },
    { label: '2¢', value: 0.02, img: 'assets/coins/2_cent.png' },
    { label: '5¢', value: 0.05, img: 'assets/coins/5_cent.png' },
    { label: '10¢', value: 0.1, img: 'assets/coins/10_cent.png' },
    { label: '20¢', value: 0.2, img: 'assets/coins/20_cent.png' },
    { label: '50¢', value: 0.5, img: 'assets/coins/50_cent.png' },
    { label: '€1', value: 1.0, img: 'assets/coins/1_euro.png' },
    { label: '€2', value: 2.0, img: 'assets/coins/2_euro.png' },
  ];

  constructor() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((p) => (this.products = p));
  }

  insertCoin(value: number) {
    this.insertedAmount += value;
    this.insertedAmount = parseFloat(this.insertedAmount.toFixed(2));
  }

  resetInsertedMoney() {
    this.snackbarService.showSuccess(
      `Returned €${this.insertedAmount.toFixed(2)}`
    );

    this.insertedAmount = 0;
  }

  buyProduct(product: Product) {
    if (product.price > this.insertedAmount) {
      this.snackbarService.showError('Not enough money inserted.');
      return;
    }

    if (product.quantity === 0) return;

    const updatedProduct = {
      ...product,
      quantity: product.quantity - 1,
    };

    this.productService
      .updateProduct(product.id, updatedProduct)
      .subscribe(() => {

        const returnChange = this.insertedAmount - product.price;

        let message = `You can take your ${product.name}`;

        if (returnChange > 0) {
          message += ` and your change of $${returnChange.toFixed(2)}`;
        }

        this.snackbarService.showSuccess(message);

        this.insertedAmount = 0;

        this.loadProducts();
      });
  }
}
