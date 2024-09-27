import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Routes } from "@angular/router";
import { CartComponent } from "./features/cart-list/cart-list.component";

export const CART_ROUTES: Routes = [
	{
		path: "list",
		component: CartComponent,
	},
	{ path: "**", redirectTo: "list" },
];
