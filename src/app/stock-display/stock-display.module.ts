// stock-display.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockDisplayComponent } from './stock-display.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [StockDisplayComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: StockDisplayComponent }]),
    FormsModule,
  ]
})
export class StockDisplayModule { }
