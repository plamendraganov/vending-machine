import { Component, inject } from '@angular/core';
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
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  products: Product[] = [];
  productEdits: { [id: number]: FormGroup } = {};
  newProductForm: FormGroup;

   router = inject(Router);

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.newProductForm = this.fb.group({
      name: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0.01)]],
      quantity: [
        null,
        [Validators.required, Validators.min(1), Validators.max(15)],
      ],
      image: [null],
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
          image: [product.image || null],
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

    const { name, price, quantity, image } = this.newProductForm.value;

    this.productService
      .addProduct({ name, price, quantity, image })
      .subscribe(() => {
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

    const { name, price, quantity, image } = form.value;
    this.productService
      .updateProduct(id, { name, price, quantity, image })
      .subscribe(() => this.loadProducts());
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
  }

  onImageSelected(event: Event, form: FormGroup) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        form.get('image')?.setValue(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  clearImage(form: FormGroup) {
    form.get('image')?.setValue(null);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
