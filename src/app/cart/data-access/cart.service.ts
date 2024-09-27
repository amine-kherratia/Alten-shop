import { Injectable, signal } from "@angular/core";
import { Product } from "../../products/data-access/product.model"; // Adjust the path as necessary
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private readonly _cartItems = signal<Product[]>([]);
  public cartItems = this._cartItems.asReadonly();
  private cartItemCount = new BehaviorSubject<number>(0);

  public getCartItems() {
    return this._cartItems.asReadonly();
  }

  public getCartItemCount() {
    return this.cartItemCount.asObservable();
  }
  
  public addToCart(product: Product) {
    const existingItem = this._cartItems().find(item => item.id === product.id);
    if (existingItem) {
      this.updateCartQuantity(product.id, existingItem.quantity + 1);
    } else {
      const cartProduct = { ...product, quantity: 1 };
      this._cartItems.update(items => [...items, cartProduct]);
    }
    this.cartItemCount.next(this.getTotalQuantity());
  }

  public removeFromCart(productId: number) {
    this._cartItems.update(items => items.filter(item => item.id !== productId));
    this.cartItemCount.next(this.getTotalQuantity());
  }

  public updateCartQuantity(productId: number, quantity: number) {
    this._cartItems.update(items =>
      items.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
    this.cartItemCount.next(this.getTotalQuantity());
  }


  public getTotalQuantity() {
    return this._cartItems().reduce((total, item) => total + item.quantity, 0);
  }
}
