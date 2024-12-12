import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  cartCount: number = 0;

  constructor(private cartService: CartService) {
    this.cartService.cartCount.subscribe(count => this.cartCount = count);
  }

  removeFromCart() {
    // Dummy item ID for demonstration purposes
    const itemId = 1;
    this.cartService.removeFromCart(itemId);
  }
}
