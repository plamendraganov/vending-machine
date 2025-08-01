import { Component } from '@angular/core';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-user-panel',
  imports: [],
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.scss',
})
export class UserPanelComponent {
  products: Product[] = [];

  constructor(private productService: ProductService) {
    this.productService.getProducts().subscribe((p) => (this.products = p));
  }
}
