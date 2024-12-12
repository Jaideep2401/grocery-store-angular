// sales.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartService, ICart } from './services/cart.service';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http: HttpClient, private cartService: CartService) {}

  getSalesInsights(): {orders: ICart[], totalSales: number} {
    let orders = this.getSalesData();
    let totalSales = 0;
    orders.forEach(item => totalSales += (item.quantity * item.price));
    return {orders, totalSales};
  }

  getSalesData(): ICart[] {
    let existing_sales = localStorage.getItem('sales');
    if(existing_sales) {
      return JSON.parse(existing_sales);
    } else return [];
  }

  // placeOrder(cartItems: ICart[]): void {
  //   let newSales = cartItems;
  //   let existing_sales = localStorage.getItem('sales');
  //   if(existing_sales) {
  //     newSales.push(...JSON.parse(existing_sales));
  //   }
  //   localStorage.setItem('sales', JSON.stringify(newSales));
  //   this.cartService.clearCart();
  // }
  placeOrder(cartItems: ICart[]): void {
    let existing_sales = this.getSalesData();
    cartItems.forEach(element => {
      let sale = existing_sales.find((sale: any) => sale.id === element.id);
      if (sale) {
          sale.quantity += element.quantity;
      } else {
          existing_sales.push(element);
      }
    });
    
    localStorage.setItem('sales', JSON.stringify(existing_sales));    
    this.cartService.clearCart();
  }
}
