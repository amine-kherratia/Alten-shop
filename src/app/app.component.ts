import {
  Component,
} from "@angular/core";
import { RouterModule } from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
import { CartService } from "./cart/data-access/cart.service";
import { CommonModule } from '@angular/common';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterModule, SplitterModule, ToolbarModule, PanelMenuComponent,CommonModule],
})
export class AppComponent {
  title = "ALTEN SHOP";
  cartItemCount = this.cartService.getCartItems().length;
  constructor(private cartService: CartService) {}
  ngOnInit() {
    // Use a signal to get cart item count
    this.cartItemCount = this.cartService.getTotalQuantity();

    // Optionally, if you want to react to changes in the cart
    this.cartService.getCartItemCount().subscribe(count => {
      this.cartItemCount = count;
    });
  }
}
