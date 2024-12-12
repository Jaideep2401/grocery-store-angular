import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService, private salesService: SalesService, private router: Router) {}

  ngOnInit() {
    this.updateCartItems();
  }
  
  updateCartItems(): void {
    this.cartService.getCartItems().subscribe(items => (this.cartItems = items));
    this.cartService.getTotalPrice().subscribe(price => (this.totalPrice = price));
  }

  removeFromCart(itemId: number) {
    this.cartService.removeFromCart(itemId);
    this.updateCartItems();
  }

  placeOrder(): void {
    this.salesService.placeOrder(this.cartItems);
    this.router.navigate(['/sales']);
  }
}
