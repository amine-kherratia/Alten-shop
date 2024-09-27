import { Component, inject } from "@angular/core";
import { CartService } from "app/cart/data-access/cart.service";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';


@Component({
  selector: "app-cart-list",
  templateUrl: "./cart-list.component.html",
  styleUrls: ["./cart-list.component.scss"],
  standalone: true,
  imports: [DataViewModule,CommonModule, CardModule, ButtonModule, DialogModule],
})
export class CartComponent {
  private readonly cartService = inject(CartService);

  public get cartItems() {
    return this.cartService.getCartItems();
  }

  public get totalQuantity() {
    return this.cartService.getTotalQuantity();
  }

  public removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
  }


  public updateCartQuantity(productId: number, quantity: number) {
    if (quantity < 1) {
        this.removeFromCart(productId);
    } else {
        this.cartService.updateCartQuantity(productId, quantity); 
    }
}
}