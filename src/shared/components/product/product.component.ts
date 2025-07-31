import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product',
  imports: [MatButtonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {}
