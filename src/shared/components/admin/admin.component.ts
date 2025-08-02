import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  products: Product[] = [];
  productEdits: { [id: number]: FormGroup } = {};
  newProductForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.newProductForm = this.fb.group({
      name: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0.01)]],
      quantity: [
        null,
        [Validators.required, Validators.min(1), Validators.max(15)],
      ],
    });

    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.productEdits = {};
      for (const product of products) {
        this.productEdits[product.id] = this.fb.group({
          name: [product.name, Validators.required],
          price: [product.price, [Validators.required, Validators.min(0.01)]],
          quantity: [
            product.quantity,
            [Validators.required, Validators.min(1), Validators.max(15)],
          ],
        });
      }
    });
  }

  getControlError(control: AbstractControl | null, error: string): boolean {
    return (
      !!control && control.hasError(error) && (control.dirty || control.touched)
    );
  }

  addProduct() {
    if (this.newProductForm.invalid) {
      this.newProductForm.markAllAsTouched();
      return;
    }

    const { name, price, quantity } = this.newProductForm.value;

    this.productService.addProduct({ name, price, quantity }).subscribe(() => {
      this.newProductForm.reset();
      this.loadProducts();
    });
  }

  updateProduct(id: number) {
    const form = this.productEdits[id];
    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }

    const { name, price, quantity } = form.value;
    this.productService
      .updateProduct(id, { name, price, quantity })
      .subscribe(() => this.loadProducts());
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
  }
}
