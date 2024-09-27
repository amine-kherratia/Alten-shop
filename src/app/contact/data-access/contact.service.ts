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
    return this.cartItemCount.asObservable(); // Return the observable
  }
  
  public addToCart(product: Product) {
    const existingItem = this._cartItems().find(item => item.id === product.id);
    if (existingItem) {
      // If the item already exists, update its quantity
      this.updateCartQuantity(product.id, existingItem.quantity + 1);
    } else {
      // If it doesn't exist, add it to the cart
      const cartProduct = { ...product, quantity: 1 };
      this._cartItems.update(items => [...items, cartProduct]);
    }
    this.cartItemCount.next(this.getTotalQuantity()); // Emit new count
  }

  public removeFromCart(productId: number) {
    this._cartItems.update(items => items.filter(item => item.id !== productId));
    this.cartItemCount.next(this.getTotalQuantity()); // Emit new count
  }

  public updateCartQuantity(productId: number, quantity: number) {
    this._cartItems.update(items =>
      items.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
    this.cartItemCount.next(this.getTotalQuantity()); // Emit new count
  }


  public getTotalQuantity() {
    return this._cartItems().reduce((total, item) => total + item.quantity, 0);
  }
}
