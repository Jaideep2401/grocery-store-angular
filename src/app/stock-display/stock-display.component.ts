import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CartService } from '../services/cart.service';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-stock-display',
  templateUrl: './stock-display.component.html',
  styleUrls: ['./stock-display.component.css']
})
export class StockDisplayComponent implements OnInit {
  stock: any[] = [];
  searchTerm: string = '';
  minPrice: number = 0;
  maxPrice: number = Infinity;
  errorMessage: string | null = null;

  constructor(private apiService: ApiService, private cartService: CartService) {}

  ngOnInit() {
    this.apiService.getStock().subscribe({
      next: data => {
        this.stock = data;
        this.errorMessage = null; // Clear error message on successful data load
      },
      error: error => {
        this.errorMessage = 'An error occurred while fetching the stock data.';
        console.error(error); // log the error to the console for debugging
      }
    });
  }

  addToCart(item: any) {
    this.cartService.addToCart(item);
  }

  filteredStock() {
    let result = this.stock.filter(item =>
      item.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    if (this.minPrice > 0 || this.maxPrice < Infinity) {
      result = result.filter(item => item.price >= this.minPrice && item.price <= this.maxPrice);
    }

    return result;
  }
}
