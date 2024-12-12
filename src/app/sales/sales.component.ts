// sales.component.ts
import { Component, OnInit } from '@angular/core';
import { SalesService } from '../sales.service';
import { ICart } from '../services/cart.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  totalSales: number = 0;
  salesByCategory: any[] = [];
  orders: ICart[] = [];

  constructor(private salesService: SalesService) {}

  ngOnInit(): void {
    this.fetchSalesData();
  }

  fetchSalesData(): void {
    let salesInsights = this.salesService.getSalesInsights();
    this.totalSales = salesInsights.totalSales;
    this.orders = salesInsights.orders;

    // Process sales data by category
    this.salesByCategory = this.calculateSalesByCategory(salesInsights.orders);
  }

  calculateSalesByCategory(orders: ICart[]): { name: string; sales: number }[] {
    const categorySalesMap: { [key: string]: number } = {};

    // Aggregate sales by category
    orders.forEach(order => {
      if (!categorySalesMap[order.category]) {
        categorySalesMap[order.category] = 0;
      }
      categorySalesMap[order.category] += order.price * order.quantity;
    });

    // Convert the map to an array of objects
    return Object.keys(categorySalesMap).map(category => ({
      name: category,
      sales: categorySalesMap[category]
    }));
  }
}
