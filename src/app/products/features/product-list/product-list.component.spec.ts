import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';  // Importer le module de test HttpClient
import { ProductListComponent } from './product-list.component';
import { ProductsService } from '../../data-access/products.service'; // Assurez-vous d'importer correctement votre service
import { Product } from 'app/products/data-access/product.model';
import { CartService } from 'app/cart/data-access/cart.service';
import { of } from 'rxjs';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let mockCartService: CartService;
  let mockProductsService: ProductsService;
  const mockProduct: Product = {
    id: 1,
    code: 'P100',
    name: 'Product 1',
    description: 'Description 1',
    image: 'image1.jpg',
    category: 'Category 1',
    price: 100,
    quantity: 10,
    internalReference: 'IR100',
    shellId: 1,
    inventoryStatus: 'INSTOCK',
    rating: 4,
    createdAt: Date.now(),
    updatedAt: Date.now()
  };

  beforeEach(async () => {
    mockProductsService = jasmine.createSpyObj('ProductsService', ['get', 'create', 'update', 'delete']);
    mockCartService = jasmine.createSpyObj('CartService', ['addToCart', 'removeFromCart', 'updateCartQuantity', 'getCartItems']);

    (mockProductsService.get as jasmine.Spy).and.returnValue(of([mockProduct]));
    (mockCartService.getCartItems as jasmine.Spy).and.returnValue(() => []);

    await TestBed.configureTestingModule({
      imports: [ProductListComponent, HttpClientTestingModule],
      providers: [
        { provide: ProductsService, useValue: mockProductsService },
        { provide: CartService, useValue: mockCartService }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call onCreate and open dialog', () => {
    component.onCreate();
    expect(component.isCreation).toBe(true);
    expect(component.isDialogVisible).toBe(true);
    expect(component.editedProduct()).toEqual({
      id: 0,
      code: '',
      name: '',
      description: '',
      image: '',
      category: '',
      price: 0,
      quantity: 0,
      internalReference: '',
      shellId: 0,
      inventoryStatus: 'INSTOCK',
      rating: 0,
      createdAt: 0,
      updatedAt: 0,
    });
  });

  it('should add product to cart', () => {
    component.onAddToCart(mockProduct);
    expect(mockCartService.addToCart).toHaveBeenCalledWith(mockProduct);
  });
});
