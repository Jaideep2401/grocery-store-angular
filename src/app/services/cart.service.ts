import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface ICart {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: ICart[] = [];
  cartCount: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() {}

  // Add item to the cart
  addToCart(item: ICart): void {
    const existingItem = this.cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ ...item, quantity: 1 });
    }
    console.log(this.cart);

    this.cartCount.next(this.getCartCount());
  }

  // Remove item from the cart
  removeFromCart(itemId: number): void {
    this.cart = this.cart.filter((cartItem) => cartItem.id !== itemId);
    this.cartCount.next(this.getCartCount());
  }

  // Get current cart items
  getCartItems(): Observable<ICart[]> {
    return of(this.cart);
  }

  // Get current cart items
  getTotalPrice(): Observable<number> {
    let totalPrice = 0;
    this.cart.forEach(item => {totalPrice += (item.price * item.quantity)});
    return of(totalPrice);
  }

  // Get the total count of items in the cart
  getCartCount(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  // Clear the cart
  clearCart(): void {
    this.cart = [];
    this.cartCount.next(this.getCartCount());
  }
}
