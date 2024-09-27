import { Component, OnInit, inject, signal } from "@angular/core";
import { Product } from "app/products/data-access/product.model";
import { ProductsService } from "app/products/data-access/products.service";
import { ProductFormComponent } from "app/products/ui/product-form/product-form.component";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { CartService } from "app/cart/data-access/cart.service";
import { FormsModule } from "@angular/forms";
import { PaginatorModule } from 'primeng/paginator';

const emptyProduct: Product = {
  id: 0,
  code: "",
  name: "",
  description: "",
  image: "",
  category: "",
  price: 0,
  quantity: 0,
  internalReference: "",
  shellId: 0,
  inventoryStatus: "INSTOCK",
  rating: 0,
  createdAt: 0,
  updatedAt: 0,
};

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  standalone: true,
  imports: [DataViewModule, CommonModule, PaginatorModule, CardModule, FormsModule, ButtonModule, DialogModule, ProductFormComponent],
})
export class ProductListComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  public readonly products = this.productsService.products;
  public isDialogVisible = false;
  filterValue: string = '';
  public isCreation = false;
  public readonly editedProduct = signal<Product>(emptyProduct);
  cartItems = this.cartService.getCartItems(); 
  filteredProducts: Product[] = [];
  fullFilteredProducts: Product[] = [];
  productslist: Product[] = [];
  rows: number = 10;
  totalRecords: number = 0;
  first: number = 0;

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.get().subscribe((data) => {
      this.fullFilteredProducts = data;
      this.productslist = data;
      this.totalRecords = this.fullFilteredProducts.length;
      this.filterProducts();
    });
  }

  filterProducts() {
    if (this.filterValue.trim() === '') {
        this.filteredProducts = this.productslist; 
    } else {

        this.fullFilteredProducts = this.productslist.filter(product =>
            product.name.toLowerCase().includes(this.filterValue.toLowerCase()) ||
            product.category.toLowerCase().includes(this.filterValue.toLowerCase())
        );
        this.filteredProducts = this.fullFilteredProducts;
    }

    this.totalRecords = this.filteredProducts.length; 
    this.paginate({ first: this.first, rows: this.rows }); 
}

  paginate(event: { first: number; rows: number }) {
    this.first = event.first;
    const start = event.first;
    const end = start + event.rows;
    this.filteredProducts = this.fullFilteredProducts.slice(start, end);
  }

  onPageChange(event: { first?: number; rows?: number }) {
    this.first = event.first !== undefined ? event.first : 0;
    this.rows = event.rows !== undefined ? event.rows : this.rows;
    this.paginate({ first: this.first, rows: this.rows });
  }

  public onCreate() {
    this.isCreation = true;
    this.isDialogVisible = true;
    this.editedProduct.set(emptyProduct);
  }

  public onAddToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  public onIncreaseQuantity(product: Product) {
    this.cartService.updateCartQuantity(product.id, this.getCartQuantity(product) + 1);
  }

  public onDecreaseQuantity(product: Product) {
    const newQuantity = this.getCartQuantity(product) - 1;
    if (newQuantity > 0) {
      this.cartService.updateCartQuantity(product.id, newQuantity);
    }
  }

  public isInCart(product: Product): boolean {
    return !!this.cartItems().find(item => item.id === product.id);
  }

  public getCartQuantity(product: Product): number {
    const cartItem = this.cartItems().find(item => item.id === product.id);
    return cartItem ? cartItem.quantity : 0;
  }

  public onUpdate(product: Product) {
    this.isCreation = false;
    this.isDialogVisible = true;
    this.editedProduct.set(product);
  }

  public onDelete(product: Product) {
    this.productsService.delete(product.id).subscribe();
    this.cartService.removeFromCart(product.id);
  }

  public onSave(product: Product) {
    if (this.isCreation) {
      this.productsService.create(product).subscribe();
    } else {
      this.productsService.update(product).subscribe();
    }
    this.closeDialog();
  }

  public onCancel() {
    this.closeDialog();
  }

  private closeDialog() {
    this.isDialogVisible = false;
  }
}
