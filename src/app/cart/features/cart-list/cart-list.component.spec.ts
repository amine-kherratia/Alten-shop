import { TestBed } from '@angular/core/testing';
import { CartComponent } from './cart-list.component';
import { CartService } from 'app/cart/data-access/cart.service';
import { of } from 'rxjs';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: any;
  let mockCartService: jasmine.SpyObj<CartService>;

  const mockCartItems = [
    { id: 1, name: 'Product 1', quantity: 2 },
    { id: 2, name: 'Product 2', quantity: 1 }
  ];

  beforeEach(async () => {
    mockCartService = jasmine.createSpyObj('CartService', ['getCartItems', 'getTotalQuantity', 'removeFromCart', 'updateCartQuantity']);
    
    (mockCartService.getCartItems as jasmine.Spy).and.returnValue(mockCartItems);
    (mockCartService.getTotalQuantity as jasmine.Spy).and.returnValue(3); // Total quantity of mock items

    await TestBed.configureTestingModule({
      imports: [CartComponent], // Ajoutez ici le composant
      providers: [
        { provide: CartService, useValue: mockCartService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve cart items', () => {
    const items = component.cartItems;
    expect(items).toEqual(mockCartItems);
  });

  it('should retrieve total quantity', () => {
    const totalQuantity = component.totalQuantity;
    expect(totalQuantity).toBe(3);
  });

  it('should remove item from cart', () => {
    const productId = 1;
    component.removeFromCart(productId);
    expect(mockCartService.removeFromCart).toHaveBeenCalledWith(productId);
  });

  it('should update cart quantity', () => {
    const productId = 1;
    const quantity = 3;
    component.updateCartQuantity(productId, quantity);
    expect(mockCartService.updateCartQuantity).toHaveBeenCalledWith(productId, quantity);
  });

  it('should remove from cart if quantity is less than 1', () => {
    const productId = 1;
    component.updateCartQuantity(productId, 0);
    expect(mockCartService.removeFromCart).toHaveBeenCalledWith(productId);
  });
});
